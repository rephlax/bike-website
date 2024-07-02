const defaultTheme = {
    primary: 'black', // Default
    secondary: 'white',
    background: 'white', // Default
    boxShadow: '#888888' // Medium grey
  };
  
  const themes = {
    'kawasaki': {
      primary: '#76B041', // Brighter Kawasaki green
      secondary: 'white', // White
      background: '#000000', // Black
      boxShadow: '#76B041' // Kawasaki green (for a consistent shadow color)
    },
    'honda': {
      primary: '#FF3B30', // Brighter Honda red
      secondary: '#9e9e9e', // White
      background: '#000000', // Black
      boxShadow: '#FF3B30' // Honda red (for a consistent shadow color)
    },
    'yamaha': {
      primary: '#3C69E7', // Brighter Yamaha blue
      secondary: '#FFDD33', // Brighter Yamaha yellow
      background: '#FFFFFF', // White
      boxShadow: '#3C69E7' // Yamaha blue (for a consistent shadow color)
    },
    'ducati': {
      primary: '#FF3300', // Brighter Ducati red
      secondary: '#000000', // Black
      background: '#FFFFFF', // White
      boxShadow: '#FF3300' // Ducati red (for a consistent shadow color)
    },
    'bmw': {
      primary: '#1EB7E6', // Brighter BMW blue
      secondary: '#FFFFFF', // White
      background: '#F2F2F2', // Light grey
      boxShadow: '#1EB7E6' // BMW blue (for a consistent shadow color)
    },
    'harley-davidson': {
      primary: '#FFA500', // Brighter Harley orange
      secondary: '#000000', // Black
      background: '#FFFFFF', // White
      boxShadow: '#FFA500' // Harley orange (for a consistent shadow color)
    },
    'suzuki': {
      primary: '#3377FF', // Brighter Suzuki blue
      secondary: '#FFFFFF', // White
      background: '#F2F2F2', // Light grey
      boxShadow: '#3377FF' // Suzuki blue (for a consistent shadow color)
    },
    'aprilia': {
      primary: '#FF1E1E', // Brighter Aprilia red
      secondary: '#000000', // Black
      background: '#FFFFFF', // White
      boxShadow: '#FF1E1E' // Aprilia red (for a consistent shadow color)
    },
    'triumph': {
      primary: '#1A2A6C', // Brighter Triumph dark blue
      secondary: '#FFFFFF', // White
      background: '#F2F2F2', // Light grey
      boxShadow: '#1A2A6C' // Triumph dark blue (for a consistent shadow color)
    },
    'bajaj': {
      primary: '#007BFF', // Brighter Bajaj blue
      secondary: '#FFFFFF', // White
      background: '#F2F2F2', // Light grey
      boxShadow: '#007BFF' // Bajaj blue (for a consistent shadow color)
    },
    'cleveland': {
      primary: '#833AB4', // Brighter Cleveland purple
      secondary: '#FFFFFF', // White
      background: '#F2F2F2', // Light grey
      boxShadow: '#833AB4' // Cleveland purple (for a consistent shadow color)
    },
    'gas': {
      primary: '#FF4C4C', // Brighter GASGAS red
      secondary: '#FFFFFF', // White
      background: '#F2F2F2', // Light grey
      boxShadow: '#FF4C4C' // GASGAS red (for a consistent shadow color)
    },
    'hero': {
      primary: '#FF2E2E', // Brighter Hero red
      secondary: '#000000', // Black
      background: '#FFFFFF', // White
      boxShadow: '#FF2E2E' // Hero red (for a consistent shadow color)
    },
    'ktm': {
      primary: '#FF9500', // Brighter KTM orange
      secondary: '#000000', // Black
      background: '#FFFFFF', // White
      boxShadow: '#FF9500' // KTM orange (for a consistent shadow color)
    },
    'italjet': {
      primary: '#FF0000', // Italjet red
      secondary: '#FFFFFF', // White
      background: '#000000', // Black
      boxShadow: '#FF0000' // Italjet red (for a consistent shadow color)
    },
    'royal enfield': {
      primary: '#FFA500', // Brighter Royal Enfield orange
      secondary: '#FFFFFF', // White
      background: '#000000', // Black
      boxShadow: '#FFA500' // Royal Enfield orange (for a consistent shadow color)
    },
    'zero': {
      primary: '#000000', // Zero black
      secondary: '#FFFFFF', // White
      background: '#FF4C4C', // Brighter red
      boxShadow: '#000000' // Zero black (for a consistent shadow color)
    },
    'indian': {
      primary: '#B22222', // Brighter Indian dark red
      secondary: '#FFFFFF', // White
      background: '#F2F2F2', // Light grey
      boxShadow: '#B22222' // Indian dark red (for a consistent shadow color)
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