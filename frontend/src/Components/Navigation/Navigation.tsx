import { useGlobalContext } from "../../context/GlobalContext";
import avatar from "../../images/admin_pf.png";
import { signout } from "../../utils/icons";
import { menuItems } from "../../utils/menuItems";
import "./Navigation.css";

interface NavigationProps {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
}

const Navigation: React.FC<NavigationProps> = ({ active, setActive }) => {
  const { totalBalance } = useGlobalContext();
  return (
    <>
      <div className="navContainer">
        <div className="userCon">
          <img src={avatar} alt="Avatar" />
          <div className="text">
            <h2>Ole Marcus</h2>
            <p>Balance: {totalBalance} ,- NOK</p>
          </div>
        </div>
        <ul className="menu_Items">
          {menuItems.map((item) => {
            return (
              <li
                key={item.id}
                onClick={() => setActive(item.id)}
                className={active === item.id ? "active" : ""}
              >
                {item.icon}
                <span>{item.title}</span>
              </li>
            );
          })}
        </ul>
        <div className="bottom-nav">
          <li>{signout} Sign Out</li>
        </div>
      </div>
    </>
  );
};

export default Navigation;
