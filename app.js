const evidence = {
  plaque: {
    title: "The message in the dust",
    description: "A small plaque rests where the first humans stepped onto another world. Its names are still legible: a quiet signature from a civilization that believed it would return.",
    source: "Apollo 11's lunar module carried a commemorative plaque signed by President Nixon and the crew. The mission landed on July 20, 1969."
  },
  seismometer: {
    title: "The Moon is listening",
    description: "The instrument has no moving parts left, but its purpose survives in the data. It was designed to feel the Moon tremble and translate those tremors into a map of its hidden interior.",
    source: "The Apollo 11 Passive Seismic Experiment collected lunar seismic data. Later Apollo missions expanded the network of instruments on the surface."
  },
  camera: {
    title: "A view that outlived its audience",
    description: "The television camera is frozen in its final position, facing a horizon no broadcast can reach. Its last image was sent across space to millions of people on Earth.",
    source: "Apollo 11's slow-scan television camera transmitted live images from the lunar surface on July 20, 1969."
  }
};

const recovered = new Set();
const gamePanel = document.querySelector("#game-panel");
const timelinePanel = document.querySelector("#timeline-panel");
const modal = document.querySelector("#evidence-modal");
const modalTitle = document.querySelector("#modal-title");
const modalDescription = document.querySelector("#modal-description");
const modalSource = document.querySelector("#modal-source");
const evidenceList = document.querySelector("#evidence-list");
const logEntry = document.querySelector("#log-entry p");
let selectedEvidence = null;

document.querySelector("#begin-button").addEventListener("click", () => {
  gamePanel.classList.remove("hidden");
  gamePanel.scrollIntoView({ behavior: "smooth", block: "start" });
});

document.querySelectorAll(".scene-object").forEach((object) => {
  object.addEventListener("click", () => {
    selectedEvidence = object.dataset.evidence;
    const item = evidence[selectedEvidence];
    modalTitle.textContent = item.title;
    modalDescription.textContent = item.description;
    modalSource.textContent = item.source;
    modal.classList.remove("hidden");
  });
});

function renderEvidence() {
  if (recovered.size === 0) {
    evidenceList.innerHTML = "<p class=\"empty-state\">No traces logged yet.<br>Something is waiting in the dust.</p>";
    return;
  }
  evidenceList.innerHTML = [...recovered].map((key) => `
    <div class="evidence-card" data-evidence="${key}">
      <strong>${evidence[key].title}</strong>
      <span>TRACE ${String([...recovered].indexOf(key) + 1).padStart(2, "0")} / VERIFIED</span>
    </div>
  `).join("");
}

document.querySelector("#modal-continue").addEventListener("click", () => {
  recovered.add(selectedEvidence);
  renderEvidence();
  document.querySelector("#evidence-count").textContent = recovered.size;
  logEntry.textContent = recovered.size === 3
    ? "All traces align. The abandoned equipment is telling one continuous story."
    : `${3 - recovered.size} trace${recovered.size === 2 ? "" : "s"} ${recovered.size === 2 ? "remains" : "remain"} at this site. Keep scanning.`;
  modal.classList.add("hidden");
  if (recovered.size === 3) {
    setTimeout(() => {
      timelinePanel.classList.remove("hidden");
      timelinePanel.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 450);
  }
});

document.querySelector("#close-modal").addEventListener("click", () => modal.classList.add("hidden"));
modal.addEventListener("click", (event) => {
  if (event.target === modal) modal.classList.add("hidden");
});
document.querySelector("#reset-button").addEventListener("click", () => {
  recovered.clear();
  renderEvidence();
  document.querySelector("#evidence-count").textContent = "0";
  logEntry.textContent = "Scan the site to begin reconstructing the human timeline.";
  timelinePanel.classList.add("hidden");
  gamePanel.scrollIntoView({ behavior: "smooth", block: "start" });
});
