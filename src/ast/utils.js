import ref from '../ref';

export const recursivelyConvertRefs = (...args) =>
  args.map(f => {
    return Array.isArray(f)
      ? recursivelyConvertRefs.apply(null, f)
      : typeof f.ref !== 'undefined'
      ? ref(f.ref)
      : f;
  });
