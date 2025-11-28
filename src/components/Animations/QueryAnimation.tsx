import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { useAnimation } from "../../hooks/useAnimation";

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
        <p className="text-gray-400">
          Realize uma busca para ver a animação do processamento.
        </p>
      </Card>
    );
  }

  return (
    <Card title="Animação de Processamento de Consulta">
      <div className="space-y-6">
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((currentStepNumber + 1) / totalSteps) * 100}%`,
            }}
          />
        </div>

        {/* Current step info */}
        {currentStep && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-lg font-semibold text-blue-700">
                Passo {currentStepNumber + 1} de {totalSteps}
              </h4>
              <span className="text-xs text-blue-600 font-mono">
                {currentStep.operation}
              </span>
            </div>
            <p className="text-gray-700">{currentStep.description}</p>

            {currentStep.highlightedTerms.length > 0 && (
              <div className="mt-3">
                <span className="text-sm font-medium text-gray-600">
                  Termos:{" "}
                </span>
                {currentStep.highlightedTerms.map((term) => (
                  <span
                    key={term}
                    className="inline-block px-2 py-1 ml-2 bg-yellow-200 text-yellow-700 rounded text-sm"
                  >
                    {term}
                  </span>
                ))}
              </div>
            )}

            {currentStep.currentDocuments.length > 0 && (
              <div className="mt-3">
                <span className="text-sm font-medium text-gray-600">
                  Documentos:{" "}
                </span>
                {currentStep.currentDocuments.map((doc) => (
                  <span
                    key={doc}
                    className="inline-block px-2 py-1 ml-2 bg-green-200 text-green-700 rounded text-sm"
                  >
                    {doc}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-center gap-2">
          <Button
            onClick={previous}
            disabled={currentStepNumber === 0}
            variant="secondary"
          >
            ← Anterior
          </Button>
          <Button onClick={reset} variant="secondary">
            Reiniciar
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

        <div className="text-center text-xs text-gray-400">
          Navegue pelos passos para entender como o índice invertido processa
          sua consulta
        </div>
      </div>
    </Card>
  );
}
