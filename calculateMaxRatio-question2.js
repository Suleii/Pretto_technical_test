const { calculateMonthlyPayment } = require('./loanCalculations-question1')

// Définit la fonction rho pour calculer un facteur basé sur le taux d'intérêt et la durée grâce à la formule donnée
function rho(rate, duration) {
  return rate / (1 - Math.pow(1 + rate, -duration));
}

// Définit la fonction pour calculer le ratio maximal qui peut être destiné au montant du prêt à court terme
function ratio(annualShortRate, shortTermYears, annualLongRate, longTermYears, totalLoanAmount) {
  // Conversion des taux et durées annuelles en mensuelles
  const shortRate = annualShortRate / 100 / 12; 
  const longRate = annualLongRate / 100 / 12;
  const shortTerm = shortTermYears * 12;
  const longTerm = longTermYears * 12;

  // Initialiser la variable pour stocker le ratio maximal trouvé
  let maxRatio = 0

  // Faire une boucle pour trouver le ratio optimal pour chaque entier jusqu'à 100 (je prends les entiers uniquement pour le débogage, sinon il est préférable d'itérer sur 0,01)
  for (let i = 0; i <= 100; i++) {
    // Calcule le ratio de la ligne courte
    let shortLoanPart = i / 100;

    // Calcule les montants des prêts de la ligne courte et longue en fonction du ratio
    let amountShortLoan = totalLoanAmount * shortLoanPart;
    let amountLongLoan = totalLoanAmount - amountShortLoan;
    
    // Calculer la mensualité du prêt court
    let monthlyPaymentShort = calculateMonthlyPayment(amountShortLoan, shortRate, shortTermYears);

    // Calcul du paiement mensuel lissé afin que la mensualité soit constante toute la durée du prêt
    let smoothedMonthlyPayment = ((amountLongLoan + monthlyPaymentShort / rho(longRate, shortTerm)) * rho(longRate, longTerm));

    // Calcul du paiement des intérêts uniquement pour la Période 1 (= à la durée de la ligne courte)
    let interestOnlyLongPaymentPeriod1 = (amountLongLoan * longRate) * (shortTerm / (shortTerm + longTerm));

    // console.log(`Iteration ${i}: shortLoanPart=${shortLoanPart}, smoothedMonthlyPayment=${smoothedMonthlyPayment.toFixed(2)}, interestOnlyLongPaymentPeriod1=${interestOnlyLongPaymentPeriod1.toFixed(2)}`);
    

    // La condition doit vérifier si la mensualité lissée rembourse uniquement les intérêts pendant la Période 1
    if (smoothedMonthlyPayment >= interestOnlyLongPaymentPeriod1) {
      maxRatio = shortLoanPart;
      break;
    }
  }

  return maxRatio;
}


// Exemple d'utilisation
// let totalLoanAmount = 300000;
// let annualShortRate = 1.15; // Taux annuel pour le prêt à court terme
// let shortTermYears = 15;    // Durée en années pour le prêt à court terme
// let annualLongRate = 1.8;   // Taux annuel pour le prêt à long terme
// let longTermYears = 25;     // Durée en années pour le prêt à long terme

// let maxRatio = ratio(annualShortRate, shortTermYears, annualLongRate, longTermYears, totalLoanAmount);
// console.log("Ratio maximal pour la ligne courte : ", maxRatio);

module.exports = {ratio, rho}