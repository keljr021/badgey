export const getImageSrc = (input) => {
  return new URL(`../img/${input}`, import.meta.url).href;
}