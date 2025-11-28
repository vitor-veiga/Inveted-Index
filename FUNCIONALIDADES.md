# 📚 Funcionalidades da Plataforma de Índice Invertido

## 🎯 Visão Geral

Plataforma educacional interativa desenvolvida em **React + TypeScript** para ensinar o funcionamento de **Índices Invertidos**, uma das estruturas de dados mais importantes em sistemas de busca modernos (Google, Elasticsearch, etc.).

---

## 🗂️ Estrutura Modular (8 Módulos)

### 📖 Módulo 1: Introdução

**O que é um Índice Invertido?**

- ✅ Conceitos fundamentais e motivação
- ✅ Comparação com busca linear
- ✅ História e evolução dos sistemas de busca
- ✅ Aplicações no mundo real (Google, Elasticsearch, Solr)
- ✅ Analogia com índice de livros
- ✅ Cards interativos com exemplos visuais
- ✅ Timeline histórica

### 🔍 Módulo 2: Busca Interativa

**Experimente fazer buscas!**

- ✅ Interface de busca com query input
- ✅ Suporte a operadores booleanos (AND, OR, NOT)
- ✅ Highlight de termos nos resultados
- ✅ Snippets de documentos encontrados
- ✅ Métricas de busca (tempo, documentos encontrados)
- ✅ Sugestões de queries de exemplo
- ✅ Resultados em tempo real

### 📊 Módulo 3: Visualização do Índice

**Veja como os dados são organizados**

- ✅ Tabela completa do índice invertido
- ✅ Colunas: Termo, Document Frequency (DF), Documentos
- ✅ Posting lists expandíveis
- ✅ Term frequency (TF) por documento
- ✅ Design responsivo com cores por termo
- ✅ Scroll horizontal para muitos termos
- ✅ Estatísticas da hash table (colisões, fator de carga)

### 🎬 Módulo 4: Animação de Consulta

**Veja o processamento passo-a-passo**

- ✅ **5 passos animados:**

  1. **Parse** (📝): Tokenização da query
  2. **Hash** (🔢): Cálculo de hash para cada termo
  3. **Retrieve** (🗂️): Busca das posting lists
  4. **Merge** (🔗): União/interseção de resultados
  5. **Complete** (✅): Retorno dos documentos

- ✅ Controles de reprodução:

  - ▶️ Play automático
  - ⏸️ Pause
  - ← Anterior / Próximo →
  - 🔄 Reiniciar

- ✅ Visualizações interativas:

  - Fluxo de dados com setas animadas
  - Cards com gradientes e animações CSS
  - Ícones ilustrativos para cada operação
  - Progress bar com efeito shimmer
  - Descrições contextuais de cada passo

- ✅ Feedback visual:
  - Termos destacados em amarelo
  - Documentos em verde
  - Buckets da hash table em roxo
  - Animações de bounce, fade-in, slide-up

### ⚡ Módulo 5: Performance e Complexidade

**Por que é tão rápido?**

- ✅ **Explicação detalhada de O(1):**

  - 3 passos numerados e ilustrados
  - Hash function (tempo constante)
  - Acesso direto à hash table
  - Posting list pré-calculada
  - Exemplos de código inline
  - Comparação com O(n×m) da busca linear

- ✅ **Comparação interativa:**

  - Input de query personalizada
  - Seletor de tamanho de dataset (1k, 5k, 10k, 50k docs)
  - Medição em tempo real:
    - Tempo de busca linear
    - Tempo de índice invertido
    - Speedup calculado
    - Documentos escaneados
  - Tratamento de casos extremos (< 0.001ms)
  - Cards comparativos lado a lado

- ✅ **Tabela de complexidade:**

  - Busca: O(n×m) vs O(1)
  - Inserção: O(1) vs O(m)
  - Espaço: O(n×m) vs O(n×m+t)
  - Legenda de variáveis (n, m, t)

- ✅ **Trade-offs:**
  - Vantagens (velocidade, escalabilidade)
  - Desvantagens (memória, indexação inicial)

### 📈 Módulo 6: Ranking TF-IDF

**Como ordenar resultados por relevância?**

- ✅ **Teoria completa:**

  - Fórmula de Term Frequency (TF)
  - Fórmula de Inverse Document Frequency (IDF)
  - IDF suavizado: `log((N+1)/(df+1)) + 1`
  - Fórmula combinada TF-IDF
  - Score para múltiplos termos

