import React from "react";
import UseToggle from "./UseToggle";
function ToggleButton() {
  const {isToggled, toggle} = UseToggle();

  return (
    <div>
      <button onClick={toggle}>{isToggled ? "ON" : "OFF"}</button>
      <p>The button is {isToggled ? "toggled ON" : "toggled OFF"}</p>
    </div>
  );
}

export default ToggleButton;
