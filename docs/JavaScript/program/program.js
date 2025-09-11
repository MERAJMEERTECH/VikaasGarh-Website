// Change active tab
document.querySelectorAll(".program-hero-nav a").forEach(tab => {
  tab.addEventListener("click", function (e) {
    e.preventDefault();

    // change active tab
    document.querySelectorAll(".program-hero-nav a").forEach(t => t.classList.remove("active"));
    this.classList.add("active");

    // Optionally, you can add dynamic content for each tab here
    console.log(`Selected tab: ${this.textContent.trim()}`);
  });
});

(function () {
  const wrapper = document.querySelector('.program-hero-nav-wrapper');
  const nav = document.getElementById('programNav');
  const items = Array.from(nav.querySelectorAll('a'));
  const leftArrow = wrapper.querySelector('.nav-arrow.left');
  const rightArrow = wrapper.querySelector('.nav-arrow.right');

  let startIndex = 0;

  const mqDesktop = window.matchMedia('(min-width: 1024px)');
  const mqTablet  = window.matchMedia('(min-width: 769px) and (max-width: 1023px)');
  const mqMobile  = window.matchMedia('(max-width: 768px)');

  function itemsPerPage() {
    if (mqDesktop.matches) return 4;
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
      items.forEach(i => i.classList.remove('active'));
      a.classList.add('active');

      if (!mqDesktop.matches) {
        const perPage = itemsPerPage();
        startIndex = perPage === 2 ? (idx < 2 ? 0 : 2) : idx;
        snap();
      }
      if (a.getAttribute('href') === '#') e.preventDefault();
    });
  });

  ['resize', 'orientationchange'].forEach(evt => {
    window.addEventListener(evt, () => {
      const perPage = itemsPerPage();
      if (perPage === 2) {
        startIndex = startIndex < 2 ? 0 : 2;
      } else if (perPage === 4) {
        startIndex = 0;
      }
      snap();
    });
  });

  snap();
})();
