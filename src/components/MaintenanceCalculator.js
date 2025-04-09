// src/utils/MaintenanceCalculator.js

/**
 * Calculate estimated annual maintenance and repair costs for a vehicle
 * based on vehicle characteristics, fuel type, purchase price, mileage, and age.
 * 
 * This calculator is based on vehicle-specific data and industry research on maintenance 
 * and repair costs across different vehicle types and powertrains.
 * 
 * @param {Object} vehicleData - Vehicle information object
 * @param {string} vehicleData.sizeClass - Vehicle size classification
 * @param {string} vehicleData.fuelType - Type of fuel used (gasoline, diesel, electric, etc.)
 * @param {string} vehicleData.powertrainType - Powertrain technology (ice_si, ice_ci, bev, hev, phev, fcev)
 * @param {number} vehicleData.purchasePrice - Vehicle purchase price in USD
 * @param {number} vehicleData.annualMileage - Expected annual mileage
 * @param {number} vehicleData.yearsOfOwnership - Expected years of ownership
 * @returns {number} - Estimated annual maintenance cost in USD
 */
export const calculateMaintenanceCost = (vehicleData) => {
    const {
      sizeClass,
      fuelType,
      powertrainType,
      purchasePrice,
      annualMileage,
      yearsOfOwnership
    } = vehicleData;
  
    // Convert inputs to numbers to ensure proper calculations
    const price = Number(purchasePrice);
    const mileage = Number(annualMileage);
    const years = Number(yearsOfOwnership);
    
    // Base annual maintenance costs per powertrain type (per $1000 of vehicle value)
    const powertrain_base_costs = {
      'bev': 8,        // Battery Electric Vehicles
      'hev': 12,       // Hybrid Electric Vehicles
      'phev': 14,      // Plug-in Hybrid Electric Vehicles
      'ice_si': 16,    // Internal Combustion Engine - Spark Ignition (Gasoline)
      'ice_ci': 18,    // Internal Combustion Engine - Compression Ignition (Diesel)
      'fcev': 20       // Fuel Cell Electric Vehicles (higher due to emerging technology)
    };
    
    // Get the base maintenance rate based on powertrain type
    // Default to gasoline if powertrain not specified
    const baseCostRate = powertrain_base_costs[powertrainType] || powertrain_base_costs['ice_si'];
    
    // Vehicle size/class adjustment factors
    const sizeClassFactors = {
      // Light-duty vehicles
      'compact_sedan': 0.85,
      'midsize_sedan': 1.0,
      'small_suv': 1.05,
      'medium_suv': 1.15,
      'pickup': 1.25,
      
      // Commercial vehicles
      'class4_delivery': 2.0,
      'class6_delivery': 2.5,
      'class8_vocational': 3.0,
      'class8_day_cab': 3.5,
      'class8_sleeper': 3.8,
      'transit_bus': 4.0,
      'class8_refuse': 4.2
    };
    
    // Get size class factor, default to midsize sedan if not specified
    const sizeClassFactor = sizeClassFactors[sizeClass] || sizeClassFactors['midsize_sedan'];
    
    // Determine mileage adjustment factor
    // Higher mileage = higher maintenance costs
    let mileageAdjustment;
    
    if (mileage <= 7500) {
      mileageAdjustment = 0.8;
    } else if (mileage <= 12500) {
      mileageAdjustment = 1.0;
    } else if (mileage <= 15000) {
      mileageAdjustment = 1.1;
    } else if (mileage <= 20000) {
      mileageAdjustment = 1.25;
    } else if (mileage <= 30000) {
      mileageAdjustment = 1.5;
    } else {
      mileageAdjustment = 1.8;  // Very high mileage
    }
    
    // Calculate base first-year maintenance cost
    // Formula: (vehicle_price / 1000) * base_cost_rate * size_class_factor * mileage_adjustment
    const firstYearBaseCost = (price / 1000) * baseCostRate * sizeClassFactor * mileageAdjustment;
    
    // Age-based escalation factors for each powertrain type
    // These define how much maintenance costs increase each year as vehicles age
    const ageEscalationFactors = {
      'bev': 0.05,       // 5% increase per year for EVs (fewer mechanical parts to wear)
      'hev': 0.08,       // 8% for hybrids
      'phev': 0.09,      // 9% for plug-in hybrids
      'ice_si': 0.12,    // 12% for gasoline engines
      'ice_ci': 0.14,    // 14% for diesel engines
      'fcev': 0.10       // 10% for fuel cell vehicles
    };
    
    // Get age escalation rate
    const ageEscalationRate = ageEscalationFactors[powertrainType] || ageEscalationFactors['ice_si'];
    
    // Calculate total maintenance costs over ownership period with age-based escalation
    let totalMaintenanceCost = 0;
    
    for (let year = 1; year <= years; year++) {
      // Calculate age factor for current year
      const ageFactor = 1 + ((year - 1) * ageEscalationRate);
      
      // Calculate year's maintenance cost with age factor
      const yearCost = firstYearBaseCost * ageFactor;
      
      // Add to total cost
      totalMaintenanceCost += yearCost;
    }
    
    // Calculate average annual maintenance cost over ownership period
    const avgAnnualCost = totalMaintenanceCost / years;
    
    // Additional adjustments based on specific vehicle characteristics
    let finalAdjustment = 1.0;
    
    // For electric vehicles with very high purchase prices (luxury EVs),
    // slightly reduce maintenance cost percentage (they tend to have better warranties)
    if (fuelType === 'electric' && price > 80000) {
      finalAdjustment = 0.9;
    }
    
    // For very low-cost vehicles, increase the maintenance percentage
    // (cheaper vehicles often need more repairs as percentage of value)
    if (price < 20000 && fuelType !== 'electric') {
      finalAdjustment = 1.2;
    }
    
    // For premium/luxury vehicles, apply a luxury service premium
    if (price > 60000 && fuelType !== 'electric') {
      finalAdjustment = 1.15;
    }
    
    // Return final rounded annual maintenance cost
    return Math.round(avgAnnualCost * finalAdjustment);
  };
  
  /**
   * Calculate total cost of ownership for a vehicle
   * @param {Object} vehicleData - Complete vehicle information object
   * @returns {Object} - TCO breakdown and summary
   */
  export const calculateTCO = (vehicleData) => {
    const {
      name,
      purchasePrice,
      fuelType,
      fuelEfficiency,
      fuelPrice,
      annualMileage,
      insuranceCost,
      maintenanceCost,
      yearsOfOwnership,
      electricRange
    } = vehicleData;
    
    // Convert inputs to numbers
    const price = Number(purchasePrice);
    const mileage = Number(annualMileage);
    const years = Number(yearsOfOwnership);
    const insurance = Number(insuranceCost) || 0;
    
    // Calculate or use provided maintenance cost
    const maintenance = Number(maintenanceCost) || calculateMaintenanceCost(vehicleData);
    
    // Calculate annual fuel/energy costs
    let annualFuelCost = 0;
    
    if (fuelType === 'electric') {
      // For electric vehicles: miles / (miles/kWh) * $/kWh
      annualFuelCost = (mileage / Number(fuelEfficiency)) * Number(fuelPrice);
    }
    else if (fuelType === 'plugin_hybrid') {
      // For PHEVs: calculate portion of electric miles and gasoline miles
      const electricMiles = Math.min(Number(electricRange) * 1.5 * 365, mileage); // Assumes 1.5 charges per day
      const gasMiles = mileage - electricMiles;
      
      // Electric portion: electricMiles / (miles/kWh) * $/kWh
      const electricCost = (electricMiles / Number(fuelEfficiency)) * Number(fuelPrice);
      
      // Gas portion: gasMiles / mpg * $/gallon
      const gasCost = (gasMiles / Number(fuelEfficiency)) * Number(fuelPrice);
      
      annualFuelCost = electricCost + gasCost;
    }
    else {
      // For gas, diesel, fuel cell, or hybrid: miles / mpg * $/gallon
      annualFuelCost = (mileage / Number(fuelEfficiency)) * Number(fuelPrice);
    }
    
    // Calculate depreciation (simplified model)
    let depreciationRate;
    
    if (fuelType === 'electric') {
      depreciationRate = 0.18; // 18% annual depreciation for EVs
    } else if (fuelType === 'hybrid' || fuelType === 'plugin_hybrid') {
      depreciationRate = 0.16; // 16% annual depreciation for hybrids
    } else {
      depreciationRate = 0.15; // 15% annual depreciation for ICE vehicles
    }
    
    // Total depreciation over ownership period
    const totalDepreciation = price * (1 - Math.pow(1 - depreciationRate, years));
    const annualDepreciation = totalDepreciation / years;
    
    // Calculate total annual cost
    const annualCost = annualDepreciation + annualFuelCost + maintenance + insurance;
    
    // Calculate cost per mile
    const costPerMile = annualCost / mileage;
    
    // Calculate lifetime (total) cost
    const lifetimeCost = price + (annualFuelCost + maintenance + insurance) * years - (price - totalDepreciation);
    
    return {
      vehicle: name,
      purchasePrice: price,
      fuelType,
      annualCosts: {
        depreciation: Math.round(annualDepreciation),
        fuel: Math.round(annualFuelCost),
        maintenance: Math.round(maintenance),
        insurance: Math.round(insurance)
      },
      summary: {
        annualCost: Math.round(annualCost),
        costPerMile: parseFloat(costPerMile.toFixed(2)),
        lifetimeCost: Math.round(lifetimeCost),
        yearsOfOwnership: years
      }
    };
  };
  
  // Utility function to format currency
  export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };