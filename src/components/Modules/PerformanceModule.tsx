import { ModuleLayout } from "../Layout/ModuleLayout";
import { PerformanceComparison } from "../Comparison/PerformanceComparison";
import type { PerformanceMetrics } from "../../lib/inverted-index/types";

interface PerformanceModuleProps {
  onCompare: (query: string) => Promise<{
    linear: PerformanceMetrics;
    indexed: PerformanceMetrics;
  }>;
  onCompareWithSize?: (
    query: string,
    size: number
  ) => Promise<{
    linear: PerformanceMetrics;
    indexed: PerformanceMetrics;
  }>;
  onComplete: () => void;
  onNext: () => void;
  onPrevious: () => void;
  isCompleted: boolean;
  moduleNumber: number;
  totalModules: number;
}

export function PerformanceModule({
  onCompare,
  onCompareWithSize,
  onComplete,
  onNext,
  onPrevious,
  isCompleted,
  moduleNumber,
  totalModules,
}: PerformanceModuleProps) {
  return (
    <ModuleLayout
      title="Comparação de Performance"
      subtitle="Veja a diferença dramática entre busca linear e índice invertido"
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
          <span className="text-3xl">⚡</span>O Poder dos Índices Invertidos
        </h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          A principal vantagem dos índices invertidos é a{" "}
          <strong>velocidade</strong>. Vamos comparar duas abordagens para
          buscar um termo:
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Busca Linear */}
          <div className="p-6 bg-red-50 border-2 border-red-300 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-4xl">🐌</div>
              <div>
                <h4 className="font-bold text-red-700 text-lg">Busca Linear</h4>
                <code className="text-sm text-red-600">O(n × m)</code>
              </div>
            </div>
            <ol className="space-y-2 text-sm text-red-800">
              <li className="flex gap-2">
                <span className="font-bold">1.</span>
                <span>Lê o primeiro documento inteiro</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold">2.</span>
                <span>Procura o termo palavra por palavra</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold">3.</span>
                <span>Repete para TODOS os documentos</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold">4.</span>
                <span>Retorna resultados</span>
              </li>
            </ol>
            <div className="mt-4 p-3 bg-red-100 rounded-lg">
              <p className="text-xs text-red-700 font-semibold">
                ⏱️ Para 1.000.000 docs: ~segundos a minutos
              </p>
            </div>
          </div>

          {/* Índice Invertido */}
          <div className="p-6 bg-green-50 border-2 border-green-300 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-4xl">🚀</div>
              <div>
                <h4 className="font-bold text-green-700 text-lg">
                  Índice Invertido
                </h4>
                <code className="text-sm text-green-600">O(1)</code>
              </div>
            </div>
            <ol className="space-y-2 text-sm text-green-800">
              <li className="flex gap-2">
                <span className="font-bold">1.</span>
                <span>Calcula hash do termo</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold">2.</span>
                <span>Acessa diretamente a posting list</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold">3.</span>
                <span>Retorna documentos instantaneamente</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold">4.</span>
                <span className="text-gray-600">---</span>
              </li>
            </ol>
            <div className="mt-4 p-3 bg-green-50 bg-opacity-10 rounded-lg">
              <p className="text-xs text-green-700 font-semibold">
                ⚡ Para 1.000.000 docs: ~milissegundos
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Comparação Interativa */}
      <PerformanceComparison
        onCompare={onCompare}
        onCompareWithSize={onCompareWithSize}
      />

      {/* Análise de Complexidade */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-2xl">📊</span>
          Análise de Complexidade
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700 border border-gray-200 rounded-xl">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                  Operação
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                  Busca Linear
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                  Índice Invertido
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                  Vantagem
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-700">
              <tr>
                <td className="px-6 py-4 font-semibold text-gray-900">Busca</td>
                <td className="px-6 py-4 text-red-600 font-mono">O(n × m)</td>
                <td className="px-6 py-4 text-green-600 font-mono">O(1)</td>
                <td className="px-6 py-4 text-green-700 font-bold">Índice</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 font-semibold text-gray-900">
                  Inserção
                </td>
                <td className="px-6 py-4 text-green-600 font-mono">O(1)</td>
                <td className="px-6 py-4 text-yellow-600 font-mono">O(m)</td>
                <td className="px-6 py-4 text-green-700 font-bold">Linear</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-semibold text-gray-900">
                  Espaço
                </td>
                <td className="px-6 py-4 text-green-600 font-mono">O(n × m)</td>
                <td className="px-6 py-4 text-yellow-600 font-mono">
                  O(n × m + t)
                </td>
                <td className="px-6 py-4 text-green-700 font-bold">Linear</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 grid md:grid-cols-3 gap-4 text-xs">
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-300">
            <code className="text-blue-700 font-bold">n</code>
            <span className="text-blue-700 ml-2">= número de documentos</span>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-300">
            <code className="text-blue-700 font-bold">m</code>
            <span className="text-blue-700 ml-2">
              = tamanho médio do documento
            </span>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-300">
            <code className="text-blue-700 font-bold">t</code>
            <span className="text-blue-700 ml-2">
              = número de termos únicos
            </span>
          </div>
        </div>
      </div>

      {/* Trade-offs */}
      <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-8">
        <h3 className="text-xl font-bold text-yellow-700 mb-4 flex items-center gap-2">
          <span className="text-2xl">⚖️</span>
          Trade-offs
        </h3>
        <p className="text-sm text-yellow-800 mb-4 leading-relaxed">
          Índices invertidos não são perfeitos. Existem trade-offs a considerar:
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-yellow-100 rounded-xl border border-yellow-300">
            <div className="font-bold text-yellow-700 mb-2 flex items-center gap-2">
              <span>➕</span> Vantagens
            </div>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Buscas extremamente rápidas</li>
              <li>• Escalável para bilhões de docs</li>
              <li>• Suporta consultas complexas</li>
              <li>• Permite ranking (TF-IDF)</li>
            </ul>
          </div>
          <div className="p-4 bg-yellow-100 rounded-xl border border-yellow-300">
            <div className="font-bold text-yellow-700 mb-2 flex items-center gap-2">
              <span>➖</span> Desvantagens
            </div>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Requer mais memória</li>
              <li>• Indexação inicial lenta</li>
              <li>• Atualizações mais complexas</li>
              <li>• Overhead de manutenção</li>
            </ul>
          </div>
        </div>
      </div>
    </ModuleLayout>
  );
}
