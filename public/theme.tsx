(function() {
  const theme = localStorage.getItem('theme');
  if (theme) {
    document.documentElement.classList.add(theme);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    localStorage.setItem('theme', 'dark');
    document.documentElement.classList.add('dark');
  } else {
    localStorage.setItem('theme', 'light');
    document.documentElement.classList.add('light');
  }
})();