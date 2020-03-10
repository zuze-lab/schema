export const transforms = (...transforms) => ({
  transform: transforms.map(isTransform),
});
const isTransform = transform => {
  if (typeof transform !== 'function')
    throw new Error(`Transforms must be functions`);
  return transform;
};
