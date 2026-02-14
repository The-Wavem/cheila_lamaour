import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

// ============================================================================
// Home Page API Services
// Centraliza a comunicação entre o Firestore e os componentes da Home
// ============================================================================

/**
 * Função Auxiliar Genérica para buscar dados
 * Evita repetição de código (DRY - Don't Repeat Yourself)
 */
const getDocumentData = async (docId) => {
    try {
        const docRef = doc(db, "site_content", docId);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
        console.error(`Erro ao buscar ${docId}:`, error);
        throw error;
    }
};

/**
 * Função Auxiliar Genérica para salvar dados
 */
const updateDocumentData = async (docId, data) => {
    try {
        const docRef = doc(db, "site_content", docId);
        await setDoc(docRef, data, { merge: true });
        return { success: true };
    } catch (error) {
        console.error(`Erro ao atualizar ${docId}:`, error);
        throw error;
    }
};

// --- SEÇÃO 1: HERO (Topo) ---
// Referência: Hero.jsx
export const getHeroData = () => getDocumentData("home_hero");
export const updateHeroData = (heroData) => updateDocumentData("home_hero", heroData);

// --- SEÇÃO 2: SOBRE (Quem é Cheila?) ---
// Referência: Hero2.jsx
export const getAboutData = () => getDocumentData("home_about");
export const updateAboutData = (aboutData) => updateDocumentData("home_about", aboutData);

// --- SEÇÃO 3: SERVIÇOS ---
// Referência: Servicos.jsx
export const getServicesData = () => getDocumentData("home_services");
export const updateServicesData = (servicesData) => updateDocumentData("home_services", servicesData);

// --- SEÇÃO 4: DEPOIMENTOS (Lista/Array) ---
// O Editor enviará um array: [{client_name: "", text: ""}, ...]
export const getTestimonialsData = () => getDocumentData("home_testimonials");
export const updateTestimonials = (testimonialsArray) => 
    updateDocumentData("home_testimonials", { testimonials: testimonialsArray });

// --- SEÇÃO 5: CONTATO / RODAPÉ ---
export const getContactData = () => getDocumentData("home_contact");
export const updateContactData = (contactData) => updateDocumentData("home_contact", contactData);

/**
 * Função de Inicialização (Seed)
 * Use apenas uma vez para criar a estrutura inicial se o banco estiver vazio
 */
export const initializeHeroData = async () => {
    return updateHeroData({
        headline: "Cheila Lamour",
        subheadline: "Mentorias - Escritora - Treinamentos",
        experienceText: "+25 anos de experiência",
        cta_text: "Entre em contato",
        cta_link: "/contato"
    });
};

export const updateTestimonialsData = (testimonialsArray) =>
    updateDocumentData("home_testimonials", { testimonials: testimonialsArray });

/**
 * Agregadores: funções para buscar/atualizar todos os dados da Home de uma vez
 */
export const getHomeFullData = async () => {
    try {
        const [hero, about, services, testimonialsDoc, contact] = await Promise.all([
            getDocumentData("home_hero"),
            getDocumentData("home_about"),
            getDocumentData("home_services"),
            getDocumentData("home_testimonials"),
            getDocumentData("home_contact"),
        ]);

        return {
            hero: hero || null,
            about: about || null,
            services: services || null,
            testimonials: testimonialsDoc ? (testimonialsDoc.testimonials || []) : [],
            contact: contact || null,
        };
    } catch (error) {
        console.error("Erro ao buscar dados completos da Home:", error);
        throw error;
    }
};

export const updateHomeData = async (data = {}) => {
    try {
        const tasks = [];

        if (data.hero) tasks.push(updateDocumentData("home_hero", data.hero));
        if (data.about) tasks.push(updateDocumentData("home_about", data.about));
        if (data.services) tasks.push(updateDocumentData("home_services", data.services));
        if (data.testimonials) tasks.push(updateDocumentData("home_testimonials", { testimonials: data.testimonials }));
        if (data.contact) tasks.push(updateDocumentData("home_contact", data.contact));

        await Promise.all(tasks);
        return { success: true };
    } catch (error) {
        console.error("Erro ao atualizar dados da Home:", error);
        throw error;
    }
};