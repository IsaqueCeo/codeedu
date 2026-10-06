function getSelectedSchool() {
  const raw = localStorage.getItem("codeedu:selectedSchool");
  if (!raw) return { name: "Escola Municipal João XXIII", city: "Teresina – PI", unit: "Centro" };

  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed === "string") return { name: parsed, city: "Teresina – PI", unit: "Centro" };
    return {
      name: parsed.name || "Escola Municipal João XXIII",
      city: parsed.city || "Teresina – PI",
      unit: parsed.unit || "Centro"
    };
  } catch {
    return { name: raw, city: "Teresina – PI", unit: "Centro" };
  }
}

const selectedSchool = getSelectedSchool();

const schoolTargets = {
  desktopSchoolName: selectedSchool.name,
  mobileSchoolName: selectedSchool.name,
  desktopSchoolCity: selectedSchool.city,
  mobileSchoolCity: selectedSchool.city,
  desktopSchoolUnit: selectedSchool.unit,
  mobileSchoolUnit: selectedSchool.unit
};

Object.entries(schoolTargets).forEach(([id, value]) => {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
});

const menuButton = document.querySelector(".menu-button");
menuButton?.addEventListener("click", () => {
  const expanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!expanded));
});

const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#senha");

togglePassword?.addEventListener("click", () => {
  const visible = password.type === "text";
  password.type = visible ? "password" : "text";
  togglePassword.setAttribute("aria-pressed", String(!visible));
  togglePassword.setAttribute("aria-label", visible ? "Mostrar senha" : "Ocultar senha");
  const icon = togglePassword.querySelector("img");
  if (icon) icon.src = visible ? "assets/eye-off-blue.svg" : "assets/eye-blue.svg";
});

const form = document.querySelector("#loginForm");
const matricula = document.querySelector("#matricula");
const matriculaError = document.querySelector("#matriculaError");
const senha = document.querySelector("#senha");
const senhaError = document.querySelector("#senhaError");
const status = document.querySelector("#loginStatus");
const submitButton = form?.querySelector(".login-button");

const DEMO_USER = {
  matricula: "20260001",
  senha: "123456",
  name: "João Alves"
};

document.querySelector("#fillDemo")?.addEventListener("click", () => {
  matricula.value = DEMO_USER.matricula;
  senha.value = DEMO_USER.senha;
  status.textContent = "Acesso demonstrativo preenchido. Clique em Entrar.";
  matricula.focus();
});

function setFieldError(input, errorEl, message) {
  errorEl.textContent = message;
  input.setAttribute("aria-invalid", message ? "true" : "false");
  input.closest(".input-wrap")?.classList.toggle("has-error", Boolean(message));
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  setFieldError(matricula, matriculaError, "");
  setFieldError(senha, senhaError, "");
  status.textContent = "";

  const registration = matricula.value.replace(/\s+/g, "").trim();
  const passwordValue = senha.value;

  if (!registration) setFieldError(matricula, matriculaError, "Digite sua matrícula.");
  if (!passwordValue) setFieldError(senha, senhaError, "Digite sua senha.");
  if (!registration || !passwordValue) return;

  if (registration === DEMO_USER.matricula && passwordValue === DEMO_USER.senha) {
    localStorage.setItem("codeedu:session", JSON.stringify({
      name: DEMO_USER.name,
      matricula: DEMO_USER.matricula,
      school: selectedSchool,
      authenticatedAt: new Date().toISOString()
    }));

    submitButton.disabled = true;
    submitButton.classList.add("is-loading");
    status.textContent = "Acesso realizado. Abrindo seu painel...";

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 450);
    return;
  }

  setFieldError(matricula, matriculaError, "Matrícula ou senha inválida.");
  setFieldError(senha, senhaError, "Confira os dados do acesso.");
  status.textContent = "Para testar a plataforma, use o acesso demonstrativo.";
});

document.querySelector("#forgotPassword")?.addEventListener("click", (event) => {
  event.preventDefault();
  status.textContent = "No protótipo, use matrícula 20260001 e senha 123456.";
});
