import fs from 'fs';
import path from 'path';
// import neatCsv from 'neat-csv';
import csv from 'csv-parser';
import uploadConfig from '../config/upload';

import Transaction from '../models/Transaction';
import CreateTransactionService from './CreateTransactionService';

interface Request {
  title: string;
  type: 'income' | 'outcome';
  category: string;
  value: number;
}

class ImportTransactionsService {
  async execute(transactionsFilename: string): Promise<Transaction[]> {
    const transactionList: Transaction[] = [];
    const transactionService = new CreateTransactionService();
    const transactionsFilePath = path.join(
      uploadConfig.directory,
      transactionsFilename,
    );

    function csvItens(csvFile: string): Promise<Request[]> {
      return new Promise(resolve => {
        const results: Request[] = [];
        fs.createReadStream(csvFile).pipe(
          csv({
            mapHeaders: ({ header }) => header.trim(),
            mapValues: ({ header, value }) =>
              header === 'value' ? parseInt(value) : value.trim(),
          })
            .on('data', data => results.push(data))
            .on('end', () => resolve(results)),
        );
      });
    }

    const transactions = await csvItens(transactionsFilePath);

    for await (const transaction of transactions) {
      const response = await transactionService.execute({
        title: transaction.title,
        type: transaction.type,
        category: transaction.category,
        value: transaction.value,
      });

      transactionList.push(response);
    }

    return transactionList;
  }
}

export default ImportTransactionsService;
