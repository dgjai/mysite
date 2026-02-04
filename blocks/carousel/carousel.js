/* blocks/carousel/carousel.js */

export default function decorate(block) {
  // ✅ da.live "table block" comes as nested divs.
  // We will read each row as:
  // Title | Subtitle | Button text

  const rows = [...block.querySelectorAll(":scope > div")];

  // If no rows -> stop
  if (!rows.length) return;

  // Extract slide data from each row
  const slidesData = rows.map((row) => {
    const cols = [...row.children];

    const title = cols[0]?.textContent?.trim() || "";
    const subtitle = cols[1]?.textContent?.trim() || "";
    const btnText = cols[2]?.textContent?.trim() || "ORDER NOW";

    return { title, subtitle, btnText };
  }).filter(s => s.title); // remove empty rows

  // If nothing extracted -> stop
  if (!slidesData.length) return;

  // ✅ Build Carousel HTML
  const carousel = document.createElement("section");
  carousel.className = "carousel";

  const hero = document.createElement("div");
  hero.className = "hero";

  const prev = document.createElement("button");
  prev.className = "hero-arrow left";
  prev.innerHTML = "&#8249;";

  const next = document.createElement("button");
  next.className = "hero-arrow right";
  next.innerHTML = "&#8250;";

  const track = document.createElement("div");
  track.className = "hero-track";

  const dots = document.createElement("div");
  dots.className = "hero-dots";

  slidesData.forEach((slide, index) => {
    // slide div
    const slideDiv = document.createElement("div");
    slideDiv.className = "hero-slide";

    const inner = document.createElement("div");
    inner.className = "hero-inner";

    const h1 = document.createElement("h1");
    h1.textContent = slide.title;

    const p = document.createElement("p");
    p.textContent = slide.subtitle;

    const btn = document.createElement("button");
    btn.className = "hero-btn";
    btn.textContent = slide.btnText;

    inner.append(h1, p, btn);
    slideDiv.appendChild(inner);
    track.appendChild(slideDiv);

    // dots
    const dot = document.createElement("span");
    dot.className = "dot" + (index === 0 ? " active" : "");
    dot.dataset.index = index;
    dots.appendChild(dot);
  });

  hero.append(prev, track, next, dots);
  carousel.appendChild(hero);

  // ✅ Replace block content with carousel
  block.textContent = "";
  block.appendChild(carousel);

  // ✅ Slider logic
  let current = 0;
  const total = slidesData.length;
  const dotEls = [...dots.querySelectorAll(".dot")];

  function update() {
    track.style.transform = `translateX(-${current * 100}%)`;
    dotEls.forEach((d, i) => d.classList.toggle("active", i === current));
  }

  prev.addEventListener("click", () => {
    current = (current - 1 + total) % total;
    update();
  });

  next.addEventListener("click", () => {
    current = (current + 1) % total;
    update();
  });

  dotEls.forEach((dot) => {
    dot.addEventListener("click", () => {
      current = Number(dot.dataset.index);
      update();
    });
  });

  // ✅ Auto slide
  setInterval(() => {
    current = (current + 1) % total;
    update();
  }, 4000);
}
