import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";
import { AppContextProvider } from "./context/AppContext.jsx";

// Clerk Publishable Key
const clerkPubKey = "pk_test_c3BsZW5kaWQtY3ViLTIzLmNsZXJrLmFjY291bnRzLmRldiQ";

if (!clerkPubKey) {
  throw new Error("Missing Clerk Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={clerkPubKey}>
    <BrowserRouter>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </BrowserRouter>
  </ClerkProvider>
);