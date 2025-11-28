import { InvertedIndex } from '../inverted-index/InvertedIndex';
import type { TFIDFScore } from '../inverted-index/types';
import { tokenize } from '../utils/textProcessing';

export class TFIDF {
  private index: InvertedIndex;

  constructor(index: InvertedIndex) {
    this.index = index;
  }

  // Calculate Term Frequency (TF) for a term in a document
  calculateTF(termFrequency: number, totalTermsInDoc: number): number {
    return termFrequency / totalTermsInDoc;
  }

  // Calculate Inverse Document Frequency (IDF)
  calculateIDF(term: string): number {
    const totalDocs = this.index.getTotalDocuments();
    const docsWithTerm = this.index.getDocumentFrequency(term);
    
    if (docsWithTerm === 0) return 0;
    
    return Math.log(totalDocs / docsWithTerm);
  }

  // Calculate TF-IDF score for a term in a document
  calculateTFIDF(term: string, docId: string): number {
    const postings = this.index.search(term);
    const posting = postings.find(p => p.docId === docId);
    
    if (!posting) return 0;

    const doc = this.index.getDocument(docId);
    if (!doc) return 0;

    const tf = this.calculateTF(posting.termFrequency, doc.wordCount);
    const idf = this.calculateIDF(term);

    return tf * idf;
  }

  // Calculate TF-IDF scores for all terms in a query across all matching documents
  calculateScores(query: string): TFIDFScore[] {
    const terms = tokenize(query);
    const scores: TFIDFScore[] = [];

    terms.forEach(term => {
      const postings = this.index.search(term);
      const idf = this.calculateIDF(term);

      postings.forEach(posting => {
        const doc = this.index.getDocument(posting.docId);
        if (!doc) return;

        const tf = this.calculateTF(posting.termFrequency, doc.wordCount);
        const tfidf = tf * idf;

        scores.push({
          docId: posting.docId,
          term,
          tf,
          idf,
          tfidf
        });
      });
    });

    return scores.sort((a, b) => b.tfidf - a.tfidf);
  }

  // Rank documents by their combined TF-IDF scores for a query
  rankDocuments(query: string): Array<{ docId: string; score: number }> {
    const terms = tokenize(query);
    const documentScores = new Map<string, number>();

    terms.forEach(term => {
      const postings = this.index.search(term);
      const idf = this.calculateIDF(term);

      postings.forEach(posting => {
        const doc = this.index.getDocument(posting.docId);
        if (!doc) return;

        const tf = this.calculateTF(posting.termFrequency, doc.wordCount);
        const tfidf = tf * idf;

        const currentScore = documentScores.get(posting.docId) || 0;
        documentScores.set(posting.docId, currentScore + tfidf);
      });
    });

    return Array.from(documentScores.entries())
      .map(([docId, score]) => ({ docId, score }))
      .sort((a, b) => b.score - a.score);
  }
}
