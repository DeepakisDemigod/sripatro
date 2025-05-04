
import Patro from './Patro.jsx';
import Calender from './Calender.jsx';
import Tiles from './Tiles.jsx';
import ScrollTop from './ScrollTop.jsx';
import HoroscopeTile from './HoroscopeTile.jsx';

const Home = () => {
  return (
    <div className='bg-base-200 container mx-auto px-4 pb-8'>
      <div className=' mx-auto'>
        <Tiles />
         {/* <Calender />*/}
        <Patro />
      <ScrollTop />
      </div>
    </div>
  );
};

export default Home;
