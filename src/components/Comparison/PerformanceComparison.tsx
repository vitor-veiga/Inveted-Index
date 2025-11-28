import { useState } from "react";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import type { PerformanceMetrics } from "../../lib/inverted-index/types";
import { formatTime } from "../../lib/utils/performance";

interface PerformanceComparisonProps {
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
}

export function PerformanceComparison({
  onCompare,
  onCompareWithSize,
}: PerformanceComparisonProps) {
  const [query, setQuery] = useState("");
  const [comparing, setComparing] = useState(false);
  const [results, setResults] = useState<{
    linear: PerformanceMetrics;
    indexed: PerformanceMetrics;
  } | null>(null);
  const [size, setSize] = useState<number>(10000);

  const handleCompare = async () => {
    if (!query.trim()) return;

    setComparing(true);
    try {
      const comparison = await onCompare(query);
      setResults(comparison);
    } finally {
      setComparing(false);
    }
  };

  const handleCompareWithSize = async () => {
    if (!query.trim() || !onCompareWithSize) return;

    setComparing(true);
    try {
      const comparison = await onCompareWithSize(query, size);
      setResults(comparison);
    } finally {
      setComparing(false);
    }
  };

  // Avoid division by zero and handle very small times
  const speedup = results
    ? results.indexed.queryTime < 0.001
      ? "muito rápido para medir"
      : (
          results.linear.queryTime / Math.max(results.indexed.queryTime, 0.001)
        ).toFixed(2)
    : 0;

  const isSpeedupNumeric =
    typeof speedup === "number" || !isNaN(Number(speedup));

  return (
    <Card title="Comparação: Busca Linear vs. Índice Invertido">
      <div className="space-y-6">
        <p className="text-sm text-gray-600">
          Compare a performance entre busca linear (varredura completa) e busca
          usando índice invertido (estrutura de dados otimizada).
        </p>

        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleCompare()}
            placeholder="Ex: data structures AND algorithms"
            className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mt-4 flex items-center gap-3">
          <label className="text-sm text-gray-600">Tamanho do dataset:</label>
          <select
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded"
          >
            <option value={1000}>1.000 documentos</option>
            <option value={5000}>5.000 documentos</option>
            <option value={10000}>10.000 documentos</option>
          </select>
          <Button
            onClick={handleCompareWithSize}
            disabled={comparing || !query.trim() || !onCompareWithSize}
          >
            {comparing
              ? "Comparando..."
              : `Gerar e comparar (${size.toLocaleString()})`}
          </Button>
        </div>

        <p className="text-xs text-gray-400 mt-2">
          ⚠️ Obs: Gerar muitas centenas de documentos pode levar alguns segundos
          e consumir CPU no navegador, aguarde até que a ação seja concluída,
          evite recarregar a página ⚠️.
        </p>

        {results && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Linear SearchResults */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="text-lg font-bold text-red-700 mb-3">
                🐌 Busca Linear
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tempo:</span>
                  <span className="font-mono font-bold text-red-700">
                    {formatTime(results.linear.queryTime)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Documentos Escaneados:</span>
                  <span className="font-mono">
                    {results.linear.documentsScanned}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Resultados:</span>
                  <span className="font-mono">
                    {results.linear.resultsFound}
                  </span>
                </div>
                <div className="w-full bg-red-200 rounded-full h-3 mt-2">
                  <div
                    className="bg-red-600 h-3 rounded-full"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </div>

            {/* Indexed Search Results */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="text-lg font-bold text-green-700 mb-3">
                ⚡ Índice Invertido
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tempo:</span>
                  <span className="font-mono font-bold text-green-700">
                    {formatTime(results.indexed.queryTime)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Documentos Escaneados:</span>
                  <span className="font-mono">
                    {results.indexed.documentsScanned}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Resultados:</span>
                  <span className="font-mono">
                    {results.indexed.resultsFound}
                  </span>
                </div>
                <div className="w-full bg-green-200 rounded-full h-3 mt-2">
                  <div
                    className="bg-green-600 h-3 rounded-full"
                    style={{
                      width: `${
                        (results.indexed.queryTime / results.linear.queryTime) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {results && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <p className="text-sm text-gray-600 mb-2">Velocidade Relativa</p>
            <p className="text-3xl font-bold text-blue-700">
              {isSpeedupNumeric ? `${speedup}x` : speedup}
              {isSpeedupNumeric && " mais rápido"}
            </p>
            <p className="text-xs text-gray-400 mt-2">
              {isSpeedupNumeric
                ? `O índice invertido é ${speedup} vezes mais rápido que a busca linear`
                : `O índice invertido é extremamente rápido (< 0.001ms)`}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
