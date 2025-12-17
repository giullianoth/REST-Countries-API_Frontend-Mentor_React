# Frontend Mentor - REST Countries API with color theme switcher solution

Esta é uma solução para o [desafio da API REST de Países com seletor de tema de cores do Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). Os desafios do Frontend Mentor ajudam você a aprimorar suas habilidades de programação por meio da criação de projetos realistas.

*This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). Frontend Mentor challenges help you improve your coding skills by building realistic projects.*

## Sumário | *Table of contents*

- [Visão Geral | *Overview*](#visão-geral--overview)
  - [O desafio | *The challenge*](#o-desafio--the-challenge)
  - [Capturas de Tela | *Screenshots*](#capturas-de-tela--screenshots)
  - [Links](#links)
- [Instalação | *Installation*](#instalação--installation)
- [Meu processo | *My process*](#meu-processo--my-process)
  - [Tecnologias utilizadas | *Built with*](#tecnologias-utilizadas--built-with)
  - [O que eu aprendi | *What I learned*](#o-que-eu-aprendi--what-i-learned)
  - [Desenvolvimento contínuo | *Continued development*](#desenvolvimento-contínuo--continued-development)
- [Autor | *Author*](#autor--author)

## Visão Geral | *Overview*

### O desafio | *The challenge*

Os usuários devem ser capazes de:

- Visualizar todos os países da API na página inicial
- Pesquisar por um país usando um campo `input`
- Filtrar países por região
- Clicar em um país para ver informações detalhadas
- Clicar na página de detalhes para acessar a lista de países fronteiriços
- Alternar o esquema de cores entre modo claro e escuro

*Users should be able to:*

- *See all countries from the API on the homepage*
- *Search for a country using an `input` field*
- *Filter countries by region*
- *Click on a country to see more detailed information on a separate page*
- *Click through to the border countries on the detail page*
- *Toggle the color scheme between light and dark mode*

### Capturas de Tela | *Screenshots*

![Captura de tela em desktop | Screenshot in desktop](/public/screenshots/screenshot_desktop.png)

Captura de tela em desktop | *Screenshot in desktop*

---

![Captura de tela em tablet | Screenshot in tablet](/public/screenshots/screenshot_tablet.png)

Captura de tela em tablet | *Screenshot in tablet*

---

![Captura de tela em dispositivo móvel | Screenshot in mobile](/public/screenshots/screenshot_mobile.png)

Captura de tela em dispositivo móvel | *Screenshot in mobile*

---

### Links

- URL da solução | *Solution URL*: [https://github.com/giullianoth/REST-Countries-API_Frontend-Mentor_React](https://github.com/giullianoth/REST-Countries-API_Frontend-Mentor_React)
- URL do site ativo | *Live Site URL*: [https://rest-countries-api-mu-azure.vercel.app/](https://rest-countries-api-mu-azure.vercel.app/)

## Instalação | *Installation*

Para rodar este projeto localmente, siga os passos abaixo:

*To run this project locally, follow the steps below:*

1. **Clone o repositório | _Clone the repository_:**

```bash
git clone https://github.com/giullianoth/REST-Countries-API_Frontend-Mentor_React
```

2. **Entre na pasta do projeto | _Navigate to the project folder_:**

```bash
cd [seu-repositorio | your-repository]
```

**3. Instale as dependências | _Install dependencies_:**

```bash
npm install
# ou | or
yarn install
```

**4. Inicie o servidor de desenvolvimento | _Start the development server_:**

```bash
npm run dev
# ou | or
yarn dev
```

A aplicação estará disponível em `http://localhost:5173` (se estiver usando Vite).

*The application will be available at `http://localhost:5173` (if using Vite).*

## Meu processo | *My process*

### Tecnologias utilizadas | *Built with*

- **[React (v18+)](https://react.dev/)** - Componentes Funcionais e Hooks | *Functional Components & Hooks*
- **[TypeScript](https://www.typescriptlang.org/)** - Para tipagem estática e segurança de código | *For static typing and code safety*
- **[React Icons](https://react-icons.github.io/react-icons/)** - Iconografia flexível | *Flexible iconography*
- **CSS Modules** - Estilização Encapsulada | *Encapsulated styling*
- **Fetch API** - Busca assíncrona de dados | *Asynchronous data fetching*
- **Mobile-first workflow** - Design responsivo | *Responsive design*

### O que eu aprendi | *What I learned*

Neste projeto, foquei em criar uma interface de usuário verdadeiramente personalizada e performática. Um dos maiores desafios foi a customização do elemento `select` e a otimização das chamadas de API.

*In this project, I focused on creating a truly custom and performant user interface. One of the biggest challenges was customizing the `select` element and optimizing API calls.*

1. **Componentes de UI Customizados | _Custom UI Components_:**

    Contornei as limitações nativas dos navegadores (especialmente no Firefox) criando um componente Select totalmente customizado com estados do React.

    *I bypassed native browser limitations (especially in Firefox) by creating a fully custom Select component with React state.*

2. **Otimização de Performance | _Performance Optimization_:**

    Implementei `useMemo` e `useCallback` para garantir que funções e valores sejam recalculados apenas quando necessário, prevenindo renderizações desnecessárias.

    *I implemented `useMemo` and `useCallback` to ensure that functions and values are only recalculated when necessary, preventing unnecessary re-renders.*

```typescript
// Memorizando a opção selecionada para performance
// Memoizing the selected option for performance
const selectedOption = useMemo(
  () => options.find(opt => opt.value === value) || { label: placeholder, value: "" },
  [options, value, placeholder]
)
```

### Desenvolvimento contínuo | *Continued development*

Quero continuar focando em **Acessibilidade (A11y)**, garantindo que componentes customizados sejam totalmente navegáveis via teclado. Também pretendo implementar **Testes Unitários** nos próximos passos.

*I want to continue focusing on **Accessibility (A11y)**, ensuring that custom components are fully navigable via keyboard. I also plan to implement **Unit Testing** in the next steps.*

## Autor | *Author*

Feito com :heart: por este cara sonhador:

*Made with :heart: by this dreamy guy:*

| <img src="https://avatars.githubusercontent.com/u/106249494?v=4" width="100px" style="border-radius: 50%"> **Giulliano Guimarães** |
| --- |
|[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com/giullianoth) [![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=flat&logo=instagram&logoColor=white)](https://www.instagram.com/giullianoth/) [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/giullianoth/) [![GMail](https://img.shields.io/badge/Gmail-D14836?style=flat&logo=gmail&logoColor=white)](mailto:llthguimaraes@gmail.com) |
