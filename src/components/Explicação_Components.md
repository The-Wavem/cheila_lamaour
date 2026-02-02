# Estrutura e Propósito da Pasta 'components'

A pasta `components` armazena os elementos **reutilizáveis e genéricos** da aplicação. Pense neles como as peças de LEGO (Átomos e Moléculas) que podem ser usadas em qualquer lugar do sistema sem repetir código.

## Categorias Internas

### 1. `components/ui` (Interface Pura)
Componentes de baixo nível focados estritamente em visual e interação básica.
*   **Exemplos:** `Button`, `Input`, `Card`, `Modal`, `Typography`, `Avatar`.
*   **Regra de Ouro:** Eles não devem saber "quem" o usuário é ou fazer chamadas de API diretas. Eles apenas recebem dados via `props` e renderizam.

### 2. `components/layout` (Estrutura)
Componentes que definem a estrutura macro da página ou containers.
*   **Exemplos:** `Navbar`, `Footer`, `Sidebar`, `Container`, `GridWrapper`.

## Diferença Principal: Components vs Sections

*   **Components:** São genéricos. Ex: "Eu sou um Botão Azul". (Pode ser usado na Home, no Login, no Contato).
*   **Sections:** São específicos. Ex: "Eu sou a Seção de Hero da Home que tem um título e um botão de cadastro". (Geralmente usada apenas uma vez ou em contextos muito específicos).

## Boas Práticas

*   **Customização via Props:** Componentes devem ser flexíveis. Não chumbe textos ou cores fixas se o componente for ser usado em lugares diferentes.
*   **Sem Lógica de Negócio:** Se você está escrevendo `if (usuario.isAdmin)` dentro de um botão genérico, provavelmente está errando. Passe essa validação por fora.

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