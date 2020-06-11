import { getCustomRepository } from 'typeorm';

// import AppError from '../errors/AppError';

import CreateCategory from './CreateCategoryService';
import TransactionsRepository from '../repositories/TransactionsRepository';

import Transaction from '../models/Transaction';

interface Request {
  title: string;
  type: 'income' | 'outcome';
  category: string;
  value: number;
}

class CreateTransactionService {
  public async execute({
    title,
    type,
    category,
    value,
  }: Request): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const createCategory = new CreateCategory();
    const { id } = await createCategory.execute(category);

    const balance = await transactionsRepository.getBalance();

    const transaction = transactionsRepository.create({
      title,
      type,
      value,
      category_id: id,
    });

    await transactionsRepository.checkBalance(balance, transaction);

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
