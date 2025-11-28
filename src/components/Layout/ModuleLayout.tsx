import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "../common/Button";

interface ModuleLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  moduleNumber: number;
  totalModules: number;
  onPrevious?: () => void;
  onNext?: () => void;
  onComplete?: () => void;
  isCompleted?: boolean;
  showNavigation?: boolean;
}

export function ModuleLayout({
  children,
  title,
  subtitle,
  moduleNumber,
  totalModules,
  onPrevious,
  onNext,
  onComplete,
  isCompleted,
  showNavigation = true,
}: ModuleLayoutProps) {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-360 mx-auto px-3 sm:px-4 py-13 xl:py-6 lg:py-8 xl:pl-80">
        {/* Module Header */}
        <div className="mb-4 sm:mb-6 lg:mb-8 animate-fade-in">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full">
                    Módulo {moduleNumber} de {totalModules}
                  </span>
                  {isCompleted && (
                    <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                      <CheckCircle className="w-3 h-3" />
                      Concluído
                    </span>
                  )}
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-600">
                  Progresso do Aprendizado
                </span>
                <span className="text-xs font-semibold text-indigo-600">
                  {Math.round((moduleNumber / totalModules) * 100)}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-indigo-500 to-purple-600 transition-all duration-500"
                  style={{ width: `${(moduleNumber / totalModules) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Module Content */}
        <div className="space-y-4 sm:space-y-6 animate-fade-in">{children}</div>

        {/* Navigation */}
        {showNavigation && (
          <div className="mt-6 sm:mt-8 lg:mt-12 mb-4 sm:mb-6 lg:mb-8">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                {/* Previous Button */}
                <div className="flex-1 w-full sm:w-auto">
                  {onPrevious && (
                    <Button
                      variant="secondary"
                      onClick={onPrevious}
                      className="w-full sm:w-auto min-h-11"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Módulo Anterior
                    </Button>
                  )}
                </div>

                {/* Complete Button */}
                {onComplete && !isCompleted && (
                  <div className="w-full sm:w-auto sm:shrink-0">
                    <Button
                      variant="primary"
                      onClick={onComplete}
                      className="bg-green-600 hover:bg-green-700 w-full sm:w-auto min-h-11"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Marcar como Concluído
                    </Button>
                  </div>
                )}

                {/* Next Button */}
                <div className="flex-1 w-full sm:w-auto flex justify-end">
                  {onNext && (
                    <Button
                      variant="primary"
                      onClick={onNext}
                      className="w-full sm:w-auto min-h-11"
                    >
                      Próximo Módulo
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
