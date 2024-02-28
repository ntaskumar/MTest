import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CartProvider } from '../src/components/context/CartProvider'; 
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <CartProvider>
    <App />
    </CartProvider>
  </StrictMode>
);
