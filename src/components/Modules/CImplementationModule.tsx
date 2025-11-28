import { ModuleLayout } from "../Layout/ModuleLayout";
import { CImplementation } from "../CImplementation/CImplementation";

interface CImplementationModuleProps {
  onComplete: () => void;
  onPrevious: () => void;
  isCompleted: boolean;
  moduleNumber: number;
  totalModules: number;
}

export function CImplementationModule({
  onComplete,
  onPrevious,
  isCompleted,
  moduleNumber,
  totalModules,
}: CImplementationModuleProps) {
  return (
    <ModuleLayout
      title="Implementação em C"
      subtitle="Explore o código real com hash tables e posting lists"
      moduleNumber={moduleNumber}
      totalModules={totalModules}
      onPrevious={onPrevious}
      onComplete={onComplete}
      isCompleted={isCompleted}
      showNavigation={true}
    >
      <CImplementation />
    </ModuleLayout>
  );
}
