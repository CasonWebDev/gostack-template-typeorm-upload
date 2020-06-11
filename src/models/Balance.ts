class Balance {
  income: number;

  outcome: number;

  total: number;

  constructor(income = 0, outcome = 0, total = 0) {
    this.income = income;
    this.outcome = outcome;
    this.total = total;
  }
}

export default Balance;
