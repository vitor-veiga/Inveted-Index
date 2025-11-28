# Documentação do Projeto - Índice Invertido Interativo

## 📚 Visão Geral

Este projeto implementa um **Índice Invertido** completo com interface web interativa para demonstração educacional de estruturas de dados e algoritmos de recuperação de informação.

## 🏗️ Arquitetura do Projeto

### Estrutura de Pastas

```
site/
├── src/
│   ├── components/          # Componentes React
│   │   ├── IndexVisualization/   # Visualização do índice
│   │   ├── SearchDemo/           # Interface de busca
│   │   ├── Animations/           # Animações de processamento
│   │   ├── TFIDFRanking/        # Ranking TF-IDF
│   │   ├── Comparison/          # Comparação de performance
│   │   └── common/              # Componentes reutilizáveis
│   │
│   ├── lib/                 # Lógica de negócio
│   │   ├── inverted-index/      # Implementação do índice
│   │   ├── search/              # Algoritmos de busca
│   │   ├── ranking/             # TF-IDF
│   │   └── utils/               # Utilitários
│   │
│   ├── hooks/               # React Hooks customizados
│   ├── data/                # Dados de exemplo
│   └── styles/              # Estilos CSS
│
├── c-implementation/        # Código C original
├── public/sample-docs/      # Documentos de exemplo
└── test_data/              # Dados de teste
```

## 🔑 Componentes Principais

### 1. Índice Invertido (`InvertedIndex.ts`)

- **Hash Table**: Estrutura principal para mapear termos
- **Posting Lists**: Listas de documentos para cada termo
- **Tokenização**: Processamento de texto

### 2. Algoritmos de Busca

- **Boolean Search**: AND, OR, NOT
- **Linear Search**: Busca sequencial para comparação
- **Query Parser**: Análise de consultas complexas

### 3. Ranking TF-IDF

- **Term Frequency (TF)**: Frequência do termo no documento
- **Inverse Document Frequency (IDF)**: Raridade do termo
- **Score**: Combinação TF × IDF

### 4. Componentes React

- **IndexVisualization**: Mostra estrutura do índice
- **SearchDemo**: Interface de busca interativa
- **QueryAnimation**: Animação passo-a-passo
- **TFIDFRanking**: Cálculo e visualização de scores
- **PerformanceComparison**: Comparação linear vs. índice

## 🚀 Como Usar

### Instalação

\`\`\`bash
npm install
\`\`\`

### Desenvolvimento

\`\`\`bash
npm run dev
\`\`\`

### Build

\`\`\`bash
npm run build
\`\`\`

## 📊 Funcionalidades

### 1. Visualização do Índice

- Tabela com todos os termos indexados
- Document Frequency (DF) de cada termo
- Posting lists com Term Frequency (TF)

### 2. Busca Interativa

- Busca booleana (AND, OR, NOT)
- Resultados com snippets
- Termos destacados

### 3. Animação de Consulta

- Visualização passo-a-passo do processamento
- Controles de reprodução (play, pause, next)
- Estados visuais de cada etapa

### 4. Ranking TF-IDF

- Cálculo de relevância de documentos
- Visualização de scores
- Barras de progresso comparativas

### 5. Comparação de Performance

- Busca linear vs. índice invertido
- Métricas de tempo
- Documentos escaneados
- Speedup relativo

## 🔧 Tecnologias

- **React 19** + **TypeScript**
- **Vite** (build tool)
- **CSS** personalizado
- **Estruturas de dados customizadas** (Hash Table, Linked Lists)

## 📖 Conceitos Implementados

### Hash Table

- Função de hash customizada
- Tratamento de colisões (chaining)
- Redimensionamento dinâmico
- Load factor threshold

### Posting Lists

- Listas encadeadas
- Operações de merge (OR)
- Intersecção (AND)
- Posições dos termos

### TF-IDF

```
TF = frequência do termo / total de termos no doc
IDF = log(total de docs / docs com o termo)
TF-IDF = TF × IDF
```

### Busca Booleana

- **AND**: Intersecção de posting lists
- **OR**: União de posting lists
- **NOT**: Exclusão de documentos

## 🎓 Uso Educacional

Este projeto serve como:

- Demonstração prática de estruturas de dados
- Visualização de algoritmos de busca
- Comparação de complexidade (O(n) vs O(1))
- Estudo de recuperação de informação

## 📝 Próximas Melhorias

- [ ] Compilar C para WebAssembly
- [ ] Suporte a mais operadores booleanos
- [ ] Busca fuzzy
- [ ] Mais documentos de exemplo
- [ ] Gráficos de performance
- [ ] Export/import de índices

---

**Projeto Educacional - Estrutura de Dados - UEPG 2025**
