#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <time.h>

#define HASH_TABLE_SIZE 1000
#define MAX_WORD_LENGTH 100
#define MAX_LINE_LENGTH 1000

// ============================================================================
// ESTRUTURAS DE DADOS
// ============================================================================

// Nó da Posting List (lista de documentos onde o termo aparece)
typedef struct PostingNode
{
    int doc_id;               // ID do documento
    int frequency;            // Frequência do termo no documento
    struct PostingNode *next; // Próximo nó na lista
} PostingNode;

// Entrada da Hash Table (um termo e sua posting list)
typedef struct HashEntry
{
    char term[MAX_WORD_LENGTH]; // Termo indexado
    PostingNode *postings;      // Lista de postings
    struct HashEntry *next;     // Próximo na lista (para colisões)
} HashEntry;

// Hash Table (Índice Invertido)
typedef struct InvertedIndex
{
    HashEntry *table[HASH_TABLE_SIZE]; // Array de buckets
    int num_documents;                 // Total de documentos indexados
    int num_terms;                     // Total de termos únicos
    int collisions;                    // Número de colisões
} InvertedIndex;

// Documento
typedef struct Document
{
    int id;
    char content[MAX_LINE_LENGTH];
} Document;

// ============================================================================
// FUNÇÕES DA HASH TABLE
// ============================================================================

// Função hash (DJB2 algorithm)
unsigned long hash_function(const char *str)
{
    unsigned long hash = 5381;
    int c;

    while ((c = *str++))
    {
        hash = ((hash << 5) + hash) + c; // hash * 33 + c
    }

    return hash % HASH_TABLE_SIZE;
}

// Criar um novo índice invertido
InvertedIndex *create_index()
{
    InvertedIndex *index = (InvertedIndex *)malloc(sizeof(InvertedIndex));

    for (int i = 0; i < HASH_TABLE_SIZE; i++)
    {
        index->table[i] = NULL;
    }

    index->num_documents = 0;
    index->num_terms = 0;
    index->collisions = 0;

    return index;
}

// Criar um novo nó de posting
PostingNode *create_posting_node(int doc_id)
{
    PostingNode *node = (PostingNode *)malloc(sizeof(PostingNode));
    node->doc_id = doc_id;
    node->frequency = 1;
    node->next = NULL;
    return node;
}

// Criar uma nova entrada na hash table
HashEntry *create_hash_entry(const char *term)
{
    HashEntry *entry = (HashEntry *)malloc(sizeof(HashEntry));
    strncpy(entry->term, term, MAX_WORD_LENGTH - 1);
    entry->term[MAX_WORD_LENGTH - 1] = '\0';
    entry->postings = NULL;
    entry->next = NULL;
    return entry;
}

// Adicionar ou atualizar um posting em uma lista
void add_posting(PostingNode **head, int doc_id)
{
    PostingNode *current = *head;
    PostingNode *prev = NULL;

    // Buscar se o documento já existe
    while (current != NULL)
    {
        if (current->doc_id == doc_id)
        {
            current->frequency++;
            return;
        }
        prev = current;
        current = current->next;
    }

    // Documento não existe, criar novo nó
    PostingNode *new_node = create_posting_node(doc_id);

    if (*head == NULL)
    {
        *head = new_node;
    }
    else
    {
        prev->next = new_node;
    }
}

// Inserir termo no índice invertido
void insert_term(InvertedIndex *index, const char *term, int doc_id)
{
    unsigned long hash = hash_function(term);
    HashEntry *entry = index->table[hash];
    HashEntry *prev = NULL;

    // Buscar termo na lista de colisões
    while (entry != NULL)
    {
        if (strcmp(entry->term, term) == 0)
        {
            // Termo encontrado, adicionar posting
            add_posting(&entry->postings, doc_id);
            return;
        }
        prev = entry;
        entry = entry->next;
    }

    // Termo não encontrado, criar nova entrada
    HashEntry *new_entry = create_hash_entry(term);
    add_posting(&new_entry->postings, doc_id);

    if (index->table[hash] == NULL)
    {
        // Primeira entrada no bucket
        index->table[hash] = new_entry;
    }
    else
    {
        // Colisão: adicionar ao final da lista
        prev->next = new_entry;
        index->collisions++;
    }

    index->num_terms++;
}

