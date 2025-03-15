import "./Scrollbar.css";
import { useState, useRef } from "react";

function Scrollbar() {
  const [position, setPosition] = useState(228);
  const linksRef = useRef([]);

  const handleClick = (index) => {
    if (linksRef.current[index]) {
      const linkPosition = linksRef.current[index].offsetTop;
      setPosition(linkPosition);
    }
  };

  return (
    <div className="scroll-container">
      <div className="content">
        <div className="bar" style={{ top: position + 10 + "px" }}></div>

        {["Start", "01", "02", "03"].map((text, index) => (
          <a
            key={index}
            className="link"
            href="#"
            ref={(el) => (linksRef.current[index] = el)}
            onClick={() => handleClick(index)}
          >
            {text}
          </a>
        ))}
      </div>
    </div>
  );
}

export default Scrollbar;
