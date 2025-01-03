import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import BirthPanchang from './components/BirthPanchang.jsx';
import NepaliToIndianDateConverter from './components/NepaliToIndianDateConverter.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header />
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
      </Routes>
    </Router>
  );
}

export default App;
