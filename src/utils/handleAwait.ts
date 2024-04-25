export const handleAwait = () => {
  return new Promise((res) => {
    setTimeout(() => {
      res("");
    }, 5000);
  });
};
