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

const threshold = 50; // Минимальная длина свайпа для срабатывания
let startX = 0;
let currentX = 0;
let isSwiping = false;

carousel.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  isSwiping = true;
});

carousel.addEventListener("touchmove", (e) => {
  if (!isSwiping) return;

  currentX = e.touches[0].clientX;
  // Сбрасываем дефолтное поведение только при значительном смещении
  if (Math.abs(startX - currentX) > threshold) {
    e.preventDefault(); // Предотвращает другие события, такие как скроллинг
  }
});

carousel.addEventListener("touchend", () => {
  if (!isSwiping) return;

  const diffX = startX - currentX;

  if (Math.abs(diffX) > threshold) {
    if (diffX > 0) {
      // Свайп влево
      currentIndex = currentIndex === totalItems - 1 ? 0 : currentIndex + 1;
    } else {
      // Свайп вправо
      currentIndex = currentIndex === 0 ? totalItems - 1 : currentIndex - 1;
    }
    updateCarousel();
  }

  // Сбрасываем значения для следующего свайпа
  startX = 0;
  currentX = 0;
  isSwiping = false;
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
    debugger;
    switch (index) {
      //WEDDING
      case 0:
        images = [
          "./assets/images/gallery/wedding/wedding_1.JPG",
          "./assets/images/gallery/wedding/wedding_2.JPG",
        ];
        break;
      //PHOTOZONE
      case 1:
        images = [
          "./assets/images/gallery/photozone/photozone_1.JPG",
          "./assets/images/gallery/photozone/photozone_2.JPG",
          "./assets/images/gallery/photozone/photozone_3.JPG",
          "./assets/images/gallery/photozone/photozone_4.JPG",
          "./assets/images/gallery/photozone/photozone_5.JPG",
          "./assets/images/gallery/photozone/photozone_6.JPG",
          "./assets/images/gallery/photozone/photozone_7.JPG",
          "./assets/images/gallery/photozone/photozone_8.JPG",
          "./assets/images/gallery/photozone/photozone_9.JPG",
          "./assets/images/gallery/photozone/photozone_10.JPG",
          "./assets/images/gallery/photozone/photozone_11.JPG",
          "./assets/images/gallery/photozone/photozone_12.JPG",
        ];

        break;
      //KIDSPHOTOZONE
      case 2:
        images = [
          "./assets/images/gallery/kids/kids_1.jpg",
          "./assets/images/gallery/kids/kids_2.jpg",
          "./assets/images/gallery/kids/kids_3.jpg",
          "./assets/images/gallery/kids/kids_4.jpg",
          "./assets/images/gallery/kids/kids_5.jpg",
          "./assets/images/gallery/kids/kids_6.jpg",
          "./assets/images/gallery/kids/kids_7.jpg",
          "./assets/images/gallery/kids/kids_8.jpg",
          "./assets/images/gallery/kids/kids_9.jpg",
          "./assets/images/gallery/kids/kids_10.jpg",
          "./assets/images/gallery/kids/kids_11.jpg",
        ];
        break;
      //NEWYEAR
      case 3:
        images = [
          "./assets/images/gallery/ny/ny_1.jpeg",
          "./assets/images/gallery/ny/ny_2.jpg",
          "./assets/images/gallery/ny/ny_3.jpg",
          "./assets/images/gallery/ny/ny_4.jpg",
          "./assets/images/gallery/ny/ny_5.jpg",
          "./assets/images/gallery/ny/ny_6.jpg",
          "./assets/images/gallery/ny/ny_7.jpg",
        ];
        break;
      case 4:
        images = [
          "./assets/images/gallery/serve/serve_1.JPG",
          "./assets/images/gallery/serve/serve_2.JPG",
          "./assets/images/gallery/serve/serve_3.JPG",
          "./assets/images/gallery/serve/serve_4.JPG",
          "./assets/images/gallery/serve/serve_5.JPG",
          "./assets/images/gallery/serve/serve_6.JPG",
          "./assets/images/gallery/serve/serve_7.JPG",
          "./assets/images/gallery/serve/serve_8.JPG",
          "./assets/images/gallery/serve/serve_9.JPG",
          "./assets/images/gallery/serve/serve_10.JPG",
          "./assets/images/gallery/serve/serve_11.JPG",
          "./assets/images/gallery/serve/serve_12.JPG",
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
