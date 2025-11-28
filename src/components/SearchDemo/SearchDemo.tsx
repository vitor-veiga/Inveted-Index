import { useState } from "react";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import type { SearchResult } from "../../lib/inverted-index/types";

interface SearchDemoProps {
  onSearch: (query: string) => void;
  results: SearchResult[];
  isSearching: boolean;
}

export function SearchDemo({
  onSearch,
  results,
  isSearching,
}: SearchDemoProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <Card title="Demonstração de Busca">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Consulta de Busca
          </label>
          <div className="flex gap-2">
            <input
              id="search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ex: data structures AND algorithms"
              className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button type="submit" disabled={isSearching || !query.trim()}>
              {isSearching ? "Buscando..." : "Buscar"}
            </Button>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Operadores booleanos: AND, OR, NOT
          </p>
        </div>

        {results.length > 0 && (
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-3">
              Resultados ({results.length})
            </h4>
            <div className="space-y-4">
              {results.map((result) => (
                <div
                  key={result.docId}
                  className="p-4 border border-gray-200 rounded hover:bg-gray-50"
                >
                  <h5 className="text-md font-bold text-blue-600 mb-1">
                    {result.title}
                  </h5>
                  <p className="text-sm text-gray-600 mb-2">{result.snippet}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Score: {result.score.toFixed(2)}</span>
                    <span>Doc ID: {result.docId}</span>
                    <div className="flex gap-1">
                      {result.matchedTerms.map((term) => (
                        <span
                          key={term}
                          className="px-2 py-1 bg-green-100 text-green-800 rounded"
                        >
                          {term}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {query && results.length === 0 && !isSearching && (
          <div className="text-center py-8 text-gray-500">
            Nenhum resultado encontrado para "{query}"
          </div>
        )}
      </form>
    </Card>
  );
}
