/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useContext,
  useState,
  useEffect,
  FC,
  ReactNode,
  createContext,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";

const BASE_URL = "http://localhost:4321/api/v1/";

export interface Transaction {
  _id: string;
  title: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  createdAt: string;
  type?: string;
}

interface GlobalContextType {
  incomes: Transaction[];
  expenses: Transaction[];
  error: string | null;
  addIncome: (income: Transaction) => Promise<void>;
  getIncomes: () => Promise<void>;
  deleteIncome: (id: string) => Promise<void>;
  addExpense: (expense: Transaction) => Promise<void>;
  getExpenses: () => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  totalIncome: () => number;
  totalExpenses: () => number;
  totalBalance: number;
  transactionHistory: () => Transaction[];
  setError: (error: string | null) => void;
}

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: FC<GlobalProviderProps> = ({ children }) => {
  const [incomes, setIncomes] = useState<Transaction[]>([]);
  const [expenses, setExpenses] = useState<Transaction[]>([]);
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const getIncomes = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-incomes`);
      setIncomes(response.data);
    } catch (err: any) {
      setError(err.response?.data.message);
    }
  }, []);

  const addIncome = useCallback(
    async (income: Transaction) => {
      try {
        await axios.post(`${BASE_URL}add-income`, income);
        await getIncomes();
      } catch (err: any) {
        setError(err.response?.data.message);
      }
    },
    [getIncomes]
  );

  const deleteIncome = useCallback(
    async (id: string) => {
      await axios.delete(`${BASE_URL}delete-income/${id}`);
      await getIncomes();
    },
    [getIncomes]
  );
  const sortExpenses = useCallback((expenses: Transaction[]) => {
    expenses.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, []);

  const getExpenses = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-expenses`);
      sortExpenses(response.data);
      setExpenses(response.data);
    } catch (err: any) {
      setError(err.response?.data.message);
    }
  }, [sortExpenses]);

  const addExpense = useCallback(
    async (expense: Transaction) => {
      try {
        await axios.post(`${BASE_URL}add-expense`, expense);
        await getExpenses();
      } catch (err: any) {
        setError(err.response?.data.message);
      }
    },
    [getExpenses]
  );

  const deleteExpense = useCallback(
    async (id: string) => {
      await axios.delete(`${BASE_URL}delete-expense/${id}`);
      await getExpenses();
    },
    [getExpenses]
  );

  const totalIncome = useCallback(
    (): number => incomes.reduce((acc, income) => acc + income.amount, 0),
    [incomes]
  );

  const totalExpenses = useCallback(
    (): number => expenses.reduce((acc, expense) => acc + expense.amount, 0),
    [expenses]
  );

  const transactionHistory = useCallback((): Transaction[] => {
    const history = [
      ...incomes.map((transaction) => ({ ...transaction, type: "income" })),
      ...expenses.map((transaction) => ({ ...transaction, type: "expense" })),
    ];
    return history
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 10);
  }, [incomes, expenses]);

  useEffect(() => {
    const calculateTotalBalance = () => {
      const totalIncomeAmount = incomes.reduce(
        (acc, income) => acc + income.amount,
        0
      );
      const totalExpensesAmount = expenses.reduce(
        (acc, expense) => acc + expense.amount,
        0
      );
      setTotalBalance(totalIncomeAmount - totalExpensesAmount);
    };

    calculateTotalBalance();
  }, [incomes, expenses]);

  useEffect(() => {
    const fetchData = async () => {
      await getIncomes();
      await getExpenses();
    };

    fetchData();
  }, [getIncomes, getExpenses]);

  const value = useMemo(
    () => ({
      addIncome,
      getIncomes,
      incomes,
      deleteIncome,
      expenses,
      totalIncome,
      addExpense,
      getExpenses,
      deleteExpense,
      totalExpenses,
      totalBalance,
      transactionHistory,
      error,
      setError,
    }),
    [
      addIncome,
      getIncomes,
      incomes,
      deleteIncome,
      expenses,
      totalIncome,
      addExpense,
      getExpenses,
      deleteExpense,
      totalExpenses,
      totalBalance,
      transactionHistory,
      error,
      setError,
    ]
  );

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
