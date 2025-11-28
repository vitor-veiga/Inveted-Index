import { FileText, Hash, BookOpen } from "lucide-react";
import type { Document } from "../../lib/inverted-index/types";

interface DocumentCollectionProps {
  documents: Document[];
}

export function DocumentCollection({ documents }: DocumentCollectionProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
        <FileText className="w-6 h-6 text-indigo-600" />
        Coleção de Documentos
      </h3>
      <p className="text-sm text-gray-600 mb-6">
        Estes são os {documents.length} documentos indexados que você pode
        buscar
      </p>

      <div className="space-y-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="border-2 border-gray-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-lg transition-all"
          >
            {/* Header do Documento */}
            <div className="flex items-start gap-4 mb-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-gray-900">{doc.title}</h4>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full font-mono">
                    {doc.id}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Hash className="w-3 h-3" />
                    {doc.content.split(/\s+/).length} palavras
                  </span>
                  <span>{doc.content.length} caracteres</span>
                </div>
              </div>
            </div>

            {/* Preview do Conteúdo */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 overflow-auto h-48">
              <p className="text-sm text-gray-700 leading-relaxed">
                {doc.content}
              </p>
            </div>

            {/* Estatísticas */}
            <div className="mt-3 pt-3 border-t border-gray-200 flex gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Indexado</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">
                  ~{new Set(doc.content.toLowerCase().match(/\b\w+\b/g)).size}{" "}
                  termos únicos
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Resumo da Coleção */}
      <div className="mt-6 p-4 bg-indigo-50 rounded-xl border border-indigo-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-indigo-900">
              {documents.length}
            </div>
            <div className="text-xs text-indigo-700">Documentos</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-indigo-900">
              {documents.reduce(
                (sum, doc) => sum + doc.content.split(/\s+/).length,
                0
              )}
            </div>
            <div className="text-xs text-indigo-700">Palavras Total</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-indigo-900">
              {
                new Set(
                  documents.flatMap(
                    (doc) => doc.content.toLowerCase().match(/\b\w+\b/g) || []
                  )
                ).size
              }
            </div>
            <div className="text-xs text-indigo-700">Termos Únicos</div>
          </div>
        </div>
      </div>
    </div>
  );
}
