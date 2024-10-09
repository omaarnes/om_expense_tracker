import {
  bitcoin,
  book,
  card,
  circle,
  clothing,
  food,
  freelance,
  medical,
  money,
  piggy,
  stocks,
  takeaway,
  trash,
  tv,
  users,
  yt,
  calender,
  comment,
} from "../../utils/icons";
import Button from "../Button/Button";
import "./IncomeItem.css";

interface IncomeItemProps {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  description: string;
  deleteItem: (id: string) => Promise<void>;
  type: string;
}

const IncomeItem = ({
  id,
  title,
  amount,
  date,
  category,
  description,
  deleteItem,
  type,
}: IncomeItemProps) => {
  const categoryIcon = () => {
    switch (category) {
      case "salary":
        return money;
      case "freelancing":
        return freelance;
      case "investments":
        return stocks;
      case "stocks":
        return users;
      case "bitcoin":
        return bitcoin;
      case "bank":
        return card;
      case "youtube":
        return yt;
      case "other":
        return piggy;
      default:
        return "";
    }
  };

  const expenseCatIcon = () => {
    switch (category) {
      case "education":
        return book;
      case "groceries":
        return food;
      case "health":
        return medical;
      case "subscriptions":
        return tv;
      case "takeaways":
        return takeaway;
      case "clothing":
        return clothing;
      case "travelling":
        return freelance;
      case "other":
        return circle;
      default:
        return "";
    }
  };
  return (
    <div className="IncomeItem">
      <div className="icon">
        {type === "expense" ? expenseCatIcon() : categoryIcon()}
      </div>
      <div className="content">
        <h5>{title}</h5>
        <div className="inner-content">
          <div className="text">
            <p>{amount} ,- NOK</p>
            <p>
              {calender} {date}
            </p>
            <p>
              {comment}
              {description}
            </p>
          </div>
        </div>
      </div>
      <Button
        name="&nbsp;Delete"
        icon={trash}
        onClick={() => deleteItem(id)}
        bg="red"
        bPad="5px"
        color="white"
        bRad="6px"
      />
    </div>
  );
};

export default IncomeItem;
