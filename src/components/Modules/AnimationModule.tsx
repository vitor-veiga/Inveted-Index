import { ModuleLayout } from "../Layout/ModuleLayout";
import { QueryAnimation } from "../Animations/QueryAnimation";

interface AnimationModuleProps {
  query: string;
  matchedDocs: string[];
  onComplete: () => void;
  onNext: () => void;
  onPrevious: () => void;
  isCompleted: boolean;
  moduleNumber: number;
  totalModules: number;
}

export function AnimationModule({
  query,
  matchedDocs,
  onComplete,
  onNext,
  onPrevious,
  isCompleted,
  moduleNumber,
  totalModules,
}: AnimationModuleProps) {
  return (
    <ModuleLayout
      title="Animação de Consulta"
      subtitle="Veja passo a passo como uma consulta booleana é processada"
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
          <span className="text-3xl">🎬</span>
          Processamento Visual de Consultas
        </h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          Esta animação mostra exatamente o que acontece quando você faz uma
          busca. Acompanhe cada etapa do processamento:
        </p>
        <div className="grid md:grid-cols-5 gap-3">
          {[
            { step: "1", label: "Parse", desc: "Analisa a consulta", icon: "📝" },
            { step: "2", label: "Hash", desc: "Calcula hash dos termos", icon: "🔢" },
            { step: "3", label: "Retrieve", desc: "Busca posting lists", icon: "🗂️" },
            { step: "4", label: "Merge", desc: "Combina resultados", icon: "🔗" },
            { step: "5", label: "Complete", desc: "Retorna documentos", icon: "✅" },
          ].map((item) => (
            <div
              key={item.step}
              className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 hover:border-blue-400 transition-colors"
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <div className="text-xs font-bold text-blue-600 mb-1">
                Passo {item.step}
              </div>
              <div className="font-bold text-sm text-gray-900 mb-1">
                {item.label}
              </div>
              <div className="text-xs text-gray-600">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Animação */}
      <QueryAnimation query={query} matchedDocs={matchedDocs} />

      {/* Insights */}
      <div className="bg-purple-50 border-2 border-purple-300 rounded-2xl p-8">
        <h3 className="text-xl font-bold text-purple-700 mb-4 flex items-center gap-2">
          <span className="text-2xl">✨</span>O que Observar
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-purple-100 rounded-xl border border-purple-300">
            <div className="font-bold text-purple-700 mb-2">⚡ Velocidade</div>
            <p className="text-sm text-purple-700">
              Note como cada etapa é instantânea. Com índices invertidos, mesmo
              consultas complexas são resolvidas em milissegundos.
            </p>
          </div>
          <div className="p-4 bg-purple-100 rounded-xl border border-purple-300">
            <div className="font-bold text-purple-700 mb-2">
              🔗 Operações de Conjunto
            </div>
            <p className="text-sm text-purple-700">
              AND realiza interseção, OR faz união e NOT subtração. Essas
              operações são eficientes porque trabalham com posting lists
              ordenadas.
            </p>
          </div>
          <div className="p-4 bg-purple-100 rounded-xl border border-purple-300">
            <div className="font-bold text-purple-700 mb-2">
              📊 Escalabilidade
            </div>
            <p className="text-sm text-purple-700">
              A complexidade não aumenta significativamente com o tamanho do
              índice, permitindo buscas em bilhões de documentos.
            </p>
          </div>
        </div>
      </div>
    </ModuleLayout>
  );
}
