export default function Header() {
  return (
    <header className="bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center gap-4 mb-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <span className="text-3xl">🔍</span>
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-blue-100">
              Índice Invertido Interativo
            </h1>
            <p className="text-blue-100 text-sm mt-1">
              Explore estruturas de dados para recuperação de informação
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
