const prefersReducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const prefersReducedMotion = prefersReducedMotionQuery.matches;

// Avatares da comunidade com feedback contextual para mouse e teclado.
const avatarName = document.getElementById("avatarName");
const avatarButtons = Array.from(document.querySelectorAll(".avatar"));

const updateAvatarHint = (avatar) => {
  if (!avatarName || !avatar) {
    return;
  }

  const { name, role } = avatar.dataset;
  avatarName.textContent = `${name} atua em ${role}.`;
};

const resetAvatarHint = () => {
  if (!avatarName) {
    return;
  }

  avatarName.textContent =
    "Selecione um perfil para conhecer uma especialidade da comunidade.";
};

avatarButtons.forEach((avatar) => {
  avatar.addEventListener("pointerenter", () => updateAvatarHint(avatar));
  avatar.addEventListener("focus", () => updateAvatarHint(avatar));
});

document.querySelector(".avatar-stack")?.addEventListener("pointerleave", resetAvatarHint);
document.querySelector(".avatar-stack")?.addEventListener("focusout", (event) => {
  if (!event.currentTarget.contains(event.relatedTarget)) {
    resetAvatarHint();
  }
});

// Slot machine ao entrar na viewport, com fallback textual para leitores de tela.
const slotMachine = document.getElementById("slotMachine");
const slotReels = Array.from(document.querySelectorAll(".slot-reel"));
const finalNumber = "12480";

const fillSlotReels = () => {
  slotReels.forEach((reel) => {
    reel.innerHTML = Array.from({ length: 20 }, (_, index) => `<span>${index % 10}</span>`).join("");
  });
};

const lockSlotReelsToFinalValue = () => {
  slotReels.forEach((reel, index) => {
    const stepHeight = reel.querySelector("span")?.offsetHeight ?? 0;
    const digit = Number(finalNumber[index]);
    const loops = 10 + index * 2 + digit;
    reel.style.transform = `translateY(-${loops * stepHeight}px)`;
  });
};

if (slotReels.length > 0) {
  fillSlotReels();

  if (prefersReducedMotion) {
    lockSlotReelsToFinalValue();
  } else {
    const slotObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            lockSlotReelsToFinalValue();
            slotObserver.disconnect();
          }
        });
      },
      { threshold: 0.55 }
    );

    if (slotMachine) {
      slotObserver.observe(slotMachine);
    }
  }
}

// Roadmap com detalhe e barra preenchida por scroll.
const roadmapDetail = document.getElementById("roadmapDetail");
const roadmapFill = document.getElementById("roadmapFill");
const roadmapSection = document.getElementById("roadmap");
const checkpoints = Array.from(document.querySelectorAll(".checkpoint"));

const modules = {
  fundamentos: {
    title: "Fundamentos",
    time: "3 semanas",
    summary: "Base sólida de HTML, CSS, JavaScript e leitura de interfaces.",
    project: "Projeto final: landing page autoral com sistema visual próprio.",
    deliverables: [
      "Estrutura semântica e componentes de interface.",
      "Aplicação de responsividade mobile-first.",
      "Primeiro projeto publicado em ambiente estático."
    ]
  },
  produto: {
    title: "Produto",
    time: "2 semanas",
    summary: "Pensamento de jornada, priorização e decisões orientadas a problema.",
    project: "Projeto final: discovery, UX flow e protótipo navegável.",
    deliverables: [
      "Mapa de fluxo com cenários prioritários.",
      "Narrativa de valor e clareza de posicionamento.",
      "Protótipo navegável com feedback de navegação."
    ]
  },
  frontend: {
    title: "Front-end",
    time: "5 semanas",
    summary: "Construção de interfaces com estados reais, ritmo visual e consistência.",
    project: "Projeto final: app responsivo com estados e interações reais.",
    deliverables: [
      "Componentes reutilizáveis com acessibilidade básica.",
      "Tratamento de loading, vazio e erro em telas críticas.",
      "Interações polidas com foco em experiência."
    ]
  },
  backend: {
    title: "Back-end",
    time: "4 semanas",
    summary: "Fundamentos de APIs, autenticação, validação e integração entre camadas.",
    project: "Projeto final: API com autenticação, validação e documentação.",
    deliverables: [
      "Endpoints consistentes com tratamento de erro.",
      "Boas práticas de validação e segurança básica.",
      "Documentação funcional para consumo da aplicação."
    ]
  },
  carreira: {
    title: "Carreira",
    time: "2 semanas",
    summary: "Refinamento de portfólio, repertório e apresentação profissional.",
    project: "Projeto final: portfólio, currículo e simulação de entrevista técnica.",
    deliverables: [
      "Página de apresentação mais clara e estratégica.",
      "Treino de narrativa para entrevistas técnicas.",
      "Plano de continuidade com próximos projetos."
    ]
  }
};

