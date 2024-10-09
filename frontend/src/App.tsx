import { useState } from "react";
import Navigation from "./Components/Navigation/Navigation";
import Orb from "./Components/Orb/Orb";
import "./styles/main.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import Incomes from "./Components/Incomes/Incomes";
import Expenses from "./Components/Expenses/Expenses";
import History from "./Components/History/History";

function App() {
  const [active, setActive] = useState(1);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <History />;
      case 3:
        return <Incomes />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <div className="App">
        <Orb />
        <div className="MainLayout">
          <Navigation active={active} setActive={setActive} />
          <main>{displayData()}</main>
        </div>
      </div>
    </>
  );
}

export default App;
