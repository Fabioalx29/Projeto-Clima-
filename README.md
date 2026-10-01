# ⛅ Weatherly

> Dashboard moderno e responsivo de previsão do tempo desenvolvido com React, TypeScript e Vite.

🌐 **Acesse o projeto:**  
https://fabioalx29.github.io/Projeto-Clima-/

---

## 📌 Sobre o projeto

O **Weatherly** é uma aplicação web de previsão do tempo desenvolvida para praticar e demonstrar conceitos modernos de desenvolvimento Front-end.

A aplicação permite pesquisar cidades, consultar as condições climáticas atuais e acompanhar previsões por hora e para os próximos dias, utilizando dados reais obtidos através da **Open-Meteo API**.

O projeto também conta com interface responsiva, tema claro e escuro, geolocalização e armazenamento de pesquisas recentes no navegador.

---

## ✨ Funcionalidades

- 🔎 Pesquisa de cidades
- 📍 Detecção da localização através do navegador
- 🌡️ Temperatura atual
- 🤒 Sensação térmica
- ☀️ Condição climática atual
- 📈 Temperaturas mínima e máxima
- 💧 Umidade do ar
- 💨 Velocidade e direção do vento
- 👁️ Visibilidade
- 🌡️ Pressão atmosférica
- ☀️ Índice UV
- 🕐 Previsão do tempo por hora
- 📅 Previsão para 7 dias
- 📊 Gráfico de temperatura utilizando Recharts
- 🔍 Pesquisas recentes armazenadas no `localStorage`
- 🌙 Tema claro e escuro
- 📱 Interface responsiva para desktop, tablet e celular
- ⚠️ Tratamento de erros e estados de carregamento
- 🌐 Funcionamento sem necessidade de chave de API

---

## 🖥️ Preview

### Desktop

A aplicação apresenta um dashboard focado na visualização rápida das principais informações meteorológicas.

### Mobile

A interface foi desenvolvida para se adaptar a telas menores, mantendo a navegação e as informações principais acessíveis.

---

## 🛠️ Tecnologias utilizadas

### Front-end

- ⚛️ **React 18**
- 📘 **TypeScript**
- ⚡ **Vite**
- 🎨 **Tailwind CSS**
- 📊 **Recharts**

### APIs e recursos

- 🌤️ **Open-Meteo** — dados meteorológicos e geocodificação
- 📍 **BigDataCloud** — geocodificação reversa
- 🌐 **Fetch API** — comunicação com APIs
- 💾 **localStorage** — armazenamento de pesquisas e preferências

---

## 📂 Estrutura do projeto

```text
Projeto-Clima-
│
├── public/
│
├── src/
│   ├── components/
│   │   └── Componentes reutilizáveis
│   │
│   ├── hooks/
│   │   ├── useWeather
│   │   ├── useRecentSearches
│   │   └── useTheme
│   │
│   ├── services/
│   │   └── weatherApi.ts
│   │
│   ├── types/
│   │   └── Tipagens da aplicação
│   │
│   ├── utils/
│   │   └── Funções auxiliares
│   │
│   └── App.tsx
│
├── .env.example
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.js
└── README.md
```

---

## 🚀 Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/Fabioalx29/Projeto-Clima-.git
```

### 2. Entre na pasta

```bash
cd Projeto-Clima-
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Execute o projeto

```bash
npm run dev
```

O Vite disponibilizará o projeto em uma URL semelhante a:

```text
http://localhost:5173
```

---

## 📦 Build para produção

Para gerar a versão otimizada do projeto:

```bash
npm run build
```

Para visualizar a versão de produção localmente:

```bash
npm run preview
```

---

## 🌐 Deploy

O projeto está publicado utilizando **GitHub Pages**.

A aplicação utiliza o caminho base configurado no Vite para funcionar corretamente dentro do repositório:

```js
base: '/Projeto-Clima-/'
```

### 🔗 Aplicação online

https://fabioalx29.github.io/Projeto-Clima-/

---

## 📚 O que foi praticado

Durante o desenvolvimento deste projeto foram trabalhados conceitos importantes de desenvolvimento Front-end, como:

- Componentização com React
- Hooks personalizados
- TypeScript
- Consumo de APIs
- Requisições assíncronas
- Manipulação de estados
- Geolocalização
- Persistência de dados com `localStorage`
- Gráficos com Recharts
- Design responsivo
- Tema claro e escuro
- Tratamento de erros
- Estados de loading
- Organização de projetos React
- Build de produção com Vite
- Deploy utilizando GitHub Pages

---

## 🎯 Objetivo

Este projeto faz parte do meu processo de evolução como **desenvolvedor Front-end**, com foco em React, TypeScript, consumo de APIs e criação de interfaces modernas e responsivas.

---

## 👨‍💻 Desenvolvedor

**Fábio Alexsander**

Desenvolvedor Front-end

🔗 GitHub:  
https://github.com/Fabioalx29

---

## 📄 Licença

Este projeto está sob a licença **MIT**.
