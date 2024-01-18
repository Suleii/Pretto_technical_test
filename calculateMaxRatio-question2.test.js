const {ratio} = require('./calculateMaxRatio-question2');

describe('ratio Function', () => {
  it('should return 0.66 for specific loan parameters', () => {
    const totalLoanAmount = 300000;
    const shortRate = 1.15;
    const shortTerm = 15;
    const longRate = 1.8;
    const longTerm = 25;

    // Au delà d'environ 199000€ dans ces conditions, le prêt court devient trop élevée pour lisser les mensualités du prêt long par dessus
    const expectedRatio = 0.66;
    const calculatedRatio = ratio(shortRate, shortTerm, longRate, longTerm, totalLoanAmount);

    expect(calculatedRatio).toBeCloseTo(expectedRatio, 2);
  });
});
