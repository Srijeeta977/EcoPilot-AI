import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Activity,
  BarChart3,
  CheckCircle2,
  Gauge,
  Leaf,
  ListChecks,
  RefreshCw,
  Save,
  Target,
  TrendingDown,
} from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  DASHBOARD_FORM_SECTIONS,
  DEFAULT_DASHBOARD_INPUTS,
  getRecommendationsForCategory,
} from '../data/dashboardData'
import { calculateCarbonFootprint } from '../utils/carbonCalculator'
import {
  loadDashboardBaseline,
  loadDashboardInputs,
  loadDashboardSavedAt,
  saveDashboardBaseline,
  saveDashboardInputs,
} from '../utils/dashboardStorage'

const numberFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0,
})

const savedAtFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
})

const SECTION_ICONS = {
  home: Gauge,
  transport: Activity,
  food: Leaf,
  waste: ListChecks,
  goals: Target,
}

const NUMERIC_FIELD_NAMES = DASHBOARD_FORM_SECTIONS.flatMap((section) =>
  section.fields.filter((field) => field.type === 'number').map((field) => field.name),
)

const tooltipStyle = {
  borderRadius: '0.75rem',
  border: '1px solid rgba(15, 118, 110, 0.16)',
  boxShadow: '0 20px 40px rgba(15, 23, 42, 0.12)',
}

function formatKg(value) {
  return numberFormatter.format(Math.max(0, Math.round(value)))
}

function formatSavedAt(savedAt) {
  if (!savedAt) {
    return 'Not saved yet'
  }

  const date = new Date(savedAt)
  return Number.isNaN(date.getTime()) ? 'Not saved yet' : savedAtFormatter.format(date)
}

function sanitizeInputs(values) {
  const sanitized = { ...DEFAULT_DASHBOARD_INPUTS, ...values }

  NUMERIC_FIELD_NAMES.forEach((name) => {
    const parsed = Number(sanitized[name])
    sanitized[name] = Number.isFinite(parsed) ? parsed : DEFAULT_DASHBOARD_INPUTS[name]
  })

  return sanitized
}

