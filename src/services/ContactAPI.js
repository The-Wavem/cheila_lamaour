import {
  collection,
  query,
  orderBy,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

// ============================================================================
// Contact API Services
// Centraliza a comunicacao com o Firestore para mensagens de contato
// ============================================================================

const CONTACTS_COLLECTION = "messages";
const DATE_FORMATTER = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
});

/**
 * parseTimestamp
 * @description Converte diferentes formatos de data em Date.
 * @param {unknown} value
 * @returns {Date|null}
 */
const parseTimestamp = (value) => {
  if (!value) return null;
  if (typeof value.toDate === "function") return value.toDate();
  if (value instanceof Date) return value;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

/**
 * normalizeMessage
 * Normaliza dados crus do Firestore para o formato usado na UI.
 * @param {import("firebase/firestore").QueryDocumentSnapshot} docSnapshot
 * @returns {Object}
 */
const normalizeMessage = (docSnapshot) => {
  const data = docSnapshot.data() || {};
  const createdAt = parseTimestamp(data.createdAt);

  return {
    id: docSnapshot.id,
    createdAt,
    createdAtLabel: createdAt ? DATE_FORMATTER.format(createdAt) : "Sem data",
    name:
      data.name ?? data.nome ?? data.full_name ?? data.fullName ?? "Sem nome",
    email: data.email ?? data.mail ?? "Sem e-mail",
    interest: data.interest ?? data.subject ?? data.assunto ?? "Sem assunto",
    messageBody:
      data.message ?? data.mensagem ?? data.text ?? data.texto ?? "",
    phone: data.phone ?? data.telefone ?? "",
    status: data.status ?? "new",
    origin: data.origin ?? data.channel ?? "Contato",
    utm_source: data.utm_source ?? data.utmSource ?? "Direto",
    utm_medium: data.utm_medium ?? data.utmMedium ?? "Nenhum",
    utm_campaign: data.utm_campaign ?? data.utmCampaign ?? "Nenhuma",
    raw: data,
  };
};

/**
 * fetchContactMessages
 * Busca todas as mensagens de contato, ordenadas por data.
 * @returns {Promise<Array<Object>>}
 */
export const fetchContactMessages = async () => {
  const contactsRef = collection(db, CONTACTS_COLLECTION);
  const messagesQuery = query(contactsRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(messagesQuery);
  return snapshot.docs.map(normalizeMessage);
};

/**
 * deleteContactMessage
 * Remove uma mensagem pelo id.
 * @param {string} messageId
 * @returns {Promise<{success: boolean}>}
 */
export const deleteContactMessage = async (messageId) => {
  if (!messageId) throw new Error("ID da mensagem é obrigatório para exclusão.");
  const messageDoc = doc(db, CONTACTS_COLLECTION, messageId);
  await deleteDoc(messageDoc);
  return { success: true };
};
