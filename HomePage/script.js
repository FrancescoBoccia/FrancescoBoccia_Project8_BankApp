"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const message = document.createElement("div");
const head = document.querySelector(".header");
const h1 = document.querySelector("h1");
// Scroll Navigation
const scrollingButton = document.querySelector(".btn--scroll-to");
const featuresSection = document.querySelector("#section--1");
// Content Button
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
// Menu Fade Animation on Hover
const navigationBar = document.querySelector(".nav");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach(function (modal) {
  modal.addEventListener("click", openModal);
});

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

message.classList.add("cookie-message");
message.innerHTML =
  'This website uses cookies, for a better usage of the website. <button class="btn btn--close-cookie">Got It!!</button>';

head.append(message);

// /////////////////////////////////////
// Scroll Navigation

document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove();
  });

scrollingButton.addEventListener("click", function () {
  featuresSection.scrollIntoView({ behavior: "smooth" });
});

// Click Navigation to Scroll into Element Selected (Smooth)
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// /////////////////////////////////////
// Content Button
tabsContainer.addEventListener("click", function (e) {
  e.preventDefault();

  // Highlight the title you have clicked
  const clicked = e.target.closest(".operations__tab");
  if (!clicked) return;
  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  tabsContent.forEach((content) =>
    content.classList.remove("operations__content--active")
  );
  clicked.classList.add("operations__tab--active");

  // Select which content to show
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

// /////////////////////////////////////
// Menu Opacity Fade Animation on Hover
const navLinksHoverOpacity = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const linkMouseOver = e.target;
    const siblingsLinks = linkMouseOver
      .closest(".nav")
      .querySelectorAll(".nav__link");
    const logo = linkMouseOver.closest(".nav").querySelector("img");

    siblingsLinks.forEach((el) => {
      if (el !== linkMouseOver) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

navigationBar.addEventListener("mouseover", navLinksHoverOpacity.bind(0.5));
navigationBar.addEventListener("mouseout", navLinksHoverOpacity.bind(1));

// /////////////////////////////////////
// Sticky Navigation
// const initialCoordinates = featuresSection.getBoundingClientRect();

// window.addEventListener("scroll", function () {
//   if (window.scrollY > initialCoordinates.top)
//     navigationBar.classList.add("sticky");
//   else navigationBar.classList.remove("sticky");
// });

// Sticky Navigation: Observer API
// const obsCallback = function (entries, observer) {
//   entries.forEach((entry) => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(featuresSection);

const header = document.querySelector(".header");
const navigationHeight = navigationBar.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) navigationBar.classList.add("sticky");
  else navigationBar.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navigationHeight}px`,
});

headerObserver.observe(header);

// /////////////////////////////////////
// Reveale Sections on Scroll
const allSection = document.querySelectorAll(".section");
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSection.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// /////////////////////////////////////
// Lazy Loading Images, Implement the Website Page
const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace The Image src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

// /////////////////////////////////////
// Slider Component
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  // Create Dots
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  // Slide in The Container
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next Slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };

  init();
  // Event Handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();


// /////////////////////////////////////
document.addEventListener("DOMContentLoaded", function (e) {
  console.log("HTML and DOM", e);
});

window.addEventListener("load", function (e) {
  console.log("Page loaded", e);
});
