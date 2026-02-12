import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

// ========================== Home Page API Services ==========================

// ===Sessão Hero===

// exemplo base para usar para leitura do banco
export const getHeroData = async () => {
    try {
        const docRef = doc(db, "site_content", "home_hero");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error getting hero data:", error);
        throw error;
    }
};

//  Exemplo base para usar para escrita no banco
export const initializeHeroData = async () => {
    try {
        await setDoc(doc(db, "site_content", "home_hero"), {
            experienceText: "+25 anos de experiência"
        }, { merge: true });
        console.log("Documento criado/atualizado com sucesso!");
    } catch (error) {
        console.error("Erro ao criar documento:", error);
    }
};

// ========================== Fim Home Page API Services ==========================

// Outros serviços relacionados à Home Page podem ser adicionados aqui