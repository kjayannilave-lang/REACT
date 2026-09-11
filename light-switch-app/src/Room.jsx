import { useState } from "react";
import LightSwitch from "./LightSwitch";

function Room() {
  const [isOn, setIsOn] = useState(false);

  function toggleLight() {
    setIsOn(!isOn);
  }

  return (
    <div>
      <h1>
        {isOn ? "The room is bright" : "The room is dark"}
      </h1>

      <LightSwitch
        isOn={isOn}
        toggleLight={toggleLight}
      />
    </div>
  );
}

export default Room;