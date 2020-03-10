// return a new function...
export default (...lazys) => (options, original) =>
  lazys
    // (product of how we call combineLazies is that something later in the list might be undefined)
    .filter(l => !!l)
    // ... that loops over the lazys with the previously resolved schema
    .reduce((acc, lazy) => lazy(options, acc), original);
