# Estrutura e Propósito da Pasta 'sections'

Esta pasta serve para organizar as grandes seções que compõem as páginas do sistema.

## Como funciona a organização:
Aqui montamos a estrutura de cada sessão específica de uma página. A organização de pastas aqui espelha a organização das páginas.

### Exemplo Prático (Home Page):
Se estivermos desenvolvendo a Página Inicial (Home), criaremos uma pasta chamada `home` aqui dentro. Os arquivos seriam:
1. `Hero.jsx`: Contém o banner principal, título e chamada para ação.
2. `Features.jsx`: Contém a lista de funcionalidades.
3. `AboutSection.jsx`: Um resumo sobre a empresa na home.

### Fluxo de Desenvolvimento:
1. Criamos os componentes visuais.
2. Montamos a seção aqui na pasta `src/sections/{nomedapagina}/`.
3. Importamos essa seção no arquivo principal da página em `src/pages/`.