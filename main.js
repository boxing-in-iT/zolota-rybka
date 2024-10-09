// Переменные для элементов карусели
const carousel = document.querySelector(".carousel");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const dots = document.querySelectorAll(".dot");
let currentIndex = 0;
const totalItems = document.querySelectorAll(".carousel-item").length;

const hamburger = document.querySelector(".hamburger-menu");
const mobileNav = document.querySelector(".mobile");
const closeBtn = document.querySelector(".close-btn");
const navLinks = document.querySelectorAll("nav ul li");
let isMobile = window.innerWidth <= 1024;

document.addEventListener("DOMContentLoaded", () => {
  mobileNav.style.display = "none";
  // hamburger.style.display = 'block';
});

// Открытие мобильного меню
hamburger.addEventListener("click", () => {
  mobileNav.style.display = "flex";
  hamburger.style.display = "none";
});

// Закрытие мобильного меню
closeBtn.addEventListener("click", () => {
  mobileNav.style.display = "none";
  hamburger.style.display = "block";
});

// Функция для прокрутки к секции
function scrollToSection(event) {
  const targetSection = event.target.getAttribute("data-target");
  const section = document.getElementById(targetSection);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
    if (mobileNav.style.display === "flex") {
      mobileNav.style.display = "none";
      hamburger.style.display = "block";
    }
  }
}

// Прокрутка по клику на элемент меню
navLinks.forEach((link) => {
  link.addEventListener("click", scrollToSection);
});

// Функция для перемещения карусели
function updateCarousel() {
  let offset;
  if (isMobile) {
    console.log("MOBILE");
    offset = -currentIndex * 120;
  } else {
    console.log("DESKTOP");
    offset = (-currentIndex * 180) / totalItems;
  }
  // const offset = (-currentIndex * 180) / totalItems;
  carousel.style.transform = `translateX(${offset}%)`;

  dots.forEach((dot) => dot.classList.remove("active"));
  dots[currentIndex].classList.add("active");
}

// Клик по кнопке "Назад"
prevBtn.addEventListener("click", () => {
  currentIndex = currentIndex === 0 ? totalItems - 1 : currentIndex - 1;
  updateCarousel();
});

// Клик по кнопке "Вперед"
nextBtn.addEventListener("click", () => {
  currentIndex = currentIndex === totalItems - 1 ? 0 : currentIndex + 1;
  updateCarousel();
});

// Клик по точкам
dots.forEach((dot) => {
  dot.addEventListener("click", (e) => {
    currentIndex = parseInt(e.target.dataset.index);
    updateCarousel();
  });
});

// Инициализация карусели
updateCarousel();

// Модальное окно галереи
// Модальное окно галереи
const modal = document.getElementById("galleryModal");
const closeModalBtn = document.querySelector(".close-text");
const galleryContainer = document.querySelector(".gallery");
const prevBtnGallery = document.querySelector(".prev");
const nextBtnGallery = document.querySelector(".next");

let currentGalleryIndex = 0;
let galleryImages = [];

// Функция для открытия модального окна с соответствующими изображениями
function openModal(images) {
  // Очищаем контейнер галереи
  galleryContainer.innerHTML = "";

  // Создаем новые элементы изображений и добавляем в контейнер
  images.forEach((imageSrc, index) => {
    const imgElement = document.createElement("img");
    imgElement.src = imageSrc;
    imgElement.classList.add("gallery-image");
    if (index === 0) imgElement.classList.add("active");
    galleryContainer.appendChild(imgElement);
  });

  galleryImages = document.querySelectorAll(".gallery-image"); // Обновляем список изображений

  modal.style.display = "block";
  currentGalleryIndex = 0;

  // Инициализация текста счетчика
  const counterText = document.querySelector(".image-counter");
  const totalImages = images.length; // Total number of images
  counterText.textContent = `1 из ${totalImages}`;
}

// Функция для закрытия модального окна
function closeModal() {
  modal.style.display = "none";
}

// Функция для переключения изображений в галерее
function showImage(index) {
  galleryImages[currentGalleryIndex].classList.remove("active");
  currentGalleryIndex = (index + galleryImages.length) % galleryImages.length;
  galleryImages[currentGalleryIndex].classList.add("active");

  // Обновляем текст счетчика
  const counterText = document.querySelector(".image-counter");
  const totalImages = galleryImages.length;
  counterText.textContent = `${currentGalleryIndex + 1} из ${totalImages}`;
}