// Buscar termo no índice
PostingNode *search_term(InvertedIndex *index, const char *term)
{
    unsigned long hash = hash_function(term);
    HashEntry *entry = index->table[hash];

    while (entry != NULL)
    {
        if (strcmp(entry->term, term) == 0)
        {
            return entry->postings;
        }
        entry = entry->next;
    }

    return NULL;
}

// ============================================================================
// FUNÇÕES DE PROCESSAMENTO DE TEXTO
// ============================================================================

// Normalizar palavra (lowercase e remover pontuação)
void normalize_word(char *word)
{
    int len = strlen(word);
    int j = 0;

    for (int i = 0; i < len; i++)
    {
        if (isalnum(word[i]))
        {
            word[j++] = tolower(word[i]);
        }
    }
    word[j] = '\0';
}

// Indexar um documento
void index_document(InvertedIndex *index, int doc_id, const char *content)
{
    char temp[MAX_LINE_LENGTH];
    strncpy(temp, content, MAX_LINE_LENGTH - 1);
    temp[MAX_LINE_LENGTH - 1] = '\0';

    char *token = strtok(temp, " \t\n\r.,;:!?()[]{}\"'");

    while (token != NULL)
    {
        normalize_word(token);

        if (strlen(token) > 0)
        {
            insert_term(index, token, doc_id);
        }

        token = strtok(NULL, " \t\n\r.,;:!?()[]{}\"'");
    }

    index->num_documents++;
}

// ============================================================================
// FUNÇÕES DE BUSCA
// ============================================================================

// Busca simples (retorna documentos que contêm o termo)
void simple_search(InvertedIndex *index, const char *term)
{
    char normalized_term[MAX_WORD_LENGTH];
    strncpy(normalized_term, term, MAX_WORD_LENGTH - 1);
    normalized_term[MAX_WORD_LENGTH - 1] = '\0';
    normalize_word(normalized_term);

    printf("\n🔍 Buscando por: '%s'\n", normalized_term);
    printf("========================================\n");

    clock_t start = clock();
    PostingNode *postings = search_term(index, normalized_term);
    clock_t end = clock();

    double time_taken = ((double)(end - start)) / CLOCKS_PER_SEC * 1000000; // microsegundos

    if (postings == NULL)
    {
        printf("❌ Nenhum resultado encontrado.\n");
    }
    else
    {
        printf("✅ Resultados encontrados:\n\n");

        PostingNode *current = postings;
        int count = 0;

        while (current != NULL)
        {
            printf("  📄 Documento %d (frequência: %d)\n",
                   current->doc_id, current->frequency);
            current = current->next;
            count++;
        }

        printf("\n📊 Total: %d documento(s)\n", count);
    }

    printf("⚡ Tempo de busca: %.2f μs\n", time_taken);
}

// Busca linear (para comparação) - O(n)
void linear_search(Document *docs, int num_docs, const char *term)
{
    char normalized_term[MAX_WORD_LENGTH];
    strncpy(normalized_term, term, MAX_WORD_LENGTH - 1);
    normalized_term[MAX_WORD_LENGTH - 1] = '\0';
    normalize_word(normalized_term);

    printf("\n🐌 Busca Linear: '%s'\n", normalized_term);
    printf("========================================\n");

    clock_t start = clock();
    int count = 0;

    for (int i = 0; i < num_docs; i++)
    {
        char temp[MAX_LINE_LENGTH];
        strncpy(temp, docs[i].content, MAX_LINE_LENGTH - 1);
        temp[MAX_LINE_LENGTH - 1] = '\0';

        char *token = strtok(temp, " \t\n\r.,;:!?()[]{}\"'");
        int found = 0;

        while (token != NULL)
        {
            normalize_word(token);
            if (strcmp(token, normalized_term) == 0)
            {
                found = 1;
                break;
            }
            token = strtok(NULL, " \t\n\r.,;:!?()[]{}\"'");
        }

        if (found)
        {
            printf("  📄 Documento %d\n", docs[i].id);
            count++;
        }
    }

    clock_t end = clock();
    double time_taken = ((double)(end - start)) / CLOCKS_PER_SEC * 1000000;

    printf("\n📊 Total: %d documento(s)\n", count);
    printf("⚡ Tempo de busca: %.2f μs\n", time_taken);
}

