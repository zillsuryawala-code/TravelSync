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
        delay: 4000,
        disableOnInteraction: false,
        reverseDirection: true // Added to make it go left to right
    },
    speed: 400,
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
        delay: 4000,
        disableOnInteraction: false,
    },
    speed: 400,
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

// Scroll To Top Button
const scrollToTopButton = document.createElement('button');
scrollToTopButton.innerHTML = '↑';
scrollToTopButton.style.position = 'fixed';
scrollToTopButton.style.bottom = '20px';
scrollToTopButton.style.right = '20px';
scrollToTopButton.style.display = 'none';
scrollToTopButton.style.zIndex = '1000';
scrollToTopButton.style.padding = '10px 15px';
scrollToTopButton.style.backgroundColor = '#800000';
scrollToTopButton.style.color = '#fff';
scrollToTopButton.style.border = 'none';
scrollToTopButton.style.borderRadius = '30%';
scrollToTopButton.style.cursor = 'pointer';
document.body.appendChild(scrollToTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 200) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
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