// Клик по элементам карусели
document.querySelectorAll(".carousel-item").forEach((item, index) => {
  item.addEventListener("click", () => {
    let images = [];
    switch (index) {
      //WEDDING
      case 0:
        images = [
          "./assets/images/gallery/wedding/wedding_1-min.JPG",
          "./assets/images/gallery/wedding/wedding_2-min.JPG",
          "./assets/images/gallery/wedding/wedding_3-min.JPG",
          "./assets/images/gallery/wedding/wedding_4-min.JPG",
          "./assets/images/gallery/wedding/wedding_5-min.JPG",
          "./assets/images/gallery/wedding/wedding_6-min.JPG",
          "./assets/images/gallery/wedding/wedding_7-min.JPG",
          "./assets/images/gallery/wedding/wedding_8-min.JPG",
          "./assets/images/gallery/wedding/wedding_9-min.JPG",
          "./assets/images/gallery/wedding/wedding_10-min.JPG",
          "./assets/images/gallery/wedding/wedding_11-min.png",
          "./assets/images/gallery/wedding/wedding_12-min.png",
        ];
        break;
      //PHOTOZONE
      case 1:
        images = [
          "./assets/images/gallery/photozone/photozone_1-min.JPG",
          "./assets/images/gallery/photozone/photozone_2-min.JPG",
          "./assets/images/gallery/photozone/photozone_3-min.JPG",
          "./assets/images/gallery/photozone/photozone_4-min.JPG",
          "./assets/images/gallery/photozone/photozone_5-min.JPG",
          "./assets/images/gallery/photozone/photozone_6-min.JPG",
          "./assets/images/gallery/photozone/photozone_7-min.JPG",
          "./assets/images/gallery/photozone/photozone_8-min.JPG",
          "./assets/images/gallery/photozone/photozone_9-min.png",
          "./assets/images/gallery/photozone/photozone_10-min.JPG",
          "./assets/images/gallery/photozone/photozone_11-min.JPG",
          "./assets/images/gallery/photozone/photozone_12-min.JPG",
          "./assets/images/gallery/photozone/photozone_13-min.JPG",
        ];

        break;
      //KIDSPHOTOZONE
      case 2:
        images = [
          "./assets/images/gallery/kids/kids_1-min.jpeg",
          "./assets/images/gallery/kids/kids_2-min.jpg",
          "./assets/images/gallery/kids/kids_3-min.jpg",
          "./assets/images/gallery/kids/kids_4-min.jpg",
          "./assets/images/gallery/kids/kids_5-min.jpg",
          "./assets/images/gallery/kids/kids_6-min.jpg",
          "./assets/images/gallery/kids/kids_7-min.jpg",
          "./assets/images/gallery/kids/kids_8-min.jpg",
          "./assets/images/gallery/kids/kids_9-min.jpg",
          "./assets/images/gallery/kids/kids_10-min.jpg",
          "./assets/images/gallery/kids/kids_11-min.jpg",
        ];
        break;
      //NEWYEAR
      case 3:
        images = [
          "./assets/images/gallery/ny/ny_1-min.jpeg",
          "./assets/images/gallery/ny/ny_2-min.jpg",
          "./assets/images/gallery/ny/ny_3-min.jpg",
          "./assets/images/gallery/ny/ny_4-min.jpg",
          "./assets/images/gallery/ny/ny_5-min.jpg",
          "./assets/images/gallery/ny/ny_6-min.jpg",
          "./assets/images/gallery/ny/ny_7-min.jpg",
        ];
        break;
      case 4:
        images = [
          "./assets/images/gallery/serve/serve_1-min.webp",
          "./assets/images/gallery/serve/serve_2-min.webp",
          "./assets/images/gallery/serve/serve_3-min.webp",
          "./assets/images/gallery/serve/serve_4-min.webp",
          "./assets/images/gallery/serve/serve_5-min.webp",
          "./assets/images/gallery/serve/serve_6-min.webp",
          "./assets/images/gallery/serve/serve_7-min.webp",
          "./assets/images/gallery/serve/serve_8-min.webp",
          "./assets/images/gallery/serve/serve_9-min.webp",
          "./assets/images/gallery/serve/serve_10-min.webp",
          "./assets/images/gallery/serve/serve_11-min.webp",
          "./assets/images/gallery/serve/serve_12-min.webp",
        ];
      // Добавь другие кейсы по необходимости
    }
    // Открываем модальное окно с соответствующими изображениями
    openModal(images);
  });
});

// Закрытие модального окна по клику на текст "Закрыть"
closeModalBtn.addEventListener("click", closeModal);

// Клик по кнопке "Назад" в галерее
prevBtnGallery.addEventListener("click", () => {
  showImage(currentGalleryIndex - 1);
});

// Клик по кнопке "Вперед" в галерее
nextBtnGallery.addEventListener("click", () => {
  showImage(currentGalleryIndex + 1);
});
