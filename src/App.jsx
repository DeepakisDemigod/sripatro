import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './components/Home.jsx';
import BirthPanchang from './components/BirthPanchang.jsx';
import NepaliToIndianDateConverter from './components/NepaliToIndianDateConverter.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Kundali from './components/Kundali.jsx';
import HoroscopePredictions from './components/HoroscopePredictions.jsx';
import SiteBanner from './components/SiteBanner.jsx';
import NotFound from './components/NotFound.jsx';

function App() {
  return (
    <Router>
      <Header />
      <SiteBanner />
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/Birthpanchang'
          element={<BirthPanchang />}
        />
        <Route
          path='/nepalitoenglish'
          element={<NepaliToIndianDateConverter />}
        />
        <Route
          path='/kundali'
          element={<Kundali />}
        />
        <Route
          path='/horoscope'
          element={<HoroscopePredictions />}
        />

        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
