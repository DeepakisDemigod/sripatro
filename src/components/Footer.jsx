import Logo from './../assets/react.svg';

const Footer = () => {
  return (
    <div className='text-center bg-white text-black'>
      <p className='flex p-4'>
        <span>Made with ❤️ and </span>{' '}
        <img
          width='19'
          src={Logo}
          alt='react'
          className='mx-1'
        />{' '}
        <span>
          {' '}
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
