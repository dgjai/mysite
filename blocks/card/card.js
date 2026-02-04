/* blocks/card/card.js */

export default function decorate(block) {
  // Add heading
  const title = document.createElement("h2");
  title.className = "card-title";
  title.textContent = "What’s New?";
  block.prepend(title);

  // ✅ Find the real wrapper that contains all cards
  // Your HTML is: .card > div > div > div...
  // We'll collect cards based on h3 existence (each card has h3 title)
  const rawCards = [...block.querySelectorAll(":scope > div div")].filter((d) =>
    d.querySelector("h3")
  );

  if (!rawCards.length) return;

  // Create slider container + track
  const slider = document.createElement("div");
  slider.className = "slider";

  const track = document.createElement("div");
  track.className = "track";

  // Build clean items
  rawCards.forEach((c) => {
    const img = c.querySelector("picture");
    const h3 = c.querySelector("h3");
    const p = c.querySelector("p:last-of-type");

    const item = document.createElement("div");
    item.className = "item";

    if (img) item.appendChild(img);
    if (h3) item.appendChild(h3);
    if (p) item.appendChild(p);

    // Button
    const btn = document.createElement("a");
    btn.href = "#";
    btn.className = "order-btn";
    btn.textContent = "ORDER NOW";
    item.appendChild(btn);

    track.appendChild(item);
  });

  // Clear block and insert slider
  block.textContent = "";
  block.appendChild(title);
  slider.appendChild(track);
  block.appendChild(slider);

  // Arrows
  const left = document.createElement("button");
  left.className = "arrow left";
  left.innerHTML = "‹";

  const right = document.createElement("button");
  right.className = "arrow right";
  right.innerHTML = "›";

  slider.appendChild(left);
  slider.appendChild(right);

  const step = 340;

  left.addEventListener("click", () => {
    track.scrollBy({ left: -step, behavior: "smooth" });
  });

  right.addEventListener("click", () => {
    track.scrollBy({ left: step, behavior: "smooth" });
  });
}
