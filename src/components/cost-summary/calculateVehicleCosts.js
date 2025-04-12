function calculateVehicleCosts({
    purchasePrice,
    fuelType,
    fuelEfficiency,
    fuelPrice,
    annualMileage,
    insuranceCost,
    maintenanceCost,
    yearsOfOwnership,
  }) {
    // Convert string inputs to numbers
    const price = Number(purchasePrice);
    const years = Number(yearsOfOwnership);
    const annualMiles = Number(annualMileage);
    const insurance = Number(insuranceCost);
    const maintenance = Number(maintenanceCost);
    const fuelPriceNum = Number(fuelPrice);
  
    // Calculate fuel costs
    let fuelCostPerYear = 0;
    if (fuelType === 'electric') {
      // Electricity cost using miles/kWh
      const milesPerKwh = Number(fuelEfficiency);
      const kwhPerYear = annualMiles / milesPerKwh;
      fuelCostPerYear = kwhPerYear * fuelPriceNum;
    } else {
      // Gas/Diesel cost
      const mpg = Number(fuelEfficiency);
      const gallonsPerYear = annualMiles / mpg;
      fuelCostPerYear = gallonsPerYear * fuelPriceNum;
    }
  
    // Calculate total costs
    const totalFuelCost = fuelCostPerYear * years;
    const totalInsuranceCost = insurance * years;
    const totalMaintenanceCost = maintenance * years;
    const totalCost = price + totalFuelCost + totalInsuranceCost + totalMaintenanceCost;
  
    // Calculate cost per mile
    const totalMiles = annualMiles * years;
    const costPerMile = totalCost / totalMiles;
  
    return {
      purchaseCost: price,
      fuelCost: totalFuelCost,
      insuranceCost: totalInsuranceCost,
      maintenanceCost: totalMaintenanceCost,
      totalCost,
      costPerMile,
      costPerYear: totalCost / years,
      fuelCostPerYear,
    };
  }
  
  export default calculateVehicleCosts;