const renderRoadmapDetail = (key) => {
  const module = modules[key];

  if (!module || !roadmapDetail) {
    return;
  }

  roadmapDetail.replaceChildren();

  const title = document.createElement("h3");
  title.textContent = module.title;

  const time = document.createElement("p");
  time.textContent = module.time;

  const summary = document.createElement("p");
  summary.textContent = module.summary;

  const project = document.createElement("strong");
  project.textContent = module.project;

  const deliverables = document.createElement("ul");
  deliverables.className = "roadmap-deliverables";

  module.deliverables.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    deliverables.append(listItem);
  });

  roadmapDetail.append(title, time, summary, project, deliverables);

  checkpoints.forEach((button) => {
    const isActive = button.dataset.module === key;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
    button.tabIndex = isActive ? 0 : -1;
  });
};

checkpoints.forEach((checkpoint, index) => {
  checkpoint.addEventListener("click", () => renderRoadmapDetail(checkpoint.dataset.module));
  checkpoint.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
      return;
    }

    event.preventDefault();

    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + direction + checkpoints.length) % checkpoints.length;
    checkpoints[nextIndex].focus();
    renderRoadmapDetail(checkpoints[nextIndex].dataset.module);
  });
});

let isTicking = false;

const updateRoadmapProgress = () => {
  if (!roadmapSection || !roadmapFill) {
    return;
  }

  const rect = roadmapSection.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const progress = 1 - Math.min(Math.max(rect.bottom / (rect.height + viewportHeight), 0), 1);
  roadmapFill.style.width = `${16 + progress * 84}%`;
};

window.addEventListener("scroll", () => {
  if (isTicking) {
    return;
  }

  window.requestAnimationFrame(() => {
    updateRoadmapProgress();
    isTicking = false;
  });

  isTicking = true;
});

renderRoadmapDetail("fundamentos");
updateRoadmapProgress();

// Mini editor com feedback visual controlado.
const runPreview = document.getElementById("runPreview");
const previewCard = document.getElementById("previewCard");
const previewStatus = document.getElementById("previewStatus");

runPreview?.addEventListener("click", () => {
  if (!previewCard) {
    return;
  }

  previewCard.classList.remove("is-running");
  void previewCard.offsetWidth;
  previewCard.classList.add("is-running");

  if (previewStatus) {
    previewStatus.textContent = "Prévia reiniciada.";
  }
});

// Modal de certificados com fechamento por clique externo, ESC e retorno de foco.
const modal = document.getElementById("certificateModal");
const modalCard = modal?.querySelector(".modal-card");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const closeModalButton = document.getElementById("closeModal");
const certificateCards = Array.from(document.querySelectorAll(".certificate-card"));

let lastFocusedElement = null;

const getFocusableElements = () => {
  if (!modal) {
    return [];
  }

  return Array.from(
    modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  ).filter((element) => !element.hasAttribute("disabled"));
};

const openCertificate = (trigger, title, text) => {
  if (!modal || !modalTitle || !modalText || !modalCard) {
    return;
  }

  lastFocusedElement = trigger;
  modalTitle.textContent = title;
  modalText.textContent = text;
  modal.hidden = false;
  document.body.classList.add("no-scroll");
  modalCard.focus();
};

const closeCertificate = () => {
  if (!modal) {
    return;
  }

  modal.hidden = true;
  document.body.classList.remove("no-scroll");

  if (lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus();
  }
};

certificateCards.forEach((card) => {
  card.addEventListener("click", () => {
    openCertificate(card, card.dataset.title, card.dataset.text);
  });
});

closeModalButton?.addEventListener("click", closeCertificate);

modal?.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeCertificate();
  }
});

modal?.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    closeCertificate();
    return;
  }

  if (event.key !== "Tab") {
    return;
  }

  const focusableElements = getFocusableElements();

  if (focusableElements.length === 0) {
    event.preventDefault();
    return;
  }

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
});

// Countdown com atualização em 1 segundo e estado final de urgência.
const countdownTarget = new Date();
countdownTarget.setDate(countdownTarget.getDate() + 3);
countdownTarget.setHours(23, 59, 59, 999);

const countdownFields = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds")
};
const countdownMessage = document.getElementById("countdownMessage");
const offerSection = document.querySelector(".offer");

const updateCountdown = () => {
  const now = new Date();
  const distance = countdownTarget - now;

  if (distance <= 0) {
    Object.values(countdownFields).forEach((field) => {
      if (field) {
        field.textContent = "00";
      }
    });

    if (countdownMessage) {
      countdownMessage.textContent = "Últimas vagas disponíveis.";
    }

    offerSection?.classList.add("urgent");
    return false;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  countdownFields.days.textContent = String(days).padStart(2, "0");
  countdownFields.hours.textContent = String(hours).padStart(2, "0");
  countdownFields.minutes.textContent = String(minutes).padStart(2, "0");
  countdownFields.seconds.textContent = String(seconds).padStart(2, "0");

  return true;
};

if (Object.values(countdownFields).every(Boolean)) {
  updateCountdown();

  const countdownInterval = window.setInterval(() => {
    const shouldContinue = updateCountdown();

    if (!shouldContinue) {
      window.clearInterval(countdownInterval);
    }
  }, prefersReducedMotion ? 1000 : 1000);
}
