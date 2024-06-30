const themes = {
    'kawasaki': {
      primary: '#006400',
      secondary: '#8B4513',
      background: '#f0f0f0',
      boxShadow: '#999999'
    },
    'honda': {
      primary: '#ff0000',
      secondary: '#000000',
      background: '#ffffff',
      boxShadow: '#cccccc'
    },
    'yamaha': {
      primary: '#0000ff',
      secondary: '#ffcc00',
      background: '#f5f5f5',
      boxShadow: '#aaaaaa'
    },
    'ducati': {
      primary: '#cc0000',
      secondary: '#ffffff',
      background: '#000000',
      boxShadow: '#777777'
    },
    'bmw': {
      primary: '#ffffff',
      secondary: '#0000ff',
      background: '#f2f2f2',
      boxShadow: '#888888'
    },
    'harley-davidson': {
      primary: '#ff8c00',
      secondary: '#000000',
      background: '#ffffff',
      boxShadow: '#444444'
    },
    'suzuki': {
      primary: '#ff0000',
      secondary: '#ffffff',
      background: '#f5f5f5',
      boxShadow: '#cccccc'
    },
    'aprilia': {
      primary: '#000000',
      secondary: '#ffffff',
      background: '#ff0000',
      boxShadow: '#999999'
    },
    'triumph': {
      primary: '#0000ff',
      secondary: '#ffffff',
      background: '#f5f5f5',
      boxShadow: '#bbbbbb'
    },
    'bajaj': {
      primary: '#0000ff',
      secondary: '#ffffff',
      background: '#f2f2f2',
      boxShadow: '#666666'
    },
    'cleveland': {
      primary: '#663399',
      secondary: '#ffffff',
      background: '#f5f5f5',
      boxShadow: '#555555'
    },
    'gas': {
      primary: '#ff0000',
      secondary: '#0000ff',
      background: '#ffffff',
      boxShadow: '#aaaaaa'
    },
    'hero': {
      primary: '#ff0000',
      secondary: '#000000',
      background: '#ffffff',
      boxShadow: '#777777'
    },
    'ktm': {
      primary: '#ff8c00',
      secondary: '#000000',
      background: '#ffffff',
      boxShadow: '#444444'
    },
    'italjet': {
      primary: '#ff0000',
      secondary: '#ffffff',
      background: '#000000',
      boxShadow: '#888888'
    },
    'royal enfield': {
      primary: '#8b4513',
      secondary: '#ffffff',
      background: '#f0f0f0',
      boxShadow: '#aaaaaa'
    },
    'zero': {
      primary: '#000000',
      secondary: '#ffffff',
      background: '#ff0000',
      boxShadow: '#666666'
    },
    'indian': {
      primary: '#800000',
      secondary: '#ffffff',
      background: '#f5f5f5',
      boxShadow: '#bbbbbb'
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
  