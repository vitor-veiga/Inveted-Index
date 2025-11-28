import { ModuleLayout } from "../Layout/ModuleLayout";
import { DocumentCollection } from "../DocumentCollection/DocumentCollection";
import type { Document } from "../../lib/inverted-index/types";

interface IntroductionProps {
  onComplete: () => void;
  onNext: () => void;
  isCompleted: boolean;
  moduleNumber: number;
  totalModules: number;
  documents?: Document[];
}

export function Introduction({
  onComplete,
  onNext,
  isCompleted,
  moduleNumber,
  totalModules,
  documents = [],
}: IntroductionProps) {
  return (
    <ModuleLayout
      title="Bem-vindo aos Índices Invertidos"
      subtitle="Descubra a estrutura de dados por trás dos motores de busca modernos"
      moduleNumber={moduleNumber}
      totalModules={totalModules}
      onNext={onNext}
      onComplete={onComplete}
      isCompleted={isCompleted}
    >
      {/* Hero Section */}
      <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-gray-900 shadow-2xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="text-6xl">🔍</div>
          <div>
            <h2 className="text-3xl font-bold mb-2 text-white">
              O que você vai aprender?
            </h2>
            <p className="text-indigo-100 text-lg">
              Uma jornada completa pelo mundo dos índices invertidos
            </p>
          </div>
        </div>
      </div>

      {/* Objetivos */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <span className="text-3xl">🎯</span>
          Objetivos de Aprendizagem
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              icon: "📚",
              title: "Entender a Estrutura",
              description:
                "Compreender como índices invertidos organizam dados para busca eficiente",
            },
            {
              icon: "⚡",
              title: "Análise de Performance",
              description:
                "Comparar complexidade O(1) vs O(n) em cenários reais",
            },
            {
              icon: "🔨",
              title: "Implementação Prática",
              description: "Explorar código C com hash tables e posting lists",
            },
            {
              icon: "🌐",
              title: "Aplicações Reais",
              description:
                "Descobrir como Google, Elasticsearch e outros utilizam essa tecnologia",
            },
          ].map((obj, idx) => (
            <div
              key={idx}
              className="p-6 border-2 border-gray-200 rounded-xl hover:border-indigo-800 hover:shadow-lg transition-all"
            >
              <div className="text-4xl mb-3">{obj.icon}</div>
              <h4 className="font-bold text-gray-900 mb-2">{obj.title}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {obj.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* O que são Índices Invertidos */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <span className="text-3xl">💡</span>O que são Índices Invertidos?
        </h3>
        <div className="space-y-6">
          <p className="text-gray-700 leading-relaxed text-lg">
            Um <strong>índice invertido</strong> é uma estrutura de dados
            fundamental em recuperação de informação que mapeia{" "}
            <strong>termos → documentos</strong>, invertendo a relação
            tradicional de documentos → termos.
          </p>

          <div className="bg-blue-50 border-2 border-l-4 border-blue-500 p-6 rounded-r-xl">
            <h4 className="font-bold text-blue-700 mb-3 flex items-center gap-2">
              <span>📖</span> Analogia
            </h4>
            <p className="text-blue-700 leading-relaxed">
              Imagine o <strong>índice remissivo</strong> de um livro: em vez de
              ler página por página procurando uma palavra, você consulta o
              índice que mostra exatamente em quais páginas aquela palavra
              aparece. Índices invertidos fazem o mesmo para documentos
              digitais!
            </p>
          </div>

          {/* Comparação Visual */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Tradicional */}
            <div className="p-6 bg-red-50 border-2 border-red-300 rounded-xl">
              <h4 className="font-bold text-red-700 mb-4 flex items-center gap-2">
                <span>❌</span> Abordagem Tradicional
              </h4>
              <div className="space-y-2 text-sm">
                <div className="p-3 bg-gray-50 rounded border border-red-300">
                  <div className="font-semibold text-gray-900">Doc 1:</div>
                  <div className="text-gray-600">
                    "hash table permite busca rápida"
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded border border-red-300">
                  <div className="font-semibold text-gray-900">Doc 2:</div>
                  <div className="text-gray-600">
                    "índices invertidos para busca"
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded border border-red-300">
                  <div className="font-semibold text-gray-900">Doc 3:</div>
                  <div className="text-gray-600">
                    "busca linear é ineficiente"
                  </div>
                </div>
              </div>
              <p className="mt-4 text-xs text-red-700 font-semibold">
                ⏱️ Busca: O(n × m) - Precisa ler todos os documentos
              </p>
            </div>

            {/* Com Índice */}
            <div className="p-6 bg-green-50 border-2 border-green-300 rounded-xl">
              <h4 className="font-bold text-green-700 mb-4 flex items-center gap-2">
                <span>✅</span> Com Índice Invertido
              </h4>
              <div className="space-y-2 text-sm">
                <div className="p-3 bg-gray-50 rounded border border-green-300">
                  <div className="font-semibold text-gray-900">busca →</div>
                  <div className="text-gray-600">[Doc 1, Doc 2, Doc 3]</div>
                </div>
                <div className="p-3 bg-gray-50 rounded border border-green-300">
                  <div className="font-semibold text-gray-900">hash →</div>
                  <div className="text-gray-600">[Doc 1]</div>
                </div>
                <div className="p-3 bg-gray-50 rounded border border-green-300">
                  <div className="font-semibold text-gray-900">índices →</div>
                  <div className="text-gray-600">[Doc 2]</div>
                </div>
              </div>
              <p className="mt-4 text-xs text-green-700 font-semibold">
                ⚡ Busca: O(1) - Acesso direto aos documentos!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pré-requisitos */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <span className="text-3xl">📋</span>
          Pré-requisitos
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              icon: "🔗",
              title: "Listas Encadeadas",
              level: "Básico",
              color: "text-green-700",
              background: "bg-green-50",
            },
            {
              icon: "#️⃣",
              title: "Hash Tables",
              level: "Intermediário",
              color: "text-yellow-700",
              background: "bg-yellow-50",
            },
            {
              icon: "📊",
              title: "Big O Notation",
              level: "Básico",
              color: "text-green-700",
              background: "bg-green-50",
            },
          ].map((req, idx) => (
            <div
              key={idx}
              className="p-4 border border-gray-200 rounded-xl text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-2">{req.icon}</div>
              <div className="font-bold text-gray-900 text-sm mb-1">
                {req.title}
              </div>
              <span
                className={`px-2 py-1 ${req.background} bg-opacity-10 ${req.color} text-xs rounded-full`}
              >
                {req.level}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Contexto Histórico */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <span className="text-3xl">📜</span>
          Contexto Histórico
        </h3>
        <div className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-indigo-900 bg-opacity-10 text-indigo-300 font-bold rounded-full text-sm">
                Anos 1950-60
              </span>
              <h4 className="font-bold text-gray-900">Primeiros Sistemas</h4>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              Os primeiros índices invertidos foram desenvolvidos para
              bibliotecas digitais e sistemas de recuperação de informação. Hans
              Peter Luhn (IBM) foi pioneiro em técnicas de indexação automática.
            </p>
          </div>

          <div className="border-l-4 border-purple-500 pl-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-purple-50 bg-opacity-10 text-purple-700 font-bold rounded-full text-sm">
                Anos 1990
              </span>
              <h4 className="font-bold text-gray-900">Era da Web</h4>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              Com a explosão da World Wide Web, índices invertidos se tornaram
              essenciais. Motores de busca como AltaVista e posteriormente
              Google revolucionaram a busca usando índices invertidos massivos
              combinados com algoritmos de ranking.
            </p>
          </div>

          <div className="border-l-4 border-green-500 pl-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-green-50 bg-opacity-10 text-green-700 font-bold rounded-full text-sm">
                Anos 2000+
              </span>
              <h4 className="font-bold text-gray-900">Escala Moderna</h4>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              Sistemas como Apache Lucene (2000) e Elasticsearch (2010)
              democratizaram o uso de índices invertidos. Hoje, bilhões de
              documentos são indexados diariamente usando essas técnicas.
            </p>
          </div>
        </div>
      </div>

      {/* Comparação com Outras Estruturas */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <span className="text-3xl">⚖️</span>
          Comparação com Outras Estruturas
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700 border border-gray-200 rounded-xl">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                  Estrutura
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                  Busca
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                  Inserção
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                  Melhor Uso
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-700">
              <tr className="bg-green-50">
                <td className="px-6 py-4 font-bold text-green-700">
                  Índice Invertido
                </td>
                <td className="px-6 py-4 text-green-600 font-mono">O(1)</td>
                <td className="px-6 py-4 text-yellow-600 font-mono">O(m)</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  Busca full-text em grandes volumes
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-semibold text-gray-900">
                  Árvore B/B+
                </td>
                <td className="px-6 py-4 text-yellow-600 font-mono">
                  O(log n)
                </td>
                <td className="px-6 py-4 text-yellow-600 font-mono">
                  O(log n)
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  Dados ordenados, range queries
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 font-semibold text-gray-900">
                  Trie (Prefix Tree)
                </td>
                <td className="px-6 py-4 text-yellow-600 font-mono">O(k)</td>
                <td className="px-6 py-4 text-yellow-600 font-mono">O(k)</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  Autocompletar, prefixos
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-semibold text-gray-900">
                  Busca Linear
                </td>
                <td className="px-6 py-4 text-red-600 font-mono">O(n×m)</td>
                <td className="px-6 py-4 text-green-600 font-mono">O(1)</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  Datasets pequenos, sem pré-processamento
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-600 mt-4">
          <strong>Nota:</strong> n = documentos, m = tamanho médio, k = tamanho
          da chave
        </p>
      </div>

      {/* Referências Bibliográficas */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-700 mb-6 flex items-center gap-3">
          <span className="text-3xl">📚</span>
          Referências Bibliográficas
        </h3>
        <div className="space-y-4">
          {[
            {
              title: "Introduction to Information Retrieval",
              authors: "Manning, C. D., Raghavan, P., & Schütze, H.",
              year: "2008",
              publisher: "Cambridge University Press",
              note: "Capítulos 1-5 cobrem índices invertidos em profundidade",
            },
            {
              title:
                "Managing Gigabytes: Compressing and Indexing Documents and Images",
              authors: "Witten, I. H., Moffat, A., & Bell, T. C.",
              year: "1999",
              publisher: "Morgan Kaufmann",
              note: "Técnicas de compressão para índices invertidos",
            },
            {
              title: "Modern Information Retrieval",
              authors: "Baeza-Yates, R., & Ribeiro-Neto, B.",
              year: "2011",
              publisher: "Addison Wesley",
              note: "Visão abrangente de sistemas de busca",
            },
            {
              title: "Lucene in Action",
              authors: "McCandless, M., Hatcher, E., & Gospodnetic, O.",
              year: "2010",
              publisher: "Manning Publications",
              note: "Implementação prática com Apache Lucene",
            },
          ].map((ref, idx) => (
            <div
              key={idx}
              className="p-4 border-l-4 border-indigo-300 bg-indigo-900 border-2 rounded-r-xl"
            >
              <div className="flex items-start gap-3">
                <span className="text-indigo-600 font-bold text-lg">
                  [{idx + 1}]
                </span>
                <div>
                  <p className="font-bold text-slate-300 mb-1">{ref.title}</p>
                  <p className="text-sm text-slate-300 mb-1">
                    {ref.authors} ({ref.year})
                  </p>
                  <p className="text-sm text-slate-400 mb-2">{ref.publisher}</p>
                  <p className="text-xs text-indigo-300 italic">{ref.note}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-300 rounded-xl">
          <h4 className="font-bold text-blue-700 mb-2 text-sm">
            🌐 Recursos Online:
          </h4>
          <ul className="space-y-1 text-sm text-blue-700">
            <li>• Stanford NLP Course - Lecture on Inverted Index</li>
            <li>• Apache Lucene Documentation (lucene.apache.org)</li>
            <li>• Google Research Papers on Search Infrastructure</li>
            <li>• Elasticsearch Guide - Index Internals</li>
          </ul>
        </div>
      </div>

      {/* Coleção de Documentos */}
      {documents && documents.length > 0 && (
        <DocumentCollection documents={documents} />
      )}

      {/* Call to Action */}
      <div className="bg-linear-to-r from-purple-100 to-pink-100 border-2 border-purple-300 rounded-2xl p-8">
        <div className="flex items-center gap-4">
          <div className="text-5xl">🚀</div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-purple-700 mb-2">
              Pronto para começar?
            </h3>
            <p className="text-purple-700 leading-relaxed">
              Este site é interativo e prático. Você vai visualizar estruturas,
              experimentar buscas, ver animações e até explorar código C real!
            </p>
          </div>
        </div>
      </div>
    </ModuleLayout>
  );
}
