const defaultTheme = {
  primary: 'black', // Default
  secondary: 'white',
  background: 'white', // Default
  boxShadow: '#666666' // Darker grey
};

const themes = {
  'kawasaki': {
    primary: '#76B041', // Brighter Kawasaki green
    secondary: 'white', // White
    background: '#000000', // Black
    boxShadow: '#455e2d' // Darker Kawasaki green
  },
  'honda': {
    primary: '#C62828', // Darker Honda red
    secondary: '#9e9e9e', // White
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
    primary: '#CC0000', // Darker Ducati red
    secondary: '#000000', // Black
    background: '#FFFFFF', // White
    boxShadow: '#990000' // Darker Ducati red
  },
  'bmw': {
    primary: '#1EB7E6', // Brighter BMW blue
    secondary: '#FFFFFF', // White
    background: '#F2F2F2', // Light grey
    boxShadow: '#126b8e' // Darker BMW blue
  },
  'harley-davidson': {
    primary: '#FFA500', // Brighter Harley orange
    secondary: '#000000', // Black
    background: '#FFFFFF', // White
    boxShadow: '#cc8400' // Darker Harley orange
  },
  'suzuki': {
    primary: '#3377FF', // Brighter Suzuki blue
    secondary: '#FFFFFF', // White
    background: '#F2F2F2', // Light grey
    boxShadow: '#265ab2' // Darker Suzuki blue
  },
  'aprilia': {
    primary: '#B22222', // Darker Aprilia red
    secondary: '#000000', // Black
    background: '#FFFFFF', // White
    boxShadow: '#7f1818' // Darker Aprilia red
  },
  'triumph': {
    primary: '#1A2A6C', // Brighter Triumph dark blue
    secondary: '#FFFFFF', // White
    background: '#F2F2F2', // Light grey
    boxShadow: '#101a44' // Darker Triumph dark blue
  },
  'bajaj': {
    primary: '#007BFF', // Brighter Bajaj blue
    secondary: '#FFFFFF', // White
    background: '#F2F2F2', // Light grey
    boxShadow: '#0056b3' // Darker Bajaj blue
  },
  'cleveland': {
    primary: '#833AB4', // Brighter Cleveland purple
    secondary: '#FFFFFF', // White
    background: '#F2F2F2', // Light grey
    boxShadow: '#602983' // Darker Cleveland purple
  },
  'gas': {
    primary: '#B22222', // Darker GASGAS red
    secondary: '#FFFFFF', // White
    background: '#F2F2F2', // Light grey
    boxShadow: '#7f1818' // Darker GASGAS red
  },
  'hero': {
    primary: '#B22222', // Darker Hero red
    secondary: '#000000', // Black
    background: '#FFFFFF', // White
    boxShadow: '#7f1818' // Darker Hero red
  },
  'ktm': {
    primary: '#FF9500', // Brighter KTM orange
    secondary: '#000000', // Black
    background: '#FFFFFF', // White
    boxShadow: '#cc7400' // Darker KTM orange
  },
  'italjet': {
    primary: '#B22222', // Darker Italjet red
    secondary: '#FFFFFF', // White
    background: '#000000', // Black
    boxShadow: '#7f1818' // Darker Italjet red
  },
  'royal enfield': {
    primary: '#FFA500', // Brighter Royal Enfield orange
    secondary: '#FFFFFF', // White
    background: '#000000', // Black
    boxShadow: '#cc8400' // Darker Royal Enfield orange
  },
  'zero': {
    primary: '#000000', // Zero black
    secondary: '#FFFFFF', // White
    background: '#B22222', // Darker red
    boxShadow: '#000000' // Zero black
  },
  'indian': {
    primary: '#8B0000', // Darker Indian dark red
    secondary: '#FFFFFF', // White
    background: '#F2F2F2', // Light grey
    boxShadow: '#5f0000' // Darker Indian dark red
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