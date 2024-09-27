// Переменные для элементов карусели
const carousel = document.querySelector(".carousel");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const dots = document.querySelectorAll(".dot");
let currentIndex = 0;
const totalItems = document.querySelectorAll(".carousel-item").length;

// Функция для перемещения карусели
function updateCarousel() {
  const offset = (-currentIndex * 100) / totalItems;
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
const modal = document.getElementById("galleryModal");
const closeModalBtn = document.querySelector(".close-text");
const galleryImages = document.querySelectorAll(".gallery-image");
const prevBtnGallery = document.querySelector(".prev");
const nextBtnGallery = document.querySelector(".next");

let currentGalleryIndex = 0;

// Функция для открытия модального окна с соответствующими изображениями
function openModal(images) {
  // Очищаем старые активные изображения
  galleryImages.forEach((img, index) => {
    img.classList.remove("active");
    img.src = images[index]; // Устанавливаем новые изображения
  });

  // Показываем первое изображение
  galleryImages[0].classList.add("active");
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

  // Update the counter text
  const counterText = document.querySelector(".image-counter");
  const totalImages = galleryImages.length; // Total number of images
  counterText.textContent = `${currentGalleryIndex + 1} из ${totalImages}`;
}

// Клик по элементам карусели
document.querySelectorAll(".carousel-item").forEach((item, index) => {
  item.addEventListener("click", () => {
    let images = [];
    switch (index) {
      case 0:
        images = [
          "./assets/images/gallery/wedding/wedding_1.JPG",
          "./assets/images/gallery/wedding/wedding_2.JPG",
        ];
        break;
      case 1:
        images = ["./assets/images/gallery/photozone/photozone_1.JPG"];
        break;
      case 2:
        images = [
          "./assets/images/carousel/kids1.png",
          "./assets/images/carousel/kids2.png",
          "./assets/images/carousel/kids3.png",
        ];
        break;
      // Добавь другие кейсы по необходимости
    }
    // Открываем модальное окно с соответствующими изображениями
    openModal(images);
  });
});

// Закрытие модального окна по клику на крестик
closeModalBtn.addEventListener("click", closeModal);

// Клик по кнопке "Назад" в галерее
prevBtnGallery.addEventListener("click", () => {
  showImage(currentGalleryIndex - 1);
});

// Клик по кнопке "Вперед" в галерее
nextBtnGallery.addEventListener("click", () => {
  showImage(currentGalleryIndex + 1);
});

// Закрытие модального окна по клику вне содержимого
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});
