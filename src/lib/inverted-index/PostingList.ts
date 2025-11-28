import type { Posting, PostingListNode, PostingList } from './types';

export class LinkedPostingList {
  private head: PostingListNode | null = null;
  private _documentFrequency = 0;
  public readonly term: string;

  constructor(term: string) {
    this.term = term;
  }

  addPosting(posting: Posting): void {
    const newNode: PostingListNode = {
      posting,
      next: null
    };

    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this._documentFrequency++;
  }

  getPostings(): Posting[] {
    const postings: Posting[] = [];
    let current = this.head;
    while (current) {
      postings.push(current.posting);
      current = current.next;
    }
    return postings;
  }

  toPostingList(): PostingList {
    return {
      term: this.term,
      documentFrequency: this._documentFrequency,
      postings: this.getPostings()
    };
  }

  get documentFrequency(): number {
    return this._documentFrequency;
  }

  // Merge two posting lists (for OR operation)
  static merge(list1: LinkedPostingList, list2: LinkedPostingList): Posting[] {
    const postings1 = list1.getPostings();
    const postings2 = list2.getPostings();
    const mergedMap = new Map<string, Posting>();

    postings1.forEach(p => mergedMap.set(p.docId, p));
    postings2.forEach(p => {
      if (!mergedMap.has(p.docId)) {
        mergedMap.set(p.docId, p);
      }
    });

    return Array.from(mergedMap.values());
  }

  // Intersect two posting lists (for AND operation)
  static intersect(list1: LinkedPostingList, list2: LinkedPostingList): Posting[] {
    const postings1 = list1.getPostings();
    const postings2 = list2.getPostings();
    const docIds2 = new Set(postings2.map(p => p.docId));

    return postings1.filter(p => docIds2.has(p.docId));
  }
}