- ✅ **Exemplos práticos:**

  - Cálculo passo-a-passo ilustrado
  - Cards coloridos por etapa
  - Valores numéricos reais
  - Exemplo de query com múltiplos termos
  - Tabela de soma de scores

- ✅ **Demonstração interativa:**

  - Input de query customizada
  - Tabela de ranking ao vivo
  - Colunas: Posição, Doc ID, Score, Título
  - Barras de progresso visuais do score
  - Ordenação automática por relevância
  - Design mobile-friendly

- ✅ **Referências bibliográficas:**
  - Salton & Buckley (1988)
  - Manning, Raghavan & Schütze (2008)
  - Baeza-Yates & Ribeiro-Neto (2011)

### 🌍 Módulo 7: Aplicações Reais

**Onde é usado no mundo real?**

- ✅ **Motores de Busca:**

  - Google, Bing, DuckDuckGo
  - Funcionamento interno
  - Escala de bilhões de documentos

- ✅ **Sistemas Enterprise:**

  - Elasticsearch (busca distribuída)
  - Apache Solr (busca open-source)
  - Amazon CloudSearch

- ✅ **Bancos de Dados:**

  - PostgreSQL Full-Text Search
  - MongoDB Text Indexes
  - MySQL FULLTEXT

- ✅ **E-commerce:**

  - Amazon (busca de produtos)
  - Catálogos online
  - Recomendações

- ✅ Cards com ícones e descrições
- ✅ Insights sobre escalabilidade
- ✅ Desafios práticos (atualizações, distribuição)

### 💻 Módulo 8: Implementação em C

**Veja o código real!**

- ✅ **6 seções de código:**

  1. Estruturas de dados (PostingNode, HashEntry, InvertedIndex)
  2. Função hash DJB2
  3. Inserção com chaining
  4. Busca O(1)
  5. Gerenciamento de posting lists
  6. Comparação linear vs índice

- ✅ **Navegação por abas:**

  - Código completo em C
  - Explicações didáticas
  - Conceitos-chave destacados
  - Análise de complexidade por operação

- ✅ **Quiz educativo:**

  - 3 perguntas sobre conceitos
  - Verificação de respostas
  - Feedback explicativo
  - Pontuação final

- ✅ **Download de arquivos:**

  - `inverted_index_hash.c` (450+ linhas)
  - `README.md` (documentação)
  - Botões de visualizar e download
  - Arquivos servidos estaticamente

- ✅ **Instruções de compilação:**
  - Makefile incluído
  - Comandos para rodar
  - Exemplos de uso

---

## 🎨 Recursos de UI/UX

### 🎯 Design Responsivo

- ✅ Mobile-first approach
- ✅ Breakpoints: sm (640px), lg (1024px)
- ✅ Botões com touch targets 44px mínimo
- ✅ Texto escalável (text-xs sm:text-sm lg:text-base)
- ✅ Padding adaptativo (px-3 sm:px-6)
- ✅ Tabelas com scroll horizontal
- ✅ Sidebar mobile com overlay
- ✅ Menu hamburguer responsivo

### 🎨 Sistema de Cores (Tema Claro)

- ✅ Background: gradientes suaves (blue-50 → indigo-50 → purple-50)
- ✅ Cards brancos com shadow-xl
- ✅ Bordas: gray-200
- ✅ Texto: gray-900 (títulos), gray-700 (corpo)
- ✅ Destaque: blue-600, indigo-600, purple-600
- ✅ Feedback: green (sucesso), yellow (atenção), red (erro)

### ✨ Animações CSS

- ✅ `fade-in`: Entrada suave
- ✅ `slide-in`: Desliza horizontalmente
- ✅ `slide-up`: Desliza verticalmente
- ✅ `scale-in`: Cresce do centro
- ✅ `bounce`: Pula suavemente
- ✅ `shimmer`: Efeito de brilho
- ✅ `pulse`: Pulsação contínua
- ✅ Delays escalonados para efeito cascata
- ✅ Transições suaves (duration-300, ease-in-out)

### 🧭 Navegação

