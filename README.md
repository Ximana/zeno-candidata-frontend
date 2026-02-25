# Zeno candidta app - Frontend

Interface web do app, desenvolvida com **Next.js** e **Tailwind CSS**. Consome a [Zeno candidata - API](https://github.com/Ximana/zeno-candidata-api.git) para gerir candidatos, vagas e candidaturas.

## Tecnologias

| Tecnologia | Função |
|------------|--------|
| Next.js 14 | Framework React com App Router |
| Tailwind CSS | Estilização |
| Lucide React | Ícones |
| React Toastify | Notificações |

---

## Pré-requisitos
- Node.js
- A **API Zeno candidata API** a correr em `http://localhost:3001`

---

## Instalação

**1. Instalar dependências**
```bash
npm install
```

**2. Configurar a variável de ambiente**

Cria um ficheiro `.env.local` na raiz do projecto:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

> Este é o endereço da API Express. Altera o valor se a API estiver noutro host ou porta.

**3. Iniciar o servidor de desenvolvimento**
```bash
npm run dev
```

Aplicação disponível em: **http://localhost:3000**

---

## Estrutura do projecto

```
my-app/
├── src/
│   ├── app/                        # Páginas (Next.js App Router)
│   │   ├── page.jsx                # Dashboard
│   │   ├── candidatos/page.jsx     # Gestão de candidatos
│   │   ├── vagas/page.jsx          # Gestão de vagas
│   │   ├── candidaturas/page.jsx   # Gestão de candidaturas
│   │   ├── layout.jsx              # Layout global
│   │   └── globals.css             # Estilos globais
│   │
│   ├── componentes/
│   │   ├── layout/                 # Sidebar, Header
│   │   ├── ui/                     # Componentes reutilizáveis (Button, Input, Modal, etc.)
│   │   ├── candidatos/             # CardCandidato, ListaCandidatos, Modais
│   │   ├── vagas/                  # ModalFormularioVaga
│   │   └── candidaturas/           # ModalFormularioCandidatura
│   │
│   ├── hooks/
│   │   ├── useCandidatos.js        # Estado e operações de candidatos
│   │   ├── useVagas.js             # Estado e operações de vagas
│   │   └── useCandidaturas.js      # Estado e operações de candidaturas
│   │
│   ├── servicos/
│   │   ├── api.js                  # Funções base de fetch (pedido, pedidoFormData)
│   │   ├── candidatoServico.js     # Chamadas à API de candidatos
│   │   ├── vagaServico.js          # Chamadas à API de vagas
│   │   └── candidaturaServico.js   # Chamadas à API de candidaturas
│   │
│   └── utils/
│       ├── constantes.js           # Províncias, géneros, graus académicos, etc.
│       ├── helpers.js              # formatarData
│       └── toast.js                # Helpers para notificações
│
├── .env.exemplo                      # Variáveis de ambiente de exemplo
├── next.config.js
├── tailwind.config.js
└── package.json
```
---