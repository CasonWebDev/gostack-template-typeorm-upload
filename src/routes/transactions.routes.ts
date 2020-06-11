import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import GetTransactionService from '../services/GetTransactionService';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();
const upload = multer(uploadConfig);

transactionsRouter.get('/', async (request, response) => {
  const transactionsService = new GetTransactionService();
  const transactions = await transactionsService.execute();

  return response.json(transactions);
});

transactionsRouter.post('/', async (request, response) => {
  const { title, type, category, value } = request.body;

  const createTransaction = new CreateTransactionService();

  const transaction = await createTransaction.execute({
    title,
    type,
    category,
    value,
  });

  return response.json(transaction);
});

transactionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteTransaction = new DeleteTransactionService();

  await deleteTransaction.execute(id);

  return response.json({ message: 'Transaction deleted successfully' });
});

transactionsRouter.post(
  '/import',
  upload.single('file'),
  async (request, response) => {
    const importTransactions = new ImportTransactionsService();

    const transactions = await importTransactions.execute(
      request.file.filename,
    );

    return response.json(transactions);
  },
);

export default transactionsRouter;
