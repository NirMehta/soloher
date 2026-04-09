const STORAGE_KEY = "soloher-shared-plan";

export interface SharedPlan {
  place: string;
  city: string;
  timestamp: number;
}

export function saveSharedPlan(place: string, city: string) {
  const plan: SharedPlan = { place, city, timestamp: Date.now() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
}

export function getSharedPlan(): SharedPlan | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SharedPlan;
  } catch {
    return null;
  }
}

export function clearSharedPlan() {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Returns the shared plan only if it's within the 3–72 hour window.
 * Auto-clears if expired (>72h).
 */
export function getActiveSharedPlan(): SharedPlan | null {
  const plan = getSharedPlan();
  if (!plan) return null;

  const hoursElapsed = (Date.now() - plan.timestamp) / (1000 * 60 * 60);

  if (hoursElapsed > 72) {
    clearSharedPlan();
    return null;
  }

  if (hoursElapsed < 3) {
    return null; // too soon
  }

  return plan;
}
