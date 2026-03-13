import { doc, getDoc, setDoc, collection, addDoc, serverTimestamp, query, getDocs, orderBy } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { filterTimestampedRecords } from './analyticsDateRange';

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
 * Salva uma nova mensagem de contato enviada pelo formulário
 */
export const saveContactMessage = async (messageData) => {
    try {

        const utms = {
            utm_source: sessionStorage.getItem('utm_source') || 'Direto',
            utm_medium: sessionStorage.getItem('utm_medium') || 'Nenhum',
            utm_campaign: sessionStorage.getItem('utm_campaign') || 'Nenhuma'
        };


        // Criamos uma referência para uma nova coleção chamada "messages"
        const messagesRef = collection(db, "messages");
        
        // Adicionamos o documento com um timestamp para saber quando foi enviado
        await addDoc(messagesRef, {
            ...messageData,
            ...utms,
            createdAt: serverTimestamp(), // Adiciona data/hora do servidor
            status: "new" // Útil para você filtrar mensagens lidas/não lidas depois
        });

        return { success: true };
    } catch (error) {
        console.error("Erro ao salvar mensagem de contato:", error);
        throw error;
    }
};

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
        cta_link: "/contato",
        secondary_cta_text: "Minha história",
        secondary_cta_link: "#sobre"
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
            testimonials: {
                testimonials: testimonialsDoc ? (testimonialsDoc.testimonials || []) : []
            },
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

        if (data.hero !== undefined) tasks.push(updateDocumentData("home_hero", data.hero));
        if (data.about !== undefined) tasks.push(updateDocumentData("home_about", data.about));
        if (data.services !== undefined) tasks.push(updateDocumentData("home_services", data.services));
        if (data.testimonials !== undefined) {
            const testimonialsPayload = Array.isArray(data.testimonials)
                ? data.testimonials
                : (data.testimonials?.testimonials || []);
            tasks.push(updateDocumentData("home_testimonials", { testimonials: testimonialsPayload }));
        }
        if (data.contact !== undefined) tasks.push(updateDocumentData("home_contact", data.contact));

        await Promise.all(tasks);
        return { success: true };
    } catch (error) {
        console.error("Erro ao atualizar dados da Home:", error);
        throw error;
    }

    
};
/**
 * Busca todos os leads para processar estatísticas no Dashboard
 */
export const getLeadsStats = async (options = {}) => {
    try {
        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const leads = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return filterTimestampedRecords(leads, options);
    } catch (error) {
        console.error("Erro ao buscar estatísticas:", error);
        throw error;
    }
};