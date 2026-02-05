export default function decorate(block) {
  const rows = [...block.children];

  if (rows.length < 2) return;

  const imageRow = rows[0];
  const contentRow = rows[1];

  const images = [...imageRow.children];
  const contents = [...contentRow.children];

  block.innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'scoop-wrapper';

  for (let i = 0; i < 2; i++) {
    const card = document.createElement('div');
    card.className = 'scoop-card';

    // image
    const pic = images[i]?.querySelector('picture');
    if (pic) card.append(pic);

    // text
    const textBlock = contents[i];
    if (textBlock) {
      [...textBlock.children].forEach((el) => {
        if (el.tagName === 'H1' || el.tagName === 'H2') {
          const h3 = document.createElement('h3');
          h3.innerHTML = el.innerHTML;
          card.append(h3);
        } else {
          card.append(el);
        }
      });
    }

    wrapper.append(card);
  }

  block.append(wrapper);
}
