import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [text, setText] = useState("Hello World");
  let [fontS, setFontSize] = useState(20);
  let [textColors, setTextColor] = useState("");

  function setTextValueUppercase() {
    setText(text.toUpperCase());
  }

  function setTextValueLowercase() {
    setText(text.toLowerCase());
  }

  function increaseFontSize() {
    fontS++;
    setFontSize(fontS);
  }

  function decreaseFontSize() {
    fontS--;
    setFontSize(fontS);
  }

  function textColorChange(event) {
    textColors = event.target.value;
    setTextColor(textColors);
  }

  return (
    <>
      <div className="container">
        <div className="text_container">
          <p id="paragraph" style={{ fontSize: fontS, color: textColors }}>
            {text}
          </p>
        </div>

        <input
          type="text"
          name=""
          id=""
          value={textColors}
          placeholder="Enter color name"
          onChange={textColorChange}
        />

        <div className="button_container">
          <button
            type="upper"
            className="buttons"
            id="upper"
            onClick={setTextValueUppercase}
          >
            Uppercase
          </button>
          <button
            type="lower"
            className="buttons"
            id="lower"
            onClick={setTextValueLowercase}
          >
            Lowercase
          </button>
          <button
            type="increment"
            className="buttons"
            id="increment"
            onClick={increaseFontSize}
          >
            +
          </button>
          <button
            type="decrement"
            className="buttons"
            id="decrement"
            onClick={decreaseFontSize}
          >
            -
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
