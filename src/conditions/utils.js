export const conditions = (...conditions) => ({
  condition: conditions.map(isCondition),
});

const isCondition = condition => {
  if (!condition || typeof condition.resolve !== 'function')
    throw new Error(
      `A condition definition requires a resolve function and refs array`
    );
  return condition;
};
