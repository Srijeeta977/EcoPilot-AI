import { DEFAULT_DASHBOARD_INPUTS } from '../data/dashboardData'

const STORAGE_KEYS = {
  inputs: 'ecopilot.dashboard.inputs',
  baselineMonthly: 'ecopilot.dashboard.baselineMonthly',
  savedAt: 'ecopilot.dashboard.savedAt',
}

function canUseStorage() {
  return typeof window !== 'undefined' && 'localStorage' in window
}

function readJson(key) {
  if (!canUseStorage()) {
    return null
  }

  try {
    const rawValue = window.localStorage.getItem(key)
    return rawValue ? JSON.parse(rawValue) : null
  } catch {
    return null
  }
}

export function loadDashboardInputs() {
  return {
    ...DEFAULT_DASHBOARD_INPUTS,
    ...readJson(STORAGE_KEYS.inputs),
  }
}

export function saveDashboardInputs(inputs) {
  if (!canUseStorage()) {
    return null
  }

  const savedAt = new Date().toISOString()

  window.localStorage.setItem(
    STORAGE_KEYS.inputs,
    JSON.stringify({ ...DEFAULT_DASHBOARD_INPUTS, ...inputs }),
  )
  window.localStorage.setItem(STORAGE_KEYS.savedAt, savedAt)

  return savedAt
}

export function loadDashboardBaseline() {
  if (!canUseStorage()) {
    return null
  }

  const baseline = Number(window.localStorage.getItem(STORAGE_KEYS.baselineMonthly))
  return Number.isFinite(baseline) && baseline > 0 ? baseline : null
}

export function saveDashboardBaseline(baselineMonthly) {
  if (!canUseStorage()) {
    return
  }

  window.localStorage.setItem(STORAGE_KEYS.baselineMonthly, String(baselineMonthly))
}

export function loadDashboardSavedAt() {
  if (!canUseStorage()) {
    return null
  }

  return window.localStorage.getItem(STORAGE_KEYS.savedAt)
}
