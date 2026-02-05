import { loadFragment } from '../fragment/fragment.js';

export default async function decorate(block) {
  // Load nav fragment
  const fragment = await loadFragment('/nav');

  block.textContent = '';

  const header = document.createElement('header');
  header.className = 'site-header';

  const nav = document.createElement('nav');
  nav.className = 'nav';

  // Extract text nodes from fragment
  const items = [...fragment.querySelectorAll('p, li')].map((el) =>
    el.textContent.trim()
  );

  // Hamburger
  const hamburger = document.createElement('div');
  hamburger.className = 'nav-hamburger';
  hamburger.innerHTML = `<span></span><span></span><span></span>`;

  // Brand
  const brand = document.createElement('div');
  brand.className = 'nav-brand';
  brand.textContent = items[1] || 'BASKIN ROBBINS';

  // Actions
  const actions = document.createElement('div');
  actions.className = 'nav-actions';

  const orderBtn = document.createElement('a');
  orderBtn.href = '#';
  orderBtn.className = 'btn primary';
  orderBtn.textContent = items[2] || 'ORDER NOW';

  const rewardsBtn = document.createElement('a');
  rewardsBtn.href = '#';
  rewardsBtn.className = 'btn secondary';
  rewardsBtn.textContent = items[3] || 'REWARDS PROGRAM';

  actions.append(orderBtn, rewardsBtn);

  nav.append(hamburger, brand, actions);
  header.append(nav);
  block.append(header);
}





