import { HashRouter, Route, Routes } from "react-router-dom";
import { AboutPage } from "./components/AboutPage/AboutPage";
import { CasePage } from "./components/CasePage/CasePage";
import { HomePage } from "./components/HomePage/HomePage";
import { Layout } from "./components/Layout/Layout";
import { LocaleProvider } from "./context/LocaleContext";
import { ThemeProvider } from "./context/ThemeContext";

export function App() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <HashRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/work/:projectId" element={<CasePage />} />
            </Route>
          </Routes>
        </HashRouter>
      </LocaleProvider>
    </ThemeProvider>
  );
}