- ✅ **Sidebar fixo (desktop):**

  - Lista de 8 módulos
  - Ícones do Lucide React
  - Estado ativo destacado (gradiente)
  - Checkmarks de conclusão
  - Progress bar geral

- ✅ **Sidebar mobile:**

  - Botão hamburguer flutuante (z-50)
  - Overlay semitransparente (z-30)
  - Panel deslizante (z-40)
  - Max-width 85vw
  - Fecha ao selecionar módulo

- ✅ **Progress Bar sticky:**

  - Sempre visível no topo (sticky top-0 z-20)
  - Percentual de conclusão
  - Botão de reset com confirmação
  - LocalStorage para persistência

- ✅ **Navegação entre módulos:**
  - Botões Anterior/Próximo
  - Botão "Marcar como Concluído"
  - Desabilitado quando apropriado
  - Stack vertical em mobile

### 🎯 Componentes Reutilizáveis

- ✅ `Card`: Container padronizado com título
- ✅ `Button`: Variantes (primary, secondary)
- ✅ `Tabs`: Navegação por abas
- ✅ `ProgressBar`: Barra de progresso global
- ✅ `ModuleLayout`: Layout consistente entre módulos
- ✅ `Sidebar`: Navegação lateral

---

## 🛠️ Arquitetura Técnica

### 📁 Estrutura de Código

```
src/
├── components/
│   ├── Animations/
│   │   └── QueryAnimation.tsx         # Animação step-by-step
│   ├── CImplementation/
│   │   └── CImplementation.tsx        # Código C com abas
│   ├── Comparison/
│   │   └── PerformanceComparison.tsx  # Comparação de performance
│   ├── DocumentCollection/
│   │   └── DocumentCollection.tsx     # Lista de documentos
│   ├── IndexVisualization/
│   │   └── IndexVisualization.tsx     # Tabela do índice
│   ├── Layout/
│   │   ├── ModuleLayout.tsx           # Layout dos módulos
│   │   └── Sidebar.tsx                # Navegação lateral
│   ├── Modules/
│   │   ├── Introduction.tsx           # Módulo 1
│   │   ├── SearchModule.tsx           # Módulo 2
│   │   ├── VisualizationModule.tsx    # Módulo 3
│   │   ├── AnimationModule.tsx        # Módulo 4
│   │   ├── PerformanceModule.tsx      # Módulo 5
│   │   ├── RankingModule.tsx          # Módulo 6
│   │   ├── ApplicationsModule.tsx     # Módulo 7
│   │   └── CImplementationModule.tsx  # Módulo 8
│   ├── SearchDemo/
│   │   └── SearchDemo.tsx             # Interface de busca
│   ├── TFIDFRanking/
│   │   └── TFIDFRanking.tsx           # Ranking interativo
│   └── common/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── ProgressBar.tsx
│       └── Tabs.tsx
├── data/
│   └── sampleDocuments.ts             # 30 documentos de exemplo
├── hooks/
│   ├── useAnimation.ts                # Lógica de animação
│   ├── useInvertedIndex.ts            # Gerenciamento do índice
│   └── useSearch.ts                   # Lógica de busca
├── lib/
│   ├── inverted-index/
│   │   ├── HashTable.ts               # Implementação da hash table
│   │   ├── InvertedIndex.ts           # Índice invertido principal
│   │   ├── PostingList.ts             # Listas de postings
│   │   └── types.ts                   # Tipos TypeScript
│   ├── ranking/
│   │   └── TFIDF.ts                   # Cálculo TF-IDF
│   ├── search/
│   │   ├── BooleanSearch.ts           # Busca booleana
│   │   ├── LinearSearch.ts            # Busca linear (comparação)
│   │   └── QueryParser.ts             # Parser de queries
│   └── utils/
│       ├── animations.ts              # Geração de steps de animação
│       ├── performance.ts             # Medição de performance
│       └── textProcessing.ts          # Tokenização unificada
└── styles/
    ├── animations.css                 # Keyframes CSS
    └── variables.css                  # Variáveis globais
```

### 🔧 Tecnologias Utilizadas

**Frontend:**

- ⚛️ React 19.2.0
- 📘 TypeScript 5.9.3
- 🎨 Tailwind CSS 4.1.17
- 🎯 Vite 7.2.4 (dev server + build)
- 🎭 Lucide React (ícones)

