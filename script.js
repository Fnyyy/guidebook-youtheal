let currentPage = 1;
const totalPages = 11;

function init() {
  showPage(1);
}

function showPage(n) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.querySelector(`.page[data-page="${n}"]`);
  if (target) {
    target.classList.add('active');
    currentPage = n;
    updateControls();
  }
}

function changePage(dir) {
  const next = currentPage + dir;
  if (next >= 1 && next <= totalPages) {
    showPage(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function goToPage(n) {
  if (n >= 1 && n <= totalPages) {
    showPage(n);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function updateControls() {
  document.getElementById('prevBtn').disabled = currentPage <= 1;
  document.getElementById('nextBtn').disabled = currentPage >= totalPages;
  document.getElementById('pageIndicator').textContent = currentPage + ' / ' + totalPages;
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') changePage(1);
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') changePage(-1);
});

// Touch swipe support with diagonal drift prevention
let touchStartX = 0;
let touchStartY = 0;
document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].clientX;
  touchStartY = e.changedTouches[0].clientY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
  const diffX = touchStartX - e.changedTouches[0].clientX;
  const diffY = touchStartY - e.changedTouches[0].clientY;
  
  // Only trigger page transition if:
  // 1. Horizontal movement is greater than vertical movement (prevents accidental swipe when scrolling vertically)
  // 2. Horizontal movement is significant (threshold of 70px)
  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 70) {
    changePage(diffX > 0 ? 1 : -1);
  }
}, { passive: true });

document.addEventListener('DOMContentLoaded', init);
