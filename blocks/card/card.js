/* card.js */

export default function decorate(block) {
  // The structure you shared:
  // .card
  //   > div
  //     > div   <-- this is the flex container we want
  //        > div (each card)
  const flexContainer = block.querySelector(":scope > div > div");

  if (!flexContainer) return;

  // 1) Add heading "What's New?" above card section (if not already present)
  const existingHeading = block.closest("main")?.querySelector("h2, h1");
  if (!existingHeading) {
    const h2 = document.createElement("h2");
    h2.textContent = "What’s New?";
    block.parentElement.insertBefore(h2, block);
  }

  // 2) Add ORDER NOW button for each card item
  const items = [...flexContainer.children];

  items.forEach((item) => {
    // Avoid duplicates if reload
    if (item.querySelector(".order-btn")) return;

    const btn = document.createElement("a");
    btn.href = "#";
    btn.className = "order-btn";
    btn.textContent = "ORDER NOW";

    item.appendChild(btn);
  });

  // 3) Add arrows for horizontal scroll
  const left = document.createElement("div");
  left.className = "nav-arrow left";
  left.textContent = "‹";

  const right = document.createElement("div");
  right.className = "nav-arrow right";
  right.textContent = "›";

  // Avoid duplicate arrows
  if (!block.querySelector(".nav-arrow.left")) block.appendChild(left);
  if (!block.querySelector(".nav-arrow.right")) block.appendChild(right);

  // Scroll logic
  const scrollAmount = 360;

  left.addEventListener("click", () => {
    flexContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  right.addEventListener("click", () => {
    flexContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });
}
