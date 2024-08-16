import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { store } from "./store";
import "./index.css";
import CustomThemeProvider from "./providers/ThemeProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <CustomThemeProvider>
          <AppRouter />
        </CustomThemeProvider>
      </Router>
    </Provider>
  </StrictMode>
);
