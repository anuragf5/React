import { useState } from "react";

function UseToggle(initialValue = false) {
  const [isToggled, setIsToggled] = useState(initialValue);

  const toggle = () => {
    // setIsToggled((pre) => !pre);
    setIsToggled(!isToggled);
  };

  return { isToggled, toggle };
}

export default UseToggle;

// Step 1.) npm install @reduxjs/toolkit react-redux

// Step 2.) Create redux Store.jsx

// Step 3.) Provide the Redux Store to React in Index.jsx
//  [ Pass the store as a prop ]

// step 4.) Create a Redux State Slice.jsx

// Step 5.) Add Slice Reducers to the Store.jsx 
// [ Reducer -> a function that takes a current state value and action and returns a new state value.]

// Step 6.) Use Redux State and Actions in React Counter.jsx Components

// useSelector hook allows access to the state stored in a Redux store
// useDispatch hook enables dispatching of actions to the store.
// Action is a JavaScript object that represents an intention to change the state of the store