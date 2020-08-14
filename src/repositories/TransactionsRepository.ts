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
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomes = this.transactions.filter((value) => {
      return value.type === 'income'
    });

    const outcomes = this.transactions.filter((value) => {
      return value.type === 'outcome';
    });

    const startsAt = 0;

    const income = incomes.reduce(
      function(sum, current){
        return sum + current.value;
      }, 0
    );
    
    const outcome = outcomes.reduce(
      function(sum, current){
        return sum + current.value;
      }, 0
    );

    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total
    };

    return balance || null;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

        this.transactions.push(transaction);

        return transaction;
  }
}

export default TransactionsRepository;
