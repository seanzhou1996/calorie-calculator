import React from 'react';
import { GoalType } from 'shared/models';
import ResultSectionHowToGainWeight from './ResultSectionHowToGainWeight';
import ResultSectionHowToLoseWeight from './ResultSectionHowToLoseWeight';

interface ResultSectionAdviceProps {
  goal: GoalType;
}

export default function ResultSectionAdvice({ goal }: ResultSectionAdviceProps) {
  switch (goal) {
    case GoalType.Cut: {
      return <ResultSectionHowToLoseWeight />;
    }
    case GoalType.Bulk: {
      return <ResultSectionHowToGainWeight />;
    }
    default: {
      return null;
    }
  }
}
