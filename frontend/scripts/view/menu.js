
    const menuOpen = document.getElementById('menuOpen');
    const menuClose = document.getElementById('menuClose');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    function openMenu() {
      sidebar.classList.add('active');
      overlay.classList.add('show');
      sidebar.setAttribute('aria-hidden', 'false');
      overlay.setAttribute('aria-hidden', 'false');
      // move o foco para o close para acessibilidade
      menuClose.focus();
    }

    function closeMenu() {
      sidebar.classList.remove('active');
      overlay.classList.remove('show');
      sidebar.setAttribute('aria-hidden', 'true');
      overlay.setAttribute('aria-hidden', 'true');
      menuOpen.focus();
    }

    menuOpen.addEventListener('click', openMenu);
    menuClose.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    // fecha com ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && sidebar.classList.contains('active')) closeMenu();
    });

    // opcional: fechar se o usuário navegar por link do menu
    sidebar.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
 