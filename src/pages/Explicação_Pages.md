# Estrutura e Propósito da Pasta 'pages'

A pasta `pages` representa as rotas acessíveis da aplicação. Cada arquivo aqui corresponde diretamente a uma URL que o usuário acessa (ex: `/home`, `/contact`, `/admin/dashboard`).

## Responsabilidades Principais

1. **Montagem de Layout:** É responsável por empilhar as **Sections** e componentes de layout (como Navbar e Footer).
2. **Definição de SEO:** (Opcional) Onde definiremos títulos da página (`document.title`) ou meta tags.
3. **Busca de Dados Globais:** Se a página precisa de dados que impactam várias seções, a chamada à API pode acontecer aqui e os dados passados via props.

## O Que NÃO Fazer Aqui

* **Não criar estilos específicos:** Evite criar CSS/Styled Components complexos aqui. O visual deve vir de `sections` ou `components/ui`.
* **Não criar lógica de negócio complexa:** A lógica pesada deve estar em hooks personalizados ou dentro das Sections específicas.

## Exemplo de Estrutura de Arquivo (Home.jsx)

Uma página típica deve parecer com isso:

```jsx
import React from 'react';
import Navbar from '@components/layout/Navbar';
import Hero from '@sections/home/Hero';
import Features from '@sections/home/Features';
import Footer from '@components/layout/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero >
        <Features />
      </main>
      <Footer />
    </>
  );
}