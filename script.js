// Global variables
let currentSlideIndex = 0;
const galleryImages = [
  "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800",
];

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeNavigation();
  initializeGallery();
  initializeContactForm();
  initializeStickyNavbar();
});

// Navigation Functions
function initializeNavigation() {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", function () {
      mobileMenu.classList.toggle("active");
    });

    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", function () {
        mobileMenu.classList.remove("active");
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", function (event) {
      if (!mobileMenuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
        mobileMenu.classList.remove("active");
      }
    });
  }
}

// Smooth scroll to section
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    const navbar = document.getElementById("navbar");
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    const elementPosition = element.offsetTop - navbarHeight;

    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });
  }
}

// Sticky Navbar
function initializeStickyNavbar() {
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navbar.classList.add("sticky");
    } else {
      navbar.classList.remove("sticky");
    }
  });
}

// Gallery Functions
function initializeGallery() {
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", previousSlide);
    nextBtn.addEventListener("click", nextSlide);
  }

  // Auto-slide functionality
  setInterval(nextSlide, 4000);

  // Initialize first image
  showSlide(currentSlideIndex);
}

function showSlide(index) {
  const galleryImage = document.getElementById("gallery-image");
  const dots = document.querySelectorAll(".dot");

  if (galleryImage && galleryImages[index]) {
    galleryImage.src = galleryImages[index];
    galleryImage.alt = `Galeri Hotel ${index + 1}`;
  }

  // Update dots
  dots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

function nextSlide() {
  currentSlideIndex = (currentSlideIndex + 1) % galleryImages.length;
  showSlide(currentSlideIndex);
}

function previousSlide() {
  currentSlideIndex = (currentSlideIndex - 1 + galleryImages.length) % galleryImages.length;
  showSlide(currentSlideIndex);
}

function currentSlide(index) {
  currentSlideIndex = index - 1;
  showSlide(currentSlideIndex);
}

// Contact Form Functions
function initializeContactForm() {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit);

    // Real-time validation
    const inputs = contactForm.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      input.addEventListener("blur", function () {
        validateField(this);
      });

      input.addEventListener("input", function () {
        clearError(this);
      });
    });
  }
}

function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  // Validate all fields
  let isValid = true;
  const fields = ["name", "email", "message"];

  fields.forEach((fieldName) => {
    const field = form.querySelector(`[name="${fieldName}"]`);
    if (!validateField(field)) {
      isValid = false;
    }
  });

  if (isValid) {
    // Show success message
    alert("Terima kasih atas pesan Anda! Kami akan segera menghubungi Anda.");

    // Reset form
    form.reset();
    clearAllErrors();
  }
}

function validateField(field) {
  const fieldName = field.name;
  const fieldValue = field.value.trim();
  let isValid = true;
  let errorMessage = "";

  // Clear previous error
  clearError(field);

  switch (fieldName) {
    case "name":
      if (!fieldValue) {
        errorMessage = "Nama wajib diisi";
        isValid = false;
      } else if (fieldValue.length < 2) {
        errorMessage = "Nama minimal 2 karakter";
        isValid = false;
      }
      break;

    case "email":
      if (!fieldValue) {
        errorMessage = "Email wajib diisi";
        isValid = false;
      } else if (!isValidEmail(fieldValue)) {
        errorMessage = "Format email tidak valid";
        isValid = false;
      }
      break;

    case "message":
      if (!fieldValue) {
        errorMessage = "Pesan wajib diisi";
        isValid = false;
      } else if (fieldValue.length < 10) {
        errorMessage = "Pesan minimal 10 karakter";
        isValid = false;
      }
      break;
  }

  if (!isValid) {
    showError(field, errorMessage);
  }

  return isValid;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showError(field, message) {
  field.classList.add("error");
  const errorElement = document.getElementById(`${field.name}-error`);
  if (errorElement) {
    errorElement.textContent = message;
  }
}

function clearError(field) {
  field.classList.remove("error");
  const errorElement = document.getElementById(`${field.name}-error`);
  if (errorElement) {
    errorElement.textContent = "";
  }
}

function clearAllErrors() {
  const errorElements = document.querySelectorAll(".error-message");
  errorElements.forEach((element) => {
    element.textContent = "";
  });

  const errorFields = document.querySelectorAll(".error");
  errorFields.forEach((field) => {
    field.classList.remove("error");
  });
}

// Utility Functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Smooth scroll polyfill for older browsers
if (!("scrollBehavior" in document.documentElement.style)) {
  const smoothScrollPolyfill = function (target) {
    const targetPosition = target.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;

    function animation(currentTime) {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  };

  // Override scrollToSection for older browsers
  window.scrollToSection = function (sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
      smoothScrollPolyfill(element);
    }
  };
}

// Performance optimization: Lazy loading for images
function initializeLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Initialize lazy loading if supported
if ("IntersectionObserver" in window) {
  document.addEventListener("DOMContentLoaded", initializeLazyLoading);
}