**Estruturas de Dados:**

- 🗂️ Hash Table com chaining
- 📋 Linked Lists para posting lists
- 🔍 Índice invertido completo
- 📊 Map/Set do JavaScript

**Persistência:**

- 💾 LocalStorage (progresso do usuário)
- 🔑 Key: `"learning-progress"`
- 📦 Dados: `{ completed: string[], activeModule: string }`

**Performance:**

- ⏱️ `performance.now()` para medições precisas
- 🚀 Geração sintética de datasets (1k-50k docs)
- 📈 Comparação em tempo real

**Deploy:**

- 🔷 Vercel (CI/CD automático)
- 🌐 URL: https://inverted-index-platform-bvmzeqp9g.vercel.app
- 🔄 Deploy automático a cada push no GitHub

---

## 📊 Dados e Exemplos

### 📚 Dataset

- ✅ 30 documentos educacionais
- ✅ Tópicos: estruturas de dados, algoritmos, IA, busca
- ✅ Conteúdo rico (200-400 palavras por doc)
- ✅ WordCount pré-calculado
- ✅ IDs únicos (doc1, doc2, ...)

### 🔍 Queries de Exemplo

- `"estruturas dados"`
- `"algoritmos busca"`
- `"machine learning"`
- `"grafos árvores"`
- `"hash table"`
- `"complexidade tempo"`

### 🧮 Métricas Calculadas

- **TF (Term Frequency):** `freq / totalTermsInDoc`
- **IDF (Inverse Doc Freq):** `log((N+1)/(df+1)) + 1` (suavizado)
- **TF-IDF:** `TF × IDF`
- **Document Frequency (DF):** Número de docs com o termo
- **Speedup:** `linearTime / indexedTime`

---

## 🎓 Objetivos Pedagógicos

### 🎯 Aprendizagem Progressiva

1. **Introdução:** Conceitos fundamentais
2. **Prática:** Busca interativa hands-on
3. **Visualização:** Ver estrutura interna
4. **Compreensão:** Animação passo-a-passo
5. **Análise:** Performance e complexidade
6. **Avançado:** Ranking TF-IDF
7. **Contexto:** Aplicações reais
8. **Implementação:** Código real em C

### 📖 Conceitos Cobertos

- ✅ Tokenização e normalização de texto
- ✅ Funções hash (DJB2)
- ✅ Tratamento de colisões (chaining)
- ✅ Posting lists e term frequency
- ✅ Document frequency
- ✅ Complexidade computacional (Big O)
- ✅ Trade-offs de design (espaço vs tempo)
- ✅ Busca booleana (AND, OR, NOT)
- ✅ Operações de conjunto (união, interseção)
- ✅ TF-IDF e ranking de relevância
- ✅ Escalabilidade de sistemas
- ✅ Implementação em linguagem de baixo nível

### 🎯 Interatividade

- ✅ Busca ao vivo
- ✅ Animações controladas pelo usuário
- ✅ Geração de datasets customizados
- ✅ Quiz com feedback imediato
- ✅ Download de código fonte
- ✅ Progress tracking persistente
- ✅ Navegação não-linear

---

## 🚀 Features Técnicas Avançadas

### 🔐 Tokenização Unificada

- ✅ Função compartilhada em `textProcessing.ts`
- ✅ Lowercase, remoção de pontuação, split por espaço
- ✅ Usada por: InvertedIndex, LinearSearch, TFIDF, QueryParser
- ✅ Garante consistência de resultados

### ⚡ Otimizações de Performance

- ✅ Memoização de steps de animação (`useMemo`)
- ✅ Callbacks otimizados (`useCallback`)
- ✅ Evita re-renders desnecessários
- ✅ Lazy loading implícito (code splitting do Vite)
- ✅ Hash table com fator de carga controlado

### 🐛 Tratamento de Edge Cases

- ✅ Query vazia → feedback apropriado
- ✅ Termo não encontrado → lista vazia
- ✅ Tempo < 0.001ms → "muito rápido para medir"
- ✅ Division by zero → tratamento com epsilon
- ✅ IDF = 0 → suavização aplicada

### ♿ Acessibilidade

- ✅ `aria-label` em botões importantes
- ✅ Touch targets 44px mínimo
- ✅ Contraste de cores adequado (WCAG AA)
- ✅ Navegação por teclado suportada
- ✅ Semantic HTML (header, main, nav, section)

