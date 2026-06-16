const swiper = new Swiper('.swiper', {
    slidesPerView: 1,  // Corrected property name
    effect: "creative",
    creativeEffect: {
        prev: {
            translate: [0, 0, -400],
        },
        next: {
            translate: ["100%", 0, 0], // Fixed typo "treanslate"
        },
    },
    loop: true,
    direction: "horizontal",
    autoplay: {
        delay: 4000,
    },
    speed: 400, // Fixed typo "spped"
    spaceBetween: 100,
});


const swiper2 = new Swiper('.swiper2', {
    slidesPerView: 3, 
    spaceBetween: 35, 
    slidesPerGroup: 1, 
    loop: true,  
    grabCursor: true, 
    loopFillGroupWithBlank: true, // ✅ Corrected spelling
    autoplay: {
        delay: 4000,
        disableOnInteraction: false, // Keeps autoplay running after interaction
    },
    speed: 400, 
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

let lastScrollTop = 0;
const menu = document.querySelector('header');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Scrolling down
        menu.style.transform = 'translateY(-100%)'; // Hide menu
    } else {
        // Scrolling up
        menu.style.transform = 'translateY(0)'; // Show menu
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
});