import { Card } from "../common/Card";
import type { IndexEntry } from "../../lib/inverted-index/types";

interface IndexVisualizationProps {
  entries: IndexEntry[];
}

export function IndexVisualization({ entries }: IndexVisualizationProps) {
  if (entries.length === 0) {
    return (
      <Card title="Índice Invertido">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <p className="text-gray-500 text-lg">
            Nenhum documento indexado ainda.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card title="Visualização do Índice Invertido">
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-700 font-medium flex items-center gap-2">
            <span className="text-xl">💡</span>
            Total de termos únicos:{" "}
            <span className="text-2xl font-bold text-blue-600">
              {entries.length}
            </span>
          </p>
        </div>

        <div className="max-h-[600px] overflow-y-auto rounded-xl border border-gray-200 -mx-4 sm:mx-0">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-linear-to-r from-gray-50 to-gray-100 sticky top-0">
              <tr>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  🔤 Termo
                </th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  📊 DF
                </th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  📄 Docs
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {entries.map((entry) => (
                <tr
                  key={entry.term}
                  className="hover:bg-blue-50 transition-colors"
                >
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <span className="text-xs sm:text-sm font-bold text-indigo-600 bg-indigo-50 px-2 sm:px-3 py-1 rounded-lg">
                      {entry.term}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
                      {entry.postingList.documentFrequency}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-500">
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {entry.postingList.postings.map((posting) => (
                        <span
                          key={posting.docId}
                          className="inline-flex items-center px-2 sm:px-3 py-1 rounded-lg text-xs font-semibold bg-linear-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200"
                        >
                          {posting.docId}{" "}
                          <span className="ml-1 text-blue-600">
                            ⚡ {posting.termFrequency}
                          </span>
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}
