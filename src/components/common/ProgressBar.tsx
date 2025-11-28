import { RotateCcw } from "lucide-react";

interface ProgressBarProps {
  current: number;
  total: number;
  onReset?: () => void;
}

export function ProgressBar({ current, total, onReset }: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100);

  const handleReset = () => {
    if (
      window.confirm(
        "Tem certeza que deseja reiniciar todo o progresso? Esta ação não pode ser desfeita."
      )
    ) {
      onReset?.();
    }
  };

  return (
    <div className="sticky top-0 z-20 bg-white/50 backdrop-blur-xl shadow-md border-b border-gray-200">
      <div className="max-w-360 mx-auto px-3 sm:px-4 py-2 sm:py-3 xl:pl-80">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1.5 sm:mb-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2">
                <span className="text-xs sm:text-sm font-semibold text-gray-700">
                  Progresso do Aprendizado
                </span>
                <span className="text-xs text-gray-500">
                  {current} de {total} módulos
                </span>
              </div>
              <span className="text-xs sm:text-sm font-bold text-indigo-600">
                {percentage}%
              </span>
            </div>
            <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
          {current > 0 && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 border border-gray-300 group min-h-10"
              title="Reiniciar progresso"
            >
              <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              <span className="hidden sm:inline">Reiniciar</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
