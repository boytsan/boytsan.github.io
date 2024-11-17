// script.js
document.addEventListener("DOMContentLoaded", () => {
  const catalogWrapper = document.getElementById("catalog-wrapper");
  const language = localStorage.getItem("language") || "uk";
function fetchData() {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      console.log(data); // Додайте цей лог, щоб перевірити, що приходить в data
      renderProducts(data[selectedLanguage]);
    })
    .catch(error => console.log(error));
}
  fetch("data.json")
    .then(response => response.json())
    .then(data => {
      const books = data[language];
      catalogWrapper.innerHTML = books
        .map(
          book => `
          <div class="swiper-slide">
            <img src="${book.image}" alt="${book.title}">
            <h2>${book.title}</h2>
            <p>Автор: ${book.author}</p>
            <p>Ціна: ${book.price}</p>
            <a href="${book.link}" target="_blank">Детальніше</a>
          </div>
        `
        )
        .join("");
    })
    .catch(error => console.error("Помилка завантаження даних:", error));
});
// Зміна мови
const changeLanguage = (lang) => {
  localStorage.setItem("language", lang);
  window.location.reload();
};

document.addEventListener('DOMContentLoaded', () => {
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