export default function Dashboard() {
  const [formValues, setFormValues] = useState(() => loadDashboardInputs())
  const [baselineMonthly, setBaselineMonthly] = useState(() => loadDashboardBaseline())
  const [savedAt, setSavedAt] = useState(() => loadDashboardSavedAt())
  const [saveStatus, setSaveStatus] = useState(savedAt ? 'Saved locally' : 'Ready to save')

  const footprint = useMemo(() => calculateCarbonFootprint(formValues), [formValues])

  const largestCategory = useMemo(
    () =>
      footprint.categoryBreakdown.reduce((highest, category) =>
        category.value > highest.value ? category : highest,
      ),
    [footprint.categoryBreakdown],
  )

  const recommendations = useMemo(
    () => getRecommendationsForCategory(largestCategory.key),
    [largestCategory.key],
  )

  const baselineForProgress = baselineMonthly ?? footprint.totalMonthly
  const targetPercent = Number(formValues.reductionTargetPercent) || 0
  const targetReductionKg = Math.round(baselineForProgress * (targetPercent / 100))
  const achievedReductionKg = Math.max(0, Math.round(baselineForProgress - footprint.totalMonthly))
  const monthlyTargetKg = Math.max(0, Math.round(baselineForProgress - targetReductionKg))
  const goalProgress =
    targetReductionKg > 0
      ? Math.min(100, Math.round((achievedReductionKg / targetReductionKg) * 100))
      : 0

  const metricCards = [
    {
      label: 'Monthly Carbon Footprint',
      value: formatKg(footprint.totalMonthly),
      unit: 'kg CO2e',
      detail: 'Current estimated monthly total',
      icon: Gauge,
      accent: 'from-emerald-500/15 to-teal-500/10 text-emerald-800',
    },
    {
      label: 'Annual Estimate',
      value: footprint.annualEstimate.toFixed(1),
      unit: 'tons CO2e',
      detail: 'Projected from monthly habits',
      icon: BarChart3,
      accent: 'from-blue-500/15 to-cyan-500/10 text-blue-800',
    },
    {
      label: 'Sustainability Score',
      value: footprint.sustainabilityScore,
      unit: '/100',
      detail: 'Higher score means lower footprint',
      icon: Leaf,
      accent: 'from-lime-500/20 to-emerald-500/10 text-lime-800',
    },
    {
      label: 'Reduction Goal Progress',
      value: goalProgress,
      unit: '%',
      detail: `${formatKg(achievedReductionKg)} of ${formatKg(targetReductionKg)} kg CO2e reduced`,
      icon: TrendingDown,
      accent: 'from-amber-500/20 to-orange-500/10 text-amber-800',
    },
  ]

  const goalChartData = [
    {
      name: 'Progress',
      value: goalProgress,
      fill: '#0f766e',
    },
  ]

  function handleFieldChange(event) {
    const { name, type, value } = event.target
    const nextValue = type === 'number' ? (value === '' ? '' : Number(value)) : value

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: nextValue,
    }))
    setSaveStatus('Unsaved changes')
  }

  function handleFieldBlur(event) {
    const { name, type, value } = event.target

    if (type === 'number' && value === '') {
      setFormValues((currentValues) => ({
        ...currentValues,
        [name]: DEFAULT_DASHBOARD_INPUTS[name] ?? 0,
      }))
    }
  }

  function handleSubmit(event) {
    event.preventDefault()

    const sanitizedInputs = sanitizeInputs(formValues)
    const savedFootprint = calculateCarbonFootprint(sanitizedInputs)
    const nextSavedAt = saveDashboardInputs(sanitizedInputs)

    if (baselineMonthly === null) {
      saveDashboardBaseline(savedFootprint.totalMonthly)
      setBaselineMonthly(savedFootprint.totalMonthly)
    }

    setFormValues(sanitizedInputs)
    setSavedAt(nextSavedAt)
    setSaveStatus('Saved locally')
  }

  function handleBaselineReset() {
    saveDashboardBaseline(footprint.totalMonthly)
    setBaselineMonthly(footprint.totalMonthly)
    setSaveStatus('Baseline updated')
  }

  function handleRestoreDefaults() {
    setFormValues(DEFAULT_DASHBOARD_INPUTS)
    setSaveStatus('Unsaved changes')
  }

  return (
    <section className="bg-[#f6faf6] px-5 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
              Carbon dashboard
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight text-emerald-950 sm:text-5xl">
              Understand and track your footprint.
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-700 sm:text-lg">
              Enter your lifestyle signals to estimate monthly emissions, monitor a
              reduction goal, and find the highest-impact next action.
            </p>
          </div>

          <div className="rounded-lg border border-emerald-950/10 bg-white px-4 py-3 text-sm shadow-sm">
            <p className="font-semibold text-emerald-950">{saveStatus}</p>
            <p className="mt-1 text-slate-600">Last saved: {formatSavedAt(savedAt)}</p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {metricCards.map((card, index) => {
            const Icon = card.icon

            return (
              <motion.article
                key={card.label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
                className="rounded-lg border border-emerald-950/10 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{card.label}</p>
                    <div className="mt-3 flex items-end gap-2">
                      <p className="text-3xl font-semibold leading-none text-emerald-950">
                        {card.value}
                      </p>
                      <p className="pb-1 text-sm font-semibold text-slate-500">{card.unit}</p>
                    </div>
                  </div>
                  <span
                    className={[
                      'grid size-11 shrink-0 place-items-center rounded-lg bg-gradient-to-br',
                      card.accent,
                    ].join(' ')}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-600">{card.detail}</p>
              </motion.article>
            )
          })}
        </motion.div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.6fr] lg:items-start">
          <form
            onSubmit={handleSubmit}
            className="rounded-lg border border-emerald-950/10 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-24"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-emerald-950">
                  Footprint Inputs
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Your profile is stored locally in this browser.
                </p>
              </div>
              <span className="rounded-lg bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                localStorage
              </span>
            </div>

            <div className="mt-6 space-y-6">
              {DASHBOARD_FORM_SECTIONS.map((section) => {
                const Icon = SECTION_ICONS[section.key] ?? Leaf

                return (
                  <fieldset key={section.key} className="border-t border-slate-200 pt-5">
                    <legend className="flex items-center gap-3 text-base font-semibold text-slate-900">
                      <span className="grid size-9 place-items-center rounded-lg bg-emerald-50 text-emerald-800">
                        <Icon className="size-4" aria-hidden="true" />
                      </span>
                      {section.title}
                    </legend>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {section.description}
                    </p>

                    <div className="mt-4 grid gap-4">
                      {section.fields.map((field) => (
                        <label key={field.name} className="block">
                          <span className="text-sm font-medium text-slate-700">
                            {field.label}
                          </span>

                          {field.type === 'select' ? (
                            <select
                              name={field.name}
                              value={formValues[field.name]}
                              onChange={handleFieldChange}
                              className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-900 shadow-sm outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
                            >
                              {field.options.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <div className="relative mt-2">
                              <input
                                name={field.name}
                                type="number"
                                min={field.min}
                                max={field.max}
                                step={field.step}
                                value={formValues[field.name]}
                                onBlur={handleFieldBlur}
                                onChange={handleFieldChange}
                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 pr-24 text-sm font-medium text-slate-900 shadow-sm outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
                              />
                              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold uppercase text-slate-500">
                                {field.suffix}
                              </span>
                            </div>
                          )}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                )
              })}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="submit"
                aria-label="Save carbon footprint profile"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-950 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-900"
              >
                <Save className="size-4" aria-hidden="true" />
                Save Profile
              </button>
              <button
                type="button"
                aria-label="Set current footprint as baseline"
                onClick={handleBaselineReset}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-950/15 bg-white px-4 py-3 text-sm font-semibold text-emerald-950 shadow-sm transition hover:bg-emerald-50"
              >
                <Target className="size-4" aria-hidden="true" />
                Set Baseline
              </button>
              <button
                type="button"
                aria-label="Restore default footprint values"
                onClick={handleRestoreDefaults}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                <RefreshCw className="size-4" aria-hidden="true" />
                Restore Defaults
              </button>
            </div>
          </form>

          <div className="space-y-6">
            <div className="grid gap-6 xl:grid-cols-2">
              <article className="rounded-lg border border-emerald-950/10 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-emerald-950">
                      Category Breakdown
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Monthly emissions share by source.
                    </p>
                  </div>
                  <BarChart3 className="size-5 text-teal-700" aria-hidden="true" />
                </div>

                <div className="mt-5 h-72" role="img"  aria-label="Carbon footprint category breakdown chart">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={footprint.categoryBreakdown}
                        dataKey="value"
                        nameKey="label"
                        innerRadius="58%"
                        outerRadius="82%"
                        paddingAngle={4}
                      >
                        {footprint.categoryBreakdown.map((entry) => (
                          <Cell key={entry.key} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${formatKg(value)} kg CO2e`, 'Monthly']}
                        contentStyle={tooltipStyle}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {footprint.categoryBreakdown.map((category) => (
                    <div key={category.key} className="flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <span
                          className="size-3 shrink-0 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="truncate text-sm font-medium text-slate-700">
                          {category.label}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-slate-900">
                        {formatKg(category.value)}
                      </span>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-lg border border-emerald-950/10 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-emerald-950">
                      Emissions by Category
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Compare the categories that drive your monthly total.
                    </p>
                  </div>
                  <Activity className="size-5 text-teal-700" aria-hidden="true" />
                </div>

                <div className="mt-6 h-80" role="img"  aria-label="Carbon emissions comparison chart">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={footprint.categoryBreakdown}
                      margin={{ top: 12, right: 8, bottom: 0, left: 0 }}
                    >
                      <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
                      <XAxis
                        dataKey="shortLabel"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#475569', fontSize: 12 }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748b', fontSize: 12 }}
                        tickFormatter={(value) => formatKg(value)}
                        width={42}
                      />
                      <Tooltip
                        formatter={(value) => [`${formatKg(value)} kg CO2e`, 'Monthly']}
                        contentStyle={tooltipStyle}
                      />
                      <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                        {footprint.categoryBreakdown.map((entry) => (
                          <Cell key={entry.key} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </article>
            </div>

            <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
              <article className="rounded-lg border border-emerald-950/10 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-emerald-950">
                      Goal Progress
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Target monthly footprint: {formatKg(monthlyTargetKg)} kg CO2e.
                    </p>
                  </div>
                  <Target className="size-5 text-teal-700" aria-hidden="true" />
                </div>

                <div className="relative mt-5 h-64" role="img" aria-label="Carbon reduction goal progress chart">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                      data={goalChartData}
                      innerRadius="72%"
                      outerRadius="100%"
                      startAngle={90}
                      endAngle={-270}
                    >
                      <PolarAngleAxis
                        type="number"
                        domain={[0, 100]}
                        angleAxisId={0}
                        tick={false}
                      />
                      <RadialBar
                        background={{ fill: '#e2e8f0' }}
                        dataKey="value"
                        cornerRadius={18}
                      />
                    </RadialBarChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 grid place-items-center text-center">
                    <div>
                      <p className="text-4xl font-semibold text-emerald-950">
                        {goalProgress}%
                      </p>
                      <p className="mt-2 text-sm font-medium text-slate-600">
                        {formatKg(achievedReductionKg)} kg CO2e reduced
                      </p>
                    </div>
                  </div>
                </div>
              </article>

              <section className="rounded-lg border border-emerald-950/10 bg-[#eef7f1] p-5 shadow-sm sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
                      Personalized recommendations
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-emerald-950">
                      Focus on {largestCategory.label.toLowerCase()} first.
                    </h2>
                  </div>
                  <span className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-emerald-900 shadow-sm">
                    {formatKg(largestCategory.value)} kg CO2e/month
                  </span>
                </div>

                <div className="mt-5 grid gap-3">
                  {recommendations.map((recommendation) => (
                    <article
                      key={recommendation.title}
                      className="flex gap-3 rounded-lg border border-emerald-950/10 bg-white p-4 shadow-sm"
                    >
                      <CheckCircle2
                        className="mt-0.5 size-5 shrink-0 text-teal-700"
                        aria-hidden="true"
                      />
                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {recommendation.title}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          {recommendation.description}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
