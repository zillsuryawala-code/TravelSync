// Main Hero Swiper
const swiper = new Swiper('.swiper', {
  slidesPerView: 1,
  effect: "creative",
  creativeEffect: {
      prev: {
          translate: [0, 0, -400],
      },
      next: {
          translate: ["100%", 0, 0],
      },
  },
  loop: true,
  direction: "horizontal",
  autoplay: {
      delay: 4000,
  },
  speed: 400,
  spaceBetween: 100,
});

// Top Destination Slider
const swiper2 = new Swiper('.swiper2', {
  slidesPerView: 3,
  spaceBetween: 35,
  slidesPerGroup: 1,
  loop: true,
  grabCursor: true,
  loopFillGroupWithBlank: true,
  direction: 'horizontal', // Added direction
  autoplay: {
      delay: 2000,
      disableOnInteraction: false,
      reverseDirection: true // Added to make it go left to right
  },
  speed: 200,
  navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
  },
});

// Bottom Destination Slider - Left to Right Autoscroll
const swiper3 = new Swiper('.swiper3', {
  slidesPerView: 3,
  spaceBetween: 35,
  slidesPerGroup: 1,
  loop: true,
  grabCursor: true,
  loopFillGroupWithBlank: true,
  direction: 'horizontal',
  autoplay: {
      delay: 2000,
      disableOnInteraction: false,
  },
  speed: 200,
  navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
  },
});

// Header Hide on Scroll Down
let lastScrollTop = 0;
const menu = document.querySelector('header');

window.addEventListener('scroll', function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
      menu.style.transform = 'translateY(-100%)';
  } else {
      menu.style.transform = 'translateY(0)';
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});


document.addEventListener('DOMContentLoaded', function() {
  const testimonials = [
      {
          author: "Ravi Mehta",
          location: "Mumbai",
          content: "Dwarka was absolutely breathtaking! The hotel we booked through the site was super clean and just a 5-minute walk from the temple. Definitely recommending this to friends."
      },
      {
          author: "Pooja Shah",
          location: "Ahmedabad",
          content: "We had an amazing time in Saputara. The hill station was peaceful, and the resort we stayed in had a stunning lake view. Booking was seamless!"
      },
      {
          author: "Anjali R.",
          location: "Delhi",
          content: "Thanks to the website, we chose Somnath for a weekend getaway. The temple was divine, and our beachfront hotel had the best sunrise views!"
      },
      {
          author: "Nitesh V.",
          location: "Surat",
          content: "I discovered the White Rann of Kutch here—what a surreal place! The tent stay was luxurious, and everything was exactly as described."
      },
      {
          author: "Meera S.",
          location: "Vadodara",
          content: "The Akshardham experience was unforgettable. We stayed in a boutique hotel nearby that was budget-friendly and super cozy."
      },
      {
          author: "Harshita P.",
          location: "Bengaluru",
          content: "Gir National Park was thrilling! We even spotted lions! The eco-lodge listed on the site was perfectly placed and very nature-friendly."
      },
      {
          author: "Arjun K.",
          location: "Chennai",
          content: "Never thought of visiting Modhera, but your site convinced us—and we're so glad! The heritage hotel there was rich in culture and charm."
      },
      {
          author: "Sneha T.",
          location: "Pune",
          content: "Mandvi Beach was so serene. Our sea-facing room, booked through your suggestions, was clean, affordable, and peaceful."
      },
      {
          author: "Krupa M.",
          location: "Rajkot",
          content: "I wanted a quiet spiritual retreat, and Dwarka delivered. The temple, the local guides, and our guesthouse—all top-notch."
      }
  ];

  const container = document.getElementById('testimonialsContainer');
  
  // Split testimonials into three columns
  const columnCount = 3;
  const itemsPerColumn = Math.ceil(testimonials.length / columnCount);
  
  // Create columns
  for (let i = 0; i < columnCount; i++) {
      const column = document.createElement('div');
      column.className = 'testimonial-column';
      
      // Calculate start and end index for this column
      const startIndex = i * itemsPerColumn;
      const endIndex = startIndex + itemsPerColumn;
      const columnTestimonials = testimonials.slice(startIndex, endIndex);
      
      // Add testimonials to column
      columnTestimonials.forEach(testimonial => {
          column.appendChild(createTestimonialCard(testimonial));
      });
      
      // Add column to container
      container.appendChild(column);
  }
  
  function createTestimonialCard(testimonial) {
      const card = document.createElement('div');
      card.className = 'testimonial-card';
      
      const content = document.createElement('p');
      content.className = 'testimonial-content';
      content.textContent = testimonial.content;
      
      const author = document.createElement('div');
      author.className = 'testimonial-author';
      author.textContent = testimonial.author;
      
      const location = document.createElement('div');
      location.className = 'testimonial-location';
      location.textContent = testimonial.location;
      
      card.appendChild(content);
      card.appendChild(author);
      card.appendChild(location);
      
      return card;
  }
});


document.addEventListener('DOMContentLoaded', function() {
    // Create dark mode toggle button
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = localStorage.getItem('darkMode') === 'enabled' ? '☀️' : '🌙';
    darkModeToggle.style.position = 'fixed';
    darkModeToggle.style.top = '10px';
    darkModeToggle.style.right = '20px';
    darkModeToggle.style.zIndex = '1001';
    darkModeToggle.style.padding = '12px';
    darkModeToggle.style.borderRadius = '4px';
    darkModeToggle.style.border = 'none';
    darkModeToggle.style.cursor = 'pointer';
    darkModeToggle.style.transition = 'all 0.3s ease';
    darkModeToggle.style.fontSize = '1.2rem';
    darkModeToggle.style.color = 'white';
    darkModeToggle.style.backgroundColor = 'black';
    darkModeToggle.style.width = '40px';
    darkModeToggle.style.height = '40px';
    darkModeToggle.style.display = 'flex';
    darkModeToggle.style.alignItems = 'center';
    darkModeToggle.style.justifyContent = 'center';
    document.body.appendChild(darkModeToggle);
   

    // Set initial state from localStorage
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }
    
    // Toggle functionality
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
        darkModeToggle.innerHTML = isDarkMode ? '☀️' : '🌙';
    });
    
});

    
    