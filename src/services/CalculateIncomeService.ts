import Balance from '../models/Balance';
import Calcule from './contracts/Calcule';

class Income implements Calcule {
  private balance: Balance;

  private value: number;

  constructor(balance: Balance, value: number) {
    this.balance = balance;
    this.value = value;
  }

  public calcular(): Balance {
    const alteredBalance = this.balance;

    alteredBalance.income += this.value;

    alteredBalance.total = alteredBalance.income - alteredBalance.outcome;

    return alteredBalance;
  }
}

export default Income;
