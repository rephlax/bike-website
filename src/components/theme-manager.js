const defaultTheme = {
  primary: 'black', // Default
  secondary: 'white',
  background: 'white', // Default
  boxShadow: '#666666' // Darker grey
};

const themes = {
  'kawasaki': {
    primary: '#50772A', // Darker Kawasaki green
    secondary: 'white', // White
    background: '#000000', // Black
    boxShadow: '#455e2d' // Darker Kawasaki green
  },
  'honda': {
    primary: '#A10000', // Darker Honda red
    secondary: 'white', // White
    background: '#000000', // Black
    boxShadow: '#8f1c1c' // Darker Honda red
  },
  'yamaha': {
    primary: '#3C69E7', // Brighter Yamaha blue
    secondary: '#FFDD33', // Brighter Yamaha yellow
    background: '#FFFFFF', // White
    boxShadow: '#2a48a1' // Darker Yamaha blue
  },
  'ducati': {
    primary: '#990000', // Darker Ducati red
    secondary: 'black', // Black
    background: 'white', // White
    boxShadow: '#660000' // Darker Ducati red
  },
  'bmw': {
    primary: '#1EB7E6', // Brighter BMW blue
    secondary: 'white', // White
    background: '#F2F2F2', // Light grey
    boxShadow: '#126b8e' // Darker BMW blue
  },
  'harley-davidson': {
    primary: '#B06D00', // Darker Harley orange
    secondary: 'black', // Black
    background: 'white', // White
    boxShadow: '#8B5A00' // Darker Harley orange
  },
  'suzuki': {
    primary: '#2B5DC4', // Darker Suzuki blue
    secondary: 'white', // White
    background: '#F2F2F2', // Light grey
    boxShadow: '#1E45A0' // Darker Suzuki blue
  },
  'aprilia': {
    primary: '#8B1E1E', // Darker Aprilia red
    secondary: 'black', // Black
    background: 'white', // White
    boxShadow: '#661414' // Darker Aprilia red
  },
  'triumph': {
    primary: '#1A2A6C', // Brighter Triumph dark blue
    secondary: 'white', // White
    background: '#F2F2F2', // Light grey
    boxShadow: '#101a44' // Darker Triumph dark blue
  },
  'bajaj': {
    primary: '#0056B3', // Darker Bajaj blue
    secondary: 'white', // White
    background: '#F2F2F2', // Light grey
    boxShadow: '#004080' // Darker Bajaj blue
  },
  'cleveland': {
    primary: '#5A2A83', // Darker Cleveland purple
    secondary: 'white', // White
    background: '#F2F2F2', // Light grey
    boxShadow: '#421d61' // Darker Cleveland purple
  },
  'gas': {
    primary: '#8B1E1E', // Darker GASGAS red
    secondary: 'white', // White
    background: '#F2F2F2', // Light grey
    boxShadow: '#661414' // Darker GASGAS red
  },
  'hero': {
    primary: '#8B1E1E', // Darker Hero red
    secondary: 'black', // Black
    background: 'white', // White
    boxShadow: '#661414' // Darker Hero red
  },
  'ktm': {
    primary: '#B06D00', // Darker KTM orange
    secondary: 'black', // Black
    background: 'white', // White
    boxShadow: '#8B5A00' // Darker KTM orange
  },
  'italjet': {
    primary: '#8B1E1E', // Darker Italjet red
    secondary: 'white', // White
    background: 'black', // Black
    boxShadow: '#661414' // Darker Italjet red
  },
  'royal enfield': {
    primary: '#B06D00', // Darker Royal Enfield orange
    secondary: 'white', // White
    background: 'black', // Black
    boxShadow: '#8B5A00' // Darker Royal Enfield orange
  },
  'zero': {
    primary: 'black', // Zero black
    secondary: 'white', // White
    background: '#8B1E1E', // Darker red
    boxShadow: 'black' // Zero black
  },
  'indian': {
    primary: '#660000', // Darker Indian dark red
    secondary: 'white', // White
    background: '#F2F2F2', // Light grey
    boxShadow: '#4B0000' // Darker Indian dark red
  }
};

const applyTheme = (theme) => {
  document.documentElement.style.setProperty('--primary-color', theme.primary);
  document.documentElement.style.setProperty('--secondary-color', theme.secondary);
  document.documentElement.style.setProperty('--background-color', theme.background);
  document.documentElement.style.setProperty('--box-shadow-color', theme.boxShadow);
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