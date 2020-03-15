export default (validationError, multiple = false) =>
  validationError
    ? Object.entries(
        validationError.inner.reduce(
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
      ).reduce(
        // if we are getting errors from something with a non-inner
        // schema then just return the errors, otherwise return a map
        // of the errors by path
        (acc, [path, errs]) =>
          path === 'undefined' ? errs : { ...acc, [path]: errs },
        {}
      )
    : {};
