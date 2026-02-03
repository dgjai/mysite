export default function decorate(block) {
  block.classList.add('card');

  const img = block.querySelector('img');

  if (img) {
    img.classList.add('card-img');
  }
}