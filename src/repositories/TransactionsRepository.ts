import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return [...this.transactions];
  }

  public getBalance(): Balance {
    const transactionsSummary = this.transactions.reduce(
      (a, c) => {
        const result = a;
        if (c.type === 'income') result.income += c.value;
        else result.outcome += c.value;
        return result;
      },
      {
        income: 0,
        outcome: 0,
      },
    );
    const balance: Balance = {
      total: transactionsSummary.income - transactionsSummary.outcome,
      income: transactionsSummary.income,
      outcome: transactionsSummary.outcome,
    };
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      type,
      value,
    });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
