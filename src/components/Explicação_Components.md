# Estrutura e Propósito da Pasta 'components'

A pasta `components` armazena os elementos **reutilizáveis e genéricos** da aplicação. Pense neles como as peças de LEGO (Átomos e Moléculas) que podem ser usadas em qualquer lugar do sistema sem repetir código.

## Categorias Internas

### 1. `components/layout` (Estrutura)
Componentes que definem a estrutura macro da página ou containers.
*   **Exemplos:** `Header`, `Footer`, `AdminLayout`.

### 2. `components/ui/guards` (Fluxo de rota)
Componentes que controlam acesso, redirecionamento e estados de espera ligados à navegação.
*   **Exemplos:** `ProtectedRoute`, `PublicOnlyRoute`, `LoadingScreen`.
*   **Regra de Ouro:** tudo aqui existe para proteger fluxo de navegação, não para montar interface de negócio.

### 3. `components/ui/overlays` (Camadas temporárias)
Componentes que aparecem por cima da interface principal para confirmar, avisar ou pedir consentimento.
*   **Exemplos:** `ConfirmDeleteModal`, `UnsavedChangesModal`, `ToastNotification`, `DataConsentBanner`.
*   **Regra de Ouro:** overlays não devem carregar dados da página; apenas recebem estado e callbacks.

### 4. `components/ui/public` (Design system público)
Componentes reutilizáveis da experiência pública do site e da camada visual compartilhada.
*   **Regra de Ouro:** quando um componente for voltado para o site público e reaproveitável entre seções/páginas, ele deve nascer aqui.

#### Subgrupos internos de `public`
*   `public/base`: primitives e blocos realmente compartilhados entre várias páginas públicas. Ex: `PublicButton`, `PublicCard`, `SectionHeader`.
*   `public/home`: componentes visuais específicos do ecossistema da Home. Ex: `BackgroundGlow`, `DecorativeOrb`, `ServiceCard`, `TestimonialHighlight`.
*   `public/blog`: componentes específicos da experiência de blog. Ex: `CardBlog`.
*   `public/forms`: componentes de formulários públicos com estado local de UI. Ex: `ContactForm`.

Essa separação evita que `public` vire um segundo diretório genérico sem fronteira. Primeiro pensamos: é base compartilhada, é da Home, é do Blog, ou é de formulário?

## Diferença Principal: Components vs Sections

*   **Components:** São genéricos. Ex: "Eu sou um Botão Azul". (Pode ser usado na Home, no Login, no Contato).
*   **Sections:** São específicos. Ex: "Eu sou a Seção de Hero da Home que tem um título e um botão de cadastro". (Geralmente usada apenas uma vez ou em contextos muito específicos).

## Boas Práticas

*   **Customização via Props:** Componentes devem ser flexíveis. Não chumbe textos ou cores fixas se o componente for ser usado em lugares diferentes.
*   **Sem Lógica de Negócio:** Se você está escrevendo `if (usuario.isAdmin)` dentro de um botão genérico, provavelmente está errando. Passe essa validação por fora.
*   **Nome por responsabilidade:** Prefira nomes que indiquem função real (`PublicBadge`, `ConfirmDeleteModal`) e não apenas aparência.
*   **Mover antes de duplicar:** Se uma seção começar a repetir muito um bloco visual, extraia para `components/ui/public` ou `components/ui/overlays` antes de copiar JSX.
*   **Section não é Component:** Se algo depende fortemente de uma página específica, ele continua em `sections/`.

## Exemplo (Button.jsx)

```jsx
// Um componente "burro" (dumb component) que só renderiza
export default function Button({ children, onClick, variant = 'primary' }) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}