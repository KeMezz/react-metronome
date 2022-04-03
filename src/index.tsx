import * as ReactDOMClient from "react-dom/client";
import App from "./App";
import "./reset.css";

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container as HTMLElement);

root.render(<App />);
