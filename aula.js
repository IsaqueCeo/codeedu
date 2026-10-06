const rawSession = localStorage.getItem("codeedu:session");
if (!rawSession) {
  window.location.replace("login.html");
} else {
  let session;
  try { session = JSON.parse(rawSession); }
  catch { localStorage.removeItem("codeedu:session"); window.location.replace("login.html"); }

  if (session) {
    const lessons = {
      "introducao-computacao": {
        module: "Introdução à Computação",
        total: 12,
        lessons: [
          {
            title: "O que é Computação?", duration: "15 min", progress: 100,
            lead: "Nesta aula, você vai entender o que é a Computação, sua importância no mundo atual e como ela está presente no nosso dia a dia.",
            oneTitle: "O que é Computação?",
            one: [
              "A <strong>Computação</strong> é a área da ciência que estuda o processamento de informações por meio de computadores e outros dispositivos. Ela envolve desde a criação de programas, até o desenvolvimento de sistemas, redes e soluções tecnológicas que facilitam a vida das pessoas.",
              "Em outras palavras, a Computação é a base para tudo o que usamos no mundo digital: aplicativos, sites, jogos, redes sociais, bancos, sistemas de ensino, entre muitas outras coisas."
            ],
            fact: "A Computação não é apenas sobre computadores. Ela também envolve lógica, matemática, criatividade e resolução de problemas.",
            twoTitle: "Por que a Computação é importante?",
            twoIntro: "A Computação está presente em praticamente todos os setores da sociedade:",
            threeTitle: "A Computação no seu dia a dia",
            three: "Você já usa a Computação, mesmo sem perceber! Quando assiste a vídeos, joga, usa o celular, faz pesquisas ou utiliza o WhatsApp, tudo isso envolve tecnologia e processamento de dados.",
            success: "Você deu o primeiro passo para entender como a Computação funciona e como ela pode abrir portas para o seu futuro."
          },
          {
            title: "História da Computação", duration: "18 min", progress: 45,
            lead: "Conheça os principais marcos que transformaram máquinas de cálculo nos computadores e dispositivos que usamos hoje.",
            oneTitle: "Como tudo começou?",
            one: [
              "A história da Computação começa muito antes dos computadores modernos. Instrumentos de cálculo, máquinas mecânicas e ideias matemáticas prepararam o caminho para as primeiras máquinas programáveis.",
              "Ao longo do século XX, válvulas, transistores e circuitos integrados tornaram os computadores menores, mais rápidos e acessíveis."
            ],
            fact: "Os primeiros computadores ocupavam salas inteiras e tinham muito menos capacidade que um smartphone atual.",
            twoTitle: "Evolução da tecnologia",
            twoIntro: "Cada geração trouxe avanços que mudaram a forma como pessoas e organizações trabalham:",
            threeTitle: "Da sala inteira ao bolso",
            three: "Hoje, processamento, armazenamento e comunicação estão presentes em celulares, relógios, carros, televisores e inúmeros objetos conectados.",
            success: "Você conheceu como a Computação evoluiu e por que essa história ajuda a entender as tecnologias atuais."
          }
        ]
      },
      "hardware-software": {
        module: "Hardware e Software", total: 10,
        lessons: [{
          title: "Hardware e Software: qual a diferença?", duration: "16 min", progress: 58,
          lead: "Aprenda a diferenciar os componentes físicos de um computador dos programas que orientam seu funcionamento.",
          oneTitle: "O que é Hardware?",
          one: ["<strong>Hardware</strong> é a parte física de um sistema computacional: processador, memória, armazenamento, placa-mãe, monitor, teclado e outros dispositivos.","Cada componente possui uma função e trabalha em conjunto para receber, processar, armazenar e apresentar informações."],
          fact: "Um computador pode ter excelente hardware, mas sem software adequado ele não consegue executar tarefas úteis.",
          twoTitle: "O que é Software?", twoIntro: "Softwares podem ser organizados em diferentes categorias:",
          threeTitle: "Como eles trabalham juntos", three: "Quando você abre um aplicativo, o software envia instruções ao hardware, que processa os dados e devolve o resultado para você.",
          success: "Agora você já consegue distinguir hardware e software e compreender como eles dependem um do outro."
        }]
      },
      "pensamento-computacional": {
        module: "Pensamento Computacional", total: 14,
        lessons: [{
          title: "Resolvendo problemas passo a passo", duration: "17 min", progress: 42,
          lead: "Entenda como dividir problemas, reconhecer padrões e organizar soluções de maneira lógica.",
          oneTitle: "Pensar antes de programar",
          one: ["O <strong>Pensamento Computacional</strong> é uma forma de organizar o raciocínio para resolver problemas de maneira clara e eficiente.","Ele pode ser aplicado mesmo sem um computador, porque envolve decomposição, reconhecimento de padrões, abstração e criação de passos."],
          fact: "Você usa pensamento computacional ao organizar uma receita, planejar uma rota ou dividir uma tarefa grande em etapas menores.",
          twoTitle: "Quatro pilares importantes", twoIntro: "Essas estratégias ajudam a transformar problemas complexos em soluções possíveis:",
          threeTitle: "Aplicando no cotidiano", three: "Ao identificar o problema, eliminar detalhes desnecessários e definir uma sequência de ações, você já está estruturando uma solução como faria na programação.",
          success: "Você começou a desenvolver uma forma mais estruturada de analisar e resolver problemas."
        }]
      },
      "introducao-programacao": {
        module: "Introdução à Programação", total: 16,
        lessons: [{
          title: "O que é Programação?", duration: "20 min", progress: 0,
          lead: "Descubra como instruções organizadas permitem criar programas, aplicativos e soluções digitais.",
          oneTitle: "Programar é dar instruções",
          one: ["<strong>Programação</strong> é o processo de criar instruções que um computador consegue executar para resolver uma tarefa ou produzir um resultado.","Essas instruções são escritas em linguagens de programação e organizadas de forma lógica."],
          fact: "Uma linguagem de programação funciona como uma ponte entre a ideia de quem programa e as operações que o computador executa.",
          twoTitle: "Onde a programação aparece?", twoIntro: "Programação está por trás de muitos recursos do dia a dia:",
          threeTitle: "Seu primeiro passo", three: "Antes de aprender uma linguagem específica, é importante compreender lógica, sequência, decisões e repetição.",
          success: "Você iniciou sua jornada na programação e já conhece o papel das instruções na criação de soluções digitais."
        }]
      }
    };

    const params = new URLSearchParams(window.location.search);
    const moduleKey = params.get("modulo") || localStorage.getItem("codeedu:selectedModuleKey") || "introducao-computacao";
    const moduleData = lessons[moduleKey] || lessons["introducao-computacao"];
    const requestedLesson = Math.max(1, Number(params.get("aula") || 1));
    const lessonIndex = Math.min(requestedLesson - 1, moduleData.lessons.length - 1);
    const lesson = moduleData.lessons[lessonIndex];

    localStorage.setItem("codeedu:selectedModuleKey", moduleKey);
    localStorage.setItem("codeedu:selectedModule", moduleData.module);

    const studentName = session.name || "João Alves";
    const schoolName = (session.school && typeof session.school === "object" && session.school.name) || (typeof session.school === "string" && session.school) || "Escola Municipal João XXIII";
    const initials = studentName.split(/\s+/).filter(Boolean).slice(0,2).map(p => p[0].toUpperCase()).join("") || "JA";
    document.querySelector("#topUserName").textContent = studentName;
    document.querySelector("#popoverName").textContent = studentName;
    document.querySelector("#popoverSchool").textContent = schoolName;
    document.querySelectorAll(".avatar").forEach(el => el.textContent = initials);

    const lessonNumber = String(lessonIndex + 1).padStart(2,"0");
    document.title = `CodeEdu — ${lesson.title}`;
    document.querySelector("#breadcrumbModule").textContent = moduleData.module;
    document.querySelector("#breadcrumbLesson").textContent = `Aula ${lessonNumber}`;
    document.querySelector("#moduleChip").textContent = moduleData.module;
    document.querySelector("#lessonCount").textContent = `Aula ${lessonNumber} de ${moduleData.total}`;
    document.querySelector("#lessonTitle").textContent = lesson.title;
    document.querySelector("#lessonLead").textContent = lesson.lead;
    document.querySelector("#lessonDuration").textContent = lesson.duration;
    document.querySelector("#heroProgressBar").style.width = `${lesson.progress}%`;
    document.querySelector("#heroProgressValue").textContent = `${lesson.progress}%`;
    document.querySelector("#sectionOneTitle").textContent = lesson.oneTitle;
    document.querySelector("#sectionOneText").innerHTML = lesson.one.map(p => `<p>${p}</p>`).join("");
    document.querySelector("#factText").textContent = lesson.fact;
    document.querySelector("#sectionTwoTitle").textContent = lesson.twoTitle;
    document.querySelector("#sectionTwoIntro").textContent = lesson.twoIntro;
    document.querySelector("#sectionThreeTitle").textContent = lesson.threeTitle;
    document.querySelector("#sectionThreeText").textContent = lesson.three;
    document.querySelector("#successText").textContent = lesson.success;

    const sidebar = document.querySelector("#sidebar");
    const backdrop = document.querySelector("#sidebarBackdrop");
    const menuButton = document.querySelector("#menuButton");
    const notificationButton = document.querySelector("#notificationButton");
    const notificationPopover = document.querySelector("#notificationPopover");
    const profileButton = document.querySelector("#profileButton");
    const profilePopover = document.querySelector("#profilePopover");
    const toast = document.querySelector("#toast");
    let toastTimer;

    function closeSidebar(){sidebar.classList.remove("open");backdrop.classList.remove("visible");menuButton?.setAttribute("aria-expanded","false")}
    menuButton?.addEventListener("click",()=>{const open=!sidebar.classList.contains("open");sidebar.classList.toggle("open",open);backdrop.classList.toggle("visible",open);menuButton.setAttribute("aria-expanded",String(open))});
    backdrop?.addEventListener("click",closeSidebar);

    function closePopovers(except){[[notificationButton,notificationPopover],[profileButton,profilePopover]].forEach(([button,popover])=>{if(popover!==except){popover.hidden=true;button?.setAttribute("aria-expanded","false")}})}
    function togglePopover(button,popover){const opening=popover.hidden;closePopovers(popover);popover.hidden=!opening;button.setAttribute("aria-expanded",String(opening))}
    notificationButton?.addEventListener("click",e=>{e.stopPropagation();togglePopover(notificationButton,notificationPopover)});
    profileButton?.addEventListener("click",e=>{e.stopPropagation();togglePopover(profileButton,profilePopover)});
    document.addEventListener("click",e=>{if(!e.target.closest(".popover-anchor"))closePopovers()});

    function logout(){localStorage.removeItem("codeedu:session");window.location.href="login.html"}
    document.querySelector("#logoutButton")?.addEventListener("click",logout);
    document.querySelector("#popoverLogout")?.addEventListener("click",logout);

    function showToast(message){clearTimeout(toastTimer);toast.textContent=message;toast.hidden=false;toastTimer=setTimeout(()=>toast.hidden=true,2600)}

    document.querySelectorAll("[data-demo-action]").forEach(button=>button.addEventListener("click",()=>{
      const labels={atividades:"A tela de Atividades será integrada em seguida.",testes:"A tela de Testes será integrada em seguida.",progresso:"A tela de Meu progresso será integrada em seguida.",perfil:`O perfil de ${studentName} será integrado em seguida.`};
      showToast(labels[button.dataset.demoAction]||"Recurso preparado para a próxima etapa.");closeSidebar();
    }));

    document.querySelectorAll(".section-heading").forEach(button=>button.addEventListener("click",()=>{
      if(window.matchMedia("(min-width: 1051px)").matches) return;
      const block=button.closest(".content-block");
      const content=block.querySelector(".section-content");
      const expanded=button.getAttribute("aria-expanded")==="true";
      button.setAttribute("aria-expanded",String(!expanded));
      content.hidden=expanded;
      button.querySelector(".section-toggle").textContent=expanded?"⌄":"⌃";
    }));

    const previousButton = document.querySelector("#previousLesson");
    const nextButton = document.querySelector("#nextLesson");
    previousButton.disabled = lessonIndex === 0;
    previousButton.addEventListener("click",()=>{
      if(lessonIndex===0){window.location.href="meus-modulos.html";return;}
      window.location.href=`aula.html?modulo=${encodeURIComponent(moduleKey)}&aula=${lessonIndex}`;
    });
    nextButton.addEventListener("click",()=>{
      if(lessonIndex + 1 < moduleData.lessons.length){
        window.location.href=`aula.html?modulo=${encodeURIComponent(moduleKey)}&aula=${lessonIndex+2}`;
      } else {
        showToast("Próximas aulas deste módulo serão adicionadas na continuidade da plataforma.");
      }
    });
  }
}
