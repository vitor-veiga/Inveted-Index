import type { AnimationStep } from '../inverted-index/types';

export function createSearchAnimation(
  query: string,
  matchedDocs: string[]
): AnimationStep[] {
  const terms = query.toLowerCase().split(/\s+/);
  const steps: AnimationStep[] = [];

  // Step 1: Parse query
  steps.push({
    stepNumber: 1,
    description: 'Analisando a consulta e extraindo os termos',
    highlightedTerms: terms,
    currentDocuments: [],
    operation: 'parse'
  });

  // Step 2: Hash each term
  terms.forEach((term) => {
    steps.push({
      stepNumber: steps.length + 1,
      description: `Fazendo hash do termo "${term}" para encontrar a posting list`,
      highlightedTerms: [term],
      currentDocuments: [],
      operation: 'hash'
    });
  });

  // Step 3: Retrieve posting lists
  steps.push({
    stepNumber: steps.length + 1,
    description: 'Recuperando as posting lists da tabela hash',
    highlightedTerms: terms,
    currentDocuments: [],
    operation: 'retrieve'
  });

  // Step 4: Merge/intersect results
  steps.push({
    stepNumber: steps.length + 1,
    description: 'Mesclando as posting lists para encontrar documentos correspondentes',
    highlightedTerms: terms,
    currentDocuments: matchedDocs,
    operation: 'merge'
  });

  // Step 5: Return results
  steps.push({
    stepNumber: steps.length + 1,
    description: 'Retornando os documentos encontrados',
    highlightedTerms: terms,
    currentDocuments: matchedDocs,
    operation: 'complete'
  });

  return steps;
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function* animateSteps(
  steps: AnimationStep[],
  delayMs: number = 1000
): AsyncGenerator<AnimationStep> {
  for (const step of steps) {
    yield step;
    await delay(delayMs);
  }
}
