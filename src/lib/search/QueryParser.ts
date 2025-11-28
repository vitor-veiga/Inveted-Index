import type { BooleanQuery } from '../inverted-index/types';

export class QueryParser {
  static parse(query: string): BooleanQuery | string[] {
    const normalized = query.toLowerCase().trim();

    // Check for AND operator
    if (normalized.includes(' and ')) {
      const terms = normalized.split(' and ').map(t => t.trim());
      return { operator: 'AND', terms };
    }

    // Check for OR operator
    if (normalized.includes(' or ')) {
      const terms = normalized.split(' or ').map(t => t.trim());
      return { operator: 'OR', terms };
    }

    // Check for NOT operator
    if (normalized.startsWith('not ')) {
      const term = normalized.substring(4).trim();
      return { operator: 'NOT', terms: [term] };
    }

    // Simple multi-word query (treat as AND)
    const terms = normalized.split(/\s+/).filter(t => t.length > 0);
    return terms;
  }

  static isBooleanQuery(parsed: BooleanQuery | string[]): parsed is BooleanQuery {
    return typeof parsed === 'object' && 'operator' in parsed;
  }
}
