'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    const targetPage = this.dataset.goto || (this.querySelector("span") || this).innerText.toLowerCase();

    for (let i = 0; i < pages.length; i++) {
      if (targetPage === pages[i].dataset.page) {
        pages[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
      }
    }

    // sync the "active" highlight only on the real navbar tabs
    for (let i = 0; i < navigationLinks.length; i++) {
      const navText = (navigationLinks[i].querySelector("span") || navigationLinks[i]).innerText.toLowerCase();
      navigationLinks[i].classList.toggle("active", !navigationLinks[i].dataset.goto && navText === targetPage);
    }

  });
}

window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");

  setTimeout(() => {
    // Inicia el fade-out del preloader
    preloader.classList.add("fade-out");

    // Cuando termina el fade (500ms), activa las animaciones de entrada
    setTimeout(() => {
      preloader.remove();
      document.body.classList.add("page-loaded");
    }, 500);

  }, 2000); // 2 segundos de preloader
});



// budget-choice popup ("¿Por dónde quieres contactarme?")
const budgetBtns = document.querySelectorAll("[data-budget-btn]");
const budgetModalContainer = document.querySelector("[data-budget-modal-container]");
const budgetOverlay = document.querySelector("[data-budget-overlay]");
const budgetCloseBtn = document.querySelector("[data-budget-close-btn]");
const budgetFormBtn = document.querySelector("[data-budget-form-btn]");

const budgetModalFunc = function () {
  budgetModalContainer.classList.toggle("active");
  budgetOverlay.classList.toggle("active");
}

for (let i = 0; i < budgetBtns.length; i++) {
  budgetBtns[i].addEventListener("click", budgetModalFunc);
}

if (budgetCloseBtn) budgetCloseBtn.addEventListener("click", budgetModalFunc);
if (budgetOverlay) budgetOverlay.addEventListener("click", budgetModalFunc);

if (budgetFormBtn) {
  budgetFormBtn.addEventListener("click", function () {

    budgetModalFunc();

    for (let i = 0; i < pages.length; i++) {
      if (pages[i].dataset.page === "contacto") {
        pages[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
      }
    }

    for (let i = 0; i < navigationLinks.length; i++) {
      const navText = (navigationLinks[i].querySelector("span") || navigationLinks[i]).innerText.toLowerCase();
      navigationLinks[i].classList.toggle("active", !navigationLinks[i].dataset.goto && navText === "contacto");
    }

  });
}



// whatsapp widget variables
const whatsappToggleBtn = document.querySelector("[data-whatsapp-toggle]");
const whatsappCloseBtn = document.querySelector("[data-whatsapp-close]");
const whatsappPopup = document.querySelector("[data-whatsapp-popup]");

if (whatsappToggleBtn && whatsappPopup) {

  whatsappToggleBtn.addEventListener("click", function () {
    whatsappPopup.classList.toggle("active");
    whatsappToggleBtn.classList.toggle("active");
  });

  if (whatsappCloseBtn) {
    whatsappCloseBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      whatsappPopup.classList.remove("active");
      whatsappToggleBtn.classList.remove("active");
    });
  }

  // abre el popup automáticamente una vez, tras la carga, para llamar la atención
  window.addEventListener("load", function () {
    setTimeout(() => {
      whatsappPopup.classList.add("active");
      whatsappToggleBtn.classList.add("active");
    }, 4000);
  });

}