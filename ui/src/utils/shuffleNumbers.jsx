export function shuffleNumbers() {
   const nums = [];
   const availableNumbers = [1, 2, 3, 4, 5, 6];

   for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * availableNumbers.length);
      nums.push(availableNumbers[randomIndex]);
      availableNumbers.splice(randomIndex, 1);
   }

   return nums;
}
