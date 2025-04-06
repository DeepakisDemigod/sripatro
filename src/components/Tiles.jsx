import Slider from "react-slick";
import { useTranslation } from "react-i18next";

const tiles = [
  { label: "Panchang", icon: "🇳🇵", tag: "BS", href: "/nepalitoenglish" },
  { label: "Panchang", icon: "🇮🇳", tag: "AD", href: "/birthpanchang" },
  { label: "Kundali", icon: "🪐", tag: "AD", href: "/kundali" },
  { label: "Horoscope", icon: "🐏", tag: "AD", href: "/horoscope" },
];

const Tiles = () => {
  const { t } = useTranslation();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true, // enable autoplay
    autoplaySpeed: 1500, // time in ms between slides
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="">
      <Slider {...settings}>
        {tiles.map(({ label, icon, tag, href }) => (
          <div key={href} className="py-1">
            <a
              href={href}
              className="flex items-center justify-between p-4 bg-white rounded-xl shadow hover:shadow-md transition duration-200 hover:bg-gray-50"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">{icon}</div>
                <div>
                  <div className="text-sm text-gray-500 font-medium">
                    {t(tag)}
                  </div>
                  <div className="text-md font-semibold text-black">
                    {t(label)}
                  </div>
                </div>
              </div>
              <div className="">
                <img width={60} src="/watermark.png" />
              </div>
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Tiles;
