// src/components/ComparisonChart.jsx (partial update for the data calculation part)
// ...

// Generate data for the chart
const chartData = useMemo(() => {
  if (!vehicles || vehicles.length === 0) return [];
  
  // Find max years of ownership for chart range
  const maxYears = Math.max(...vehicles.map(v => Number(v.yearsOfOwnership)));
  
  // Create data points for each year (0 to maxYears)
  return Array.from({ length: maxYears + 1 }, (_, year) => {
    // Start with the year as a data point
    const dataPoint = { year };
    
    // Calculate cumulative cost for each vehicle at this year
    vehicles.forEach((vehicle, index) => {
      const {
        purchasePrice,
        fuelType,
        fuelEfficiency,
        fuelPrice,
        annualMileage,
        insuranceCost,
        maintenanceCost
      } = vehicle;
      
      // Convert values to numbers
      const price = Number(purchasePrice);
      const annualMiles = Number(annualMileage);
      const insurance = Number(insuranceCost);
      const maintenance = Number(maintenanceCost);
      const fuelPriceNum = Number(fuelPrice);
      
      // Calculate annual fuel cost
      let fuelCostPerYear = 0;
      if (fuelType === 'electric') {
        const kwhPerMile = Number(fuelEfficiency);
        fuelCostPerYear = annualMiles * kwhPerMile * fuelPriceNum;
      } else {
        const mpg = Number(fuelEfficiency);
        const gallonsPerYear = annualMiles / mpg;
        fuelCostPerYear = gallonsPerYear * fuelPriceNum;
      }
      
      // Calculate total cost at this year
      const vehicleCost = 
        price + // Purchase price (upfront)
        (fuelCostPerYear * year) + // Fuel costs accumulated so far
        (insurance * year) + // Insurance costs accumulated so far
        (maintenance * year); // Maintenance costs accumulated so far
      
      // Add this vehicle's cost to the data point using a safe name
      const safeVehicleName = `vehicle${index}`;
      dataPoint[safeVehicleName] = vehicleCost;
      
      // Also store the actual name for reference
      dataPoint[`${safeVehicleName}Name`] = vehicle.name;
    });
    
    return dataPoint;
  });
}, [vehicles]);

// ...