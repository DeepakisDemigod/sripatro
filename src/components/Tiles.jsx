import Slider from 'react-slick';
import { useTranslation } from 'react-i18next';

const tiles = [
  { label: 'Panchang', icon: '🇳🇵', tag: 'BS', href: '/nepalitoenglish' },
  { label: 'Panchang', icon: '🇮🇳', tag: 'AD', href: '/birthpanchang' },
  { label: 'Kundali', icon: '🪐', tag: 'AD', href: '/kundali' },
  { label: 'Horoscope', icon: '🐏', tag: 'AD', href: '/horoscope' },
  { label: 'Cheena', icon: '🧧', tag: 'AD', href: '/nepali-cheena' },
  { label: 'Date Converter', icon: '🗓', tag: 'BS', href: '/date-converter' }
];

const Tiles = () => {
  const { t } = useTranslation();

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true, // enable autoplay
    autoplaySpeed: 2000, // time in ms between slides
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <div className='text-base-content'>
      <Slider {...settings}>
        {tiles.map(({ label, icon, tag, href }) => (
          <div
            key={href}
            className='py-1'
          >
            <a
              href={href}
              className='flex items-center justify-between p-2 bg-base-100 rounded-xl shadow hover:shadow-md transition duration-200 hover:bg-base-50'
            >
              <div className='flex items-center gap-4'>
                <div className='text-3xl'>{icon}</div>
                <div>
                  <div className='text-sm font-medium'>{t(tag)}</div>
                  <div className='text-md font-semibold'>{t(label)}</div>
                </div>
              </div>
              <div className=''>
                <img
                  width={60}
                  src='/watermark.png'
                />
              </div>
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Tiles;
