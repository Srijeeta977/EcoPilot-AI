import { CATEGORY_META, DEFAULT_DASHBOARD_INPUTS } from '../data/dashboardData'

const EMISSION_FACTORS = {
  // Average grid electricity factor in kg CO2e per kWh. The renewable percentage
  // is treated as zero-operational-carbon electricity for this frontend estimate.
  electricityKgPerKwh: 0.42,

  // Average passenger car emissions in kg CO2e per kilometer for a petrol car.
  carKgPerKm: 0.192,

  // Average bus/metro/rail blended public transport emissions in kg CO2e per km.
  publicTransportKgPerKm: 0.041,

  // Each flight is modeled as one average short-to-medium trip. Without distance
  // data, this keeps the form simple while making flight frequency visible.
  flightKgPerTrip: 250,

  // Monthly food footprint proxies by diet type. These are broad estimates that
  // reflect typical relative differences, not a certified food lifecycle audit.
  dietMonthlyKg: {
    vegan: 120,
    vegetarian: 160,
    mixed: 230,
    highMeat: 330,
  },

  // Monthly waste footprint proxies for landfill, packaging, and discarded goods.
  wasteMonthlyKg: {
    low: 18,
    medium: 35,
    high: 60,
  },
}

const SCORE_BENCHMARKS = {
  // A strong personal footprint target is around 1.8 tons CO2e/year.
  lowMonthlyKg: 150,

  // Around 12 tons CO2e/year maps to a very low score in this simple model.
  highMonthlyKg: 1000,
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function toNumber(value, fallback = 0) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

function round(value, decimals = 0) {
  const factor = 10 ** decimals
  return Math.round(value * factor) / factor
}

function normalizeInputs(inputs = {}) {
  const values = { ...DEFAULT_DASHBOARD_INPUTS, ...inputs }

  return {
    electricityKwh: Math.max(0, toNumber(values.electricityKwh)),
    renewablePercent: clamp(toNumber(values.renewablePercent), 0, 100),
    carKm: Math.max(0, toNumber(values.carKm)),
    publicTransportKm: Math.max(0, toNumber(values.publicTransportKm)),
    flightsPerYear: Math.max(0, toNumber(values.flightsPerYear)),
    dietType: values.dietType in EMISSION_FACTORS.dietMonthlyKg ? values.dietType : 'mixed',
    wasteLevel:
      values.wasteLevel in EMISSION_FACTORS.wasteMonthlyKg ? values.wasteLevel : 'medium',
    reductionTargetPercent: clamp(toNumber(values.reductionTargetPercent, 20), 1, 90),
  }
}

function calculateSustainabilityScore(totalMonthly) {
  const { lowMonthlyKg, highMonthlyKg } = SCORE_BENCHMARKS
  const score =
    100 - ((totalMonthly - lowMonthlyKg) / (highMonthlyKg - lowMonthlyKg)) * 100

  return Math.round(clamp(score, 0, 100))
}

export function calculateCarbonFootprint(inputs = {}) {
  const values = normalizeInputs(inputs)
  const renewableShare = values.renewablePercent / 100

  const home =
    values.electricityKwh *
    (1 - renewableShare) *
    EMISSION_FACTORS.electricityKgPerKwh

  const transport =
    values.carKm * EMISSION_FACTORS.carKgPerKm +
    values.publicTransportKm * EMISSION_FACTORS.publicTransportKgPerKm +
    (values.flightsPerYear * EMISSION_FACTORS.flightKgPerTrip) / 12

  const food = EMISSION_FACTORS.dietMonthlyKg[values.dietType]
  const waste = EMISSION_FACTORS.wasteMonthlyKg[values.wasteLevel]

  const categoryTotals = {
    home,
    transport,
    food,
    waste,
  }

  const totalMonthly = Object.values(categoryTotals).reduce((sum, value) => sum + value, 0)

  return {
    totalMonthly: round(totalMonthly),
    annualEstimate: round((totalMonthly * 12) / 1000, 1),
    categoryBreakdown: Object.entries(categoryTotals).map(([key, value]) => ({
      key,
      label: CATEGORY_META[key].label,
      shortLabel: CATEGORY_META[key].shortLabel,
      value: round(value),
      color: CATEGORY_META[key].color,
      softColor: CATEGORY_META[key].softColor,
    })),
    sustainabilityScore: calculateSustainabilityScore(totalMonthly),
  }
}
