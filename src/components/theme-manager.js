const defaultTheme = {
  primary: 'black', 
  secondary: 'white',
  background: 'white', 
  boxShadow: '#666666',
  backgroundImage: '/src/assets/images/default-bike-background.webp' // Default background image
};

const themes = {
  'kawasaki': {
    primary: '#28a745', // Darker Kawasaki green
    secondary: 'white', // White
    background: '#000000', // Black
    boxShadow: '#28a745', // Darker Kawasaki green
    backgroundImage: 'url(/src/assets/images/kawasaki-background.png)'
  },
  'honda': {
    primary: '#7F0000', // Darker Honda red
    secondary: 'white', // White
    background: '#000000', // Black
    boxShadow: '#660000', // Darker Honda red
    backgroundImage: 'url(/src/assets/images/kawasaki-background.webp)'
  },
  'yamaha': {
    primary: '#2A48A1', // Darker Yamaha blue
    secondary: '#FFDD33', // Brighter Yamaha yellow
    background: '#FFFFFF', // White
    boxShadow: '#1C2F70', // Darker Yamaha blue
    backgroundImage: 'url(/src/assets/images/kawasaki-background.webp)'
  },
  'ducati': {
    primary: '#c00', // Darker Ducati red
    secondary: 'black', // Black
    background: 'white', // White
    boxShadow: '#660000', // Darker Ducati red
    backgroundImage: 'url(/src/assets/images/kawasaki-background.webp)'
  },
  'bmw': {
    primary: '#0D8DB3', // Darker BMW blue
    secondary: 'white', // White
    background: '#F2F2F2', // Light grey
    boxShadow: '#095F73', // Darker BMW blue
    backgroundImage: 'url(/src/assets/images/kawasaki-background.webp)'
  },
  'harley-davidson': {
    primary: '#8B5A00', // Darker Harley orange
    secondary: 'black', // Black
    background: 'white', // White
    boxShadow: '#654400', // Darker Harley orange
    backgroundImage: 'url(/src/assets/images/kawasaki-background.webp)'
  },
  'suzuki': {
    primary: '#1E45A0', // Darker Suzuki blue
    secondary: 'white', // White
    background: '#F2F2F2', // Light grey
    boxShadow: '#14327A', // Darker Suzuki blue
    backgroundImage: 'url(/src/assets/images/kawasaki-background.webp)'
  },
  'aprilia': {
    primary: 'red', // Brighter Aprilia red
    secondary: 'black', // Black
    background: 'white', // White
    boxShadow: '#4C1010', // Darker Aprilia red
    backgroundImage: 'url(/src/assets/images/kawasaki-background.webp)'
  },
  'triumph': {
    primary: '#101A44', // Darker Triumph dark blue
    secondary: 'white', // White
    background: '#F2F2F2', // Light grey
    boxShadow: '#0B1130', // Darker Triumph dark blue
    backgroundImage: 'url(/src/assets/images/kawasaki-background.webp)'
  },
  'bajaj': {
    primary: '#006ad0', // Darker Bajaj blue
    secondary: 'white', // White
    background: '#F2F2F2', // Light grey
    boxShadow: '#002D5B', // Darker Bajaj blue
    backgroundImage: 'url(/src/assets/images/kawasaki-background.webp)'
  },
  'cleveland': {
    primary: '#92eb00', // Brighter Cleveland green
    secondary: 'white', // White
    background: '#F2F2F2', // Light grey
    boxShadow: '#2E1443', // Darker Cleveland purple
    backgroundImage: 'url(/src/assets/images/kawasaki-background.webp)'
  },
  'gas gas': {
    primary: '#cb0d25', // Brighter GASGAS red
    secondary: 'white', // White
    background: '#F2F2F2', // Light grey
    boxShadow: '#4C1010', // Darker GASGAS red
    backgroundImage: 'url(/src/assets/images/kawasaki-background.webp)'
  },
  'hero': {
    primary: '#ee2326', // Brighter Hero red
    secondary: 'black', // Black
    background: 'white', // White
    boxShadow: '#4C1010', // Darker Hero red
    backgroundImage: 'url(/src/assets/images/kawasaki-background.webp)'
  },
  'ktm': {
    primary: '#f60', // Brighter KTM orange
    secondary: 'black', // Black
    background: 'white', // White
    boxShadow: '#f60', // Darker KTM orange
    backgroundImage: 'url(/src/assets/images/kawasaki-background.webp)'
  },
  'italjet': {
    primary: '#AA1A1A', // Brighter Italjet red
    secondary: 'white', // White
    background: 'black', // Black
    boxShadow: '#4C1010', // Darker Italjet red
    backgroundImage: 'url(/src/assets/images/kawasaki-background.webp)'
  },
  'enfield': {
    primary: '#FFA500', // Brighter Enfield orange
    secondary: 'white', // White
    background: 'black', // Black
    boxShadow: '#CC8400', // Darker Enfield orange
    backgroundImage: 'url(/src/assets/images/kawasaki-background.webp)'
  },
  'zero': {
    primary: '#FAF9F6', // Zero off white
    secondary: 'black', // Black
    background: '#661414', // Darker red
    boxShadow: 'black', // Zero black
    backgroundImage: 'url(/src/assets/images/kawasaki-background.webp)'
  },
  'indian': {
    primary: '#4B0000', // Darker Indian dark red
    secondary: 'white', // White
    background: '#F2F2F2', // Light grey
    boxShadow: '#330000', // Darker Indian dark red
    backgroundImage: 'url(/src/assets/images/kawasaki-background.webp)'
  }
};

const applyTheme = (theme) => {
  document.documentElement.style.setProperty('--primary-color', theme.primary);
  document.documentElement.style.setProperty('--secondary-color', theme.secondary);
  document.documentElement.style.setProperty('--background-color', theme.background);
  document.documentElement.style.setProperty('--box-shadow-color', theme.boxShadow);
  
  if (theme.backgroundImage) {
    document.documentElement.style.setProperty('--background-image', theme.backgroundImage);
  } else {
    document.documentElement.style.setProperty('--background-image', defaultTheme.backgroundImage);
  }
};

// Apply default theme on initial load
applyTheme(defaultTheme);

document.addEventListener('bike-data-changed', (event) => {
  const bike = event.detail.bike;
  if (bike && bike.make) {
    const theme = themes[bike.make.toLowerCase()];
    if (theme) {
      applyTheme(theme);
    }
  }
});