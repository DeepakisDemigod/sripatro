import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "./i18n";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { inject } from '@vercel/analytics';

inject();


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(reg => {
    console.log('Service worker registered:', reg);
  }).catch(err => {
    console.error('Service worker registration failed:', err);
  });
}



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