// ============================================================================
// FUNÇÕES DE VISUALIZAÇÃO
// ============================================================================

// Imprimir estatísticas do índice
void print_statistics(InvertedIndex *index)
{
    printf("\n📊 ESTATÍSTICAS DO ÍNDICE INVERTIDO\n");
    printf("========================================\n");
    printf("📚 Total de documentos: %d\n", index->num_documents);
    printf("📝 Total de termos únicos: %d\n", index->num_terms);
    printf("⚠️  Colisões na hash table: %d\n", index->collisions);
    printf("📦 Tamanho da hash table: %d\n", HASH_TABLE_SIZE);
    printf("📈 Fator de carga: %.2f%%\n",
           (float)index->num_terms / HASH_TABLE_SIZE * 100);
}

// Imprimir o índice completo
void print_index(InvertedIndex *index)
{
    printf("\n📖 ÍNDICE INVERTIDO COMPLETO\n");
    printf("========================================\n");

    int displayed = 0;
    for (int i = 0; i < HASH_TABLE_SIZE && displayed < 20; i++)
    {
        HashEntry *entry = index->table[i];

        while (entry != NULL && displayed < 20)
        {
            printf("\n🔤 Termo: '%s'\n", entry->term);
            printf("   Postings: ");

            PostingNode *posting = entry->postings;
            while (posting != NULL)
            {
                printf("[Doc %d: %dx] ", posting->doc_id, posting->frequency);
                posting = posting->next;
            }
            printf("\n");

            entry = entry->next;
            displayed++;
        }
    }

    if (index->num_terms > 20)
    {
        printf("\n... (mostrando apenas 20 termos)\n");
    }
}

// ============================================================================
// FUNÇÃO PRINCIPAL
// ============================================================================

int main()
{
    printf("🚀 ÍNDICE INVERTIDO COM HASH TABLE + POSTING LISTS\n");
    printf("====================================================\n\n");

    // Criar índice
    InvertedIndex *index = create_index();

    // Documentos de exemplo
    Document docs[] = {
        {1, "A estrutura de dados hash table permite busca rapida e eficiente"},
        {2, "Indices invertidos sao fundamentais para motores de busca"},
        {3, "A busca linear e ineficiente para grandes volumes de dados"},
        {4, "Hash tables usam funcoes hash para mapear chaves em valores"},
        {5, "Posting lists armazenam as ocorrencias de termos em documentos"}};
    int num_docs = sizeof(docs) / sizeof(docs[0]);

    // Indexar documentos
    printf("📥 Indexando documentos...\n");
    for (int i = 0; i < num_docs; i++)
    {
        index_document(index, docs[i].id, docs[i].content);
        printf("  ✓ Documento %d indexado\n", docs[i].id);
    }

    // Estatísticas
    print_statistics(index);

    // Visualizar índice
    print_index(index);

    // Exemplos de busca
    printf("\n\n🔍 EXEMPLOS DE BUSCA\n");
    printf("====================================================\n");

    simple_search(index, "busca");
    simple_search(index, "hash");
    simple_search(index, "dados");

    // Comparação: Índice vs Linear
    printf("\n\n⚡ COMPARAÇÃO: ÍNDICE INVERTIDO VS BUSCA LINEAR\n");
    printf("====================================================\n");

    simple_search(index, "estrutura");
    linear_search(docs, num_docs, "estrutura");

    // Busca que não existe
    simple_search(index, "algoritmo");

    printf("\n\n✅ Programa concluído!\n");

    // Liberar memória (implementação básica - em produção seria mais completa)
    free(index);

    return 0;
}
