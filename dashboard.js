const sessionRaw = localStorage.getItem("codeedu:session");

if (!sessionRaw) {
  window.location.replace("login.html");
} else {
  let session;
  try {
    session = JSON.parse(sessionRaw);
  } catch {
    localStorage.removeItem("codeedu:session");
    window.location.replace("login.html");
  }

  if (session) {
    const studentName = session.name || "João Alves";
    const schoolName =
      (session.school && typeof session.school === "object" && session.school.name) ||
      (typeof session.school === "string" && session.school) ||
      "Escola Municipal João XXIII";

    const firstName = studentName.split(/\s+/)[0] || "Aluno";
    const initials = studentName
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(part => part[0].toUpperCase())
      .join("");

    document.querySelector("#welcomeName").textContent = `${studentName}!`;
    document.querySelector("#topUserName").textContent = studentName;
    document.querySelector("#popoverName").textContent = studentName;
    document.querySelector("#popoverSchool").textContent = schoolName;
    document.querySelectorAll(".avatar").forEach(el => (el.textContent = initials || "JA"));

    const sidebar = document.querySelector("#sidebar");
    const sidebarBackdrop = document.querySelector("#sidebarBackdrop");
    const menuButton = document.querySelector("#menuButton");
    const notificationButton = document.querySelector("#notificationButton");
    const notificationPopover = document.querySelector("#notificationPopover");
    const profileButton = document.querySelector("#profileButton");
    const profilePopover = document.querySelector("#profilePopover");
    const searchInput = document.querySelector("#globalSearch");
    const searchEmpty = document.querySelector("#searchEmpty");
    const searchable = [...document.querySelectorAll("[data-search]")];
    const toast = document.querySelector("#toast");
    let toastTimer;

    function closeSidebar() {
      sidebar.classList.remove("open");
      sidebarBackdrop.classList.remove("visible");
      menuButton?.setAttribute("aria-expanded", "false");
    }

    function toggleSidebar() {
      const opening = !sidebar.classList.contains("open");
      sidebar.classList.toggle("open", opening);
      sidebarBackdrop.classList.toggle("visible", opening);
      menuButton?.setAttribute("aria-expanded", String(opening));
    }

    function closePopovers(except) {
      [
        [notificationButton, notificationPopover],
        [profileButton, profilePopover]
      ].forEach(([button, popover]) => {
        if (popover !== except) {
          popover.hidden = true;
          button?.setAttribute("aria-expanded", "false");
        }
      });
    }

    function togglePopover(button, popover) {
      const willOpen = popover.hidden;
      closePopovers(popover);
      popover.hidden = !willOpen;
      button.setAttribute("aria-expanded", String(willOpen));
    }

    function showToast(message) {
      clearTimeout(toastTimer);
      toast.textContent = message;
      toast.hidden = false;
      toastTimer = setTimeout(() => (toast.hidden = true), 2600);
    }

    function logout() {
      localStorage.removeItem("codeedu:session");
      window.location.href = "login.html";
    }

    menuButton?.addEventListener("click", toggleSidebar);
    sidebarBackdrop?.addEventListener("click", closeSidebar);

    notificationButton?.addEventListener("click", (event) => {
      event.stopPropagation();
      togglePopover(notificationButton, notificationPopover);
    });

    profileButton?.addEventListener("click", (event) => {
      event.stopPropagation();
      togglePopover(profileButton, profilePopover);
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".popover-anchor")) closePopovers();
    });

    document.querySelector("#logoutButton")?.addEventListener("click", logout);
    document.querySelector("#popoverLogout")?.addEventListener("click", logout);

    document.querySelectorAll("[data-scroll]").forEach(button => {
      button.addEventListener("click", () => {
        document.querySelector(button.dataset.scroll)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    document.querySelectorAll("[data-demo-action]").forEach(button => {
      button.addEventListener("click", () => {
        if (button.dataset.demoAction === "conteudo") {
          localStorage.setItem("codeedu:selectedModule", "Introdução à Computação");
          localStorage.setItem("codeedu:selectedModuleKey", "introducao-computacao");
          window.location.href = "aula.html?modulo=introducao-computacao&aula=1";
          return;
        }
        const labels = {
          perfil: `Perfil de ${studentName}: esta área será conectada à tela de perfil.`,
          conteudo: "Abrindo o próximo conteúdo: Introdução à Lógica de Programação.",
          atividades: "A central de atividades será integrada na próxima tela.",
          testes: "A área de testes será integrada na próxima tela."
        };
        showToast(labels[button.dataset.demoAction] || "Recurso preparado para a próxima tela.");
        closeSidebar();
      });
    });

    document.querySelectorAll(".module-card,.activity-row").forEach(card => {
      card.addEventListener("click", () => {
        const title = card.querySelector("h3,strong")?.textContent?.trim() || "conteúdo";
        showToast(`${title}: abertura do conteúdo preparada para a próxima etapa.`);
      });
    });

    document.querySelectorAll(".side-nav a[href^='#'],.mobile-nav a[href^='#']").forEach(link => {
      link.addEventListener("click", () => {
        closeSidebar();
        document.querySelectorAll(".side-nav .nav-item").forEach(item => item.classList.remove("active"));
        const section = link.getAttribute("href");
        const sideMatch = document.querySelector(`.side-nav a[href="${section}"]`);
        sideMatch?.classList.add("active");
      });
    });

    searchInput?.addEventListener("input", () => {
      const term = searchInput.value.trim().toLocaleLowerCase("pt-BR");
      let matches = 0;

      searchable.forEach(item => {
        const haystack = (item.dataset.search || "").toLocaleLowerCase("pt-BR");
        const visible = !term || haystack.includes(term);
        item.hidden = !visible;
        if (visible) matches += 1;
      });

      searchEmpty.hidden = !term || matches > 0;
    });

    // Texto personalizado sem alterar a hierarquia visual do layout.
    const hello = document.querySelector(".welcome-copy p");
    hello?.setAttribute("aria-label", `Bem-vindo, ${firstName}. Continue seus estudos.`);
  }
}
