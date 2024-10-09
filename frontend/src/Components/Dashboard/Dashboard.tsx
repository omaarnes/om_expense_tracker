import { useGlobalContext } from "../../context/GlobalContext";
import { useEffect } from "react";
import "./Dashboard.css";
import Chart from "../Chart/Chart";

const Dashboard = () => {
  const {
    totalExpenses,
    incomes,
    expenses,
    totalIncome,
    getIncomes,
    getExpenses,
  } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, [getIncomes, getExpenses]);

  return (
    <div className="InnerLayout">
      <h1>All Transactions</h1>
      <br />
      <div className="stats-con">
        <div className="chart-con">
          <Chart />
        </div>
        <div className="amount-con">
          <div className="income">
            <h2>Total Income</h2>
            <p>{totalIncome()} ,- NOK</p>
          </div>
          <br />
          <div className="expense">
            <h2>Total Expenses</h2>
            <p>{totalExpenses()} ,- NOK</p>
          </div>
        </div>
        <div className="history-con">
          <h2 className="salary-title">
            <span>Salary</span>
          </h2>
          <div className="salary-item">
            <p>Min: {Math.min(...incomes.map((item) => item.amount))} ,- NOK</p>
            <p>Max: {Math.max(...incomes.map((item) => item.amount))} ,- NOK</p>
          </div>
          <h2 className="salary-title">
            <span>Expense</span>
          </h2>
          <div className="salary-item">
            <p>
              Min: {Math.min(...expenses.map((item) => item.amount))} ,- NOK
            </p>
            <p>
              Max: {Math.max(...expenses.map((item) => item.amount))} ,- NOK
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
