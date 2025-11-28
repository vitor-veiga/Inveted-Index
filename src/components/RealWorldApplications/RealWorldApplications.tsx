import { Card } from "../common/Card";

const applications = [
  {
    name: "Elasticsearch",
    icon: "🔍",
    description: "Sistema de busca e análise distribuído open-source",
    color: "from-yellow-400 to-orange-500",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    features: [
      "Busca full-text em tempo real",
      "Análise de logs e métricas",
      "Escalabilidade horizontal",
      "RESTful API",
    ],
  },
  {
    name: "Apache Solr",
    icon: "☀️",
    description: "Plataforma de busca empresarial baseada em Lucene",
    color: "from-red-500 to-orange-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    features: [
      "Busca facetada",
      "Cache distribuído",
      "Highlighting de resultados",
      "Suporte a múltiplos idiomas",
    ],
  },
  {
    name: "Apache Lucene",
    icon: "📚",
    description:
      "Biblioteca de recuperação de informação (base do Solr e Elasticsearch)",
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    features: [
      "Indexação rápida",
      "Busca poderosa",
      "Ranking TF-IDF",
      "Análise de texto avançada",
    ],
  },
  {
    name: "Google Search",
    icon: "🌐",
    description: "Motor de busca mais utilizado do mundo",
    color: "from-green-500 to-blue-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    features: [
      "Índice de trilhões de páginas",
      "PageRank + índices invertidos",
      "Busca semântica",
      "Resultados instantâneos",
    ],
  },
  {
    name: "Microsoft Bing",
    icon: "🦅",
    description: "Motor de busca da Microsoft com IA integrada",
    color: "from-blue-600 to-purple-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    features: [
      "Busca com IA (Copilot)",
      "Índices invertidos otimizados",
      "Busca de imagens e vídeos",
      "Integração com Windows",
    ],
  },
  {
    name: "Busca em Documentos",
    icon: "📄",
    description: "Indexação e busca em arquivos PDF, Word, Excel, etc.",
    color: "from-purple-500 to-pink-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    features: [
      "Extração de texto de PDFs",
      "OCR para imagens",
      "Indexação de metadados",
      "Preview de resultados",
    ],
  },
];

export function RealWorldApplications() {
  return (
    <Card title="Aplicações Reais de Índices Invertidos">
      <div className="space-y-6">
        {/* Introdução */}
        <div className="bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="text-4xl">💡</div>
            <div>
              <h4 className="text-lg font-bold text-blue-700 mb-2">
                Por que Índices Invertidos são tão importantes?
              </h4>
              <p className="text-sm text-blue-800 leading-relaxed">
                Índices invertidos são a estrutura de dados fundamental por trás
                de praticamente todos os sistemas de busca modernos. Eles
                permitem busca em <strong>tempo real</strong> em bilhões de
                documentos, transformando buscas que levariam horas (O(n)) em
                milissegundos (O(1)).
              </p>
            </div>
          </div>
        </div>

        {/* Grid de Aplicações */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {applications.map((app) => (
            <div
              key={app.name}
              className={`${app.bgColor} border ${app.borderColor} rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-5xl">{app.icon}</div>
                <div className="flex-1">
                  <h5
                    className={`text-xl font-bold bg-linear-to-r ${app.color} bg-clip-text text-transparent mb-2`}
                  >
                    {app.name}
                  </h5>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {app.description}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">
                  Características principais:
                </p>
                <ul className="space-y-2">
                  {app.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <span className="text-green-500 font-bold">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Estatísticas Impressionantes */}
        <div className="bg-linear-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6">
          <h4 className="text-lg font-bold text-purple-700 mb-4 flex items-center gap-2">
            <span className="text-2xl">📊</span>
            Números Impressionantes
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 border border-purple-100">
              <p className="text-3xl font-bold text-purple-600 mb-1">8.5B+</p>
              <p className="text-xs text-gray-600">
                Páginas indexadas pelo Google
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-purple-100">
              <p className="text-3xl font-bold text-purple-600 mb-1">
                &lt;0.5s
              </p>
              <p className="text-xs text-gray-600">Tempo médio de resposta</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-purple-100">
              <p className="text-3xl font-bold text-purple-600 mb-1">99.999%</p>
              <p className="text-xs text-gray-600">
                Disponibilidade dos sistemas
              </p>
            </div>
          </div>
        </div>

        {/* Como Funciona */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
          <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">⚙️</span>
            Como os Sistemas Reais Utilizam
          </h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  Indexação em Massa
                </p>
                <p className="text-sm text-gray-600">
                  Processam milhões de documentos por hora usando clusters
                  distribuídos
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Busca Distribuída</p>
                <p className="text-sm text-gray-600">
                  Consultas são parallelizadas em múltiplos servidores
                  (sharding)
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Cache Inteligente</p>
                <p className="text-sm text-gray-600">
                  Resultados frequentes são cacheados para respostas
                  instantâneas
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                <span className="text-blue-600 font-bold">4</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Ranking Avançado</p>
                <p className="text-sm text-gray-600">
                  Combinam TF-IDF, PageRank, ML e sinais de qualidade
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
