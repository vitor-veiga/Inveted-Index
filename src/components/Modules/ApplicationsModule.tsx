import { ModuleLayout } from "../Layout/ModuleLayout";
import { RealWorldApplications } from "../RealWorldApplications/RealWorldApplications";

interface ApplicationsModuleProps {
  onComplete: () => void;
  onNext: () => void;
  onPrevious: () => void;
  isCompleted: boolean;
  moduleNumber: number;
  totalModules: number;
}

export function ApplicationsModule({
  onComplete,
  onNext,
  onPrevious,
  isCompleted,
  moduleNumber,
  totalModules,
}: ApplicationsModuleProps) {
  return (
    <ModuleLayout
      title="Aplicações no Mundo Real"
      subtitle="Descubra como empresas e tecnologias utilizam índices invertidos"
      moduleNumber={moduleNumber}
      totalModules={totalModules}
      onPrevious={onPrevious}
      onNext={onNext}
      onComplete={onComplete}
      isCompleted={isCompleted}
    >
      <RealWorldApplications />
    </ModuleLayout>
  );
}
