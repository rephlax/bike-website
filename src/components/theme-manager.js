const themes = {
    'kawasaki': {
      primary: '#4A7A36', // Kawasaki green
      secondary: '#000000', // Black
      background: '#FFFFFF', // White
      boxShadow: '#A3A3A3' // Light grey
    },
    'honda': {
      primary: '#DA251D', // Honda red
      secondary: '#000000', // Black
      background: '#FFFFFF', // White
      boxShadow: '#CCCCCC' // Light grey
    },
    'yamaha': {
      primary: '#0F1A64', // Yamaha blue
      secondary: '#FFFFFF', // White
      background: '#F5F5F5', // Light grey
      boxShadow: '#AAAAAA' // Medium grey
    },
    'ducati': {
      primary: '#CC0000', // Ducati red
      secondary: '#FFFFFF', // White
      background: '#000000', // Black
      boxShadow: '#777777' // Dark grey
    },
    'bmw': {
      primary: '#0072BB', // BMW blue
      secondary: '#FFFFFF', // White
      background: '#EAEAEA', // Light grey
      boxShadow: '#888888' // Medium grey
    },
    'harley-davidson': {
      primary: '#FF6600', // Harley orange
      secondary: '#000000', // Black
      background: '#FFFFFF', // White
      boxShadow: '#444444' // Dark grey
    },
    'suzuki': {
      primary: '#0033A0', // Suzuki blue
      secondary: '#FFFFFF', // White
      background: '#F5F5F5', // Light grey
      boxShadow: '#CCCCCC' // Light grey
    },
    'aprilia': {
      primary: '#E32726', // Aprilia red
      secondary: '#000000', // Black
      background: '#FFFFFF', // White
      boxShadow: '#999999' // Medium grey
    },
    'triumph': {
      primary: '#002147', // Triumph dark blue
      secondary: '#FFFFFF', // White
      background: '#F5F5F5', // Light grey
      boxShadow: '#BBBBBB' // Medium grey
    },
    'bajaj': {
      primary: '#0056A7', // Bajaj blue
      secondary: '#FFFFFF', // White
      background: '#F2F2F2', // Light grey
      boxShadow: '#666666' // Medium grey
    },
    'cleveland': {
      primary: '#662D91', // Cleveland purple
      secondary: '#FFFFFF', // White
      background: '#F5F5F5', // Light grey
      boxShadow: '#555555' // Dark grey
    },
    'gas': {
      primary: '#E31C2A', // GASGAS red
      secondary: '#FFFFFF', // White
      background: '#F5F5F5', // Light grey
      boxShadow: '#AAAAAA' // Medium grey
    },
    'hero': {
      primary: '#E4002B', // Hero red
      secondary: '#000000', // Black
      background: '#FFFFFF', // White
      boxShadow: '#777777' // Dark grey
    },
    'ktm': {
      primary: '#FF6600', // KTM orange
      secondary: '#000000', // Black
      background: '#FFFFFF', // White
      boxShadow: '#444444' // Dark grey
    },
    'italjet': {
      primary: '#FF0000', // Italjet red
      secondary: '#000000', // Black
      background: '#FFFFFF', // White
      boxShadow: '#888888' // Medium grey
    },
    'royal enfield': {
      primary: '#E88300', // Royal Enfield orange
      secondary: '#000000', // Black
      background: '#F0F0F0', // Light grey
      boxShadow: '#AAAAAA' // Medium grey
    },
    'zero': {
      primary: '#000000', // Zero black
      secondary: '#FFFFFF', // White
      background: '#E31C2A', // Red
      boxShadow: '#666666' // Dark grey
    },
    'indian': {
      primary: '#7D110C', // Indian dark red
      secondary: '#FFFFFF', // White
      background: '#F5F5F5', // Light grey
      boxShadow: '#BBBBBB' // Medium grey
    }
  };
  
  document.addEventListener('bike-data-changed', (event) => {
    const bike = event.detail.bike;
    const theme = themes[bike.make.toLowerCase()];
    if (theme) {
      document.documentElement.style.setProperty('--primary-color', theme.primary);
      document.documentElement.style.setProperty('--secondary-color', theme.secondary);
      document.documentElement.style.setProperty('--background-color', theme.background);
      document.documentElement.style.setProperty('--box-shadow-color', theme.boxShadow);
    }
  });
  