/* ---------- Sidebar Elements ---------- */
const sidebar = document.getElementById("sidebar");     // Sidebar container
const closeBtn = document.getElementById("close-btn");  // Close button inside sidebar
const hamburger = document.querySelector(".hamburger"); // Hamburger menu button
const overlay = document.getElementById("overlay");     // Screen overlay behind sidebar

/* ---------- Open Sidebar ---------- */
hamburger.addEventListener("click", () => {
  sidebar.classList.add("open");     // Add "open" class to show sidebar
  overlay.style.display = "block";   // Show overlay
});

/* ---------- Close Sidebar Function ---------- */
function closeSidebar() {
  sidebar.classList.remove("open");  // Remove "open" class to hide sidebar
  overlay.style.display = "none";    // Hide overlay
}

/* ---------- Close Sidebar Events ---------- */
closeBtn.addEventListener("click", closeSidebar);  // Close when "X" button clicked
overlay.addEventListener("click", closeSidebar);   // Close when overlay clicked

/* ---------- Swipe-to-Close (Mobile) ---------- */
let startX = 0;

sidebar.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;  // Record the initial touch position (X-axis)
});

sidebar.addEventListener("touchmove", (e) => {
  let touchX = e.touches[0].clientX;
  if (startX - touchX > 80) {      // If user swipes left by at least 80px
    closeSidebar();                // Close the sidebar
  }
});

/* ---------- Marquee Elements ---------- */
const marquee = document.getElementById("infraMarquee"); // Marquee container
const toggleBtn = document.getElementById("toggleBtn");  // Play/Pause button
let paused = false;  // Track current marquee state

/* ---------- Duplicate Logos for Seamless Infinite Scroll ---------- */
const marqueeContent = marquee.innerHTML;   // Save all logos
marquee.innerHTML += marqueeContent;        // Append them again (duplicate)

/* ---------- Toggle Marquee Animation ---------- */
toggleBtn.addEventListener("click", () => {
  if (!paused) {
    marquee.style.animationPlayState = "paused"; // Pause marquee
    toggleBtn.textContent = "▶";                 // Change button to "play"
    paused = true;
  } else {
    marquee.style.animationPlayState = "running"; // Resume marquee
    toggleBtn.textContent = "⏸";                 // Change button to "pause"
    paused = false;
  }
});

// Active link highlight on scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".about-nav a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});
