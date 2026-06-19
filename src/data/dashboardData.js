export const DEFAULT_DASHBOARD_INPUTS = {
  electricityKwh: 420,
  renewablePercent: 20,
  carKm: 500,
  publicTransportKm: 120,
  flightsPerYear: 2,
  dietType: 'mixed',
  wasteLevel: 'medium',
  reductionTargetPercent: 20,
}

export const DIET_OPTIONS = [
  { value: 'vegan', label: 'Vegan' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'mixed', label: 'Mixed' },
  { value: 'highMeat', label: 'High Meat' },
]

export const WASTE_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
]

export const CATEGORY_META = {
  home: {
    label: 'Home Energy',
    shortLabel: 'Energy',
    color: '#0f766e',
    softColor: '#ccfbf1',
  },
  transport: {
    label: 'Transportation',
    shortLabel: 'Transport',
    color: '#2563eb',
    softColor: '#dbeafe',
  },
  food: {
    label: 'Food',
    shortLabel: 'Food',
    color: '#d97706',
    softColor: '#fef3c7',
  },
  waste: {
    label: 'Waste',
    shortLabel: 'Waste',
    color: '#e11d48',
    softColor: '#ffe4e6',
  },
}

export const DASHBOARD_FORM_SECTIONS = [
  {
    key: 'home',
    title: 'Home Energy',
    description: 'Estimate emissions from monthly electricity use.',
    fields: [
      {
        name: 'electricityKwh',
        label: 'Monthly electricity usage',
        type: 'number',
        min: 0,
        step: 10,
        suffix: 'kWh',
      },
      {
        name: 'renewablePercent',
        label: 'Renewable energy percentage',
        type: 'number',
        min: 0,
        max: 100,
        step: 5,
        suffix: '%',
      },
    ],
  },
  {
    key: 'transport',
    title: 'Transportation',
    description: 'Track routine travel and annual flight frequency.',
    fields: [
      {
        name: 'carKm',
        label: 'Car travel per month',
        type: 'number',
        min: 0,
        step: 25,
        suffix: 'km',
      },
      {
        name: 'publicTransportKm',
        label: 'Public transport per month',
        type: 'number',
        min: 0,
        step: 25,
        suffix: 'km',
      },
      {
        name: 'flightsPerYear',
        label: 'Flights per year',
        type: 'number',
        min: 0,
        step: 1,
        suffix: 'flights',
      },
    ],
  },
  {
    key: 'food',
    title: 'Food',
    description: 'Use diet type as a practical monthly food footprint proxy.',
    fields: [
      {
        name: 'dietType',
        label: 'Diet type',
        type: 'select',
        options: DIET_OPTIONS,
      },
    ],
  },
  {
    key: 'waste',
    title: 'Waste',
    description: 'Estimate landfill, packaging, and discarded goods impact.',
    fields: [
      {
        name: 'wasteLevel',
        label: 'Waste generation level',
        type: 'select',
        options: WASTE_OPTIONS,
      },
    ],
  },
  {
    key: 'goals',
    title: 'Goals',
    description: 'Set the monthly reduction target EcoPilot should track.',
    fields: [
      {
        name: 'reductionTargetPercent',
        label: 'Monthly carbon reduction target',
        type: 'number',
        min: 1,
        max: 90,
        step: 1,
        suffix: '%',
      },
    ],
  },
]

const RECOMMENDATIONS_BY_CATEGORY = {
  home: [
    {
      title: 'Improve energy efficiency',
      description:
        'Prioritize LED lighting, efficient cooling settings, and unplugging idle electronics.',
    },
    {
      title: 'Shift more power to renewables',
      description:
        'Increase renewable electricity through a green tariff, rooftop solar, or community solar plan.',
    },
    {
      title: 'Reduce peak appliance use',
      description:
        'Batch laundry, run full dishwasher loads, and schedule heavy appliances when demand is lower.',
    },
  ],
  transport: [
    {
      title: 'Use public transport more often',
      description:
        'Move one or two routine trips each week from car travel to public transport where practical.',
    },
    {
      title: 'Reduce car travel',
      description:
        'Combine errands, carpool, or replace short drives with walking and cycling when available.',
    },
    {
      title: 'Plan lower-flight months',
      description:
        'Replace avoidable flights with rail, video calls, or fewer longer trips instead of many short ones.',
    },
  ],
  food: [
    {
      title: 'Reduce red meat consumption',
      description:
        'Swap several red-meat meals each week for plant proteins, poultry, or lower-impact options.',
    },
    {
      title: 'Make plant-forward defaults',
      description:
        'Use vegetarian breakfasts and lunches as a low-friction way to lower recurring food emissions.',
    },
    {
      title: 'Cut food waste',
      description:
        'Plan meals before shopping and use leftovers so fewer emissions are wasted with discarded food.',
    },
  ],
  waste: [
    {
      title: 'Reduce single-use purchases',
      description:
        'Choose refillable, repairable, or durable products for the categories you buy most often.',
    },
    {
      title: 'Separate recyclable materials',
      description:
        'Keep paper, metal, glass, and eligible plastics clean and sorted to reduce landfill impact.',
    },
    {
      title: 'Compost food scraps',
      description:
        'Move organic waste out of landfill through composting or local food-scrap collection.',
    },
  ],
}

export function getRecommendationsForCategory(categoryKey) {
  return RECOMMENDATIONS_BY_CATEGORY[categoryKey] ?? RECOMMENDATIONS_BY_CATEGORY.home
}
