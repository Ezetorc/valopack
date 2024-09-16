import { createRoot } from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
import { UserContextProvider } from "./contexts/UserContext.tsx";
import App from "./App.tsx";
import { SettingsContextProvider } from "./contexts/SettingsContext.tsx";
import { ShopContextProvider } from "./contexts/ShopContext.tsx";
import { GameContextProvider } from "./contexts/GameContext.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <Router>
    <UserContextProvider>
      <SettingsContextProvider>
        <ShopContextProvider>
          <GameContextProvider>
            <App />
          </GameContextProvider>
        </ShopContextProvider>
      </SettingsContextProvider>
    </UserContextProvider>
  </Router>
);
