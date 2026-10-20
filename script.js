
const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");

// Mobile navigation menu
if (toggle && links) {
  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Automatically display the current year
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

// Highlight the navigation link for the visible section
const sections = [...document.querySelectorAll("main section[id]")];
const navItems = [...document.querySelectorAll("#navLinks a")];

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navItems.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`
            );
          });
        }
      });
    },
    { rootMargin: "-35% 0px -55% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

// Contact form: prepare an email in the visitor's email application
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(contactForm);

    // Replace this with your real email address
    const recipient = "your.email@example.com";

    const subject = encodeURIComponent(data.get("subject"));
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\n` +
      `Email: ${data.get("email")}\n\n` +
      `${data.get("message")}`
    );

    window.location.href =
      `mailto:${recipient}?subject=${subject}&body=${body}`;
  });
}
