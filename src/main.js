import './components/search-button.js';
// Ensure other imports are correctly pointed to their respective paths
import '?./components/navbar.js';
import '?./components/search-form.js';
import '?./components/bike-info.js';
import '?./components/footer.js';
import '?./components/bike-cards.js';

document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.querySelector('search-form');
  const searchButton = document.querySelector('search-button');

  searchButton.addEventListener('search-click', () => {
    searchForm.open();
  });

  // Example of handling the form submission
  const form = searchForm.shadowRoot.getElementById('search-form');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const make = form.make.value;
    const model = form.model.value;

    try {
      const response = await fetch(`https://api.api-ninjas.com/v1/motorcycles?make=${make}&model=${model}`, {
        headers: { 'X-Api-Key': 'A9yM8BGGGL2GMzfEs62D4w==JWYSxzxgbHm3hiVd' }
      });
      const data = await response.json();
      // Handle the data and update bike info component
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });
});
