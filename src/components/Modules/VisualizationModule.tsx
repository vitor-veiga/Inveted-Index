import { ModuleLayout } from "../Layout/ModuleLayout";
import { IndexVisualization } from "../IndexVisualization/IndexVisualization";
import type { IndexEntry } from "../../lib/inverted-index/types";

interface VisualizationModuleProps {
  entries: IndexEntry[];
  onComplete: () => void;
  onNext: () => void;
  onPrevious: () => void;
  isCompleted: boolean;
  moduleNumber: number;
  totalModules: number;
}

export function VisualizationModule({
  entries,
  onComplete,
  onNext,
  onPrevious,
  isCompleted,
  moduleNumber,
  totalModules,
}: VisualizationModuleProps) {
  return (
    <ModuleLayout
      title="Visualização da Estrutura"
      subtitle="Explore como o índice invertido organiza termos e documentos"
      moduleNumber={moduleNumber}
      totalModules={totalModules}
      onPrevious={onPrevious}
      onNext={onNext}
      onComplete={onComplete}
      isCompleted={isCompleted}
    >
      {/* Introdução */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-3xl">📊</span>
          Entendendo a Estrutura
        </h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          Abaixo você pode ver a estrutura completa do índice invertido. Cada
          linha representa um <strong>termo</strong> e as colunas mostram:
        </p>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-bold">•</span>
            <span>
              <strong>Termo:</strong> A palavra indexada
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-bold">•</span>
            <span>
              <strong>Frequência:</strong> Quantas vezes aparece em todos os
              documentos
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-bold">•</span>
            <span>
              <strong>Documentos:</strong> Lista de IDs dos documentos que
              contêm o termo
            </span>
          </li>
        </ul>
      </div>

      {/* Visualização */}
      <IndexVisualization entries={entries} />

      {/* Explicação Técnica Detalhada */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-2xl">🔬</span>
          Explicação Técnica Detalhada
        </h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-gray-900 mb-3 text-lg">
              Estrutura Interna
            </h4>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Um índice invertido é composto por três componentes principais que
              trabalham em conjunto para fornecer busca eficiente:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 border-2 border-blue-300 rounded-xl">
                <h5 className="font-bold text-blue-700 mb-2">1. Dictionary</h5>
                <p className="text-sm text-blue-800 mb-3">
                  Estrutura que armazena todos os termos únicos. Implementada
                  como hash table para O(1).
                </p>
                <code className="text-xs bg-blue-100 p-2 rounded block text-blue-700">
                  {'{\n  "hash": &PostingList\n}'}
                </code>
              </div>
              <div className="p-4 bg-purple-50 border-2 border-purple-300 rounded-xl">
                <h5 className="font-bold text-purple-700 mb-2">2. Postings</h5>
                <p className="text-sm text-purple-800 mb-3">
                  Listas que armazenam docs onde cada termo aparece, ordenados
                  por ID.
                </p>
                <code className="text-xs bg-purple-100 p-2 rounded block text-purple-700">
                  {"[Doc1, Doc3, Doc5]"}
                </code>
              </div>
              <div className="p-4 bg-green-50 border-2 border-green-300 rounded-xl">
                <h5 className="font-bold text-green-700 mb-2">3. Metadados</h5>
                <p className="text-sm text-green-800 mb-3">
                  Frequências (TF), posições, estatísticas globais (IDF).
                </p>
                <code className="text-xs bg-green-100 p-2 rounded block text-green-700">
                  {"{\n  df: 3,\n  idf: 0.52\n}"}
                </code>
              </div>
            </div>
          </div>

          <div className="p-6 bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <h4 className="font-bold text-gray-900 mb-3">
              🧮 Algoritmo de Construção
            </h4>
            <pre className="bg-white text-gray-800 p-4 rounded-lg overflow-x-auto text-sm border border-gray-200">
              {`function buildIndex(documents):
    index = new HashTable()
    
    for each doc in documents:
        tokens = tokenize(doc.content)
        
        for each token in tokens:
            term = normalize(token)
            
            if not index.has(term):
                index.set(term, new PostingList())
            
            index.get(term).add(doc.id)
    
    return index

// Complexidade: O(n × m)`}
            </pre>
          </div>
        </div>
      </div>

      {/* Análise de Complexidade */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-2xl">📊</span>
          Análise de Complexidade
        </h3>
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-xl">
            <thead className="bg-linear-to-r from-indigo-100 to-purple-100">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                  Operação
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                  Tempo
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase hidden sm:table-cell">
                  Espaço
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-gray-900 text-sm">
                  Lookup
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-green-700 font-mono font-bold text-sm">
                  O(1)
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-600 font-mono text-sm hidden sm:table-cell">
                  -
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-gray-900 text-sm">
                  Insert
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-yellow-700 font-mono text-sm">
                  O(m)
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-600 font-mono text-sm hidden sm:table-cell">
                  -
                </td>
              </tr>
              <tr>
                <td className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-gray-900 text-sm">
                  Boolean AND
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-green-700 font-mono text-sm">
                  O(k₁+k₂)
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-600 font-mono text-sm hidden sm:table-cell">
                  -
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-gray-900 text-sm">
                  Espaço
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-yellow-700 font-mono font-bold text-sm">
                  O(n×m+t)
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-600 font-mono text-sm hidden sm:table-cell">
                  O(n×m)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Conceitos */}
      <div className="bg-blue-50 border-2 border-blue-300 rounded-2xl p-8">
        <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
          <span className="text-2xl">💡</span>
          Conceitos-chave
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold text-blue-700 mb-2">🔑 Termo (Key)</h4>
            <p className="text-sm text-blue-800 leading-relaxed">
              É a palavra que foi normalizada (lowercase, sem pontuação) e serve
              como chave de acesso ao índice.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-blue-700 mb-2">📝 Posting List</h4>
            <p className="text-sm text-blue-800 leading-relaxed">
              Lista encadeada que armazena todos os documentos onde o termo
              aparece, permitindo acesso rápido.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-blue-700 mb-2">🔢 Frequência (TF)</h4>
            <p className="text-sm text-blue-800 leading-relaxed">
              Term Frequency indica a relevância do termo. Quanto maior a
              frequência, mais importante ele pode ser para aquele documento.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-blue-700 mb-2">⚡ Acesso O(1)</h4>
            <p className="text-sm text-blue-800 leading-relaxed">
              Com hash table, o acesso a qualquer termo é praticamente
              instantâneo, independente do tamanho do índice.
            </p>
          </div>
        </div>
      </div>
    </ModuleLayout>
  );
}
