import { useState, useEffect } from "react";
import {
  BookOpen,
  Search,
  PlayCircle,
  TrendingUp,
  Zap,
  Globe,
  Code,
} from "lucide-react";
import { Sidebar, type LearningModule } from "./components/Layout/Sidebar";
import { ProgressBar } from "./components/common/ProgressBar";
import { Introduction } from "./components/Modules/Introduction";
import { VisualizationModule } from "./components/Modules/VisualizationModule";
import { SearchModule } from "./components/Modules/SearchModule";
import { AnimationModule } from "./components/Modules/AnimationModule";
import { RankingModule } from "./components/Modules/RankingModule";
import { PerformanceModule } from "./components/Modules/PerformanceModule";
import { ApplicationsModule } from "./components/Modules/ApplicationsModule";
import { CImplementationModule } from "./components/Modules/CImplementationModule";
import { useInvertedIndex } from "./hooks/useInvertedIndex";
import { useSearch } from "./hooks/useSearch";
import { LinearSearch } from "./lib/search/LinearSearch";
import { InvertedIndex } from "./lib/inverted-index/InvertedIndex";
import type { Document } from "./lib/inverted-index/types";
import { tokenize } from "./lib/utils/textProcessing";
import { sampleDocuments } from "./data/sampleDocuments";
import type { PerformanceMetrics } from "./lib/inverted-index/types";

