const findBestRateCombination = require('./findCombination-question3')


it('should find the best rate combination for a given loan amount and duration', () => {
    const loanAmount = 300000; 
    const totalDuration = 25; 

    const result = findBestRateCombination(loanAmount, totalDuration);
  
    // La ligne longue ne peut être que de 25 ans (car égale à la durée totale). Je pense que la meilleure chose est de la combiner avec un prêt de 10 ans car intéret la plus faible
    expect(result.shortTerm).toBe(10); 
    expect(result.longTerm).toBe(25); 
    expect(result.totalInterest).toBe(163122);  
    expect(result.shortLoanAmount).toBeGreatherThan(198000)
    expect(result.longLoanAmount).toBeGreatherThan(132000)
  });
  