import { useState } from "react";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { Code, BookOpen, Lightbulb, Play, CheckCircle } from "lucide-react";

interface CodeSection {
  id: string;
  title: string;
  icon: string;
  explanation: string;
  code: string;
  concepts: string[];
  complexity: string;
}

const codeSections: CodeSection[] = [
  {
    id: "structures",
    title: "Estruturas de Dados",
    icon: "🏗️",
    explanation:
      "Definimos três estruturas principais: PostingNode (nó da lista de documentos), HashEntry (entrada da tabela hash) e InvertedIndex (índice completo).",
    code: `// Nó da Posting List
typedef struct PostingNode {
    int doc_id;           // ID do documento
    int frequency;        // Frequência do termo
    struct PostingNode *next;
} PostingNode;

// Entrada da Hash Table
typedef struct HashEntry {
    char term[MAX_WORD_LENGTH];
    PostingNode *postings;
    struct HashEntry *next;  // Para colisões
} HashEntry;

// Índice Invertido
typedef struct InvertedIndex {
    HashEntry *table[HASH_TABLE_SIZE];
    int num_documents;
    int num_terms;
    int collisions;
} InvertedIndex;`,
    concepts: [
      "Linked Lists para Postings",
      "Chaining para colisões",
      "Estrutura modular e escalável",
    ],
    complexity: "Espaço: O(n × m) onde n = termos, m = docs/termo",
  },
  {
    id: "hash",
    title: "Função Hash (DJB2)",
    icon: "🔢",
    explanation:
      "A função hash DJB2 é um algoritmo clássico que distribui strings uniformemente. Multiplica por 33 (shift + soma) e usa módulo para caber na tabela.",
    code: `unsigned long hash_function(const char *str) {
    unsigned long hash = 5381;
    int c;
    
    while ((c = *str++)) {
        hash = ((hash << 5) + hash) + c;
        // Equivale a: hash * 33 + c
    }
    
    return hash % HASH_TABLE_SIZE;
}

// Exemplo:
// "hash" → 5381 * 33 + 'h'
//       → ... * 33 + 'a'
//       → ... * 33 + 's'
//       → ... * 33 + 'h'
//       → resultado % 1000`,
    concepts: [
      "Hash uniforme e rápido",
      "Bit shifting para otimização",
      "Módulo para limitar ao tamanho da tabela",
    ],
    complexity: "Tempo: O(k) onde k = tamanho da string",
  },
  {
    id: "insert",
    title: "Inserção no Índice",
    icon: "➕",
    explanation:
      "Para inserir um termo: calcula o hash, busca na lista de colisões, atualiza posting se existir ou cria nova entrada.",
    code: `void insert_term(InvertedIndex *index, 
                 const char *term, int doc_id) {
    // 1. Calcular hash
    unsigned long hash = hash_function(term);
    HashEntry *entry = index->table[hash];
    
    // 2. Buscar na lista de colisões
    while (entry != NULL) {
        if (strcmp(entry->term, term) == 0) {
            // Termo existe: adicionar posting
            add_posting(&entry->postings, doc_id);
            return;
        }
        entry = entry->next;
    }
    
    // 3. Termo novo: criar entrada
    HashEntry *new_entry = create_hash_entry(term);
    add_posting(&new_entry->postings, doc_id);
    
    // 4. Inserir no bucket (início da lista)
    new_entry->next = index->table[hash];
    index->table[hash] = new_entry;
    index->num_terms++;
}`,
    concepts: [
      "Chaining para resolver colisões",
      "Inserção no início da lista (O(1))",
      "Atualização incremental de frequência",
    ],
    complexity: "Tempo médio: O(1), pior caso: O(n)",
  },
  {
    id: "search",
    title: "Busca no Índice",
    icon: "🔍",
    explanation:
      "A busca é extremamente rápida: calcula hash do termo, percorre lista de colisões até encontrar. Retorna posting list completa.",
    code: `PostingNode* search_term(InvertedIndex *index, 
                         const char *term) {
    // 1. Calcular hash do termo
    unsigned long hash = hash_function(term);
    
    // 2. Acessar bucket diretamente - O(1)
    HashEntry *entry = index->table[hash];
    
    // 3. Percorrer lista de colisões
    while (entry != NULL) {
        if (strcmp(entry->term, term) == 0) {
            return entry->postings;  // ✅ Encontrado!
        }
        entry = entry->next;
    }
    
    return NULL;  // ❌ Não encontrado
}

// Resultado: lista de documentos
// [Doc 1: 3x] → [Doc 5: 1x] → [Doc 7: 2x]`,
    concepts: [
      "Acesso direto ao bucket: O(1)",
      "Comparação de strings nas colisões",
      "Retorno da posting list completa",
    ],
    complexity: "Tempo médio: O(1), pior caso: O(n)",
  },
  {
    id: "posting",
    title: "Gerenciamento de Postings",
    icon: "📝",
    explanation:
      "Cada posting registra em qual documento o termo aparece e quantas vezes. Lista encadeada permite crescimento dinâmico.",
    code: `void add_posting(PostingNode **head, int doc_id) {
    PostingNode *current = *head;
    
    // Buscar se documento já existe
    while (current != NULL) {
        if (current->doc_id == doc_id) {
            current->frequency++;  // Incrementa
            return;
        }
        current = current->next;
    }
    
    // Documento novo: criar posting
    PostingNode *new_node = malloc(sizeof(PostingNode));
    new_node->doc_id = doc_id;
    new_node->frequency = 1;
    new_node->next = *head;
    *head = new_node;
}

// Resultado:
// Termo "data" → [Doc 3: 2x] → [Doc 1: 1x]`,
    concepts: [
      "Frequência de termos (TF)",
      "Lista encadeada dinâmica",
      "Inserção no início para eficiência",
    ],
    complexity: "Tempo: O(m) onde m = docs que contêm o termo",
  },
  {
    id: "comparison",
    title: "Comparação: Índice vs Linear",
    icon: "⚡",
    explanation:
      "O índice invertido transforma busca O(n×m) em O(1). Para grandes volumes de dados, o ganho é exponencial!",
    code: `// BUSCA LINEAR - O(n × m)
void linear_search(Document *docs, int n, 
                   const char *term) {
    for (int i = 0; i < n; i++) {
        char *token = strtok(docs[i].content, " ");
        while (token != NULL) {
            if (strcmp(token, term) == 0) {
                printf("Doc %d\\n", i);
                break;
            }
            token = strtok(NULL, " ");
        }
    }
}

// ÍNDICE INVERTIDO - O(1)
PostingNode* fast_search(InvertedIndex *idx, 
                         const char *term) {
    return search_term(idx, term);
}

// Speedup: ~10-1000x mais rápido! 🚀`,
    concepts: [
      "Trade-off: Espaço por Tempo",
      "Pré-processamento acelera buscas",
      "Escalabilidade para bilhões de docs",
    ],
    complexity: "Linear: O(n×m) | Índice: O(1) médio",
  },
];

