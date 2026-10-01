# ⛅ Weatherly

Dashboard de previsão do tempo moderno e responsivo. Pesquise qualquer cidade (ou use sua localização) e veja o clima atual, previsão por hora, gráfico de temperatura e previsão de 7 dias, com dados reais.

## Screenshots

> Adicione suas capturas em `docs/` e ajuste os caminhos abaixo.

| Desktop | Mobile |
| --- | --- |
| ![Desktop](docs/desktop.png) | ![Mobile](docs/mobile.png) |

## Funcionalidades

- Busca por cidade (botão ou tecla Enter) e geolocalização do navegador
- Clima atual: temperatura, sensação térmica, condição, mínima e máxima
- Detalhes: umidade, vento (velocidade e direção), visibilidade, pressão e índice UV
- Previsão por hora (scroll horizontal no celular) e para 7 dias
- Gráfico de temperatura do dia com Recharts e tooltip
- Pesquisas recentes salvas em `localStorage`
- Tema claro/escuro persistido
- Estados tratados: inicial, loading (skeleton), resultado, cidade não encontrada, falha da API, falha de geolocalização e sem conexão

## Tecnologias

React 18 · TypeScript · Vite · Tailwind CSS · Recharts · Fetch API · [Open-Meteo](https://open-meteo.com) (previsão e geocodificação) · BigDataCloud (geocodificação reversa gratuita)

## Como executar

Pré-requisito: Node.js 18+.

```bash
git clone <seu-repositorio>
cd weatherly
npm install
npm run dev
```

Abra http://localhost:5173. Para produção: `npm run build` e `npm run preview`.

## Configuração da API

A Open-Meteo **não exige chave de API** para uso não comercial, então o projeto funciona sem configurar nada.

Se quiser trocar endpoints ou usar uma chave (plano comercial), copie `.env.example` para `.env` na raiz do projeto (mesma pasta do `package.json`) e preencha:

```env
VITE_OPEN_METEO_API_KEY=sua_chave_aqui
```

O `.env` já está no `.gitignore`. Variáveis `VITE_*` ficam visíveis no bundle do navegador.

## Estrutura

```
src/
├── components/   UI reutilizável
├── hooks/        useWeather, useRecentSearches, useTheme
├── services/     weatherApi.ts (único ponto de acesso à API)
├── types/        tipos da API e do domínio
├── utils/        formatação e códigos do tempo
└── App.tsx
```

## Licença

MIT
