import Balance from '../models/Balance';
import Calcule from './contracts/Calcule';

import AppError from '../errors/AppError';

class Outcome implements Calcule {
  private balance: Balance;

  private value: number;

  constructor(balance: Balance, value: number) {
    this.balance = balance;
    this.value = value;
  }

  public calcular(): Balance {
    const alteredBalance = this.balance;

    if (this.value > alteredBalance.total) {
      throw new AppError(
        'The outcome value cannot be bigger than available income value',
      );
    }

    alteredBalance.outcome += this.value;

    alteredBalance.total = alteredBalance.income - alteredBalance.outcome;

    return alteredBalance;
  }
}

export default Outcome;
