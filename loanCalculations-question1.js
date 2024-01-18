// D'abord il faut calculer la mensualité du prêt
function calculateMonthlyPayment(loanAmount, annualInterestRate, loanTermYears) {
  // Convertit le taux d'intérêt et la durée annuelle en mensuel
  let monthlyInterestRate = annualInterestRate / 12 / 100;
  let loanTermMonths = loanTermYears * 12;

  // Utilise la formule de calcul d'une mensualité classique pour obtenir le prélèvement  mensuel
  let monthlyPayment = loanAmount * (monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -loanTermMonths)));

  return Number(monthlyPayment.toFixed(2));
}

// On sait trouver le montant mensuel d'un prêt.
// Désormais on peut calculer le montant total des intérêts payés pendant la durée du prêt

function calculateTotalInterest(loanAmount, annualInterestRate, loanTermYears) {
  // Calcule la mensualité du prêt grâce à la fonction dédiée
  let monthlyPayment = calculateMonthlyPayment(
    loanAmount,
    annualInterestRate,
    loanTermYears
  );

  // Calcule le montant total payé pendant la durée du prêt
  let totalPaid = monthlyPayment * loanTermYears * 12;

  // Calcule le montant total des intérêts en soustrayant le montant total payé au montant du prêt
  let totalInterest = totalPaid - loanAmount;

  return Number(totalInterest.toFixed(2));
}

module.exports = { calculateMonthlyPayment, calculateTotalInterest };
