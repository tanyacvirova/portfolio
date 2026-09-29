import { useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { AboutPage } from "./components/AboutPage/AboutPage";
import { CasePage } from "./components/CasePage/CasePage";
import { HomePage } from "./components/HomePage/HomePage";
import { Layout } from "./components/Layout/Layout";
import { LocaleProvider } from "./context/LocaleContext";
import { ThemeProvider } from "./context/ThemeContext";
import { caseMediaPaths, caseMediaUrl } from "./data/content";

let caseMediaPreloadStarted = false;

function preloadCaseMedia() {
  if (caseMediaPreloadStarted) {
    return;
  }

  caseMediaPreloadStarted = true;

  for (const path of caseMediaPaths()) {
    const url = caseMediaUrl(path);

    if (path.endsWith(".mov")) {
      const video = document.createElement("video");
      video.preload = "auto";
      video.src = url;
      video.load();
      continue;
    }

    const image = new Image();
    image.src = url;
  }
}

export function App() {
  useEffect(() => {
    preloadCaseMedia();
  }, []);

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
