import { getCustomRepository } from 'typeorm';

import TransactionRepository from '../repositories/TransactionsRepository';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  transactions: Transaction[];
  balance: Balance;
}

class GetTransactionService {
  public async execute(): Promise<TransactionDTO> {
    const transactionRepository = getCustomRepository(TransactionRepository);
    const transactions = await transactionRepository.find({
      relations: ['category'],
      select: [
        'id',
        'title',
        'value',
        'type',
        'category',
        'created_at',
        'updated_at',
      ],
    });
    const balance = await transactionRepository.getBalance();

    return {
      transactions,
      balance,
    };
  }
}

export default GetTransactionService;
