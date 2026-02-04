/* blocks/range/range.js */

export default function decorate(block) {
  block.classList.add("range");

  const rows = [...block.querySelectorAll(":scope > div")];

  // Each row from author will be:
  // col1 = image
  // col2 = title
  const items = rows.map((row) => {
    const cols = row.querySelectorAll(":scope > div");
    const imgCol = cols[0];
    const textCol = cols[1];

    const pic = imgCol ? imgCol.querySelector("picture, img") : null;
    const title = textCol ? textCol.textContent.trim() : "";

    return { pic, title };
  });

  // Clear block and rebuild structure
  block.innerHTML = "";

  // Title
  const title = document.createElement("h2");
  title.className = "range-title";
  title.innerHTML = `<span class="pink">Shop</span> <span class="brown">by Range</span>`;

  // Carousel structure
  const carousel = document.createElement("div");
  carousel.className = "range-carousel";

  const prevBtn = document.createElement("button");
  prevBtn.className = "range-arrow left";
  prevBtn.innerHTML = "&#8249;";

  const nextBtn = document.createElement("button");
  nextBtn.className = "range-arrow right";
  nextBtn.innerHTML = "&#8250;";

  const windowEl = document.createElement("div");
  windowEl.className = "range-window";

  const track = document.createElement("div");
  track.className = "range-track";

  // Build cards
  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "range-card";

    // add image
    if (item.pic) {
      card.appendChild(item.pic.cloneNode(true));
    }

    // title
    const h3 = document.createElement("h3");
    h3.textContent = item.title || "";
    card.appendChild(h3);

    track.appendChild(card);
  });

  windowEl.appendChild(track);
  carousel.appendChild(prevBtn);
  carousel.appendChild(windowEl);
  carousel.appendChild(nextBtn);

  block.appendChild(title);
  block.appendChild(carousel);

  // Slider logic
  let index = 0;

  function getStep() {
    const firstCard = track.querySelector(".range-card");
    if (!firstCard) return 300;
    const styles = getComputedStyle(track);
    const gap = parseInt(styles.columnGap || styles.gap || "0", 10);
    return firstCard.offsetWidth + gap;
  }

  function maxIndex() {
    const step = getStep();
    const visible = Math.floor(windowEl.offsetWidth / step);
    return Math.max(0, items.length - Math.max(1, visible));
  }

  function update() {
    const step = getStep();
    const max = maxIndex();
    if (index > max) index = max;
    if (index < 0) index = 0;

    track.style.transform = `translateX(-${index * step}px)`;
  }

  prevBtn.addEventListener("click", () => {
    index--;
    update();
  });

  nextBtn.addEventListener("click", () => {
    index++;
    update();
  });

  window.addEventListener("resize", update);

  update();
}
