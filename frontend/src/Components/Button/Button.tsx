import "./Button.css";
import styled from "styled-components";

interface ButtonProps {
  name: string;
  icon?: JSX.Element;
  onClick: () => void;
  bg: string;
  bPad: string;
  color: string;
  bRad: string;
}

const ButtonStyled = styled.button`
  font-size: 15px;
  cursor: pointer;
`;

function Button({ name, icon, onClick, bg, bPad, color, bRad }: ButtonProps) {
  return (
    <ButtonStyled
      style={{
        background: bg,
        padding: bPad,
        borderRadius: bRad,
        color: color,
      }}
      onClick={onClick}
    >
      {icon}
      {name}
    </ButtonStyled>
  );
}

export default Button;
