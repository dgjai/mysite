// blocks/fav/fav.js

export default function decorate(block) {
  // The incoming block is a table converted into div structure by AEM.
  // We will transform it into:
  // <section class="fav">
  //   <h2>All Time Favorites</h2>
  //   <div class="carousel">
  //     <button ...left>
  //     <div class="c-window">
  //       <div class="c-track"> ...cards... </div>
  //     </div>
  //     <button ...right>
  //   </div>
  // </section>

  block.classList.add("fav");

  const title = block.querySelector("h2") || block.querySelector("h3");
  if (!title) {
    const h2 = document.createElement("h2");
    h2.textContent = "All Time Favorites";
    block.prepend(h2);
  }

  // collect rows -> create cards
  const rows = [...block.querySelectorAll(":scope > div")];

  const cards = [];
  rows.forEach((row) => {
    const cols = [...row.children];

    // Expecting 3 columns:
    // col1 = image
    // col2 = title
    // col3 = button text
    const img = cols[0]?.querySelector("picture, img");
    const name = cols[1]?.textContent?.trim();
    const btnText = cols[2]?.textContent?.trim() || "ORDER NOW";

    if (!img || !name) return;

    const card = document.createElement("div");
    card.className = "fav-card";

    const ph = document.createElement("div");
    ph.className = "fav-ph";

    // Ensure we have <img> (picture contains img)
    const imgEl = img.tagName === "IMG" ? img : img.querySelector("img");
    if (imgEl) ph.appendChild(imgEl);

    const h3 = document.createElement("h3");
    h3.textContent = name;

    const btn = document.createElement("button");
    btn.className = "small-btn";
    btn.textContent = btnText;

    card.append(ph, h3, btn);
    cards.push(card);
  });

  // clean old table content except heading
  const heading = block.querySelector("h2");
  block.innerHTML = "";
  if (heading) block.appendChild(heading);

  const carousel = document.createElement("div");
  carousel.className = "carousel";

  const prev = document.createElement("button");
  prev.className = "c-arrow left";
  prev.id = "favPrev";
  prev.innerHTML = "&#8249;"; // ‹

  const next = document.createElement("button");
  next.className = "c-arrow right";
  next.id = "favNext";
  next.innerHTML = "&#8250;"; // ›

  const windowEl = document.createElement("div");
  windowEl.className = "c-window";

  const track = document.createElement("div");
  track.className = "c-track fav-track";
  track.id = "favTrack";

  cards.forEach((c) => track.appendChild(c));
  windowEl.appendChild(track);

  carousel.append(prev, windowEl, next);
  block.appendChild(carousel);

  // ---- carousel logic ----
  let index = 0;

  function getCardWidth() {
    const first = track.querySelector(".fav-card");
    if (!first) return 0;
    const style = getComputedStyle(track);
    const gap = parseFloat(style.gap || "0");
    return first.getBoundingClientRect().width + gap;
  }

  function visibleCount() {
    const first = track.querySelector(".fav-card");
    if (!first) return 1;
    const cardW = getCardWidth();
    const w = windowEl.getBoundingClientRect().width;
    return Math.max(1, Math.floor(w / cardW));
  }

  function update() {
    const total = track.children.length;
    const vis = visibleCount();
    const maxIndex = Math.max(0, total - vis);

    if (index < 0) index = 0;
    if (index > maxIndex) index = maxIndex;

    const x = index * getCardWidth();
    track.style.transform = `translateX(-${x}px)`;
  }

  prev.addEventListener("click", () => {
    index--;
    update();
  });

  next.addEventListener("click", () => {
    index++;
    update();
  });

  window.addEventListener("resize", update);

  // initial paint
  requestAnimationFrame(update);
}
