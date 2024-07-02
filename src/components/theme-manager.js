const defaultTheme = {
  primary: 'black', // Default
  secondary: 'white',
  background: 'white', // Default
  boxShadow: '#666666' // Darker grey
};

const themes = {
  'kawasaki': {
    primary: '#3A5B1D', // Darker Kawasaki green
    secondary: 'white', // White
    background: '#000000', // Black
    boxShadow: '#2F4A16' // Darker Kawasaki green
  },
  'honda': {
    primary: '#7F0000', // Darker Honda red
    secondary: 'white', // White
    background: '#000000', // Black
    boxShadow: '#660000' // Darker Honda red
  },
  'yamaha': {
    primary: '#2A48A1', // Darker Yamaha blue
    secondary: '#FFDD33', // Brighter Yamaha yellow
    background: '#FFFFFF', // White
    boxShadow: '#1C2F70' // Darker Yamaha blue
  },
  'ducati': {
    primary: '#800000', // Darker Ducati red
    secondary: 'black', // Black
    background: 'white', // White
    boxShadow: '#660000' // Darker Ducati red
  },
  'bmw': {
    primary: '#0D8DB3', // Darker BMW blue
    secondary: 'white', // White
    background: '#F2F2F2', // Light grey
    boxShadow: '#095F73' // Darker BMW blue
  },
  'harley-davidson': {
    primary: '#8B5A00', // Darker Harley orange
    secondary: 'black', // Black
    background: 'white', // White
    boxShadow: '#654400' // Darker Harley orange
  },
  'suzuki': {
    primary: '#1E45A0', // Darker Suzuki blue
    secondary: 'white', // White
    background: '#F2F2F2', // Light grey
    boxShadow: '#14327A' // Darker Suzuki blue
  },
  'aprilia': {
    primary: '#AA1A1A', // Brighter Aprilia red
    secondary: 'black', // Black
    background: 'white', // White
    boxShadow: '#4C1010' // Darker Aprilia red
  },
  'triumph': {
    primary: '#101A44', // Darker Triumph dark blue
    secondary: 'white', // White
    background: '#F2F2F2', // Light grey
    boxShadow: '#0B1130' // Darker Triumph dark blue
  },
  'bajaj': {
    primary: '#004080', // Darker Bajaj blue
    secondary: 'white', // White
    background: '#F2F2F2', // Light grey
    boxShadow: '#002D5B' // Darker Bajaj blue
  },
  'cleveland': {
    primary: '#6A28A3', // Brighter Cleveland purple
    secondary: 'white', // White
    background: '#F2F2F2', // Light grey
    boxShadow: '#2E1443' // Darker Cleveland purple
  },
  'gas': {
    primary: '#AA1A1A', // Brighter GASGAS red
    secondary: 'white', // White
    background: '#F2F2F2', // Light grey
    boxShadow: '#4C1010' // Darker GASGAS red
  },
  'hero': {
    primary: '#AA1A1A', // Brighter Hero red
    secondary: 'black', // Black
    background: 'white', // White
    boxShadow: '#4C1010' // Darker Hero red
  },
  'ktm': {
    primary: '#B86A00', // Brighter KTM orange
    secondary: 'black', // Black
    background: 'white', // White
    boxShadow: '#654400' // Darker KTM orange
  },
  'italjet': {
    primary: '#AA1A1A', // Brighter Italjet red
    secondary: 'white', // White
    background: 'black', // Black
    boxShadow: '#4C1010' // Darker Italjet red
  },
  'enfield': {
    primary: '#FFA500', // Brighter Enfield orange
    secondary: 'white', // White
    background: 'black', // Black
    boxShadow: '#CC8400' // Darker Enfield orange
  },
  'zero': {
    primary: '#FAF9F6', // Zero off white
    secondary: 'black', // Black
    background: '#661414', // Darker red
    boxShadow: 'black' // Zero black
  },
  'indian': {
    primary: '#4B0000', // Darker Indian dark red
    secondary: 'white', // White
    background: '#F2F2F2', // Light grey
    boxShadow: '#330000' // Darker Indian dark red
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