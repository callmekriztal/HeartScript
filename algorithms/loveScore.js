/**
 * Love Score Calculator
 * Author: Saina Fathima
 *
 * Description:
 * Calculates compatibility score based on common letters.
 */

function loveScore(name1, name2) {
  name1 = name1.toLowerCase();
  name2 = name2.toLowerCase();

  let score = 0;

  for (let i = 0; i < name1.length; i++) {
    if (name2.includes(name1[i])) {
      score += 10;
    }
  }

  if (score > 100) score = 100;

  return score;
}

// Example usage
console.log("Love Score:", loveScore("Rahul", "Priya"));

/**
 * Time Complexity:
 * O(n × m)
 * n = length of first name
 * m = length of second name
 */
