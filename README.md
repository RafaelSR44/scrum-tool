# 🚀 Scrum Tool - Ferramenta de Gestão Ágil

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.15-38B2AC.svg)](https://tailwindcss.com/)
[![Lucide React](https://img.shields.io/badge/Lucide%20React-0.525.0-orange.svg)](https://lucide.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Arquitetura](#-arquitetura)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Instalação e Configuração](#-instalação-e-configuração)
- [Uso da Aplicação](#-uso-da-aplicação)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Componentes Principais](#-componentes-principais)
- [API e Integração](#-api-e-integração)
- [Deployment](#-deployment)
- [Contribuição](#-contribuição)
- [Roadmap](#-roadmap)
- [Suporte](#-suporte)

## 🎯 Visão Geral

O **Scrum Tool** é uma aplicação web moderna e intuitiva desenvolvida para facilitar a gestão de projetos ágeis utilizando a metodologia Scrum. A ferramenta foi projetada especificamente para otimizar as cerimônias de Daily Scrum, fechamentos de dia e gestão de tarefas através de um sistema Kanban inteligente.

### 🎨 Interface e Experiência do Usuário

- **Design Responsivo**: Interface adaptável para desktop, tablet e mobile
- **UI/UX Moderno**: Utiliza Tailwind CSS para uma experiência visual consistente
- **Interatividade Avançada**: Drag & Drop nativo para gestão de tarefas
- **Feedback Visual**: Indicadores visuais claros para status e ações

## ✨ Funcionalidades

### 👥 Gestão de Equipe

- **Cadastro de Membros**: Adicionar/remover membros da equipe com roles específicos
- **Perfis Personalizados**: Cada membro possui nome e função definidos
- **Validação de Dados**: Sistema robusto de validação de entrada

### 📅 Daily Scrum

- **Três Pilares do Scrum**:
  - ✅ O que foi feito ontem?
  - 🎯 O que será feito hoje?
  - 🚫 Quais são os impedimentos?
- **Entrada Individual**: Cada membro preenche suas próprias informações
- **Validação de Conteúdo**: Sistema inteligente que valida a qualidade das entradas
- **Persistência de Dados**: Dados mantidos durante a sessão

### 🔄 Fechamento do Dia

- **Retrospectiva Diária**:
  - ✅ O que foi conseguido hoje?
  - 🚫 Houve impedimentos?
  - ➡️ O que será feito amanhã?
- **Análise de Produtividade**: Comparação entre planejado vs. executado
- **Detecção de Bloqueadores**: Identificação automática de impedimentos

### 📋 Sistema Kanban Inteligente

- **Três Colunas Clássicas**:
  - 🔴 **Para Fazer**: Tarefas planejadas
  - 🟡 **Fazendo**: Tarefas em progresso
  - 🟢 **Feito**: Tarefas concluídas
- **Drag & Drop**: Movimentação intuitiva de cards entre colunas
- **Geração Automática**: Criação de cards baseada nas entradas das dailies
- **Metadados Ricos**: Cada card contém assignee, timestamp e ID único

### 📄 Relatórios e Documentação

- **Geração de PDF**: Exportação de dailies e fechamentos em formato PDF
- **Layout Profissional**: Templates otimizados para impressão
- **Histórico Completo**: Registro de todas as atividades e decisões

### 🔧 Funcionalidades Auxiliares

- **Limpeza de Dados**: Botões para reset de informações
- **Estado de Processamento**: Indicadores visuais durante operações
- **Validação Inteligente**: Sistema que verifica qualidade do conteúdo
- **Feedback Contextual**: Alertas e confirmações para ações importantes

## 🏗️ Arquitetura

### Padrões Arquiteturais

```
┌─────────────────────────────────────────────────────────────┐
│                    APRESENTAÇÃO                             │
├─────────────────────────────────────────────────────────────┤
│  React Components │ Tailwind CSS │ Lucide Icons            │
├─────────────────────────────────────────────────────────────┤
│                    LÓGICA DE NEGÓCIO                        │
├─────────────────────────────────────────────────────────────┤
│  State Management │ Event Handlers │ Validation Logic      │
├─────────────────────────────────────────────────────────────┤
│                    DADOS                                    │
├─────────────────────────────────────────────────────────────┤
│  Local State │ Session Storage │ PDF Generation            │
└─────────────────────────────────────────────────────────────┘
```

### Princípios de Design

- **Single Responsibility**: Cada componente tem uma responsabilidade específica
- **Component Composition**: Reutilização através de composição
- **Unidirectional Data Flow**: Fluxo de dados previsível
- **Separation of Concerns**: Separação clara entre UI, lógica e dados

## 🛠️ Tecnologias Utilizadas

### Frontend Core

- **React 19.1.0**: Biblioteca principal para construção da interface
- **JavaScript ES6+**: Linguagem de programação moderna
- **JSX**: Sintaxe para componentes React

### Estilização e UI

- **Tailwind CSS 3.4.15**: Framework CSS utility-first
- **PostCSS 8.5.6**: Processamento de CSS
- **Autoprefixer 10.4.21**: Compatibilidade cross-browser

### Ícones e Recursos Visuais

- **Lucide React 0.525.0**: Biblioteca de ícones moderna e consistente
- **Responsive Design**: Design adaptativo para múltiplos dispositivos

### Ferramentas de Desenvolvimento

- **Create React App 5.0.1**: Boilerplate e configuração
- **React Scripts**: Scripts de build e desenvolvimento
- **Node.js**: Ambiente de execução JavaScript

### Testing Framework

- **@testing-library/react 16.3.0**: Testes de componentes
- **@testing-library/jest-dom 6.6.3**: Matchers customizados
- **@testing-library/user-event 13.5.0**: Simulação de eventos

## 🚀 Instalação e Configuração

### Pré-requisitos

- **Node.js**: Versão 14.0.0 ou superior
- **npm**: Versão 6.0.0 ou superior
- **Git**: Para controle de versão

### Processo de Instalação

1. **Clone o repositório**:
```bash
git clone https://github.com/seu-usuario/scrum-tool.git
cd scrum-tool
```

2. **Instale as dependências**:
```bash
npm install
```

3. **Configure o ambiente**:
```bash
# Crie um arquivo .env para variáveis de ambiente (se necessário)
cp .env.example .env
```

4. **Execute a aplicação**:
```bash
npm start
```

5. **Acesse a aplicação**:
   - URL: `http://localhost:3000`
   - A aplicação abrirá automaticamente no navegador

### Scripts Disponíveis

```bash
# Desenvolvimento
npm start          # Inicia o servidor de desenvolvimento

# Build e Deployment
npm run build      # Cria build de produção
npm run build:analyze  # Analisa o bundle de produção

# Testes
npm test           # Executa testes em modo watch
npm run test:ci    # Executa testes uma vez (CI/CD)
npm run test:coverage  # Executa testes com cobertura

# Linting e Formatação
npm run lint       # Verifica qualidade do código
npm run lint:fix   # Corrige problemas de linting automaticamente
```

## 💡 Uso da Aplicação

### 1. Configuração Inicial da Equipe

```
📋 Gestão de Equipe
├── Adicionar membro
│   ├── Nome completo
│   └── Função/Role
├── Editar informações
└── Remover membro
```

### 2. Condução da Daily Scrum

```
🗣️ Daily Scrum
├── Para cada membro:
│   ├── O que fez ontem?
│   ├── O que vai fazer hoje?
│   └── Tem impedimentos?
├── Validação automática
└── Geração de PDF
```

### 3. Gestão de Tarefas no Kanban

```
📋 Kanban Board
├── Geração automática de cards
├── Drag & Drop entre colunas
├── Visualização por assignee
└── Tracking temporal
```

### 4. Fechamento do Dia

```
🔄 Retrospectiva
├── Análise do que foi feito
├── Identificação de bloqueadores
├── Planejamento do próximo dia
└── Documentação em PDF
```

## 📁 Estrutura do Projeto

```
scrum-tool/
├── public/                    # Arquivos públicos
│   ├── index.html            # Template HTML principal
│   ├── favicon.ico           # Ícone da aplicação
│   └── manifest.json         # Configuração PWA
├── src/                      # Código fonte
│   ├── components/           # Componentes React
│   │   └── ScrumTool.js     # Componente principal
│   ├── styles/              # Estilos customizados
│   │   ├── App.css          # Estilos globais
│   │   └── index.css        # Imports do Tailwind
│   ├── utils/               # Funções utilitárias
│   ├── hooks/               # Custom hooks
│   ├── constants/           # Constantes da aplicação
│   ├── App.js              # Componente raiz
│   └── index.js            # Entry point
├── tests/                   # Arquivos de teste
├── docs/                    # Documentação
├── .gitignore              # Arquivos ignorados pelo Git
├── package.json            # Dependências e scripts
├── tailwind.config.js      # Configuração do Tailwind
├── postcss.config.js       # Configuração do PostCSS
└── README.md              # Este arquivo
```

## 🧩 Componentes Principais

### ScrumTool (Componente Principal)

**Responsabilidades**:
- Gerenciamento de estado global
- Coordenação entre sub-componentes
- Lógica de negócio principal

**Estados Gerenciados**:
```javascript
const [teamMembers, setTeamMembers] = useState([]);
const [dailyEntries, setDailyEntries] = useState({});
const [closingEntries, setClosingEntries] = useState({});
const [kanbanCards, setKanbanCards] = useState({});
const [activeTab, setActiveTab] = useState('daily');
```

### Funcionalidades Detalhadas

#### 1. Gestão de Membros
```javascript
const addTeamMember = () => {
  // Validação de entrada
  // Criação de novo membro
  // Atualização do estado
};

const removeTeamMember = (id) => {
  // Remoção do membro
  // Limpeza de dados relacionados
  // Atualização do estado
};
```

#### 2. Processamento de Entradas
```javascript
const extractTasksFromText = (text, memberName) => {
  // Análise de texto
  // Extração de tarefas
  // Formatação e validação
};
```

#### 3. Geração de Relatórios
```javascript
const generatePDF = (type) => {
  // Estruturação de dados
  // Geração de HTML
  // Criação de PDF
};
```

## 🔗 API e Integração

### Extensibilidade

A aplicação foi projetada para fácil integração com APIs externas:

```javascript
// Exemplo de integração futura com IA
const integrateWithAI = async (text) => {
  const response = await fetch('/api/analyze-text', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  return response.json();
};
```

### Pontos de Integração

- **Análise de Texto com IA**: OpenAI, Anthropic, ou Google AI
- **Armazenamento**: Firebase, Supabase, ou APIs REST
- **Notificações**: Slack, Microsoft Teams, ou email
- **Relatórios**: Integração com Jira, Confluence, ou Notion

## 🚀 Deployment

### Build de Produção

```bash
npm run build
```

### Opções de Deploy

#### 1. Vercel (Recomendado)
```bash
npm install -g vercel
vercel --prod
```

#### 2. Netlify
```bash
npm run build
# Upload da pasta build/ para Netlify
```

#### 3. GitHub Pages
```bash
npm install --save-dev gh-pages
npm run build
npm run deploy
```

#### 4. Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Variáveis de Ambiente

```bash
# .env.production
REACT_APP_API_URL=https://api.seudominio.com
REACT_APP_ENV=production
REACT_APP_VERSION=1.0.0
```

## 🤝 Contribuição

### Processo de Contribuição

1. **Fork** o repositório
2. **Crie** uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. **Abra** um Pull Request

### Padrões de Código

```javascript
// Nomenclatura de componentes (PascalCase)
const ScrumTool = () => { };

// Nomenclatura de funções (camelCase)
const handleSubmit = () => { };

// Nomenclatura de constantes (UPPER_SNAKE_CASE)
const API_BASE_URL = 'https://api.example.com';
```

### Commits Convencionais

```
feat: adiciona nova funcionalidade
fix: corrige bug específico
docs: atualiza documentação
style: mudanças de formatação
refactor: refatoração de código
test: adiciona ou corrige testes
chore: manutenção geral
```

## 🗺️ Roadmap

### Versão 1.1.0 (Próxima Release)

- [ ] **Persistência de Dados**: Integração com localStorage/sessionStorage
- [ ] **Temas Personalizáveis**: Dark mode e temas customizados
- [ ] **Exportação Avançada**: Excel, CSV, e JSON
- [ ] **Filtros e Busca**: Sistema de filtros no Kanban

### Versão 1.2.0

- [ ] **Integração com IA**: Análise automática de texto com OpenAI
- [ ] **Notificações**: Sistema de alertas e lembretes
- [ ] **Histórico Completo**: Persistência de dados históricos
- [ ] **Dashboard Analytics**: Métricas e insights de produtividade

### Versão 2.0.0

- [ ] **Multi-tenancy**: Suporte a múltiplas equipes
- [ ] **API Backend**: Backend completo com autenticação
- [ ] **Mobile App**: Aplicativo nativo React Native
- [ ] **Integração Slack**: Bot para Slack integration

## 📞 Suporte

### Canais de Suporte

- **Issues**: [GitHub Issues](https://github.com/seu-usuario/scrum-tool/issues)
- **Discussões**: [GitHub Discussions](https://github.com/seu-usuario/scrum-tool/discussions)
- **Email**: suporte@olimpiapartners.com

### FAQ

**P: Como posso personalizar os campos da Daily?**
R: Atualmente os campos são fixos, mas a personalização está planejada para a versão 1.2.0.

**P: A aplicação funciona offline?**
R: Parcialmente. Os dados são mantidos durante a sessão, mas não há persistência offline completa ainda.

**P: Posso integrar com Jira?**
R: A integração com Jira está no roadmap para versão 2.0.0.

---

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autores

- Rafael Santana Rodrigues - [RafaelSR44](https://github.com/RafaelSR44)

## 🙏 Agradecimentos

- Comunidade React pela excelente documentação
- Tailwind CSS pelo framework de estilização
- Lucide pelo conjunto de ícones
- Todos os contribuidores e testadores

---

<p align="center">
  Feito com ❤️ pela equipe <strong>Olimpia Partners</strong>
</p>

<p align="center">
  <a href="#-scrum-tool---ferramenta-de-gestão-ágil">⬆️ Voltar ao topo</a>
</p>

