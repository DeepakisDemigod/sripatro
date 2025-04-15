import Tools from './Tools.jsx';
import Patro from './Patro.jsx';
import Calender from './Calender.jsx';
import Tiles from './Tiles.jsx';
import ScrollTop from './ScrollTop.jsx';
import HoroscopeTile from './HoroscopeTile.jsx';

const Home = () => {
  return (
    <div className='bg-white text-black container mx-auto px-4 pb-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto'>
        <Tiles />

        <div className=''>
          <Calender />
        </div>
        <Patro />
        <div>
          <Tools />
        </div>
      </div>
      <ScrollTop />
    </div>
  );
};

export default Home;
