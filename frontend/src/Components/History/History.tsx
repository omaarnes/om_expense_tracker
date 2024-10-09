import { useGlobalContext } from "../../context/GlobalContext";
import "./History.css";

function History() {
  const { transactionHistory } = useGlobalContext();

  const history = transactionHistory();

  return (
    <div className="InnerLayout">
      <div className="history-styled">
        <h1>Recent Transactions</h1>
        <br />
        {history.length === 0 ? (
          <p>No recent transactions</p>
        ) : (
          history.map((item) => {
            const { _id, title, amount, type } = item;
            return (
              <div key={_id} className="history-item">
                <p
                  style={{
                    color: type === "expense" ? "red" : "var(--color-green)",
                  }}
                >
                  {title}
                </p>

                <p
                  style={{
                    color: type === "expense" ? "red" : "var(--color-green)",
                  }}
                >
                  {type === "expense"
                    ? `- ${amount <= 0 ? 0 : amount} ,- NOK`
                    : `+ ${amount <= 0 ? 0 : amount} ,- NOK`}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default History;
