const themes = {
    'kawasaki': {
      primary: '#4A7A36', // Kawasaki green
      secondary: '#FFFFFF', // White
      background: '#000000', // Black
      boxShadow: '#4A7A36' // Kawasaki green (for a consistent shadow color)
    },
    'honda': {
      primary: '#DA251D', // Honda red
      secondary: '#FFFFFF', // White
      background: '#000000', // Black
      boxShadow: '#DA251D' // Honda red (for a consistent shadow color)
    },
    'yamaha': {
      primary: '#0F1A64', // Yamaha blue
      secondary: '#FFCC00', // Yamaha yellow
      background: '#FFFFFF', // White
      boxShadow: '#0F1A64' // Yamaha blue (for a consistent shadow color)
    },
    'ducati': {
      primary: '#CC0000', // Ducati red
      secondary: '#FFFFFF', // White
      background: '#000000', // Black
      boxShadow: '#CC0000' // Ducati red (for a consistent shadow color)
    },
    'bmw': {
      primary: '#0072BB', // BMW blue
      secondary: '#FFFFFF', // White
      background: '#F2F2F2', // Light grey
      boxShadow: '#0072BB' // BMW blue (for a consistent shadow color)
    },
    'harley-davidson': {
      primary: '#FF6600', // Harley orange
      secondary: '#000000', // Black
      background: '#FFFFFF', // White
      boxShadow: '#FF6600' // Harley orange (for a consistent shadow color)
    },
    'suzuki': {
      primary: '#0033A0', // Suzuki blue
      secondary: '#FFFFFF', // White
      background: '#F2F2F2', // Light grey
      boxShadow: '#0033A0' // Suzuki blue (for a consistent shadow color)
    },
    'aprilia': {
      primary: '#E32726', // Aprilia red
      secondary: '#000000', // Black
      background: '#FFFFFF', // White
      boxShadow: '#E32726' // Aprilia red (for a consistent shadow color)
    },
    'triumph': {
      primary: '#002147', // Triumph dark blue
      secondary: '#FFFFFF', // White
      background: '#F2F2F2', // Light grey
      boxShadow: '#002147' // Triumph dark blue (for a consistent shadow color)
    },
    'bajaj': {
      primary: '#0056A7', // Bajaj blue
      secondary: '#FFFFFF', // White
      background: '#F2F2F2', // Light grey
      boxShadow: '#0056A7' // Bajaj blue (for a consistent shadow color)
    },
    'cleveland': {
      primary: '#662D91', // Cleveland purple
      secondary: '#FFFFFF', // White
      background: '#F2F2F2', // Light grey
      boxShadow: '#662D91' // Cleveland purple (for a consistent shadow color)
    },
    'gas': {
      primary: '#E31C2A', // GASGAS red
      secondary: '#FFFFFF', // White
      background: '#F2F2F2', // Light grey
      boxShadow: '#E31C2A' // GASGAS red (for a consistent shadow color)
    },
    'hero': {
      primary: '#E4002B', // Hero red
      secondary: '#000000', // Black
      background: '#FFFFFF', // White
      boxShadow: '#E4002B' // Hero red (for a consistent shadow color)
    },
    'ktm': {
      primary: '#FF6600', // KTM orange
      secondary: '#000000', // Black
      background: '#FFFFFF', // White
      boxShadow: '#FF6600' // KTM orange (for a consistent shadow color)
    },
    'italjet': {
      primary: '#FF0000', // Italjet red
      secondary: '#FFFFFF', // White
      background: '#000000', // Black
      boxShadow: '#FF0000' // Italjet red (for a consistent shadow color)
    },
    'royal enfield': {
      primary: '#E88300', // Royal Enfield orange
      secondary: '#FFFFFF', // White
      background: '#000000', // Black
      boxShadow: '#E88300' // Royal Enfield orange (for a consistent shadow color)
    },
    'zero': {
      primary: '#000000', // Zero black
      secondary: '#FFFFFF', // White
      background: '#E31C2A', // Red
      boxShadow: '#000000' // Zero black (for a consistent shadow color)
    },
    'indian': {
      primary: '#7D110C', // Indian dark red
      secondary: '#FFFFFF', // White
      background: '#F2F2F2', // Light grey
      boxShadow: '#7D110C' // Indian dark red (for a consistent shadow color)
    }
  };
  
  document.addEventListener('bike-data-changed', (event) => {
    const bike = event.detail.bike;
    if (bike && bike.make) {
      const theme = themes[bike.make.toLowerCase()];
      if (theme) {
        document.documentElement.style.setProperty('--primary-color', theme.primary);
        document.documentElement.style.setProperty('--secondary-color', theme.secondary);
        document.documentElement.style.setProperty('--background-color', theme.background);
        document.documentElement.style.setProperty('--box-shadow-color', theme.boxShadow);
      }
    }
  });  