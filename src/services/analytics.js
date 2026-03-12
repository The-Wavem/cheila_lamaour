import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import {
  buildTimelineFromRange,
  filterTimestampedRecords,
  resolveFilterRange,
} from "./analyticsDateRange";

const PAGE_ACCESS_COLLECTION = "page_access_logs";

const getStoredUtms = () => ({
  utm_source: sessionStorage.getItem("utm_source") || "Direto",
  utm_medium: sessionStorage.getItem("utm_medium") || "Nenhum",
  utm_campaign: sessionStorage.getItem("utm_campaign") || "Nenhuma",
});

export const registerPageAccess = async ({
  page,
  accessType,
  clientId,
  consentStatus = "pending",
}) => {
  try {
    await addDoc(collection(db, PAGE_ACCESS_COLLECTION), {
      page,
      accessType,
      clientId,
      consentStatus,
      ...getStoredUtms(),
      createdAt: serverTimestamp(),
    });

    return { success: true };
  } catch (error) {
    console.error("Erro ao registrar acesso da página:", error);
    throw error;
  }
};

export const getHomeAccessStats = async (options = {}) => {
  try {
    const q = query(
      collection(db, PAGE_ACCESS_COLLECTION),
      orderBy("createdAt", "desc"),
    );
    const querySnapshot = await getDocs(q);
    const allHomeAccesses = querySnapshot.docs
      .map((document) => ({ id: document.id, ...document.data() }))
      .filter((item) => item.page === "home");
    const range = resolveFilterRange(options);
    const homeAccesses = filterTimestampedRecords(allHomeAccesses, options);

    const totalGeneralAccesses = homeAccesses.filter(
      (item) => item.accessType === "general",
    ).length;
    const uniqueAcceptedClients = new Set(
      homeAccesses
        .filter((item) => item.accessType === "unique" && item.clientId)
        .map((item) => item.clientId),
    );

    const originCounts = homeAccesses.reduce((accumulator, item) => {
      if (item.accessType !== "general") {
        return accumulator;
      }

      const source = item.utm_source || "Direto";
      accumulator[source] = (accumulator[source] || 0) + 1;
      return accumulator;
    }, {});

    const originData = Object.entries(originCounts).map(([name, value]) => ({
      name,
      value,
    }));
    const timelineDays = buildTimelineFromRange(range);

    homeAccesses.forEach((item) => {
      if (!item.createdAt?.toDate) {
        return;
      }

      const createdAt = item.createdAt.toDate();
      const key = new Date(
        createdAt.getFullYear(),
        createdAt.getMonth(),
        createdAt.getDate(),
      )
        .toISOString()
        .slice(0, 10);
      const bucket = timelineDays.find((day) => day.key === key);

      if (!bucket) {
        return;
      }

      if (item.accessType === "general") {
        bucket.general += 1;
      }

      if (item.accessType === "unique") {
        bucket.unique += 1;
      }
    });

    return {
      totalGeneralAccesses,
      totalUniqueAccesses: uniqueAcceptedClients.size,
      consentAcceptanceRate: totalGeneralAccesses
        ? Math.round((uniqueAcceptedClients.size / totalGeneralAccesses) * 100)
        : 0,
      comparisonData: [
        { name: "Acessos gerais", total: totalGeneralAccesses },
        { name: "Acessos únicos", total: uniqueAcceptedClients.size },
      ],
      timelineData: timelineDays.map(({ key, ...rest }) => rest),
      originData,
    };
  } catch (error) {
    console.error("Erro ao buscar estatísticas de acesso da Home:", error);
    throw error;
  }
};
