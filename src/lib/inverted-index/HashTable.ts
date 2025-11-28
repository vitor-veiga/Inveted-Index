import { LinkedPostingList } from './PostingList';
import type { HashTableStats } from './types';

interface HashTableEntry {
  key: string;
  value: LinkedPostingList;
  next: HashTableEntry | null;
}

export class HashTable {
  private table: (HashTableEntry | null)[];
  private _size: number;
  private _collisions: number = 0;
  private readonly loadFactorThreshold = 0.75;

  constructor(initialCapacity: number = 16) {
    this.table = new Array(initialCapacity).fill(null);
    this._size = 0;
  }

  private hash(key: string): number {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      const char = key.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash) % this.table.length;
  }

  private resize(): void {
    const oldTable = this.table;
    this.table = new Array(oldTable.length * 2).fill(null);
    this._size = 0;
    this._collisions = 0;

    for (const entry of oldTable) {
      let current = entry;
      while (current) {
        this.set(current.key, current.value);
        current = current.next;
      }
    }
  }

  set(key: string, value: LinkedPostingList): void {
    if (this._size / this.table.length >= this.loadFactorThreshold) {
      this.resize();
    }

    const index = this.hash(key);
    const newEntry: HashTableEntry = { key, value, next: null };

    if (!this.table[index]) {
      this.table[index] = newEntry;
      this._size++;
    } else {
      this._collisions++;
      let current = this.table[index]!;
      
      // Check if key exists
      while (true) {
        if (current.key === key) {
          current.value = value;
          return;
        }
        if (!current.next) break;
        current = current.next;
      }
      
      // Add to end of chain
      current.next = newEntry;
      this._size++;
    }
  }

  get(key: string): LinkedPostingList | null {
    const index = this.hash(key);
    let current = this.table[index];

    while (current) {
      if (current.key === key) {
        return current.value;
      }
      current = current.next;
    }

    return null;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  getAllEntries(): Array<{ term: string; postingList: LinkedPostingList }> {
    const entries: Array<{ term: string; postingList: LinkedPostingList }> = [];
    
    for (const entry of this.table) {
      let current = entry;
      while (current) {
        entries.push({ term: current.key, postingList: current.value });
        current = current.next;
      }
    }

    return entries;
  }

  getStats(): HashTableStats {
    return {
      size: this.table.length,
      loadFactor: this._size / this.table.length,
      collisions: this._collisions,
      uniqueTerms: this._size
    };
  }

  get size(): number {
    return this._size;
  }

  get collisions(): number {
    return this._collisions;
  }
}
