import { useState, useMemo, useCallback } from 'react';
import { createSearchAnimation, delay } from '../lib/utils/animations';

export function useAnimation(query: string, matchedDocs: string[]) {
  const steps = useMemo(() => {
    if (query && matchedDocs.length > 0) {
      return createSearchAnimation(query, matchedDocs);
    }
    return [];
  }, [query, matchedDocs]);

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<number>(3000); // milliseconds per step

  const play = useCallback(async () => {
    if (steps.length === 0 || isPlaying) return;

    setIsPlaying(true);
    setCurrentStep(0);

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      await delay(speed);
    }

    setIsPlaying(false);
  }, [steps, speed, isPlaying]);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const reset = useCallback(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, []);

  const next = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, steps.length]);

  const previous = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const goToStep = useCallback((stepNumber: number) => {
    if (stepNumber >= 0 && stepNumber < steps.length) {
      setCurrentStep(stepNumber);
    }
  }, [steps.length]);

  return {
    steps,
    currentStep: steps[currentStep],
    currentStepNumber: currentStep,
    totalSteps: steps.length,
    isPlaying,
    speed,
    setSpeed,
    play,
    pause,
    reset,
    next,
    previous,
    goToStep
  };
}
