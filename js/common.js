(function () {
  var path = window.location.pathname;
  var filename = path.substring(path.lastIndexOf('/') + 1);

  var pageMap = {
    'index.html': 'home',
    '': 'home',
    'partners.html': 'partners',
    'investors.html': 'investors',
    'demo.html': 'demo'
  };

  var current = pageMap[filename] || 'home';
  var links = document.querySelectorAll('[data-nav]');

  links.forEach(function (link) {
    if (link.dataset.nav === current) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
})();
