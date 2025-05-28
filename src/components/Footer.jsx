import Tools from './Tools.jsx';

const Footer = () => {
  return (
    <div className='text-center bg-gradient-to-tl from-red-300 via-red-600 to-red-900 text-white'>
      <div className='flex-1'>
              <div
                className='flex items-center gap-2 text-lg font-bold p-4'
              >
                <img
                  src='/Shri-symbol.svg'
                  alt='Sri Patro'
                  className='w-8'
                />
                Sri Patro
              </div>
            </div>
      <Tools />

      <p className='flex p-4'>
        <span>Made with ❤️ </span>{' '}
        <span>
          by{' '}
    
          <a
            className='underline'
            href='https://github.com/DeepakisDemigod'
          >
            @deepakisdemigod
          </a>{' '}
        </span>
      </p>
      <span>© 2025 SriPatro</span>
    </div>
  );
};

export default Footer;
