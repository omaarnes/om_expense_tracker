import { ChangeEvent, FormEvent, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../Button/Button";
import { plus } from "../../utils/icons";
import { Transaction, useGlobalContext } from "../../context/GlobalContext";
import "../Form/Form.css";

const ExpenseForm = () => {
  const { addExpense, error, setError } = useGlobalContext();
  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    description: "",
  });

  const { title, amount, date, category, description } = inputState;

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const handleInput =
    (name: string) =>
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      setInputState({ ...inputState, [name]: e.target.value });
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!title || !amount || !date || !category) {
      setError("All fields are required");
      return;
    }
    const transaction: Transaction = {
      _id: generateId(),
      createdAt: new Date().toISOString(),
      title: inputState.title,
      amount: parseFloat(inputState.amount),
      date: inputState.date,
      category: inputState.category,
      description: inputState.description,
    };

    await addExpense(transaction);
    setInputState({
      title: "",
      amount: "",
      date: "",
      category: "",
      description: "",
    });
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="input-control">
        <input
          type="text"
          value={title}
          name="title"
          placeholder="Expense: Title..."
          onChange={handleInput("title")}
        />
      </div>
      <div className="input-control">
        <input
          type="text"
          value={amount}
          name="amount"
          placeholder="Expense: Amount..."
          onChange={handleInput("amount")}
        />
      </div>
      <div className="input-control">
        <ReactDatePicker
          placeholderText="Enter A Date..."
          selected={date ? new Date(date) : null}
          dateFormat="dd/MM/yyyy"
          onChange={(date) =>
            setInputState({ ...inputState, date: date?.toISOString() || "" })
          }
        />
      </div>
      <div className="input-control">
        <select
          required
          name="category"
          onChange={handleInput("category")}
          value={category}
        >
          <option value="" disabled>
            Select Option
          </option>
          <option value="education">Education</option>
          <option value="groceries">Groceries</option>
          <option value="health">Health</option>
          <option value="subscriptions">Subscriptions</option>
          <option value="takeaways">Takeaways</option>
          <option value="clothing">Clothing</option>
          <option value="travelling">Travelling</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="input-control">
        <textarea
          name="description"
          value={description}
          placeholder="Add A Reference"
          id="description"
          cols={50}
          rows={5}
          onChange={handleInput("description")}
        ></textarea>
      </div>
      <div className="submit-btn">
        <Button
          name="&nbsp;Add Expense"
          icon={plus}
          bPad=".8rem 1.6rem"
          bRad="30px"
          bg="var(--color-accent)"
          color="#fff"
          onClick={() => handleSubmit}
        />
      </div>
      {error && (
        <p style={{ color: "red", textTransform: "uppercase" }}>{error}</p>
      )}
    </form>
  );
};

export default ExpenseForm;
