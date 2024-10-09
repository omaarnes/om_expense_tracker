import { ReactNode } from "react";
import useWindowSize from "../../utils/useWindowSize";

const Orb: React.FC = () => {
  const { width, height } = useWindowSize();
  // console.log(width, height);

  const dynamicStyles: React.CSSProperties = {
    animationName: "backMotion",
    animationDuration: "3.5s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    animationDirection: "alternate",
    width: "80vh",
    height: "80vh",
    position: "absolute",
    borderRadius: "50%",
    marginTop: "-37vh",
    marginLeft: "-37vh",
    background: "linear-gradient(270deg, #8fa7e5 0%, #2959b8 100%)",
    filter: "blur(370px)",
  };

  const dynamicKeyframes: ReactNode = `
  @keyframes backMotion {
    0% { transform: translate(0, 0); }
    50% { transform: translate(${width / 1.2}px, ${height / 1.5}px); }
    100% { transform: translate(0, 0); }
  }
`;

  return (
    <>
      <style>{dynamicKeyframes}</style>
      <div className="orb-main" style={dynamicStyles}>
        <h1>hello world</h1>
      </div>
    </>
  );
};

export default Orb;
