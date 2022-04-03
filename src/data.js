const raw = ["Hello", "Goodbye", "Foo", "Bar"];

const getData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(raw);
    }, 500);
  });
};

export const matcher = (value, data) => {
  const startingMatch = new RegExp(`^${value}`, "i");
  const containsMatch = new RegExp(value, "i");
  const results = data
    .filter((element) => {
      const contains = containsMatch.test(element);
      return contains;
    })
    .sort((first, second) => {
      if (startingMatch.test(first) && !startingMatch.test(second)) {
        return -1;
      } else if (!startingMatch.test(first) && startingMatch.test(second)) {
        return 1;
      } else {
        return first < second ? -1 : 1;
      }
    });
  return results;
};

export const search = async (input) => {
  const results = await getData();
  const filtered = matcher(input, results);
  return filtered;
};
