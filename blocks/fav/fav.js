/* blocks/fav/fav.js */

export default function decorate(block) {
  // get all rows (each row = one fav item)
  const rows = [...block.children];

  // extract fav items
  const items = rows.map((row) => {
    const cols = [...row.children];

    const img = cols[0]?.querySelector("img");
    const title = cols[1]?.textContent?.trim() || "";
    const btnText = cols[2]?.textContent?.trim() || "ORDER NOW";
    const btnLink = cols[3]?.querySelector("a")?.href || cols[3]?.textContent?.trim() || "#";

    return { img, title, btnText, btnLink };
  });

  // clean block HTML
  block.textContent = "";

  // Section title
  const heading = document.createElement("h2");
  heading.textContent = "All Time Favorites";
  block.appendChild(heading);

  // wrapper
  const wrapper = document.createElement("div");
  wrapper.className = "fav-wrapper";

  // arrows
  const prev = document.createElement("button");
  prev.className = "fav-arrow fav-prev";
  prev.innerHTML = "&#8249;";

  const next = document.createElement("button");
  next.className = "fav-arrow fav-next";
  next.innerHTML = "&#8250;";

  // window + track
  const win = document.createElement("div");
  win.className = "fav-window";

  const track = document.createElement("div");
  track.className = "fav-track";

  // render cards
  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "fav-card";

    const imgWrap = document.createElement("div");
    imgWrap.className = "fav-img";

    if (item.img) imgWrap.appendChild(item.img);

    const h3 = document.createElement("div");
    h3.className = "fav-title";
    h3.textContent = item.title;

    const btn = document.createElement("button");
    btn.className = "fav-btn";
    btn.textContent = item.btnText;
    btn.addEventListener("click", () => window.open(item.btnLink, "_blank"));

    card.appendChild(imgWrap);
    card.appendChild(h3);
    card.appendChild(btn);

    track.appendChild(card);
  });

  win.appendChild(track);
  wrapper.appendChild(prev);
  wrapper.appendChild(win);
  wrapper.appendChild(next);

  block.appendChild(wrapper);

  // slider logic
  let current = 0;

  function visibleCount() {
    if (window.innerWidth <= 700) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  function update() {
    const vc = visibleCount();
    const cardWidth = win.clientWidth / vc;
    track.style.transform = `translateX(-${current * cardWidth}px)`;
  }

  prev.addEventListener("click", () => {
    const vc = visibleCount();
    const maxIndex = Math.max(0, items.length - vc);
    current = current <= 0 ? maxIndex : current - 1;
    update();
  });

  next.addEventListener("click", () => {
    const vc = visibleCount();
    const maxIndex = Math.max(0, items.length - vc);
    current = current >= maxIndex ? 0 : current + 1;
    update();
  });

  window.addEventListener("resize", update);
  setTimeout(update, 50);
}
