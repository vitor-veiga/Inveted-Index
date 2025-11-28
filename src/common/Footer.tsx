import { Code2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-linear-to-br from-gray-800 via-gray-900 to-black text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center gap-2">
            <Code2 className="w-6 h-6 text-blue-400" />
            <span className="text-xl font-bold">
              Índice Invertido Interativo
            </span>
          </div>

          <div className="h-px w-32 bg-linear-to-r from-transparent via-blue-500 to-transparent"></div>

          <p className="text-gray-400 text-center max-w-md">
            Desenvolvido por{" "}
            <span className="font-semibold text-blue-400 hover:text-blue-300 transition-colors">
              Vitor Cristian da Veiga
            </span>
          </p>

          <p className="text-sm text-gray-500 text-center">
            Acadêmico de Engenharia de Computação - UEPG
          </p>

          <div className="flex gap-3 text-2xl pt-2">
            <span>💻</span>
            <span>🤖</span>
            <span>🧑‍💻</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
