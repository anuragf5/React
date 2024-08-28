import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Increment from "./components/Increment.jsx";
import ApiFetching from "./components/ApiFetchingData.jsx";
import "./index.css";
import ApiFetchingData from "./components/ApiFetchingData.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
  {/* <App /> */}
  <ApiFetchingData/>
  </StrictMode>,
);