---

## 📱 Responsividade

### 📐 Breakpoints

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

### 🎨 Adaptações Mobile

- ✅ Sidebar → Menu hamburguer
- ✅ Grid multi-coluna → Stack vertical
- ✅ Texto grande → Texto menor
- ✅ Padding generoso → Padding reduzido
- ✅ Tabelas → Scroll horizontal + colunas escondidas
- ✅ Botões lado a lado → Botões empilhados
- ✅ Progress bar → Layout vertical

---

## 🔄 Sistema de Progresso

### 💾 Persistência

- ✅ LocalStorage automático
- ✅ Salva módulos completados
- ✅ Salva módulo ativo atual
- ✅ Restaura ao recarregar página

### 🎯 Tracking

- ✅ Checkmarks verdes nos módulos concluídos
- ✅ Progress bar no topo (sticky)
- ✅ Percentual calculado em tempo real
- ✅ Botão de reset com confirmação

### 🔔 Feedback Visual

- ✅ Animação ao completar módulo
- ✅ Cores de destaque (verde para concluído)
- ✅ Ícones de status
- ✅ Mensagem de parabéns ao completar todos

---

## 📦 Build e Deploy

### 🏗️ Build Local

```bash
npm run build     # Gera dist/
npm run preview   # Preview local do build
```

### 🚀 Deploy Automático (Vercel)

- ✅ Conectado ao GitHub
- ✅ Deploy a cada push na branch `main`
- ✅ Preview URLs para PRs
- ✅ HTTPS e CDN global inclusos
- ✅ Build command: `vite build`
- ✅ Output directory: `dist`

### 🌐 Domínio

- **Produção:** https://inverted-index-platform-bvmzeqp9g.vercel.app
- **Repositório:** https://github.com/vitor-veiga/Inveted-Index

---

## 🎨 Paleta de Cores

### 🎯 Cores Principais

- **Primary:** Blue 600 (#2563eb)
- **Secondary:** Indigo 600 (#4f46e5)
- **Accent:** Purple 600 (#9333ea)

### 📊 Cores Funcionais

- **Success:** Green 600 (#16a34a)
- **Warning:** Yellow 600 (#ca8a04)
- **Error:** Red 600 (#dc2626)
- **Info:** Blue 500 (#3b82f6)

### 🖼️ Backgrounds

- **Primary BG:** White (#ffffff)
- **Secondary BG:** Gray 50 (#f9fafb)
- **Gradient:** Blue 50 → Indigo 50 → Purple 50

---

## 📈 Estatísticas do Projeto

- **Linhas de Código:** ~10,780
- **Arquivos:** 70+
- **Componentes React:** 30+
- **Módulos Educacionais:** 8
- **Documentos de Exemplo:** 30
- **Queries de Exemplo:** 15+
- **Steps de Animação:** 5 por query
- **Seções de Código C:** 6
- **Perguntas de Quiz:** 3

---

## 🎓 Uso Educacional

### 👨‍🎓 Público-Alvo

- Estudantes de Ciência da Computação
- Desenvolvedores aprendendo sobre estruturas de dados
- Profissionais interessados em sistemas de busca
- Entusiastas de algoritmos

### 📚 Pode ser usado em:

- Disciplinas de Estruturas de Dados
- Cursos de Recuperação de Informação
- Workshops de Algoritmos
- Material de estudo autodidata
- Demonstrações em palestras

### 🎯 Diferenciais Pedagógicos

- ✅ 100% visual e interativo
- ✅ Não requer instalação (web-based)
- ✅ Progressão gradual de conceitos
- ✅ Feedback imediato
- ✅ Código fonte disponível
- ✅ Exemplos práticos e reais
- ✅ Múltiplas modalidades (texto, visual, código)

---

## 🏆 Conclusão

Esta plataforma oferece uma experiência completa e interativa para aprender sobre **Índices Invertidos**, combinando teoria sólida, visualizações dinâmicas, código real e exercícios práticos. Ideal para estudantes, professores e profissionais que desejam entender profundamente uma das estruturas de dados mais importantes da computação moderna.

**🌐 Acesse agora:** https://inverted-index-platform-bvmzeqp9g.vercel.app
