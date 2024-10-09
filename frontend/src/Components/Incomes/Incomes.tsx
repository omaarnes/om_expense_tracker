import Form from "../Form/Form";
import { useEffect } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import IncomeItem from "../Incomes/IncomeItem";

const Incomes = () => {
  const { incomes, getIncomes, deleteIncome, totalIncome } = useGlobalContext();

  useEffect(() => {
    getIncomes();
  }, [getIncomes]);

  const handleDelete = async (id: string) => {
    console.log("Deleting income with id:", id); // Debugging line
    try {
      await deleteIncome(id);
      console.log("Income deleted successfully");
      alert("Income deleted successfully");
    } catch (error) {
      console.error("Error deleting income:", error);
      alert("Error deleting income");
    }
  };

  return (
    <div className="InnerLayout">
      <h1>Incomes</h1>
      <h2 className="total-income">
        Total Income: <span>{totalIncome()} ,- NOK</span>
      </h2>
      <div className="income-content">
        <div className="form-container">
          <Form />
        </div>
        <div className="incomes">
          <br />
          {incomes.map((income) => {
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
                type="income"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Incomes;
