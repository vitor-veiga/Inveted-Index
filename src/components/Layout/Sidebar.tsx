import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { BookOpen, Menu, X, CheckCircle } from "lucide-react";

export interface LearningModule {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  completed?: boolean;
}

interface SidebarProps {
  modules: LearningModule[];
  activeModule: string;
  onModuleSelect: (moduleId: string) => void;
  completedModules: Set<string>;
}

export function Sidebar({
  modules,
  activeModule,
  onModuleSelect,
  completedModules,
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const sidebarContent = (
    <div className="h-full flex flex-col bg-white border-r border-gray-200 shadow-lg">
      {/* Logo/Header */}
      <div className="p-6 border-b border-gray-200 bg-linear-to-r from-indigo-600 to-purple-600">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="w-8 h-8 text-white" />
          <h1 className="text-xl font-bold text-white">Índices Invertidos</h1>
        </div>
        <p className="text-indigo-100 text-xs">
          Objeto de Aprendizagem Interativo
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {modules.map((module, index) => {
          const Icon = module.icon;
          const isActive = activeModule === module.id;
          const isCompleted = completedModules.has(module.id);

          return (
            <button
              key={module.id}
              onClick={() => {
                onModuleSelect(module.id);
                setIsOpen(false);
              }}
              className={`w-full text-left p-4 rounded-xl transition-all duration-300 group ${
                isActive
                  ? "bg-linear-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-105"
                  : "hover:bg-gray-50 text-gray-700 hover:shadow-md"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isActive
                      ? "bg-white bg-opacity-20"
                      : "bg-indigo-100 group-hover:bg-indigo-200"
                  }`}
                >
                  <Icon className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold opacity-70">
                      Módulo {index + 1}
                    </span>
                    {isCompleted && (
                      <CheckCircle
                        className={`w-4 h-4 ${
                          isActive ? "text-white" : "text-green-500"
                        }`}
                      />
                    )}
                  </div>
                  <div
                    className={`font-semibold text-sm ${
                      isActive ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {module.title}
                  </div>
                </div>
              </div>
              <p
                className={`text-xs leading-relaxed ${
                  isActive ? "text-indigo-100" : "text-gray-600"
                }`}
              >
                {module.description}
              </p>
            </button>
          );
        })}
      </nav>

      {/* Progress */}
      <div className="p-6 border-t border-gray-200 bg-gray-50">
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-gray-700">Progresso</span>
            <span className="text-sm font-bold text-indigo-600">
              {completedModules.size}/{modules.length}
            </span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-indigo-500 to-purple-600 transition-all duration-500 rounded-full"
              style={{
                width: `${(completedModules.size / modules.length) * 100}%`,
              }}
            />
          </div>
        </div>
        <p className="text-xs text-gray-600">
          {completedModules.size === modules.length
            ? "🎉 Todos os módulos concluídos!"
            : "Continue aprendendo para completar todos os módulos"}
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-3 left-3 z-50 p-2.5 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-80 h-screen fixed left-0 top-0 z-40">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      {isOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={toggleSidebar}
          />
          <aside className="lg:hidden fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] z-40 animate-slide-in">
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  );
}
