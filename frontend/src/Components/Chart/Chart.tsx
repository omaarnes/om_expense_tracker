import "./Chart.css";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useGlobalContext } from "../../context/GlobalContext";
import moment from "moment";

// Register the necessary components
Chart.register(...registerables);

const ChartComponent = () => {
  const { incomes, expenses } = useGlobalContext();

  const data = {
    labels: incomes.map((inc) => {
      const { date } = inc;
      return moment(date).format("DD/MM").toString();
    }),
    datasets: [
      {
        label: "Income",
        data: incomes.map((income) => income.amount),
        backgroundColor: "green",
        tension: 0.2,
      },
      {
        label: "Expenses",
        data: expenses.map((expense) => expense.amount),
        backgroundColor: "red",
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="charts">
      <Line data={data} />
    </div>
  );
};

export default ChartComponent;
