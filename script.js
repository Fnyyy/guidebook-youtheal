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

// Touch swipe support
let touchStartX = 0;
document.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; });
document.addEventListener('touchend', (e) => {
  const diff = touchStartX - e.changedTouches[0].screenX;
  if (Math.abs(diff) > 50) changePage(diff > 0 ? 1 : -1);
});

document.addEventListener('DOMContentLoaded', init);
