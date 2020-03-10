export default (validationError, multiple = false) =>
  validationError
    ? validationError.inner.reduce(
        (acc, { path, message }) => ({
          ...acc,
          [path]: multiple
            ? [...(acc[path] || []), message]
            : acc.path
            ? acc.path
            : message,
        }),
        {}
      )
    : {};
