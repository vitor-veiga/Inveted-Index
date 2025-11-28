import { ModuleLayout } from "../Layout/ModuleLayout";
import { SearchDemo } from "../SearchDemo/SearchDemo";
import type { SearchResult } from "../../lib/inverted-index/types";

interface SearchModuleProps {
  onSearch: (query: string) => void;
  results: SearchResult[];
  isSearching: boolean;
  onComplete: () => void;
  onNext: () => void;
  onPrevious: () => void;
  isCompleted: boolean;
  moduleNumber: number;
  totalModules: number;
}

export function SearchModule({
  onSearch,
  results,
  isSearching,
  onComplete,
  onNext,
  onPrevious,
  isCompleted,
  moduleNumber,
  totalModules,
}: SearchModuleProps) {
  return (
    <ModuleLayout
      title="Busca Interativa"
      subtitle="Experimente buscas booleanas e veja os resultados em tempo real"
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
          <span className="text-3xl">🔍</span>
          Como Funciona a Busca
        </h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          O índice invertido permite buscas extremamente rápidas. Digite um
          termo ou combine múltiplos termos usando operadores booleanos:
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-green-50 border-2 border-green-300 rounded-xl">
            <div className="font-bold text-green-700 mb-2">AND (E)</div>
            <code className="text-sm text-green-700">hash AND table</code>
            <p className="text-xs text-green-600 mt-2">
              Documentos que contêm AMBOS os termos
            </p>
          </div>
          <div className="p-4 bg-blue-50 border-2 border-blue-300 rounded-xl">
            <div className="font-bold text-blue-700 mb-2">OR (OU)</div>
            <code className="text-sm text-blue-700">hash OR table</code>
            <p className="text-xs text-blue-600 mt-2">
              Documentos que contêm QUALQUER um dos termos
            </p>
          </div>
          <div className="p-4 bg-red-50 border-2 border-red-300 rounded-xl">
            <div className="font-bold text-red-700 mb-2">NOT (NÃO)</div>
            <code className="text-sm text-red-700">hash NOT linear</code>
            <p className="text-xs text-red-600 mt-2">
              Documentos com "hash" mas SEM "linear"
            </p>
          </div>
        </div>

        <div className="bg-yellow-50 border-2 border-l-4 border-yellow-500 p-4 rounded-r-xl">
          <p className="text-sm text-yellow-800">
            <strong>💡 Dica:</strong> Experimente diferentes combinações! Por
            exemplo:
            <code className="ml-2 px-2 py-1 bg-yellow-100 rounded">
              (hash OR table) AND busca
            </code>
          </p>
        </div>
      </div>

      {/* Componente de Busca */}
      <SearchDemo
        onSearch={onSearch}
        results={results}
        isSearching={isSearching}
      />

      {/* Exemplos de Código Comentados */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-2xl">💻</span>
          Exemplos de Código Comentados
        </h3>

        <div className="space-y-6">
          {/* Busca AND */}
          <div>
            <h4 className="font-bold text-gray-900 mb-3">
              🔗 Operação AND (Interseção)
            </h4>
            <pre className="bg-gray-800 text-white p-6 rounded-xl overflow-x-auto text-sm leading-relaxed">
              {`// Busca documentos que contêm AMBOS os termos
function booleanAND(term1, term2, index) {
    // 1. Buscar postings de cada termo - O(1) cada
    const list1 = index.get(term1);  // Ex: [1, 3, 5, 7, 9]
    const list2 = index.get(term2);  // Ex: [2, 3, 6, 7, 10]
    
    if (!list1 || !list2) return [];  // Termo não existe
    
    // 2. Interseção usando merge (lists ordenadas)
    const result = [];
    let i = 0, j = 0;
    
    // 3. Percorrer ambas as listas simultaneamente - O(k1 + k2)
    while (i < list1.length && j < list2.length) {
        if (list1[i] === list2[j]) {
            result.push(list1[i]);  // Documento em ambas! ✓
            i++; j++;
        } else if (list1[i] < list2[j]) {
            i++;  // Avançar na primeira lista
        } else {
            j++;  // Avançar na segunda lista
        }
    }
    
    return result;  // Ex: [3, 7] - docs que têm ambos
}

// Complexidade: O(k1 + k2) onde k = tamanho das posting lists
// Muito mais rápido que busca linear O(n × m)!`}
            </pre>
          </div>

          {/* Busca OR */}
          <div>
            <h4 className="font-bold text-gray-900 mb-3">
              ➕ Operação OR (União)
            </h4>
            <pre className="bg-gray-800 text-white p-6 rounded-xl overflow-x-auto text-sm leading-relaxed">
              {`// Busca documentos que contêm PELO MENOS UM dos termos
function booleanOR(term1, term2, index) {
    const list1 = index.get(term1) || [];
    const list2 = index.get(term2) || [];
    
    // União de listas ordenadas (sem duplicatas)
    const result = [];
    let i = 0, j = 0;
    
    while (i < list1.length && j < list2.length) {
        if (list1[i] === list2[j]) {
            result.push(list1[i]);  // Aparece em ambas
            i++; j++;
        } else if (list1[i] < list2[j]) {
            result.push(list1[i]);  // Só na primeira
            i++;
        } else {
            result.push(list2[j]);  // Só na segunda
            j++;
        }
    }
    
    // Adicionar elementos restantes
    while (i < list1.length) result.push(list1[i++]);
    while (j < list2.length) result.push(list2[j++]);
    
    return result;
}

// Exemplo:
// list1 = [1, 3, 5]
// list2 = [2, 3, 6]
// result = [1, 2, 3, 5, 6] ✓`}
            </pre>
          </div>

          {/* Busca NOT */}
          <div>
            <h4 className="font-bold text-gray-900 mb-3">
              ➖ Operação NOT (Diferença)
            </h4>
            <pre className="bg-gray-800 text-white p-6 rounded-xl overflow-x-auto text-sm leading-relaxed">
              {`// Busca documentos com term1 MAS SEM term2
function booleanNOT(term1, term2, index) {
    const list1 = index.get(term1) || [];
    const list2 = index.get(term2) || [];
    
    // Diferença de conjuntos
    const result = [];
    let i = 0, j = 0;
    
    while (i < list1.length) {
        // Se não há mais docs em list2 ou doc atual < próximo de list2
        if (j >= list2.length || list1[i] < list2[j]) {
            result.push(list1[i]);  // Incluir (não está em list2)
            i++;
        } 
        else if (list1[i] === list2[j]) {
            i++; j++;  // Pular (está em list2, excluir)
        } 
        else {
            j++;  // Avançar em list2
        }
    }
    
    return result;
}

// Exemplo: "database NOT nosql"
// database: [1, 2, 3, 5, 7]
// nosql:    [2, 5, 8]
// result:   [1, 3, 7] - docs com database mas sem nosql`}
            </pre>
          </div>
        </div>
      </div>

      {/* Aplicações Práticas */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-2xl">🌍</span>
          Aplicações Práticas
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              icon: "🔍",
              title: "Motores de Busca Web",
              desc: "Google, Bing processam milhões de queries/segundo",
              example: '"machine learning" AND python NOT "deep learning"',
            },
            {
              icon: "📧",
              title: "Sistemas de E-mail",
              desc: "Gmail, Outlook usam para busca instantânea",
              example: "from:joao AND has:attachment",
            },
            {
              icon: "📚",
              title: "Bibliotecas Digitais",
              desc: "Pesquisa acadêmica em milhões de papers",
              example: 'title:"neural networks" AND year:2020',
            },
            {
              icon: "💼",
              title: "Sistemas Corporativos",
              desc: "Confluence, SharePoint, Jira",
              example: "status:open AND priority:high",
            },
            {
              icon: "🛒",
              title: "E-commerce",
              desc: "Amazon, Mercado Livre - busca de produtos",
              example: "laptop AND (ssd OR nvme) NOT refurbished",
            },
            {
              icon: "🎵",
              title: "Streaming",
              desc: "Spotify, YouTube - metadados de mídia",
              example: 'artist:"Pink Floyd" AND album:"The Wall"',
            },
          ].map((app, idx) => (
            <div
              key={idx}
              className="p-6 border-2 border-gray-200 rounded-xl hover:shadow-lg transition-all"
            >
              <div className="text-4xl mb-3">{app.icon}</div>
              <h4 className="font-bold text-gray-900 mb-2">{app.title}</h4>
              <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                {app.desc}
              </p>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <code className="text-xs text-gray-700">{app.example}</code>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Explicação Técnica */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-2xl">⚙️</span>
          Como a Busca é Processada
        </h3>
        <ol className="space-y-4">
          <li className="flex gap-4">
            <div className="w-8 h-8 bg-indigo-900 bg-opacity-10 rounded-full flex items-center justify-center shrink-0">
              <span className="font-bold text-slate-300">1</span>
            </div>
            <div>
              <div className="font-bold text-gray-900 mb-1">Tokenização</div>
              <p className="text-sm text-gray-600">
                A consulta é dividida em termos individuais e normalizada
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <div className="w-8 h-8 bg-indigo-900 bg-opacity-10 rounded-full flex items-center justify-center shrink-0">
              <span className="font-bold text-slate-300">2</span>
            </div>
            <div>
              <div className="font-bold text-gray-900 mb-1">
                Busca no Índice
              </div>
              <p className="text-sm text-gray-600">
                Cada termo é buscado na hash table em O(1)
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <div className="w-8 h-8 bg-indigo-900 bg-opacity-10 rounded-full flex items-center justify-center shrink-0">
              <span className="font-bold text-slate-300">3</span>
            </div>
            <div>
              <div className="font-bold text-gray-900 mb-1">
                Operações Booleanas
              </div>
              <p className="text-sm text-gray-600">
                As posting lists são combinadas com AND/OR/NOT
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <div className="w-8 h-8 bg-indigo-900 bg-opacity-10 rounded-full flex items-center justify-center shrink-0">
              <span className="font-bold text-slate-300">4</span>
            </div>
            <div>
              <div className="font-bold text-gray-900 mb-1">
                Retorno dos Resultados
              </div>
              <p className="text-sm text-gray-600">
                Documentos que satisfazem a consulta são retornados
              </p>
            </div>
          </li>
        </ol>
      </div>
    </ModuleLayout>
  );
}
