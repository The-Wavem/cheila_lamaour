```
src/
│
├── assets/              # Imagens estáticas, logos, fontes.
│
├── components/          # Componentes "Burros" (UI pura)
│   ├── ui/              # Componentes base customizados do Material UI
│   │   ├── Button.jsx   # Nosso botão padrão (verde/dourado)
│   │   ├── TextField.jsx
│   │   └── Card.jsx
│   │
│   └── layout/          # Estruturas fixas
│       ├── Navbar.jsx
│       └── Footer.jsx
│
├── sections/            # Blocos lógicos das páginas (Onde o Front trabalha)
│   ├── home/            # Ex: Hero.jsx, ServicesGrid.jsx
│   └── about/           # Ex: BioFull.jsx, BooksCarousel.jsx
│
├── pages/               # Montagem final (Roteamento)
│   ├── public/          # Home, Sobre, Contato, Blog
│   └── admin/           # Dashboard, Login, Leads
│
├── services/            # Camada de Dados (Onde o Back trabalha)
│   ├── firebase.js      # Configuração
│   ├── auth.js          # Funções de Login/Logout
│   ├── posts.js         # CRUD de Artigos
│   └── leads.js         # Captação de contatos
│
├── hooks/               # Lógica reutilizável (useAuth, useFetch)
├── contexts/            # Estado Global (AuthContext)
└── theme/               # Customização do Tema do Material UI
```

