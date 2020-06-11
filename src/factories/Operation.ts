import Income from '../services/CalculateIncomeService';
import Outcome from '../services/CalculateOutcomeService';

const operation = {
  income: Income,
  outcome: Outcome,
};

function hasKey<O>(obj: O, key: keyof any): key is keyof O {
  return key in obj;
}

function Operation(type: string): typeof Income | typeof Outcome {
  if (hasKey(operation, type)) {
    return operation[type];
  }
  throw Error('Operation not found');
}

export default Operation;
