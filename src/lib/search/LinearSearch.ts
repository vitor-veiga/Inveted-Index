import type { Document, SearchResult, PerformanceMetrics } from '../inverted-index/types';
import { tokenize } from '../utils/textProcessing';

export class LinearSearch {
  private documents: Document[];

  constructor(documents: Document[]) {
    this.documents = documents;
  }

  search(query: string): { results: SearchResult[]; metrics: PerformanceMetrics } {
    const startTime = performance.now();
    const terms = tokenize(query);
    const results: SearchResult[] = [];
    let documentsScanned = 0;

    this.documents.forEach(doc => {
      documentsScanned++;
      const tokens = tokenize(doc.content);
      const matchedTerms: string[] = [];
      let totalMatches = 0;

      terms.forEach(term => {
        const count = tokens.filter(t => t === term).length;
        if (count > 0) {
          matchedTerms.push(term);
          totalMatches += count;
        }
      });

      if (matchedTerms.length > 0) {
        const snippet = this.generateSnippet(doc.content, matchedTerms);
        results.push({
          docId: doc.id,
          score: totalMatches,
          title: doc.title,
          snippet,
          matchedTerms
        });
      }
    });

    const endTime = performance.now();

    return {
      results: results.sort((a, b) => b.score - a.score),
      metrics: {
        method: 'linear',
        queryTime: endTime - startTime,
        resultsFound: results.length,
        documentsScanned
      }
    };
  }

  private generateSnippet(content: string, terms: string[]): string {
    const lowerContent = content.toLowerCase();
    let startIndex = -1;

    for (const term of terms) {
      const index = lowerContent.indexOf(term.toLowerCase());
      if (index !== -1 && (startIndex === -1 || index < startIndex)) {
        startIndex = index;
      }
    }

    if (startIndex === -1) {
      return content.substring(0, 100) + '...';
    }

    const beforeStart = Math.max(0, startIndex - 50);
    const afterEnd = Math.min(content.length, startIndex + 100);
    let snippet = content.substring(beforeStart, afterEnd);

    if (beforeStart > 0) snippet = '...' + snippet;
    if (afterEnd < content.length) snippet = snippet + '...';

    return snippet;
  }
}
