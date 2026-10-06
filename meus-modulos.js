const rawSession = localStorage.getItem("codeedu:session");
if (!rawSession) {
  window.location.replace("login.html");
} else {
  let session;
  try { session = JSON.parse(rawSession); }
  catch { localStorage.removeItem("codeedu:session"); window.location.replace("login.html"); }

  if (session) {
    const studentName = session.name || "João Alves";
    const schoolName = (session.school && typeof session.school === "object" && session.school.name) || (typeof session.school === "string" && session.school) || "Escola Municipal João XXIII";
    const initials = studentName.split(/\s+/).filter(Boolean).slice(0,2).map(part => part[0].toUpperCase()).join("") || "JA";

    document.querySelector("#topUserName").textContent = studentName;
    document.querySelector("#popoverName").textContent = studentName;
    document.querySelector("#popoverSchool").textContent = schoolName;
    document.querySelectorAll(".avatar").forEach(el => el.textContent = initials);

    const sidebar = document.querySelector("#sidebar");
    const backdrop = document.querySelector("#sidebarBackdrop");
    const menuButton = document.querySelector("#menuButton");
    const notificationButton = document.querySelector("#notificationButton");
    const notificationPopover = document.querySelector("#notificationPopover");
    const profileButton = document.querySelector("#profileButton");
    const profilePopover = document.querySelector("#profilePopover");
    const searchInput = document.querySelector("#moduleSearch");
    const cards = [...document.querySelectorAll(".course-card")];
    const emptyState = document.querySelector("#emptyState");
    const toast = document.querySelector("#toast");
    let toastTimer;

    const closeSidebar = () => {
      sidebar.classList.remove("open");
      backdrop.classList.remove("visible");
      menuButton?.setAttribute("aria-expanded", "false");
    };

    menuButton?.addEventListener("click", () => {
      const opening = !sidebar.classList.contains("open");
      sidebar.classList.toggle("open", opening);
      backdrop.classList.toggle("visible", opening);
      menuButton.setAttribute("aria-expanded", String(opening));
    });
    backdrop?.addEventListener("click", closeSidebar);

    function closePopovers(except) {
      [[notificationButton, notificationPopover],[profileButton, profilePopover]].forEach(([button,popover]) => {
        if (popover !== except) { popover.hidden = true; button?.setAttribute("aria-expanded","false"); }
      });
    }
    function togglePopover(button,popover) {
      const opening = popover.hidden;
      closePopovers(popover);
      popover.hidden = !opening;
      button.setAttribute("aria-expanded", String(opening));
    }
    notificationButton?.addEventListener("click", e => { e.stopPropagation(); togglePopover(notificationButton,notificationPopover); });
    profileButton?.addEventListener("click", e => { e.stopPropagation(); togglePopover(profileButton,profilePopover); });
    document.addEventListener("click", e => { if (!e.target.closest(".popover-anchor")) closePopovers(); });

    function showToast(message) {
      clearTimeout(toastTimer);
      toast.textContent = message;
      toast.hidden = false;
      toastTimer = setTimeout(() => toast.hidden = true, 2600);
    }

    function logout() {
      localStorage.removeItem("codeedu:session");
      window.location.href = "login.html";
    }
    document.querySelector("#logoutButton")?.addEventListener("click", logout);
    document.querySelector("#popoverLogout")?.addEventListener("click", logout);

    searchInput?.addEventListener("input", () => {
      const term = searchInput.value.trim().toLocaleLowerCase("pt-BR");
      let visible = 0;
      cards.forEach(card => {
        const match = !term || (card.dataset.search || "").toLocaleLowerCase("pt-BR").includes(term);
        card.hidden = !match;
        if (match) visible += 1;
      });
      emptyState.hidden = visible !== 0;
    });

    const moduleRoutes = {
      "Introdução à Computação": "introducao-computacao",
      "Hardware e Software": "hardware-software",
      "Pensamento Computacional": "pensamento-computacional",
      "Introdução à Programação": "introducao-programacao"
    };

    cards.forEach(card => card.addEventListener("click", () => {
      const moduleName = card.dataset.module;
      const moduleKey = moduleRoutes[moduleName] || "introducao-computacao";
      localStorage.setItem("codeedu:selectedModule", moduleName);
      localStorage.setItem("codeedu:selectedModuleKey", moduleKey);
      window.location.href = `aula.html?modulo=${encodeURIComponent(moduleKey)}&aula=1`;
    }));

    document.querySelectorAll("[data-demo-action]").forEach(button => {
      button.addEventListener("click", () => {
        const labels = {
          atividades:"A tela de Atividades será integrada em seguida.",
          testes:"A tela de Testes será integrada em seguida.",
          progresso:"A tela de Meu progresso será integrada em seguida.",
          perfil:`O perfil de ${studentName} será integrado em seguida.`
        };
        showToast(labels[button.dataset.demoAction] || "Recurso preparado para a próxima etapa.");
        closeSidebar();
      });
    });
  }
}
