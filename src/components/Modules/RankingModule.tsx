import { ModuleLayout } from "../Layout/ModuleLayout";
import { TFIDFRanking } from "../TFIDFRanking/TFIDFRanking";
import type { InvertedIndex } from "../../lib/inverted-index/InvertedIndex";

interface RankingModuleProps {
  index: InvertedIndex;
  onComplete: () => void;
  onNext: () => void;
  onPrevious: () => void;
  isCompleted: boolean;
  moduleNumber: number;
  totalModules: number;
}

export function RankingModule({
  index,
  onComplete,
  onNext,
  onPrevious,
  isCompleted,
  moduleNumber,
  totalModules,
}: RankingModuleProps) {
  return (
    <ModuleLayout
      title="Ranking com TF-IDF"
      subtitle="Aprenda como os documentos são ordenados por relevância"
      moduleNumber={moduleNumber}
      totalModules={totalModules}
      onPrevious={onPrevious}
      onNext={onNext}
      onComplete={onComplete}
      isCompleted={isCompleted}
    >
      {/* Introdução ao TF-IDF */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-3xl">📈</span>O que é TF-IDF?
        </h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          <strong>TF-IDF</strong> (Term Frequency-Inverse Document Frequency) é
          uma métrica que mede a <strong>relevância</strong> de um termo em um
          documento dentro de uma coleção. Combina dois fatores:
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-blue-50 border-2 border-blue-300 rounded-xl">
            <h4 className="font-bold text-blue-700 mb-3 text-lg">
              TF (Term Frequency)
            </h4>
            <div className="bg-blue-100 p-4 rounded-lg border border-blue-300 mb-4">
              <code className="text-sm text-blue-700">
                TF = (vezes que o termo aparece) / (total de termos no doc)
              </code>
            </div>
            <p className="text-sm text-blue-800 leading-relaxed">
              Mede a <strong>frequência do termo</strong> no documento. Quanto
              mais vezes aparece, maior o TF.
            </p>
          </div>

          <div className="p-6 bg-purple-50 border-2 border-purple-300 rounded-xl">
            <h4 className="font-bold text-purple-700 mb-3 text-lg">
              IDF (Inverse Document Frequency)
            </h4>
            <div className="bg-purple-100 p-4 rounded-lg border border-purple-300 mb-4">
              <code className="text-sm text-purple-700">
                IDF = log(total de docs / docs que contêm o termo)
              </code>
            </div>
            <p className="text-sm text-purple-800 leading-relaxed">
              Mede a <strong>raridade do termo</strong>. Termos raros têm IDF
              maior que termos comuns.
            </p>
          </div>
        </div>

        <div className="mt-6 p-6 bg-green-50 border-2 border-green-300 rounded-xl">
          <h4 className="font-bold text-green-700 mb-3 text-lg flex items-center gap-2">
            <span>🎯</span> Score Final
          </h4>
          <div className="bg-green-100 p-4 rounded-lg border border-green-300 mb-4">
            <code className="text-xl text-green-700 font-bold">
              TF-IDF = TF × IDF
            </code>
          </div>
          <p className="text-sm text-green-800 leading-relaxed">
            Documentos com <strong>maior TF-IDF</strong> são considerados mais
            relevantes para a consulta. Termos frequentes em poucos documentos
            recebem scores altos.
          </p>
        </div>
      </div>

      {/* Componente TF-IDF */}
      <TFIDFRanking index={index} />

      {/* Por que TF-IDF funciona */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-2xl">💡</span>
          Por que TF-IDF Funciona?
        </h3>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
              <span className="text-2xl">✅</span>
            </div>
            <div>
              <div className="font-bold text-gray-900 mb-1">
                Penaliza termos comuns
              </div>
              <p className="text-sm text-gray-700">
                Palavras como "o", "a", "de" aparecem em muitos documentos e têm
                IDF baixo, reduzindo sua influência no ranking.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 bg-green-50 bg-opacity-10 rounded-xl flex items-center justify-center shrink-0">
              <span className="text-2xl">✅</span>
            </div>
            <div>
              <div className="font-bold text-gray-900 mb-1">
                Valoriza termos específicos
              </div>
              <p className="text-sm text-gray-600">
                Termos técnicos ou raros que aparecem em poucos documentos
                recebem IDF alto, aumentando sua relevância.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 bg-green-50 bg-opacity-10 rounded-xl flex items-center justify-center shrink-0">
              <span className="text-2xl">✅</span>
            </div>
            <div>
              <div className="font-bold text-gray-900 mb-1">
                Considera frequência local
              </div>
              <p className="text-sm text-gray-600">
                Se um termo aparece muitas vezes em um documento específico (TF
                alto), provavelmente esse documento é muito relevante para esse
                termo.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fórmulas Matemáticas Detalhadas */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-2xl">🧮</span>
          Fórmulas Matemáticas
        </h3>

        <div className="space-y-6">
          {/* TF */}
          <div className="p-6 bg-blue-50 border-2 border-blue-300 rounded-xl">
            <h4 className="font-bold text-blue-700 mb-4">
              1. Term Frequency (TF)
            </h4>
            <div className="bg-gray-50 p-6 rounded-lg mb-4 border border-blue-300">
              <div className="text-center text-xl font-mono mb-3">
                TF(t, d) = freq(t, d) / total_terms(d)
              </div>
              <div className="text-sm text-gray-600 text-center">
                Onde freq(t, d) = frequência do termo <em>t</em> no documento{" "}
                <em>d</em>
              </div>
            </div>
            <p className="text-sm text-blue-700">
              <strong>Exemplo:</strong> Documento com 100 palavras onde
              "database" aparece 5 vezes:
              <br />
              TF("database") = 5 / 100 = <strong>0.05</strong>
            </p>
          </div>

          {/* IDF */}
          <div className="p-6 bg-purple-50 border-2 border-purple-300 rounded-xl">
            <h4 className="font-bold text-purple-700 mb-4">
              2. Inverse Document Frequency (IDF)
            </h4>
            <div className="bg-gray-50 p-6 rounded-lg mb-4 border border-purple-300">
              <div className="text-center text-xl font-mono mb-3">
                IDF(t, D) = log( total_docs / docs_with_term(t) )
              </div>
              <div className="text-sm text-gray-600 text-center">
                Onde total_docs = todos os documentos e docs_with_term(t) =
                documentos contendo <em>t</em>
              </div>
            </div>
            <p className="text-sm text-purple-700">
              <strong>Exemplo:</strong> Coleção com 1000 docs onde
              "elasticsearch" aparece em 10:
              <br />
              IDF("elasticsearch") = log(1000 / 10) = log(100) ≈{" "}
              <strong>2.0</strong>
              <br />
              <br />
              Termo comum "the" em 900 docs:
              <br />
              IDF("the") = log(1000 / 900) ≈ <strong>0.046</strong> (muito
              menor!)
            </p>
          </div>

          {/* TF-IDF Final */}
          <div className="p-6 bg-green-50 border-2 border-green-300 rounded-xl">
            <h4 className="font-bold text-green-700 mb-4">
              3. Score TF-IDF Final
            </h4>
            <div className="bg-gray-50 p-6 rounded-lg mb-4 border border-green-300">
              <div className="text-center text-xl font-mono mb-3">
                TF-IDF(t, d, D) = TF(t, d) × IDF(t, D)
              </div>
            </div>
            <p className="text-sm text-green-700 mb-4">
              <strong>Exemplo completo:</strong> Calcular relevância de
              "elasticsearch" no documento D5
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border border-green-300 space-y-2 text-sm font-mono">
              <div>• TF = 5 / 100 = 0.05 (aparece 5x em 100 palavras)</div>
              <div>• IDF = log(1000 / 10) = 2.0 (raro, só 10 docs têm)</div>
              <div className="pt-2 border-t-2 border-green-300 font-bold text-green-700">
                → TF-IDF = 0.05 × 2.0 = <span className="text-lg">0.10</span> ✓
              </div>
            </div>
          </div>

          {/* Ranking de Query */}
          <div className="p-6 bg-orange-50 border-2 border-orange-300 rounded-xl">
            <h4 className="font-bold text-orange-900 mb-4">
              4. Ranking para Consultas com Múltiplos Termos
            </h4>
            <div className="bg-gray-50 p-6 rounded-lg mb-4 border border-orange-300">
              <div className="text-center text-xl font-mono mb-3">
                Score(q, d) = Σ TF-IDF(t, d) para cada termo t em q
              </div>
              <div className="text-sm text-gray-600 text-center">
                Somar TF-IDF de cada termo da query <em>q</em> no documento{" "}
                <em>d</em>
              </div>
            </div>
            <p className="text-sm text-orange-700 mb-4">
              <strong>Exemplo:</strong> Query "machine learning algorithms"
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border border-orange-300">
              <table className="w-full text-xs">
                <thead className="border-b-2 border-orange-300">
                  <tr className="text-left">
                    <th className="py-2">Termo</th>
                    <th>TF (Doc1)</th>
                    <th>IDF</th>
                    <th>TF-IDF</th>
                  </tr>
                </thead>
                <tbody className="font-mono">
                  <tr className="border-b border-orange-300">
                    <td className="py-2">machine</td>
                    <td>0.02</td>
                    <td>1.5</td>
                    <td>0.030</td>
                  </tr>
                  <tr className="border-b border-orange-300">
                    <td className="py-2">learning</td>
                    <td>0.03</td>
                    <td>1.8</td>
                    <td>0.054</td>
                  </tr>
                  <tr className="border-b border-orange-300">
                    <td className="py-2">algorithms</td>
                    <td>0.01</td>
                    <td>2.2</td>
                    <td>0.022</td>
                  </tr>
                  <tr className="font-bold text-orange-900 bg-orange-100">
                    <td className="py-2" colSpan={3}>
                      Score Total
                    </td>
                    <td>0.106</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Referências Bibliográficas */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-2xl">📚</span>
          Referências Bibliográficas
        </h3>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <strong>Salton, G., & Buckley, C. (1988).</strong> "Term-weighting
            approaches in automatic text retrieval."
            <em> Information Processing & Management</em>, 24(5), 513-523.
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <strong>Manning, C. D., Raghavan, P., & Schütze, H. (2008).</strong>{" "}
            <em>Introduction to Information Retrieval</em>. Cambridge University
            Press. (Capítulo 6: Scoring and ranking)
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <strong>Baeza-Yates, R., & Ribeiro-Neto, B. (2011).</strong>{" "}
            <em>Modern Information Retrieval</em> (2nd ed.). Addison-Wesley.
            (Seção 3.3: Vector space model)
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-300">
            <strong>🌐 Recursos Online:</strong>
            <ul className="mt-2 ml-4 space-y-1 list-disc">
              <li>
                Wikipedia:{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Tf%E2%80%93idf"
                  className="text-blue-600 underline"
                >
                  TF-IDF
                </a>
              </li>
              <li>
                Elasticsearch Guide:{" "}
                <a
                  href="https://www.elastic.co/guide/en/elasticsearch/guide/current/scoring-theory.html"
                  className="text-blue-600 underline"
                >
                  Scoring Theory
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Aplicações */}
      <div className="bg-indigo-900 border-2 border-indigo-800 rounded-2xl p-8">
        <h3 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
          <span className="text-2xl">🌐</span>
          Uso no Mundo Real
        </h3>
        <p className="text-sm text-indigo-300 mb-4 leading-relaxed">
          TF-IDF é amplamente usado em:
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              icon: "🔍",
              title: "Motores de Busca",
              desc: "Google, Bing (com modificações)",
            },
            {
              icon: "📧",
              title: "Filtros de Spam",
              desc: "Identificar palavras suspeitas",
            },
            {
              icon: "🤖",
              title: "Machine Learning",
              desc: "Feature extraction para NLP",
            },
          ].map((app) => (
            <div
              key={app.title}
              className="p-4 bg-gray-50 rounded-xl border border-indigo-800"
            >
              <div className="text-3xl mb-2">{app.icon}</div>
              <div className="font-bold text-indigo-900 text-sm mb-1">
                {app.title}
              </div>
              <div className="text-xs text-indigo-500">{app.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </ModuleLayout>
  );
}
