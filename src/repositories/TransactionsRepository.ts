import { EntityRepository, Repository } from 'typeorm';

import Balance from '../models/Balance';
import Transaction from '../models/Transaction';
import Operation from '../factories/Operation';

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  private balance = new Balance();

  public async getBalance(): Promise<Balance> {
    const transactions = await this.find({
      order: {
        type: 'ASC',
      },
    });

    transactions.forEach(transaction => {
      const Calcule = Operation(transaction.type);
      const balance = new Calcule(this.balance, transaction.value);
      this.balance = balance.calcular();
    });

    return this.balance;
  }

  public async checkBalance(
    balance: Balance,
    transaction: Transaction,
  ): Promise<void> {
    const Calcule = Operation(transaction.type);
    const balanced = new Calcule(balance, transaction.value);
    balanced.calcular();
  }
}

export default TransactionsRepository;
