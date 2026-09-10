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

// --- busca + filtro de categoria ---
(function () {
  var searchInput = document.getElementById('search-input');
  var chips = document.querySelectorAll('.chip');
  var cards = document.querySelectorAll('.card');
  var emptyState = document.getElementById('empty-state');
  if (!searchInput || !cards.length) return;

  var activeCat = 'todos';

  function applyFilters() {
    var term = searchInput.value.trim().toLowerCase();
    var visibleCount = 0;

    cards.forEach(function (card) {
      var matchesTerm = card.dataset.nome.indexOf(term) !== -1;
      var matchesCat = activeCat === 'todos' || card.dataset.cat === activeCat;
      var show = matchesTerm && matchesCat;
      card.style.display = show ? 'flex' : 'none';
      if (show) visibleCount++;
    });

    emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
  }

  searchInput.addEventListener('input', applyFilters);

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      activeCat = chip.dataset.cat;
      applyFilters();
    });
  });
})();
