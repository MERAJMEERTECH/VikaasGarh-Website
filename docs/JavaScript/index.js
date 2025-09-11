// Content for each tab
const aboutData = {
  vikaasgarh: {
    title: "About VikaasGarh",
    text: "VikaasGarh is Chhattisgarh’s leading Incubator & Accelerator, dedicated to supporting startups with world-class infrastructure, mentorship, and strategic guidance.",
    button: "Know More",
    // image: "./Assets/Images/about-vikaasgarh.jpg"
  },
  incubator: {
    title: "About VikaasGarh Incubator",
    text: "The Incubation Program helps early-stage startups with resources, expert mentorship, co-working spaces, and seed support to validate and grow their ideas.",
    button: "Know More",
    // image: "./Assets/Images/incubator.jpg"
  },
  accelerator: {
    title: "About VikaasGarh Accelerator",
    text: "The Accelerator Program supports growth-stage startups with funding access, strategic mentorship, investor connects, and market expansion opportunities.",
    button: "Know More",
    // image: "./Assets/Images/accelerator.jpg"
  }
};

// Elements
const tabs = document.querySelectorAll(".about-tab");
const textBox = document.getElementById("about-text");
const imageBox = document.getElementById("about-image");

// --- Set first tab active by default ---
if (tabs.length > 0) {
  tabs[0].classList.add("active");
  const firstKey = tabs[0].getAttribute("data-tab");
  const firstData = aboutData[firstKey];
  textBox.innerHTML = `
    <h2>${firstData.title}</h2>
    <p>${firstData.text}</p>
    <a href="#" class="about-btn">${firstData.button}</a>
  `;
  imageBox.innerHTML = firstData.image 
    ? `<img src="${firstData.image}" alt="${firstData.title}">` 
    : "";
}

// Tab click event
tabs.forEach(tab => {
  tab.addEventListener("click", e => {
    e.preventDefault();
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const key = tab.getAttribute("data-tab");
    const data = aboutData[key];

    textBox.innerHTML = `
      <h2>${data.title}</h2>
      <p>${data.text}</p>
      <a href="#" class="about-btn">${data.button}</a>
    `;
    imageBox.innerHTML = data.image 
      ? `<img src="${data.image}" alt="${data.title}">` 
      : "";
  });
});

// Navigation arrows & responsive logic
(function () {
  const wrapper = document.querySelector('.about-nav-wrapper');
  const nav = document.getElementById('aboutNav');
  const items = Array.from(nav.querySelectorAll('a'));
  const leftArrow = wrapper.querySelector('.nav-arrow.left');
  const rightArrow = wrapper.querySelector('.nav-arrow.right');

  let startIndex = 0;

  const mqDesktop = window.matchMedia('(min-width: 1024px)');
  const mqTablet  = window.matchMedia('(min-width: 769px) and (max-width: 1023px)');
  const mqMobile  = window.matchMedia('(max-width: 768px)');

  function itemsPerPage() {
    if (mqDesktop.matches) return 3;
    if (mqTablet.matches)  return 2;
    return 1;
  }

  function lastValidStart() {
    return Math.max(0, items.length - itemsPerPage());
  }

  function clampIndex(i) {
    return Math.min(Math.max(0, i), lastValidStart());
  }

  function applyTransform() {
    if (mqDesktop.matches) {
      nav.style.transform = 'translateX(0)';
      return;
    }
    const gap = parseInt(getComputedStyle(nav).gap) || 0; 
    const itemWidth = items[0].offsetWidth + gap;
    const offset = itemWidth * startIndex;
    nav.style.transform = `translateX(${-offset}px)`;
  }

  function updateArrows() {
    if (mqDesktop.matches || items.length <= itemsPerPage()) {
      leftArrow.style.display = 'none';
      rightArrow.style.display = 'none';
      return;
    }

    const maxStart = lastValidStart();

    if (startIndex === 0) {
      leftArrow.style.display = 'none';
      rightArrow.style.display = 'inline-flex';
    } else if (startIndex >= maxStart) {
      leftArrow.style.display = 'inline-flex';
      rightArrow.style.display = 'none';
    } else {
      leftArrow.style.display = 'inline-flex';
      rightArrow.style.display = 'inline-flex';
    }
  }

  function snap() {
    startIndex = clampIndex(startIndex);
    applyTransform();
    updateArrows();
  }

  rightArrow.addEventListener('click', () => {
    const perPage = itemsPerPage();
    const maxStart = lastValidStart();
    if (startIndex < maxStart) {
      startIndex = clampIndex(startIndex + perPage);
      snap();
    }
  });

  leftArrow.addEventListener('click', () => {
    const perPage = itemsPerPage();
    if (startIndex > 0) {
      startIndex = clampIndex(startIndex - perPage);
      snap();
    }
  });

  items.forEach((a, idx) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();

      // Remove active from all nav items
      items.forEach(i => i.classList.remove('active'));

      // Add active to clicked nav
      a.classList.add('active');

      if (!mqDesktop.matches) {
        const perPage = itemsPerPage();
        startIndex = perPage === 2 ? (idx < 2 ? 0 : 1) : idx;
        snap();
      }
    });
  });

  ['resize', 'orientationchange'].forEach(evt => {
    window.addEventListener(evt, snap);
  });

  snap();
})();
