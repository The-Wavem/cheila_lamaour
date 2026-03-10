const parseDateValue = (value, endOfDay = false) => {
    if (!value) {
        return null;
    }

    const date = value instanceof Date ? new Date(value) : new Date(`${value}T00:00:00`);

    if (Number.isNaN(date.getTime())) {
        return null;
    }

    if (endOfDay) {
        date.setHours(23, 59, 59, 999);
    } else {
        date.setHours(0, 0, 0, 0);
    }

    return date;
};

const normalizeRangeOrder = (start, end) => {
    if (start <= end) {
        return { start, end };
    }

    const normalizedStart = new Date(end);
    normalizedStart.setHours(0, 0, 0, 0);

    const normalizedEnd = new Date(start);
    normalizedEnd.setHours(23, 59, 59, 999);

    return {
        start: normalizedStart,
        end: normalizedEnd
    };
};

export const getDateInputValue = (date) => {
    const safeDate = date instanceof Date ? new Date(date) : new Date();
    safeDate.setHours(0, 0, 0, 0);
    return safeDate.toISOString().slice(0, 10);
};

export const resolveFilterRange = (options = {}) => {
    if (options.dateRange?.start && options.dateRange?.end) {
        const start = parseDateValue(options.dateRange.start);
        const end = parseDateValue(options.dateRange.end, true);

        if (start && end) {
            return normalizeRangeOrder(start, end);
        }
    }

    if (options.dateRange?.startDate && options.dateRange?.endDate) {
        const start = parseDateValue(options.dateRange.startDate);
        const end = parseDateValue(options.dateRange.endDate, true);

        if (start && end) {
            return normalizeRangeOrder(start, end);
        }
    }

    const periodDays = options.periodDays || 7;
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const start = new Date();
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - (periodDays - 1));

    return normalizeRangeOrder(start, end);
};

export const buildPreviousRange = (range) => {
    const currentStart = new Date(range.start);
    const currentEnd = new Date(range.end);
    const durationMs = currentEnd.getTime() - currentStart.getTime() + 1;

    const previousEnd = new Date(currentStart.getTime() - 1);
    const previousStart = new Date(previousEnd.getTime() - durationMs + 1);
    previousStart.setHours(0, 0, 0, 0);
    previousEnd.setHours(23, 59, 59, 999);

    return {
        start: previousStart,
        end: previousEnd
    };
};

export const filterTimestampedRecords = (records, options = {}) => {
    const range = resolveFilterRange(options);

    return records.filter((record) => {
        if (!record.createdAt?.toDate) {
            return false;
        }

        const createdAt = record.createdAt.toDate();
        return createdAt >= range.start && createdAt <= range.end;
    });
};

export const getRangeDurationInDays = (range) => {
    const diffMs = range.end.getTime() - range.start.getTime();
    return Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;
};

export const formatRangeLabel = (range) => {
    const formatter = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit'
    });

    return `${formatter.format(range.start)} a ${formatter.format(range.end)}`;
};

export const buildTimelineFromRange = (range) => {
    const shortDateFormatter = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit'
    });

    const fullDateFormatter = new Intl.DateTimeFormat('pt-BR', {
        weekday: 'long',
        day: '2-digit',
        month: '2-digit'
    });

    const timeline = [];
    const cursor = new Date(range.start);
    cursor.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    while (cursor <= range.end) {
        const currentDate = new Date(cursor);
        const daysAgo = Math.max(0, Math.floor((today.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)));

        timeline.push({
            key: currentDate.toISOString().slice(0, 10),
            dateLabel: shortDateFormatter.format(currentDate),
            fullDateLabel: fullDateFormatter.format(currentDate),
            daysAgo,
            leads: 0,
            general: 0,
            unique: 0
        });

        cursor.setDate(cursor.getDate() + 1);
    }

    return timeline;
};