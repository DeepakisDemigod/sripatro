import { CaretLeft } from "phosphor-react";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

export default function Settings() {
  return (
    <div className="p-4">
      <a href="/">
        <button className="flex gap-1 flex items-center">
          <CaretLeft weight="bold" size={21} />
          <h2 className="text-lg font-bold">Settings </h2>
        </button>
      </a>
      <div className="mx-4 my-8 flex justify-between items-center">
        <span>Appearance</span>
        <ThemeToggle className="border border-base-900 border-2 rounded" />
      </div>
      <div className="mx-4 my-8 flex justify-between items-center">
        <span>Language</span>
        <LanguageSwitcher />
      </div>
    </div>
  );
}
