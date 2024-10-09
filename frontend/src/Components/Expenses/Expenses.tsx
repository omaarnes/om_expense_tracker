import { useEffect } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import IncomeItem from "../Incomes/IncomeItem";
import ExpenseForm from "./ExpenseForm";

const Expenses = () => {
  const { expenses, getExpenses, deleteExpense, totalExpenses } =
    useGlobalContext();

  useEffect(() => {
    getExpenses();
  }, [getExpenses]);

  const handleDelete = async (id: string) => {
    console.log("Deleting expense with id:", id); // Debugging line
    try {
      await deleteExpense(id);
      console.log("Expense deleted successfully");
      alert("Expense deleted successfully");
    } catch (error) {
      console.error("Error deleting expense:", error);
      alert("Error deleting expense");
    }
  };

  return (
    <div className="InnerLayout">
      <h1>Expenses</h1>
      <h2 className="total-income">
        Total Expense: <span>{totalExpenses()} ,- NOK</span>
      </h2>
      <div className="income-content">
        <div className="form-container">
          <ExpenseForm />
        </div>
        <div className="incomes">
          <br />
          {expenses.map((income) => {
            const { _id, title, amount, date, category, description } = income;
            return (
              <IncomeItem
                key={_id}
                id={_id}
                title={title}
                description={description}
                amount={amount}
                date={new Date(date).toLocaleString().split("T")[0]}
                category={category}
                deleteItem={handleDelete}
                type="expense"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Expenses;
