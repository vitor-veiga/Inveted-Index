import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { useAnimation } from "../../hooks/useAnimation";
import { Hash, ArrowRight, Database, CheckCircle } from "lucide-react";

interface QueryAnimationProps {
  query: string;
  matchedDocs: string[];
}

export function QueryAnimation({ query, matchedDocs }: QueryAnimationProps) {
  const {
    currentStep,
    currentStepNumber,
    totalSteps,
    isPlaying,
    play,
    pause,
    reset,
    next,
    previous,
  } = useAnimation(query, matchedDocs);

  if (!query || !matchedDocs || matchedDocs.length === 0) {
    return (
      <Card title="Animação de Processamento">
        <p className="text-gray-600">
          Realize uma busca no módulo anterior para ver a animação do processamento.
        </p>
      </Card>
    );
  }

  const getOperationIcon = (operation: string) => {
    switch (operation) {
      case 'parse': return '📝';
      case 'hash': return '🔢';
      case 'retrieve': return '🗂️';
      case 'merge': return '🔗';
      case 'complete': return '✅';
      default: return '⚙️';
    }
  };

  const renderVisualStep = () => {
    if (!currentStep) return null;

    const { operation, highlightedTerms, currentDocuments } = currentStep;

    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
        {/* Parse Step */}
        {operation === 'parse' && (
          <div className="flex flex-col items-center gap-4 animate-fade-in">
            <div className="text-6xl animate-bounce">{getOperationIcon(operation)}</div>
            <div className="flex items-center gap-3">
              <div className="px-6 py-3 bg-white rounded-xl shadow-lg border-2 border-gray-300 font-mono text-lg">
                {query}
              </div>
              <ArrowRight className="w-8 h-8 text-blue-600 animate-pulse" />
              <div className="flex gap-2">
                {highlightedTerms.map((term, i) => (
                  <div
                    key={term}
                    className="px-4 py-2 bg-yellow-200 rounded-lg shadow font-mono font-bold text-yellow-800 animate-slide-in"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    {term}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Hash Step */}
        {operation === 'hash' && (
          <div className="flex flex-col items-center gap-6 animate-fade-in">
            <div className="text-6xl">{getOperationIcon(operation)}</div>
            <div className="flex items-center gap-4">
              <div className="px-6 py-3 bg-yellow-200 rounded-xl shadow-lg border-2 border-yellow-400 font-mono font-bold text-lg">
                {highlightedTerms[0]}
              </div>
              <div className="flex flex-col items-center gap-2">
                <Hash className="w-12 h-12 text-purple-600 animate-spin" style={{ animationDuration: '2s' }} />
                <span className="text-xs font-mono text-gray-600">hash()</span>
              </div>
              <ArrowRight className="w-8 h-8 text-blue-600 animate-pulse" />
              <div className="px-6 py-3 bg-purple-200 rounded-xl shadow-lg border-2 border-purple-400 font-mono font-bold text-lg">
                bucket #{Math.abs(highlightedTerms[0].split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % 1000}
              </div>
            </div>
          </div>
        )}

        {/* Retrieve Step */}
        {operation === 'retrieve' && (
          <div className="flex flex-col items-center gap-6 animate-fade-in">
            <div className="text-6xl">{getOperationIcon(operation)}</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {highlightedTerms.map((term, i) => (
                <div
                  key={term}
                  className="flex flex-col items-center gap-3 p-4 bg-white rounded-xl shadow-lg border-2 border-blue-300 animate-slide-up"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <Database className="w-8 h-8 text-blue-600" />
                  <div className="font-mono font-bold text-sm text-gray-800">{term}</div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {matchedDocs.slice(0, 3).map((doc) => (
                      <div
                        key={doc}
                        className="px-3 py-1 bg-green-100 rounded-lg text-xs font-mono border border-green-300"
                      >
                        {doc}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Merge Step */}
        {operation === 'merge' && (
          <div className="flex flex-col items-center gap-6 animate-fade-in">
            <div className="text-6xl">{getOperationIcon(operation)}</div>
            <div className="flex flex-col md:flex-row items-center gap-4 w-full justify-center">
              <div className="flex flex-col gap-2">
                {highlightedTerms.map((term) => (
                  <div
                    key={term}
                    className="px-4 py-2 bg-blue-100 rounded-lg shadow font-mono text-sm border border-blue-300"
                  >
                    {term}: [{matchedDocs.slice(0, 2).join(', ')}...]
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="text-4xl animate-pulse">∩</div>
                <span className="text-xs text-gray-600">UNIÃO</span>
              </div>
              <ArrowRight className="w-8 h-8 text-green-600 hidden md:block" />
              <div className="px-6 py-4 bg-green-100 rounded-xl shadow-lg border-2 border-green-400">
                <div className="text-sm font-bold text-green-800 mb-2">Resultado:</div>
                <div className="flex flex-wrap gap-2">
                  {currentDocuments.map((doc, i) => (
                    <div
                      key={doc}
                      className="px-3 py-2 bg-green-200 rounded-lg font-mono font-bold text-sm animate-bounce"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      {doc}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Complete Step */}
        {operation === 'complete' && (
          <div className="flex flex-col items-center gap-6 animate-fade-in">
            <CheckCircle className="w-24 h-24 text-green-600 animate-bounce" />
            <div className="text-2xl font-bold text-gray-800">Busca Concluída!</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {currentDocuments.map((doc, i) => (
                <div
                  key={doc}
                  className="px-6 py-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl shadow-lg text-white font-mono font-bold text-center animate-scale-in"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {doc}
                </div>
              ))}
            </div>
            <div className="text-sm text-gray-600">
              {currentDocuments.length} documento{currentDocuments.length !== 1 ? 's' : ''} encontrado{currentDocuments.length !== 1 ? 's' : ''}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card title="Animação de Processamento de Consulta">
      <div className="space-y-6">
        {/* Progress bar */}
        <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${((currentStepNumber + 1) / totalSteps) * 100}%`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer" />
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Passo {currentStepNumber + 1} de {totalSteps}</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-mono text-xs font-bold">
            {currentStep?.operation.toUpperCase()}
          </span>
        </div>

        {/* Visual representation */}
        {renderVisualStep()}

        {/* Current step description */}
        {currentStep && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 rounded-r-xl p-4">
            <div className="flex items-start gap-3">
              <div className="text-3xl">{getOperationIcon(currentStep.operation)}</div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-900 mb-1">
                  {currentStep.description}
                </h4>
                <p className="text-sm text-gray-600">
                  {currentStep.operation === 'parse' && 'A consulta é dividida em termos individuais que serão buscados no índice.'}
                  {currentStep.operation === 'hash' && 'Cada termo passa pela função hash para determinar em qual bucket da tabela hash ele está armazenado.'}
                  {currentStep.operation === 'retrieve' && 'As posting lists são recuperadas diretamente da hash table em tempo O(1).'}
                  {currentStep.operation === 'merge' && 'As posting lists são combinadas usando operações de conjunto (união, interseção).'}
                  {currentStep.operation === 'complete' && 'Os documentos finais são retornados, prontos para serem exibidos ao usuário.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-center gap-2 pt-4 border-t border-gray-200">
          <Button
            onClick={previous}
            disabled={currentStepNumber === 0}
            variant="secondary"
          >
            ← Anterior
          </Button>
          <Button onClick={reset} variant="secondary">
            🔄 Reiniciar
          </Button>
          {!isPlaying ? (
            <Button onClick={play}>▶ Play</Button>
          ) : (
            <Button onClick={pause} variant="secondary">
              ⏸ Pausar
            </Button>
          )}
          <Button
            onClick={next}
            disabled={currentStepNumber === totalSteps - 1}
            variant="secondary"
          >
            Próximo →
          </Button>
        </div>
      </div>
    </Card>
  );
}