const quizQuestions = [
  {
    question: "Por que usamos chaining na hash table?",
    options: [
      "Para economizar memória",
      "Para resolver colisões quando dois termos têm o mesmo hash",
      "Para ordenar os termos alfabeticamente",
      "Para aumentar a velocidade de inserção",
    ],
    correct: 1,
    explanation:
      "Chaining (encadeamento) permite que múltiplos termos com o mesmo hash coexistam no mesmo bucket, resolvendo colisões através de listas encadeadas.",
  },
  {
    question: "Qual a complexidade média de busca no índice invertido?",
    options: [
      "O(n) - Linear",
      "O(log n) - Logarítmica",
      "O(1) - Constante",
      "O(n²) - Quadrática",
    ],
    correct: 2,
    explanation:
      "Com uma boa função hash e fator de carga baixo, a busca acessa diretamente o bucket em O(1) e percorre poucas colisões (também O(1) em média).",
  },
  {
    question: "O que significa a 'frequência' em um PostingNode?",
    options: [
      "Quantas vezes o documento aparece no índice",
      "Quantas palavras o documento tem",
      "Quantas vezes o termo aparece naquele documento",
      "Quantos termos únicos o documento possui",
    ],
    correct: 2,
    explanation:
      "A frequência (TF - Term Frequency) conta quantas vezes um termo específico aparece em um documento, essencial para ranking.",
  },
];

