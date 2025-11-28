# 🔧 Implementação em C - Índice Invertido

## 📁 Arquivos

### `inverted_index_hash.c` (⭐ RECOMENDADO)

Implementação completa com **Hash Table + Posting Lists**

**Características:**

- ✅ Hash Table com tratamento de colisões (chaining)
- ✅ Posting Lists com frequência de termos
- ✅ Função hash DJB2
- ✅ Busca em O(1) médio
- ✅ Comparação com busca linear O(n)
- ✅ Estatísticas detalhadas
- ✅ Visualização do índice

### `inverted_index.c`

Implementação com **Árvore Binária de Busca**

**Características:**

- ✅ BST para armazenar termos
- ✅ Lista de linhas onde o termo aparece
- ✅ Busca em O(log n) médio

---

## 🚀 Como Compilar e Executar

### Implementação com Hash Table (Recomendada)

```bash
# Compilar
gcc -o inverted_index_hash inverted_index_hash.c -Wall -Wextra

# Executar
./inverted_index_hash
```

### Implementação com Árvore Binária

```bash
# Compilar
gcc -o inverted_index inverted_index.c -Wall -Wextra

# Executar com arquivo de entrada
./inverted_index < ../test_data/test_data.txt
```

---

## 📊 Comparação das Implementações

| Característica               | Hash Table        | Árvore Binária     |
| ---------------------------- | ----------------- | ------------------ |
| **Complexidade de Busca**    | O(1) médio        | O(log n) médio     |
| **Complexidade de Inserção** | O(1) médio        | O(log n) médio     |
| **Uso de Memória**           | Alto (table size) | Moderado           |
| **Colisões**                 | Sim (chaining)    | Não                |
| **Ordenação**                | Não               | Sim (in-order)     |
| **Melhor para**              | Busca rápida      | Percorrer ordenado |

---

## 🔍 Exemplo de Saída (Hash Table)

```
🚀 ÍNDICE INVERTIDO COM HASH TABLE + POSTING LISTS
====================================================

📥 Indexando documentos...
  ✓ Documento 1 indexado
  ✓ Documento 2 indexado
  ✓ Documento 3 indexado
  ✓ Documento 4 indexado
  ✓ Documento 5 indexado

📊 ESTATÍSTICAS DO ÍNDICE INVERTIDO
========================================
📚 Total de documentos: 5
📝 Total de termos únicos: 42
⚠️  Colisões na hash table: 0
📦 Tamanho da hash table: 1000
📈 Fator de carga: 4.20%

📖 ÍNDICE INVERTIDO COMPLETO
========================================

🔤 Termo: 'busca'
   Postings: [Doc 1: 1x] [Doc 2: 1x] [Doc 3: 1x]

🔤 Termo: 'hash'
   Postings: [Doc 1: 1x] [Doc 4: 2x]

🔤 Termo: 'dados'
   Postings: [Doc 1: 1x] [Doc 3: 1x]

...

🔍 EXEMPLOS DE BUSCA
====================================================

🔍 Buscando por: 'busca'
========================================
✅ Resultados encontrados:

  📄 Documento 1 (frequência: 1)
  📄 Documento 2 (frequência: 1)
  📄 Documento 3 (frequência: 1)

📊 Total: 3 documento(s)
⚡ Tempo de busca: 0.50 μs

⚡ COMPARAÇÃO: ÍNDICE INVERTIDO VS BUSCA LINEAR
====================================================

🔍 Buscando por: 'estrutura'
========================================
✅ Resultados encontrados:
  📄 Documento 1 (frequência: 1)

📊 Total: 1 documento(s)
⚡ Tempo de busca: 0.45 μs

🐌 Busca Linear: 'estrutura'
========================================
  📄 Documento 1

📊 Total: 1 documento(s)
⚡ Tempo de busca: 12.30 μs

✅ Programa concluído!
```

---

## 🏗️ Estruturas de Dados

### Hash Table

```c
typedef struct InvertedIndex {
    HashEntry *table[HASH_TABLE_SIZE];  // Array de buckets
    int num_documents;
    int num_terms;
    int collisions;
} InvertedIndex;
```

### Hash Entry (Bucket)

```c
typedef struct HashEntry {
    char term[MAX_WORD_LENGTH];    // Termo indexado
    PostingNode *postings;         // Lista de postings
    struct HashEntry *next;        // Para colisões (chaining)
} HashEntry;
```

### Posting List

```c
typedef struct PostingNode {
    int doc_id;           // ID do documento
    int frequency;        // Frequência do termo
    struct PostingNode *next;
} PostingNode;
```

---

## 🔧 Principais Funções

### Indexação

- `create_index()` - Cria um novo índice vazio
- `index_document()` - Indexa um documento
- `insert_term()` - Insere um termo no índice
- `add_posting()` - Adiciona/atualiza posting

### Busca

- `search_term()` - Busca termo no índice (O(1))
- `simple_search()` - Busca com métricas
- `linear_search()` - Busca linear para comparação

### Utilidades

- `hash_function()` - Função hash DJB2
- `normalize_word()` - Normaliza palavras
- `print_statistics()` - Exibe estatísticas
- `print_index()` - Visualiza o índice

---

## 📈 Performance

| Operação         | Hash Table | Busca Linear | Speedup         |
| ---------------- | ---------- | ------------ | --------------- |
| Busca de 1 termo | ~0.5 μs    | ~12 μs       | 24x mais rápido |
| Inserção         | ~0.3 μs    | N/A          | -               |
| Lookup           | O(1)       | O(n×m)       | -               |

_m = tamanho médio do documento_

---

## 🎯 Conceitos Implementados

1. **Hash Table com Chaining**

   - Tratamento de colisões
   - Função hash DJB2
   - Fator de carga

2. **Posting Lists**

   - Lista encadeada de documentos
   - Frequência de termos (TF)
   - Acesso O(1) ao primeiro elemento

3. **Normalização de Texto**

   - Lowercase
   - Remoção de pontuação
   - Tokenização

4. **Métricas de Performance**
   - Tempo de busca
   - Comparação com busca linear
   - Estatísticas do índice

---

## 🔬 Experimentos Sugeridos

1. **Teste com mais documentos**

   - Adicione mais documentos ao array `docs[]`
   - Observe o impacto no fator de carga

2. **Ajuste o tamanho da hash table**

   - Mude `HASH_TABLE_SIZE`
   - Observe colisões vs. memória

3. **Teste outras funções hash**

   - Implemente FNV-1a, MurmurHash
   - Compare distribuição

4. **Adicione stopwords**
   - Ignore palavras comuns (a, o, de)
   - Reduza tamanho do índice

---
