
      var swiper = new Swiper(".graphicdesign", {
        slidesPerView: 3,
        spaceBetween: 25,
        centeredSlides: true,
        fade: true,
      
        grabCursor: true,
        keyboard: {
          enabled: true,
        },
        breakpoints: {
          769: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
        },
        
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          dyanamicBullets: true,
        },
      });
    