const defaultTheme = {
  primary: 'black', 
  secondary: 'white',
  background: 'white', 
  boxShadow: '#666666',
  backgroundImage: 'src/assets/images/default-bike-background.webp' // Corrected to plain URL
};

const themes = {
  'kawasaki': {
    primary: '#28a745',
    secondary: 'white',
    background: '#000000',
    boxShadow: '#28a745',
    backgroundImage: 'src/assets/images/kawasaki-background.webp'
  },
  'honda': {
    primary: '#7F0000',
    secondary: 'white',
    background: '#000000',
    boxShadow: '#660000',
    backgroundImage: '/src/assets/images/honda-background.webp' // Corrected to use Honda background
  },
  'yamaha': {
    primary: '#2A48A1',
    secondary: '#FFDD33',
    background: '#FFFFFF',
    boxShadow: '#1C2F70',
    backgroundImage: '/src/assets/images/yamaha-background.webp' // Corrected to use Yamaha background
  },
  'ducati': {
    primary: '#c00',
    secondary: 'black',
    background: 'white',
    boxShadow: '#660000',
    backgroundImage: '/src/assets/images/ducati-background.webp' // Corrected to use Ducati background
  },
  'bmw': {
    primary: '#0D8DB3',
    secondary: 'white',
    background: '#F2F2F2',
    boxShadow: '#095F73',
    backgroundImage: '/src/assets/images/bmw-background.webp' // Corrected to use BMW background
  },
  'harley-davidson': {
    primary: '#8B5A00',
    secondary: 'black',
    background: 'white',
    boxShadow: '#654400',
    backgroundImage: '/src/assets/images/harley-davidson-background.webp' // Corrected to use Harley-Davidson background
  },
  'suzuki': {
    primary: '#1E45A0',
    secondary: 'white',
    background: '#F2F2F2',
    boxShadow: '#14327A',
    backgroundImage: '/src/assets/images/suzuki-background.webp' // Corrected to use Suzuki background
  },
  'aprilia': {
    primary: 'red',
    secondary: 'black',
    background: 'white',
    boxShadow: '#4C1010',
    backgroundImage: '/src/assets/images/aprilia-background.webp' // Corrected to use Aprilia background
  },
  'triumph': {
    primary: '#101A44',
    secondary: 'white',
    background: '#F2F2F2',
    boxShadow: '#0B1130',
    backgroundImage: '/src/assets/images/triumph-background.webp' // Corrected to use Triumph background
  },
  'bajaj': {
    primary: '#006ad0',
    secondary: 'white',
    background: '#F2F2F2',
    boxShadow: '#002D5B',
    backgroundImage: '/src/assets/images/bajaj-background.webp' // Corrected to use Bajaj background
  },
  'cleveland': {
    primary: '#92eb00',
    secondary: 'white',
    background: '#F2F2F2',
    boxShadow: '#2E1443',
    backgroundImage: '/src/assets/images/cleveland-background.webp' // Corrected to use Cleveland background
  },
  'gas gas': {
    primary: '#cb0d25',
    secondary: 'white',
    background: '#F2F2F2',
    boxShadow: '#4C1010',
    backgroundImage: '/src/assets/images/gasgas-background.webp' // Corrected to use Gas Gas background
  },
  'hero': {
    primary: '#ee2326',
    secondary: 'black',
    background: 'white',
    boxShadow: '#4C1010',
    backgroundImage: '/src/assets/images/hero-background.webp' // Corrected to use Hero background
  },
  'ktm': {
    primary: '#f60',
    secondary: 'black',
    background: 'white',
    boxShadow: '#f60',
    backgroundImage: '/src/assets/images/ktm-background.webp' // Corrected to use KTM background
  },
  'italjet': {
    primary: '#AA1A1A',
    secondary: 'white',
    background: 'black',
    boxShadow: '#4C1010',
    backgroundImage: '/src/assets/images/italjet-background.webp' // Corrected to use Italjet background
  },
  'enfield': {
    primary: '#FFA500',
    secondary: 'white',
    background: 'black',
    boxShadow: '#CC8400',
    backgroundImage: 'src/assets/images/enfield-background.webp' // Corrected to use Enfield background
  },
  'zero': {
    primary: '#FAF9F6',
    secondary: 'black',
    background: '#661414',
    boxShadow: 'black',
    backgroundImage: 'src/assets/images/zero-background.webp' // Corrected to use Zero background
  },
  'indian': {
    primary: '#4B0000',
    secondary: 'white',
    background: '#F2F2F2',
    boxShadow: '#330000',
    backgroundImage: 'src/assets/images/indian-background.webp' // Corrected to use Indian background
  }
};

const applyTheme = (theme) => {
  document.documentElement.style.setProperty('--primary-color', theme.primary);
  document.documentElement.style.setProperty('--secondary-color', theme.secondary);
  document.documentElement.style.setProperty('--background-color', theme.background);
  document.documentElement.style.setProperty('--box-shadow-color', theme.boxShadow);

  if (theme.backgroundImage) {
    document.documentElement.style.setProperty('--background-image', `url(${theme.backgroundImage})`);
  } else {
    document.documentElement.style.setProperty('--background-image', `url(${defaultTheme.backgroundImage})`);
  }
};

// Apply default theme on initial load
applyTheme(defaultTheme);

document.addEventListener('bike-data-changed', (event) => {
  const bike = event.detail.bike;
  if (bike && bike.make) {
    const theme = themes[bike.make.toLowerCase()] || defaultTheme;
    applyTheme(theme);
  }
});