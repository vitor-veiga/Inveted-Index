import { HashTable } from './HashTable';
import { LinkedPostingList } from './PostingList';
import type { Document, Posting, IndexEntry, HashTableStats } from './types';
import { tokenize } from '../utils/textProcessing';

export class InvertedIndex {
  private hashTable: HashTable;
  private documents: Map<string, Document>;
  private totalDocuments = 0;

  constructor(initialCapacity: number = 16) {
    this.hashTable = new HashTable(initialCapacity);
    this.documents = new Map();
  }

  // Tokenization delegated to shared util

  addDocument(document: Document): void {
    const tokens = tokenize(document.content);
    document.wordCount = tokens.length;
    this.documents.set(document.id, document);
    this.totalDocuments++;

    // Track term positions and frequencies
    const termPositions = new Map<string, number[]>();

    tokens.forEach((term, position) => {
      if (!termPositions.has(term)) {
        termPositions.set(term, []);
      }
      termPositions.get(term)!.push(position);
    });

    // Add postings to inverted index
    termPositions.forEach((positions, term) => {
      let postingList = this.hashTable.get(term);
      
      if (!postingList) {
        postingList = new LinkedPostingList(term);
        this.hashTable.set(term, postingList);
      }

      const posting: Posting = {
        docId: document.id,
        positions,
        termFrequency: positions.length
      };

      postingList.addPosting(posting);
    });
  }

  search(term: string): Posting[] {
    const normalizedTerm = term.toLowerCase();
    const postingList = this.hashTable.get(normalizedTerm);
    return postingList ? postingList.getPostings() : [];
  }

  getDocument(docId: string): Document | undefined {
    return this.documents.get(docId);
  }

  getAllTerms(): string[] {
    return this.hashTable.getAllEntries().map(entry => entry.term);
  }

  getAllEntries(): IndexEntry[] {
    return this.hashTable.getAllEntries().map(entry => ({
      term: entry.term,
      postingList: entry.postingList.toPostingList()
    }));
  }

  getDocumentFrequency(term: string): number {
    const postingList = this.hashTable.get(term.toLowerCase());
    return postingList ? postingList.documentFrequency : 0;
  }

  getTotalDocuments(): number {
    return this.totalDocuments;
  }

  getHashTableStats(): HashTableStats {
    return this.hashTable.getStats();
  }

  clear(): void {
    this.hashTable = new HashTable();
    this.documents.clear();
    this.totalDocuments = 0;
  }
}
