const {
  calculateMonthlyPayment,
  calculateTotalInterest,
} = require("./loanCalculations-question1");

describe("calculateMonthlyPayment", () => {
  it("calculate the monthly payment", () => {
    const loanAmount = 300000;
    const annualInterestRate = 1.61;
    const loanTermYears = 25;

    const monthlyPayment = calculateMonthlyPayment(
      loanAmount,
      annualInterestRate,
      loanTermYears
    );

    expect(monthlyPayment).toBeCloseTo(1215.38);
  });
});

describe("calculateTotalInterest", () => {
  it("calculate the total interest paid during the life of loan", () => {
    const loanAmount = 300000;
    const annualInterestRate = 1.61;
    const loanTermYears = 25;

    const totalInterest = calculateTotalInterest(
      loanAmount,
      annualInterestRate,
      loanTermYears
    );

    expect(totalInterest).toBeCloseTo(64614);
  });
});
