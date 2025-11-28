import { useState } from "react";
import { Card } from "../common/Card";
import { TFIDF } from "../../lib/ranking/TFIDF";
import { InvertedIndex } from "../../lib/inverted-index/InvertedIndex";

interface TFIDFRankingProps {
  index: InvertedIndex;
}

export function TFIDFRanking({ index }: TFIDFRankingProps) {
  const [query, setQuery] = useState("");
  const [rankings, setRankings] = useState<
    Array<{ docId: string; score: number }>
  >([]);

  const handleRank = () => {
    if (!query.trim()) return;

    const tfidf = new TFIDF(index);
    const results = tfidf.rankDocuments(query);
    setRankings(results);
  };

  return (
    <Card title="Ranking com TF-IDF">
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          TF-IDF (Term Frequency-Inverse Document Frequency) é uma medida
          estatística que avalia a importância de um termo em um documento
          dentro de uma coleção.
        </p>

        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleRank()}
            placeholder="Digite termos para ranking"
            className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleRank}
            disabled={!query.trim()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium disabled:opacity-50"
          >
            Calcular TF-IDF
          </button>
        </div>

        {rankings.length > 0 && (
          <div className="mt-6">
            <h4 className="text-base sm:text-lg font-semibold mb-3 text-gray-900">
              Rankings
            </h4>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Pos
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">
                      Documento
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Score
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Título
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {rankings.map((ranking, idx) => {
                    const doc = index.getDocument(ranking.docId);
                    return (
                      <tr key={ranking.docId} className="hover:bg-gray-50">
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{idx + 1}
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                          {ranking.docId}
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <div className="w-12 sm:w-24 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-600 h-2 rounded-full"
                                style={{
                                  width: `${Math.min(
                                    (ranking.score / rankings[0].score) * 100,
                                    100
                                  )}%`,
                                }}
                              />
                            </div>
                            <span className="font-mono text-xs sm:text-sm">
                              {ranking.score.toFixed(4)}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900">
                          {doc?.title || "Desconhecido"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
