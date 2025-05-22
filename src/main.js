document.addEventListener("DOMContentLoaded", () => {
  // Page transition animation
  const pageTransition = document.querySelector(".page-transition");

  // Show page transition on load
  pageTransition.classList.add("active");

  // Hide page transition after a delay
  setTimeout(() => {
    pageTransition.classList.remove("active");
    pageTransition.classList.add("exit");

    // Remove exit class after animation completes
    setTimeout(() => {
      pageTransition.classList.remove("exit");
    }, 600);
  }, 500);

  // Mobile menu functionality
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const mobileMenu = document.querySelector(".mobile-menu");
  const closeMenuBtn = document.querySelector(".mobile-menu__close");
  const overlay = document.querySelector(".overlay");
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu__link");

  // Make sure hamburger menu is visible on mobile
  if (window.innerWidth <= 991) {
    const navLinks = document.querySelector(".nav__links");
    const navBtn = document.querySelector(".nav__link--btn");

    if (navLinks) navLinks.style.display = "none";
    if (navBtn) navBtn.style.display = "none";
    if (hamburgerMenu) hamburgerMenu.style.display = "block";
  }

  // Toggle mobile menu
  if (hamburgerMenu) {
    hamburgerMenu.addEventListener("click", () => {
      console.log("Hamburger clicked");
      mobileMenu.classList.add("active");
      overlay.classList.add("active");
      hamburgerMenu.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
    });
  }

  // Close mobile menu
  const closeMenu = () => {
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
    hamburgerMenu.classList.remove("active");
    document.body.style.overflow = ""; // Re-enable scrolling
  };

  if (closeMenuBtn) {
    closeMenuBtn.addEventListener("click", closeMenu);
  }

  if (overlay) {
    overlay.addEventListener("click", closeMenu);
  }

  // Close menu when clicking on a link
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Tabs functionality for "How it Works" section
  const tabLinks = document.querySelectorAll(".how__link");
  const tabContents = document.querySelectorAll(".how__tab");

  if (tabLinks.length > 0 && tabContents.length > 0) {
    // Function to activate a tab
    const activateTab = (tabNumber) => {
      // Update active tab link
      tabLinks.forEach((link) => {
        if (link.getAttribute("data-tab") === tabNumber) {
          link.classList.add("how__link-active");
        } else {
          link.classList.remove("how__link-active");
        }
      });

      // Update tab content visibility
      tabContents.forEach((content) => {
        const isTargetTab = content.classList.contains(
          `how__tab--${tabNumber}`
        );

        if (isTargetTab) {
          content.classList.remove("hidden");

          // Animate content elements
          const textBox = content.querySelector(".how__text--box");
          const imageBox = content.querySelector(".how__imagebox");

          if (textBox && imageBox) {
            // Reset animations
            textBox.classList.remove(
              "slide-in-left",
              "slide-in-right",
              "animated"
            );
            imageBox.classList.remove(
              "slide-in-left",
              "slide-in-right",
              "animated"
            );

            // Force reflow
            void textBox.offsetWidth;
            void imageBox.offsetWidth;

            // Apply animations based on tab number
            if (tabNumber === "1" || tabNumber === "3") {
              textBox.classList.add("slide-in-left");
              imageBox.classList.add("slide-in-right");
            } else {
              textBox.classList.add("slide-in-right");
              imageBox.classList.add("slide-in-left");
            }

            // Add animated class after a short delay
            setTimeout(() => {
              textBox.classList.add("animated");
              imageBox.classList.add("animated");
            }, 50);
          }
        } else {
          content.classList.add("hidden");
        }
      });
    };

    // Add click event listeners to tab links
    tabLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const tabNumber = link.getAttribute("data-tab");
        activateTab(tabNumber);
      });
    });

    // Initialize the first tab
    activateTab("1");

    // Enhanced tab hover effects
    const enhanceTabInteractions = () => {
      tabLinks.forEach((link) => {
        // Add ripple effect on click
        link.addEventListener("click", function (e) {
          // Remove any existing ripple elements
          const existingRipple = this.querySelector(".ripple");
          if (existingRipple) {
            existingRipple.remove();
          }

          // Create ripple element
          const ripple = document.createElement("span");
          ripple.classList.add("ripple");
          this.appendChild(ripple);

          // Position the ripple
          const rect = this.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height);
          ripple.style.width = ripple.style.height = `${size}px`;
          ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
          ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

          // Remove ripple after animation completes
          setTimeout(() => {
            ripple.remove();
          }, 600);
        });
      });
    };

    // Call the function if tabs exist
    enhanceTabInteractions();
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      // Skip if the href is just "#" or links to another page
      if (targetId === "#" || targetId.includes(".html")) return;

      e.preventDefault();

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Smooth scroll to the element
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for fixed header
          behavior: "smooth",
        });
      }
    });
  });

  // Scroll animations
  const fadeElements = document.querySelectorAll(
    ".fade-in, .slide-in-left, .slide-in-right, .scale-in"
  );

  const fadeInOnScroll = () => {
    fadeElements.forEach((element) => {
      // Get element position relative to viewport
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150; // How many pixels of the element need to be visible

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("appear");
      }
    });
  };

  // Run on initial load
  fadeInOnScroll();

  // Run on scroll
  window.addEventListener("scroll", fadeInOnScroll);

  // FAQ accordion functionality (for faq.html)
  const faqSections = document.querySelectorAll(".faq__section");

  if (faqSections.length > 0) {
    faqSections.forEach((section) => {
      const questionBox = section.querySelector(".question__box");

      questionBox.addEventListener("click", () => {
        // Toggle active class on the clicked section
        section.classList.toggle("active");

        // Close other sections
        faqSections.forEach((otherSection) => {
          if (otherSection !== section) {
            otherSection.classList.remove("active");
          }
        });
      });
    });
  }

  // Add scroll indicator
  const createScrollIndicator = () => {
    const header = document.querySelector(".header");

    if (header && header.offsetHeight > window.innerHeight * 0.8) {
      const indicator = document.createElement("div");
      indicator.classList.add("scroll-indicator");
      indicator.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      `;

      // Add click event to scroll down
      indicator.addEventListener("click", () => {
        window.scrollTo({
          top: window.innerHeight,
          behavior: "smooth",
        });
      });

      // Add to header
      header.appendChild(indicator);

      // Hide indicator on scroll
      window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
          indicator.style.opacity = "0";
          indicator.style.transition = "opacity 0.3s ease";
        } else {
          indicator.style.opacity = "1";
        }
      });
    }
  };

  // Create scroll indicator
  createScrollIndicator();
});

// Additional animations and effects
document.addEventListener("DOMContentLoaded", () => {
  // Parallax effect for hero section
  const heroSection = document.querySelector(".hero");

  if (heroSection) {
    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY;

      // Only apply parallax if not on mobile
      if (window.innerWidth > 768) {
        heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
      }
    });
  }

  // Animate numbers (for statistics if added later)
  const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      element.textContent = value.toLocaleString();
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  // Function to check if element is in viewport
  const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  // Hover animations for feature cards
  const featureCards = document.querySelectorAll(".feature-card");

  featureCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px)";
      card.style.transition = "transform 0.3s ease";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });
  });

  // Button hover effect
  const buttons = document.querySelectorAll(
    ".nav__link--btn, .form__btn, .mobile-menu__btn"
  );

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      button.style.transform = "scale(1.05)";
      button.style.transition = "all 0.3s ease";
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "scale(1)";
    });
  });

  // Add typing animation to headings if needed
  const addTypingAnimation = (element, text, speed = 50) => {
    element.textContent = "";
    let i = 0;

    const typing = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typing);
      }
    }, speed);
  };

  const headingElement = document.querySelector(".typewriter");
  if (headingElement) {
    const originalText = headingElement.textContent;
    headingElement.textContent = "";
    setTimeout(() => {
      addTypingAnimation(headingElement, originalText);
    }, 1000);
  }

  // Add scroll indicator
  const createScrollIndicator = () => {
    const indicator = document.createElement("div");
    indicator.classList.add("scroll-indicator");
    indicator.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 5v14M5 12l7 7 7-7"/>
      </svg>
    `;

    // Style the indicator
    indicator.style.position = "absolute";
    indicator.style.bottom = "30px";
    indicator.style.left = "50%";
    indicator.style.transform = "translateX(-50%)";
    indicator.style.color = "#205e43";
    indicator.style.animation = "bounce 2s infinite";
    indicator.style.cursor = "pointer";

    // Add animation keyframes
    const style = document.createElement("style");
    style.textContent = `
      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
          transform: translateY(0) translateX(-50%);
        }
        40% {
          transform: translateY(-20px) translateX(-50%);
        }
        60% {
          transform: translateY(-10px) translateX(-50%);
        }
      }
    `;
    document.head.appendChild(style);

    // Add click event to scroll down
    indicator.addEventListener("click", () => {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    });

    // Add to header
    const header = document.querySelector(".header");
    if (header) {
      header.appendChild(indicator);

      // Hide indicator on scroll
      window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
          indicator.style.opacity = "0";
          indicator.style.transition = "opacity 0.3s ease";
        } else {
          indicator.style.opacity = "1";
        }
      });
    }
  };

  // Create scroll indicator
  createScrollIndicator();

  // Enhanced tab hover effects
  const enhanceTabInteractions = () => {
    const tabLinks = document.querySelectorAll(".how__link");

    tabLinks.forEach((link) => {
      // Add ripple effect on click
      link.addEventListener("click", function (e) {
        // Remove any existing ripple elements
        const existingRipple = this.querySelector(".ripple");
        if (existingRipple) {
          existingRipple.remove();
        }

        // Create ripple element
        const ripple = document.createElement("span");
        ripple.classList.add("ripple");
        this.appendChild(ripple);

        // Position the ripple
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

        // Remove ripple after animation completes
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  };

  // Call the function
  enhanceTabInteractions();
});
