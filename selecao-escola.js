const menuButton = document.querySelector(".menu-button");
const continueButton = document.querySelector("#continueButton");
const cards = [...document.querySelectorAll(".school-card")];
const searchInput = document.querySelector(".search-box input");
const count = document.querySelector(".count");
const emptyState = document.querySelector("#emptySchools");

let selectedSchool = null;
try {
  const previous = JSON.parse(localStorage.getItem("codeedu:selectedSchool") || "null");
  const previousName = typeof previous === "string" ? previous : previous?.name;
  selectedSchool = cards.find(card => card.dataset.school === previousName) || null;
} catch {
  selectedSchool = null;
}

function schoolFromCard(card) {
  return {
    name: card.dataset.school,
    city: card.dataset.city || "Teresina – PI",
    unit: card.dataset.unit || "Centro"
  };
}

function syncSelection() {
  cards.forEach(card => {
    const selected = card === selectedSchool;
    card.classList.toggle("selected", selected);
    card.setAttribute("aria-pressed", String(selected));

    const radio = card.querySelector(".radio");
    radio.classList.toggle("checked", selected);
    radio.textContent = selected ? "✓" : "";
  });

  continueButton.disabled = !selectedSchool;
  continueButton.classList.toggle("enabled", Boolean(selectedSchool));
}

function filterSchools() {
  const term = (searchInput?.value || "").trim().toLocaleLowerCase("pt-BR");
  let visible = 0;

  cards.forEach(card => {
    const haystack = `${card.dataset.school} ${card.dataset.city} ${card.dataset.unit}`.toLocaleLowerCase("pt-BR");
    const matches = !term || haystack.includes(term);
    card.hidden = !matches;
    if (matches) visible += 1;
  });

  if (count) count.textContent = `${visible} ${visible === 1 ? "escola encontrada" : "escolas encontradas"}`;
  if (emptyState) emptyState.hidden = visible !== 0;
}

cards.forEach(card => {
  card.addEventListener("click", () => {
    selectedSchool = card;
    syncSelection();
  });
});

searchInput?.addEventListener("input", filterSchools);

continueButton?.addEventListener("click", () => {
  if (!selectedSchool) return;
  localStorage.setItem("codeedu:selectedSchool", JSON.stringify(schoolFromCard(selectedSchool)));
  window.location.href = "login.html";
});

menuButton?.addEventListener("click", () => {
  const expanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!expanded));
});

syncSelection();
filterSchools();
