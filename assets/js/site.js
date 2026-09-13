// --- tema (claro por padrão, lembra a escolha do visitante) ---
(function () {
  var btn = document.getElementById('theme-toggle');
  if (!btn) return;

  function label() {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    btn.textContent = isDark ? '☀ Claro' : '🌙 Escuro';
  }
  label();

  btn.addEventListener('click', function () {
    var current = document.documentElement.getAttribute('data-theme') || 'light';
    var next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('onc-theme', next);
    label();
  });
})();

// --- aviso de cookies (aparece uma vez, some ao aceitar) ---
(function () {
  var KEY = 'onc-cookie-consent';
  var banner = document.getElementById('cookie-banner');
  if (!banner) return;

  if (!localStorage.getItem(KEY)) {
    setTimeout(function () { banner.classList.add('show'); }, 400);
  }

  var acceptBtn = document.getElementById('cookie-accept');
  if (acceptBtn) {
    acceptBtn.addEventListener('click', function () {
      localStorage.setItem(KEY, '1');
      banner.classList.remove('show');
    });
  }
})();

// --- busca + filtro de categoria + paginação (12 em 12) ---
(function () {
  var searchInput = document.getElementById('search-input');
  var chips = document.querySelectorAll('.chip');
  var cards = Array.prototype.slice.call(document.querySelectorAll('.card'));
  var emptyState = document.getElementById('empty-state');
  var loadMoreBtn = document.getElementById('load-more-btn');
  var loadMoreWrap = document.getElementById('load-more-wrap');
  if (!searchInput || !cards.length) return;

  var PAGE_SIZE = 12;
  var activeCat = 'todos';
  var limit = PAGE_SIZE;

  function applyFilters() {
    var term = searchInput.value.trim().toLowerCase();

    var matches = cards.filter(function (card) {
      var matchesTerm = card.dataset.nome.indexOf(term) !== -1;
      var matchesCat = activeCat === 'todos' || card.dataset.cat === activeCat;
      return matchesTerm && matchesCat;
    });

    cards.forEach(function (card) { card.style.display = 'none'; });
    matches.slice(0, limit).forEach(function (card) { card.style.display = 'flex'; });

    emptyState.style.display = matches.length === 0 ? 'block' : 'none';
    if (loadMoreWrap) {
      loadMoreWrap.style.display = matches.length > limit ? 'block' : 'none';
    }
  }

  searchInput.addEventListener('input', function () {
    limit = PAGE_SIZE;
    applyFilters();
  });

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      activeCat = chip.dataset.cat;
      limit = PAGE_SIZE;
      applyFilters();
    });
  });

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function () {
      limit += PAGE_SIZE;
      applyFilters();
    });
  }

  applyFilters(); // já entra mostrando só os 12 primeiros
})();
