// Simple animation trigger on scroll
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.animate__animated');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animation = entry.target.getAttribute('data-animation');
                entry.target.classList.add('animate__fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Filter functionality would go here
    const cityFilter = document.getElementById('cityFilter');
    cityFilter.addEventListener('change', function() {
        // Filter hotels by city
        console.log('Filter by city:', this.value);
    });

    const priceSort = document.getElementById('priceSort');
    priceSort.addEventListener('change', function() {
        // Sort hotels by price
        console.log('Sort by price:', this.value);
    });

    const searchInput = document.getElementById('searchBar');
    const hotelCards = document.querySelectorAll('.hotel-card');
    
    searchInput.addEventListener('input', function () {
        const query = this.value.toLowerCase();
        hotelCards.forEach(card => {
            const hotelName = card.querySelector('h4').textContent.toLowerCase();
            if (hotelName.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });    

    document.addEventListener('DOMContentLoaded', function () {
        // All your existing code...
    
        const cityFilter = document.getElementById('cityFilter');
        const priceSort = document.getElementById('priceSort');
        const searchInput = document.getElementById('searchBar');
        const searchBtn = document.getElementById('searchBtn');
        const hotelCards = document.querySelectorAll('.hotel-card');
    
        // Filter Function
        function filterHotels() {
            const query = searchInput.value.toLowerCase();
            const city = cityFilter.value;
            const price = priceSort.value;
    
            hotelCards.forEach(card => {
                const name = card.querySelector('h4').textContent.toLowerCase();
                const parentCity = card.closest('.city-hotels')?.querySelector('h3')?.textContent;
    
                const priceText = card.querySelector('.hotel-price').textContent;
                const priceValue = parseInt(priceText.replace(/[^\d]/g, ''), 10);
    
                const matchesName = name.includes(query);
                const matchesCity = !city || (parentCity && parentCity.includes(city));
                const matchesPrice =
                    !price ||
                    (price === 'low' && priceValue <= 3000) ||
                    (price === 'medium' && priceValue > 3000 && priceValue <= 6000) ||
                    (price === 'high' && priceValue > 6000);
    
                if (matchesName && matchesCity && matchesPrice) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }
    
        // Trigger on button click
        searchBtn.addEventListener('click', filterHotels);
    
        // Optional: trigger on enter key in search input
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                filterHotels();
            }
        });
    });
    

});