export function CImplementation() {
  const [selectedSection, setSelectedSection] = useState<string>(
    codeSections[0].id
  );
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const currentSection =
    codeSections.find((s) => s.id === selectedSection) || codeSections[0];

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[questionIndex] = answerIndex;
    setQuizAnswers(newAnswers);
  };

  const checkQuiz = () => {
    setShowResults(true);
  };

  const resetQuiz = () => {
    setQuizAnswers([]);
    setShowResults(false);
  };

  const correctCount = quizAnswers.filter(
    (ans, idx) => ans === quizQuestions[idx].correct
  ).length;

  return (
    <Card title="💻 Implementação em C - Objeto de Aprendizagem">
      <div className="space-y-6">
        {/* Introdução */}
        <div className="bg-linear-to-r from-indigo-100 to-purple-100 border border-indigo-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="text-4xl">🎓</div>
            <div>
              <h4 className="text-lg font-bold text-indigo-900 mb-2">
                Aprenda através do Código Real
              </h4>
              <p className="text-sm text-indigo-800 leading-relaxed mb-3">
                Explore a implementação completa em C de um índice invertido com
                hash table. Cada seção explica os conceitos fundamentais com
                código comentado e análise de complexidade.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                  Hash Table
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                  Posting Lists
                </span>
                <span className="px-3 py-1 bg-pink-100 text-pink-700 text-xs font-semibold rounded-full">
                  Collision Resolution
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navegação de Seções */}
        <div>
          <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Selecione um tópico:
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {codeSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setSelectedSection(section.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                  selectedSection === section.id
                    ? "border-indigo-500 bg-indigo-50 shadow-lg transform scale-105"
                    : "border-gray-200 bg-white hover:border-indigo-300 hover:shadow-md"
                }`}
              >
                <div className="text-3xl mb-2">{section.icon}</div>
                <div className="text-sm font-bold text-gray-900">
                  {section.title}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Conteúdo da Seção Selecionada */}
        <div className="bg-gray-50 border-2 border-indigo-200 rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-indigo-500 to-purple-600 p-6 text-gray-900">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-4xl">{currentSection.icon}</div>
              <h3 className="text-2xl font-bold text-white">
                {currentSection.title}
              </h3>
            </div>
            <p className="text-indigo-100 leading-relaxed">
              {currentSection.explanation}
            </p>
          </div>

          {/* Código */}
          <div className="p-6 bg-gray-50">
            <div className="flex items-center gap-2 mb-3">
              <Code className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-bold text-gray-700">
                Código em C:
              </span>
            </div>
            <pre className="bg-gray-800 text-gray-100 p-6 rounded-xl overflow-x-auto text-sm leading-relaxed font-mono shadow-inner">
              <code>{currentSection.code}</code>
            </pre>
          </div>

          {/* Conceitos e Complexidade */}
          <div className="p-6 grid md:grid-cols-2 gap-6">
            {/* Conceitos */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-yellow-600" />
                <h5 className="font-bold text-gray-900">Conceitos-chave:</h5>
              </div>
              <ul className="space-y-2">
                {currentSection.concepts.map((concept, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <span className="text-green-500 font-bold mt-0.5">✓</span>
                    <span>{concept}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Complexidade */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">⏱️</span>
                <h5 className="font-bold text-gray-900">Complexidade:</h5>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <code className="text-sm text-blue-700 font-mono">
                  {currentSection.complexity}
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Interativo */}
        <div className="bg-linear-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🎯</span>
              <h4 className="text-lg font-bold text-green-700">
                Quiz de Aprendizagem
              </h4>
            </div>
            <Button variant="primary" onClick={() => setShowQuiz(!showQuiz)}>
              {showQuiz ? "Ocultar Quiz" : "Testar Conhecimento"}
            </Button>
          </div>

          {showQuiz && (
            <div className="space-y-6">
              {quizQuestions.map((q, qIdx) => (
                <div
                  key={qIdx}
                  className="bg-white rounded-xl p-5 border border-green-200"
                >
                  <p className="font-bold text-gray-900 mb-4">
                    {qIdx + 1}. {q.question}
                  </p>
                  <div className="space-y-2">
                    {q.options.map((option, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handleQuizAnswer(qIdx, oIdx)}
                        disabled={showResults}
                        className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                          showResults
                            ? oIdx === q.correct
                              ? "border-green-500 bg-green-50 font-semibold"
                              : quizAnswers[qIdx] === oIdx
                              ? "border-red-500 bg-red-50"
                              : "border-gray-200 bg-gray-50"
                            : quizAnswers[qIdx] === oIdx
                            ? "border-indigo-500 bg-indigo-50"
                            : "border-gray-200 hover:border-indigo-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              showResults && oIdx === q.correct
                                ? "border-green-500 bg-green-500"
                                : quizAnswers[qIdx] === oIdx
                                ? "border-indigo-500 bg-indigo-500"
                                : "border-gray-300"
                            }`}
                          >
                            {showResults && oIdx === q.correct && (
                              <CheckCircle className="w-4 h-4 text-gray-900" />
                            )}
                            {quizAnswers[qIdx] === oIdx && !showResults && (
                              <div className="w-2 h-2 bg-white rounded-full" />
                            )}
                          </div>
                          <span className="text-sm">{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  {showResults && (
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-700">
                        <strong>💡 Explicação:</strong> {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              ))}

              <div className="flex items-center gap-3">
                {!showResults ? (
                  <Button
                    variant="primary"
                    onClick={checkQuiz}
                    disabled={quizAnswers.length !== quizQuestions.length}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Verificar Respostas
                  </Button>
                ) : (
                  <>
                    <div className="flex-1 bg-white rounded-lg p-4 border-2 border-green-300">
                      <p className="text-lg font-bold text-green-700">
                        🎉 Resultado: {correctCount} de {quizQuestions.length}{" "}
                        corretas!
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {correctCount === quizQuestions.length
                          ? "Perfeito! Você dominou o conteúdo! 🌟"
                          : correctCount >= quizQuestions.length / 2
                          ? "Bom trabalho! Revise os conceitos marcados."
                          : "Continue estudando! Releia as seções acima."}
                      </p>
                    </div>
                    <Button variant="secondary" onClick={resetQuiz}>
                      Refazer Quiz
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Links para Arquivos */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-xl">📁</span>
            Arquivos do Projeto
          </h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">📄</span>
                <div>
                  <p className="font-bold text-sm text-gray-900">
                    inverted_index_hash.c
                  </p>
                  <p className="text-xs text-gray-600">
                    Implementação completa (450+ linhas)
                  </p>
                </div>
              </div>
              <code className="text-xs text-gray-600 block mt-2 mb-3">
                c-implementation/inverted_index_hash.c
              </code>
              <div className="flex gap-2">
                <a
                  href="/inverted_index_hash.c"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-3 py-2 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-center"
                >
                  👁️ Visualizar
                </a>
                <a
                  href="/inverted_index_hash.c"
                  download="inverted_index_hash.c"
                  className="flex-1 px-3 py-2 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors text-center"
                >
                  ⬇️ Download
                </a>
              </div>
            </div>
            <div className="bg-linear-to-br from-purple-50 to-indigo-50 border-2 border-purple-300 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">📦</span>
                <div>
                  <p className="font-bold text-sm text-gray-900">
                    Pasta Completa
                  </p>
                  <p className="text-xs text-gray-600">
                    Tudo pronto para compilar
                  </p>
                </div>
              </div>
              <code className="text-xs text-gray-600 block mt-2 mb-3">
                c-implementation.zip
              </code>
              <a
                href="/c-implementation.zip"
                download="c-implementation.zip"
                className="block w-full px-3 py-2 text-xs font-semibold text-white bg-linear-to-r from-purple-600 to-indigo-600 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors text-center"
              >
                📦 Download ZIP
              </a>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">📖</span>
                <div>
                  <p className="font-bold text-sm text-gray-900">README.md</p>
                  <p className="text-xs text-gray-600">
                    Documentação e instruções
                  </p>
                </div>
              </div>
              <code className="text-xs text-gray-600 block mt-2 mb-3">
                c-implementation/README.md
              </code>
              <div className="flex gap-2">
                <a
                  href="/c-implementation-README.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-3 py-2 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-center"
                >
                  👁️ Visualizar
                </a>
                <a
                  href="/c-implementation-README.md"
                  download="README.md"
                  className="flex-1 px-3 py-2 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors text-center"
                >
                  ⬇️ Download
                </a>
              </div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
            <p className="text-sm text-indigo-900 font-semibold mb-2">
              🚀 Para compilar e executar:
            </p>
            <code className="text-xs text-indigo-800 block bg-indigo-100 p-3 rounded font-mono">
              cd c-implementation
              <br />
              make run_hash
            </code>
          </div>
        </div>
      </div>
    </Card>
  );
}
