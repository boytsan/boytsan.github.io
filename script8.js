document.addEventListener("DOMContentLoaded", () => {
    const catalogWrapper = document.getElementById("catalog-wrapper");
    const language = localStorage.getItem("language") || "uk";
  
    // Завантаження даних з JSON
    fetch("data.json")
      .then(response => response.json())
      .then(data => {
        const books = data[language];
        // Перевірка наявності даних
        if (books && Array.isArray(books)) {
          catalogWrapper.innerHTML = books
            .map(
              (book) => `
                <div class="swiper-slide">
                  <img src="${book.image}" alt="${book.title}" />
                  <h2>${book.title}</h2>
                  <p>Автор: ${book.author}</p>
                  <p>Ціна: ${book.price}</p>
                  <a href="${book.link}" target="_blank">Детальніше</a>
                </div>`
            )
            .join("");
        } else {
          console.error("Невірний формат даних.");
        }
      })
      .catch((error) => console.error("Помилка завантаження даних:", error));
  
    // Ініціалізація Swiper
    const swiper = new Swiper('.swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      },
    });
  });
  
  // Зміна мови
  const changeLanguage = (lang) => {
    localStorage.setItem("language", lang);
    window.location.reload();
  };
  
