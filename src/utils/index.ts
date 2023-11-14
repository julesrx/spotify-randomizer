export const shuffle = <T>(arr: T[]) => {
  let currentIndex = arr.length;
  let randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ];
  }

  return arr;
};

export const getRandomElementInArray = <T>(arr: T[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
};