function App() {
  const { index, getAllEntries, isIndexed } = useInvertedIndex(sampleDocuments);
  const { results, isSearching, searchWithIndex } = useSearch(
    index,
    sampleDocuments
  );
  const [lastQuery, setLastQuery] = useState("");
  const [activeModule, setActiveModule] = useState(() => {
    const saved = localStorage.getItem("learning-progress");
    if (saved) {
      try {
        const progress = JSON.parse(saved);
        return progress.activeModule || "introduction";
      } catch (e) {
        console.error("Error loading progress:", e);
      }
    }
    return "introduction";
  });
  const [completedModules, setCompletedModules] = useState<Set<string>>(() => {
    const saved = localStorage.getItem("learning-progress");
    if (saved) {
      try {
        const progress = JSON.parse(saved);
        return new Set(progress.completed);
      } catch (e) {
        console.error("Error loading progress:", e);
      }
    }
    return new Set();
  });

  // Salvar progresso no localStorage
  useEffect(() => {
    localStorage.setItem(
      "learning-progress",
      JSON.stringify({
        completed: Array.from(completedModules),
        activeModule,
      })
    );
  }, [completedModules, activeModule]);

  const handleSearch = (query: string) => {
    setLastQuery(query);
    searchWithIndex(query);
  };

  const handleCompare = async (
    query: string
  ): Promise<{
    linear: PerformanceMetrics;
    indexed: PerformanceMetrics;
  }> => {
    const linearSearch = new LinearSearch(sampleDocuments);
    const linearStart = performance.now();
    const linearResults = linearSearch.search(query);
    const linearEnd = performance.now();
    // Measure indexed search by tokenizing the query and combining posting lists (union)
    const indexedStart = performance.now();
    const terms = tokenize(query);
    const allPostings = new Map<
      string,
      { docId: string; positions: number[]; termFrequency: number }
    >();

    terms.forEach((term) => {
      const postings = index.search(term);
      postings.forEach((p) => {
        if (!allPostings.has(p.docId)) {
          allPostings.set(p.docId, {
            docId: p.docId,
            positions: p.positions.slice(),
            termFrequency: p.termFrequency,
          });
        } else {
          const existing = allPostings.get(p.docId)!;
          existing.termFrequency += p.termFrequency;
          existing.positions.push(...p.positions);
        }
      });
    });

    const indexedEnd = performance.now();

    return {
      linear: {
        method: "linear",
        queryTime: linearEnd - linearStart,
        resultsFound: linearResults.results.length,
        documentsScanned: sampleDocuments.length,
      },
      indexed: {
        method: "inverted-index",
        queryTime: indexedEnd - indexedStart,
        resultsFound: allPostings.size,
        documentsScanned: index.getTotalDocuments(),
      },
    };
  };

  // Compare on a generated dataset of `count` documents (does not replace app state)
  const handleCompareWithSize = async (
    query: string,
    count: number
  ): Promise<{
    linear: PerformanceMetrics;
    indexed: PerformanceMetrics;
  }> => {
    // Generate documents by repeating seed documents with slight variations
    const seed = sampleDocuments;
    const generated: Document[] = new Array(count)
      .fill(undefined)
      .map((_, i) => {
        const s = seed[i % seed.length];
        return {
          id: `gen-${i}`,
          title: `${s.title} ${i}`,
          content: `${s.content} \n\n${s.title} - generated doc ${i}`,
          wordCount: 0,
        } as Document;
      });

    // Linear search on generated set
    const linearSearch = new LinearSearch(generated);
    const linearStart = performance.now();
    const linearResults = linearSearch.search(query);
    const linearEnd = performance.now();

    // Build a temporary inverted index for generated set
    const tempIndex = new InvertedIndex();
    for (const d of generated) tempIndex.addDocument(d);

    // Measure index search by tokenizing and combining posting lists
    const indexedStart = performance.now();
    const terms = tokenize(query);
    const allPostings = new Map<
      string,
      { docId: string; positions: number[]; termFrequency: number }
    >();
    terms.forEach((term) => {
      const postings = tempIndex.search(term);
      postings.forEach((p) => {
        if (!allPostings.has(p.docId)) {
          allPostings.set(p.docId, {
            docId: p.docId,
            positions: p.positions.slice(),
            termFrequency: p.termFrequency,
          });
        } else {
          const existing = allPostings.get(p.docId)!;
          existing.termFrequency += p.termFrequency;
          existing.positions.push(...p.positions);
        }
      });
    });
    const indexedEnd = performance.now();

    return {
      linear: {
        method: "linear",
        queryTime: linearEnd - linearStart,
        resultsFound: linearResults.results.length,
        documentsScanned: generated.length,
      },
      indexed: {
        method: "inverted-index",
        queryTime: indexedEnd - indexedStart,
        resultsFound: allPostings.size,
        documentsScanned: tempIndex.getTotalDocuments(),
      },
    };
  };

  const matchedDocs = results.map((r) => String(r.docId));

  const modules: LearningModule[] = [
    {
      id: "introduction",
      title: "Introdução",
      icon: BookOpen,
      description: "Bem-vindo ao mundo dos índices invertidos",
    },
    {
      id: "visualization",
      title: "Visualização",
      icon: Search,
      description: "Explore a estrutura do índice",
    },
    {
      id: "search",
      title: "Busca Interativa",
      icon: Search,
      description: "Experimente buscas booleanas",
    },
    {
      id: "animation",
      title: "Animação",
      icon: PlayCircle,
      description: "Veja o processamento passo a passo",
    },
    {
      id: "ranking",
      title: "Ranking TF-IDF",
      icon: TrendingUp,
      description: "Aprenda sobre relevância",
    },
    {
      id: "performance",
      title: "Performance",
      icon: Zap,
      description: "Compare O(1) vs O(n)",
    },
    {
      id: "applications",
      title: "Aplicações Reais",
      icon: Globe,
      description: "Google, Elasticsearch e mais",
    },
    {
      id: "implementation",
      title: "Código em C",
      icon: Code,
      description: "Hash tables + posting lists",
    },
  ];

  const currentModuleIndex = modules.findIndex((m) => m.id === activeModule);
  const totalModules = modules.length;

  const handleComplete = (moduleId: string) => {
    setCompletedModules((prev) => new Set([...prev, moduleId]));
  };

  const handleNext = () => {
    if (currentModuleIndex < modules.length - 1) {
      setActiveModule(modules[currentModuleIndex + 1].id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (currentModuleIndex > 0) {
      setActiveModule(modules[currentModuleIndex - 1].id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleResetProgress = () => {
    setCompletedModules(new Set());
    setActiveModule("introduction");
    localStorage.removeItem("learning-progress");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderActiveModule = () => {
    const moduleProps = {
      onComplete: () => handleComplete(activeModule),
      onNext: currentModuleIndex < modules.length - 1 ? handleNext : () => {},
      onPrevious: currentModuleIndex > 0 ? handlePrevious : () => {},
      isCompleted: completedModules.has(activeModule),
      moduleNumber: currentModuleIndex + 1,
      totalModules,
    };

    switch (activeModule) {
      case "introduction":
        return <Introduction {...moduleProps} documents={sampleDocuments} />;
      case "visualization":
        return (
          <VisualizationModule
            {...moduleProps}
            entries={isIndexed ? getAllEntries() : []}
          />
        );
      case "search":
        return (
          <SearchModule
            {...moduleProps}
            onSearch={handleSearch}
            results={results}
            isSearching={isSearching}
          />
        );
      case "animation":
        return (
          <AnimationModule
            {...moduleProps}
            query={lastQuery}
            matchedDocs={matchedDocs}
          />
        );
      case "ranking":
        return <RankingModule {...moduleProps} index={index} />;
      case "performance":
        return (
          <PerformanceModule
            {...moduleProps}
            onCompare={handleCompare}
            onCompareWithSize={handleCompareWithSize}
          />
        );
      case "applications":
        return <ApplicationsModule {...moduleProps} />;
      case "implementation":
        return <CImplementationModule {...moduleProps} />;
      default:
        return <Introduction {...moduleProps} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Sidebar
        modules={modules}
        activeModule={activeModule}
        onModuleSelect={setActiveModule}
        completedModules={completedModules}
      />
      <main className="flex-1 flex flex-col">
        <ProgressBar
          current={completedModules.size}
          total={totalModules}
          onReset={handleResetProgress}
        />
        <div className="flex-1 pt-4">{renderActiveModule()}</div>
      </main>
    </div>
  );
}

export default App;
