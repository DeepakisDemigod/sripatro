import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./components/Home.jsx";
import BirthPanchang from "./components/BirthPanchang.jsx";
import NepaliToIndianDateConverter from "./components/NepaliToIndianDateConverter.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Kundali from "./components/Kundali.jsx";
import Horoscope from "./components/Horoscope.jsx";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Birthpanchang" element={<BirthPanchang />} />
        <Route
          path="/nepalitoenglish"
          element={<NepaliToIndianDateConverter />}
        />
        <Route path="/kundali" element={<Kundali />} />
        <Route path="/horoscope/daily" element={<Horoscope />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
