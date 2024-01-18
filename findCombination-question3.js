const { calculateTotalInterest } = require('./loanCalculations-question1');
const { ratio } = require('./calculateMaxRatio-question2');

// Définit une grille de taux par durée de prêt
const rateGrid = {
  10: 2.9,
  12: 3.2,
  15: 3.5,
  20: 3.8,
  22: 3.8,
  25: 4.4
};

// Fonction pour trouver la meilleure combinaison de durée et de taux pour un prêt
function findBestRateCombination(loanAmount, totalDuration) {

  // Création d'un objet pour stocker les données de la meilleure combinaison trouvée
  let bestRateCombination = {
    shortTerm: null,
    longTerm: null,
    totalInterest: Number.MAX_SAFE_INTEGER, // Définir un très grand nombre par défaut pour que la première combinaison de taux d'intérêt valide soit inférieur à cette valeur
    shortLoanAmount: null,
    longLoanAmount: null,
    shortRate: null,
    longRate: null
  };

  // Faire une boucle sur toutes les durées possibles dans le tableau d'objet rateGrid pour la ligne courte
  for (const shortTerm in rateGrid) {
     // Faire une boucle sur toutes les durées possibles dans le tableau d'objet rateGrid pour la ligne longue
    for (const longTerm in rateGrid) {
      // Initialiser des variables pour que les clés de l'objet rateGrid soit des nombres et non des strings
      const shortDuration = Number(shortTerm);
      const longDuration = Number(longTerm);

      // Vérifier si la combinaison de durée est valide (la durée de la ligne courte doit être inférieur à la longue et la ligne longue doit être égal à la durée totale)
      if (shortDuration < longDuration && longDuration === totalDuration) {
        // Obtient les taux d'intérêt pour les lignes courtes et longues de rateGrid
        const shortRate = rateGrid[shortTerm];
        const longRate = rateGrid[longTerm];

        // Calculer les intérêts totaux par ligne 
        const totalInterestShort = calculateTotalInterest(loanAmount, shortRate, shortDuration);
        const totalInterestLong = calculateTotalInterest(loanAmount, longRate, longDuration);

        console.log(totalInterestShort, "totalinterestshort")
        console.log(totalInterestLong, "totalinterestlong")

        const totalInterest = (totalInterestShort + totalInterestLong);
        console.log(totalInterest, "totalInterest")

        // Vérifie si cette combinaison a un montant des intérêts inférieur à la meilleure combinaison actuelle
        // Si c'est le cas, alors le tableau d'objet bestRateCombination est mis à jour à chaque itération valide
        if (totalInterest < bestRateCombination.totalInterest) {
          bestRateCombination = {
            shortTerm: shortDuration,
            longTerm: longDuration,
            totalInterest: totalInterest,
            shortLoanAmount: loanAmount * ratio(shortRate, shortDuration, longRate, longDuration - shortDuration),
            longLoanAmount: loanAmount * (1 - ratio(shortRate, shortDuration, longRate, longDuration - shortDuration)),
            shortRate: shortRate,
            longRate: longRate
          };
        }
      }
    }
  }
  console.log(bestRateCombination)

  return bestRateCombination;
}



// // Exemple d'utilisation
// const loanAmount = 100000; // Le montant total du prêt
// const totalDuration = 25; // La durée totale du prêt en années

// // Trouver la meilleure combinaison
// const bestCombination = findBestRateCombination(loanAmount, totalDuration);
// console.log(`La meilleure combinaison est :

// Prêt court terme : ${bestCombination.shortTerm} ans à ${bestCombination.shortRate}% avec un montant de ${Number(bestCombination.shortLoanAmount)}€
// Prêt long terme : ${bestCombination.longTerm - bestCombination.shortTerm} ans à ${bestCombination.longRate}% avec un montant de ${Number(bestCombination.longLoanAmount)}€
// Intérêts totaux à payer sur la période : ${bestCombination.totalInterest}€`);


module.exports = findBestRateCombination