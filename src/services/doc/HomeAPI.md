* * * * *

📄 Estrutura de Dados: Integração Home & Firebase
=================================================

**Para:** Backend / Desenvolvimento

**Contexto:** O painel administrativo (`HomeEditor.jsx`) permite que a cliente edite textos e seções da Home. Atualmente, os dados estão "chumbados" (hardcoded) no front. Precisamos tornar esses campos dinâmicos via Firebase.

* * * * *

🗄️ Estrutura do Banco de Dados (Firestore)
-------------------------------------------

Vamos utilizar a coleção existente **`site_content`**.

Para facilitar a leitura e evitar muitas requisições separadas, sugiro agrupar os dados da Home em um documento principal ou separar por seções lógicas.

**Sugestão de Estrutura (Banco do Firebase):**

*Coleção:* `site_content`

*Documento ID:* `home_data` (ou separado em `home_hero`, `home_about`, etc. conforme preferência).

Abaixo está o mapeamento dos campos que existem no **Código** e onde eles entram no **Site**.

### 1\. Seção Hero (Topo)

Referência no código: `src/sections/home/Hero.jsx`.

| **Campo no Editor** | **Variável Sugerida (DB)** | **Onde entra no Front (Hero.jsx)** |
| --- | --- | --- |
| Título Principal | `hero_headline` | Onde hoje está fixo "Cheila Lamour" (ou acima dele) |
| Subtítulo | `hero_subheadline` | Onde hoje está "Mentorias - Escritora - Treinamentos" |
| Texto do Botão | `hero_btn_text` | Botão "Entre em contato" |
| Link do Botão | `hero_btn_link` | Link do botão (ex: `/contato`) |
| Experiência* | `experience_text` | *Já implementado como exemplo (`+25 anos...`)* |

**Objeto JSON esperado no firebase:**


```
    "headline": "Liderança Feminina e Gestão Humanizada",
    "subheadline": "Mentora, Palestrante, Especialista...",
    "cta_text": "Entre em contato",
    "cta_link": "/contato",
    "experience_badge": "+25 anos de experiência"
```

* * * * *

### 2\. Seção Sobre (Quem é Cheila?)

Referência no código: `src/sections/home/Hero2.jsx`.

| **Campo no Editor** | **Variável Sugerida (DB)** | **Onde entra no Front (Hero2.jsx)** |
| --- | --- | --- |
| Título da Seção | `about_title` | Novo campo (atualmente não visível, mas pode ser inserido) |
| Frase de Destaque | `about_quote` | "É um prazer poder apresentar meu trabalho a você!" |
| Texto da Bio | `about_description` | O texto longo: "Sou Cheila Lamour, Mentora..." |

**Objeto JSON esperado no firebase:**

```
    "title": "Minha História",
    "quote": "É um prazer poder apresentar meu trabalho a você!",
    "description": "Sou Cheila Lamour, Mentora, Palestrante..."
```

* * * * *

### 3\. Seção Serviços

Referência no código: `src/sections/home/Servicos.jsx`.

| **Campo no Editor** | **Variável Sugerida (DB)** | **Onde entra no Front (Servicos.jsx)** |
| --- | --- | --- |
| Título da Seção | `services_title` | Onde está "Serviços Prestados" |
| Subtítulo Impacto | `services_subtitle` | Onde está "Soluções completas de mentoria" |

**Objeto JSON esperado no firebase:**

```
    "title": "Serviços Prestados",
    "subtitle": "Você é o seu maior investimento"
```

* * * * *

### 4\. Seção Depoimentos

Referência no código: `src/sections/home/Servicos.jsx` (Final da página).

*Nota:* No código atual, existe apenas 1 depoimento fixo. O Editor permite uma lista (Array). Precisaremos fazer um `.map` no front.

**Objeto JSON esperado no firebase (Array):**

JSON

```
{
  "testimonials": [
    {
      "id": 1,
      "client_name": "Maria Silva",
      "text": "A mentoria com a Cheila foi um divisor..."
    },
    {
      "id": 2,
      "client_name": "João Souza",
      "text": "Excelente profissional..."
    }
  ]
}

```

* * * * *

### 5\. Seção Rodapé / Contato

Referência no código: `src/sections/home/Servicos.jsx` (Box final).

| **Campo no Editor** | **Variável Sugerida (DB)** | **Onde entra no Front** |
| --- | --- | --- |
| Título Final | `contact_title` | Onde está "Entre em contato" |
| Telefone | `contact_phone` | Para exibir ou usar no link do WhatsApp |
| E-mail | `contact_email` | Para exibir na tela |

**Objeto JSON esperado:**

```
    "title": "Entre em contato",
    "phone": "(41) 9 9999-9999",
    "email": "contato@cheilalamour.com.br"
```

* * * * *

🛠️ O que precisa ser feito no `homeAPI.js`?
--------------------------------------------

Precisamos de funções para **LER** (GET) esses dados na Home pública e **SALVAR** (SET/UPDATE) esses dados no Admin.

**Sugestão de Funções:**

1.  **`getHomeFullData()`**:

    -   Busca todos os dados acima para preencher a Home Page de uma vez.

    -   *Uso:* `Home.jsx` (pode carregar no `useEffect` do pai e passar via props para os filhos `Hero`, `Hero2`, etc).

2.  **`updateHomeData(dataObject)`**:

    -   Recebe o objeto JSON completo vindo do formulário do `HomeEditor.jsx` e atualiza o documento no Firebase.

    -   *Uso:* `HomeEditor.jsx` (função `handleSave`).

* * * * *

### Exemplo de código para o `homeAPI.js`:

JavaScript

```
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const DOC_ID = "home_data"; // ID único para os dados da home

// LEITURA (Usado na Home Pública e para preencher o Editor)
export const getHomeData = async () => {
    try {
        const docRef = doc(db, "site_content", DOC_ID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.log("Documento não encontrado, retornando padrão.");
            return null; // Ou retornar um objeto padrão
        }
    } catch (error) {
        console.error("Erro ao buscar dados da Home:", error);
        throw error;
    }
};

```