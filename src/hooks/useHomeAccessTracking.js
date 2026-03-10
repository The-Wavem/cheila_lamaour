import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { registerPageAccess } from '@/services/analytics';

const CONSENT_STATUS_KEY = 'cheila_data_consent_status';
const CLIENT_ID_KEY = 'cheila_analytics_client_id';
const UNIQUE_HOME_KEY_PREFIX = 'cheila_unique_home_recorded';
const GENERAL_ACCESS_LOCK_PREFIX = 'cheila_general_home_access';

const generateClientId = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }

    return `client-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const ensureUtmStorage = () => {
    const params = new URLSearchParams(window.location.search);
    const utms = ['utm_source', 'utm_medium', 'utm_campaign'];

    utms.forEach((utm) => {
        const value = params.get(utm);
        if (value) {
            sessionStorage.setItem(utm, value);
        }
    });
};

const getOrCreateClientId = () => {
    const existingClientId = localStorage.getItem(CLIENT_ID_KEY);
    if (existingClientId) {
        return existingClientId;
    }

    const clientId = generateClientId();
    localStorage.setItem(CLIENT_ID_KEY, clientId);
    return clientId;
};

const getConsentStatus = () => localStorage.getItem(CONSENT_STATUS_KEY) || 'pending';

export const useHomeAccessTracking = () => {
    const clientId = useMemo(() => getOrCreateClientId(), []);
    const [consentStatus, setConsentStatus] = useState(getConsentStatus);
    const isRegisteringUniqueRef = useRef(false);

    const uniqueAccessKey = useMemo(() => `${UNIQUE_HOME_KEY_PREFIX}:${clientId}`, [clientId]);

    const registerUniqueAccess = useCallback(async () => {
        if (localStorage.getItem(uniqueAccessKey) === 'true' || isRegisteringUniqueRef.current) {
            return;
        }

        try {
            isRegisteringUniqueRef.current = true;
            await registerPageAccess({
                page: 'home',
                accessType: 'unique',
                clientId,
                consentStatus: 'accepted'
            });
            localStorage.setItem(uniqueAccessKey, 'true');
        } catch (error) {
            console.error('Erro ao registrar acesso único da Home:', error);
        } finally {
            isRegisteringUniqueRef.current = false;
        }
    }, [clientId, uniqueAccessKey]);

    useEffect(() => {
        ensureUtmStorage();

        const pageLoadId = `${window.location.pathname}:${Math.round(performance.timeOrigin || Date.now())}`;
        const generalAccessLockKey = `${GENERAL_ACCESS_LOCK_PREFIX}:${pageLoadId}`;

        if (sessionStorage.getItem(generalAccessLockKey) === 'true') {
            return;
        }

        sessionStorage.setItem(generalAccessLockKey, 'true');

        registerPageAccess({
            page: 'home',
            accessType: 'general',
            clientId,
            consentStatus: getConsentStatus()
        }).catch((error) => {
            console.error('Erro ao registrar acesso geral da Home:', error);
        });
    }, [clientId]);

    useEffect(() => {
        if (consentStatus === 'accepted') {
            registerUniqueAccess();
        }
    }, [consentStatus, registerUniqueAccess]);

    const acceptConsent = useCallback(async () => {
        localStorage.setItem(CONSENT_STATUS_KEY, 'accepted');
        setConsentStatus('accepted');
        await registerUniqueAccess();
    }, [registerUniqueAccess]);

    const rejectConsent = useCallback(() => {
        localStorage.setItem(CONSENT_STATUS_KEY, 'rejected');
        setConsentStatus('rejected');
    }, []);

    return {
        consentStatus,
        showConsentBanner: consentStatus === 'pending',
        acceptConsent,
        rejectConsent
    };
};