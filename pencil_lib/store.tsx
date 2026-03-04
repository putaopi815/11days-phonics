"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type PropsWithChildren,
} from "react";
import { seedPlans } from "../data/seed";
import type { LearningState, ProgressRecord, UserSettings } from "../types";

const STORAGE_KEY = "phonics-14day-state";

type Action =
  | { type: "hydrate"; payload: LearningState }
  | { type: "setAccent"; payload: UserSettings["accent"] }
  | { type: "completeStep"; payload: { dayIndex: number; step: 1 | 2 | 3 } }
  | { type: "reset" };

const defaultState: LearningState = {
  settings: { accent: "uk" },
  plans: seedPlans,
  progress: [],
};

function ensureRecord(progress: ProgressRecord[], dayIndex: number): ProgressRecord {
  return (
    progress.find((item) => item.dayIndex === dayIndex) ?? {
      dayIndex,
      phonemeIpa: "",
      step1Done: false,
      step2Done: false,
      step3Done: false,
    }
  );
}

function nextProgress(progress: ProgressRecord[], dayIndex: number, step: 1 | 2 | 3) {
  const current = ensureRecord(progress, dayIndex);
  const updated: ProgressRecord = {
    ...current,
    step1Done: step === 1 ? true : current.step1Done,
    step2Done: step === 2 ? true : current.step2Done,
    step3Done: step === 3 ? true : current.step3Done,
  };

  if (updated.step1Done && updated.step2Done && updated.step3Done) {
    updated.completedAt = new Date().toISOString();
  }

  return [
    ...progress.filter((item) => item.dayIndex !== dayIndex),
    updated,
  ].sort((a, b) => a.dayIndex - b.dayIndex);
}

function reducer(state: LearningState, action: Action): LearningState {
  switch (action.type) {
    case "hydrate":
      return {
        ...action.payload,
        plans: action.payload.plans?.length ? action.payload.plans : seedPlans,
      };
    case "setAccent":
      return {
        ...state,
        settings: { ...state.settings, accent: action.payload },
      };
    case "completeStep":
      return {
        ...state,
        progress: nextProgress(
          state.progress,
          action.payload.dayIndex,
          action.payload.step,
        ),
      };
    case "reset":
      return defaultState;
    default:
      return state;
  }
}

function loadState(): LearningState {
  if (typeof window === "undefined") return defaultState;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    return JSON.parse(raw) as LearningState;
  } catch {
    return defaultState;
  }
}

function saveState(state: LearningState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function resetPersistedState() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

interface StoreValue {
  state: LearningState;
  load: () => void;
  save: () => void;
  reset: () => void;
  setAccent: (accent: UserSettings["accent"]) => void;
  completeStep: (dayIndex: number, step: 1 | 2 | 3) => void;
}

const LearningStoreContext = createContext<StoreValue | null>(null);

export function LearningStoreProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, defaultState);

  useEffect(() => {
    dispatch({ type: "hydrate", payload: loadState() });
  }, []);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const value = useMemo<StoreValue>(
    () => ({
      state,
      load: () => dispatch({ type: "hydrate", payload: loadState() }),
      save: () => saveState(state),
      reset: () => {
        resetPersistedState();
        dispatch({ type: "reset" });
      },
      setAccent: (accent) => dispatch({ type: "setAccent", payload: accent }),
      completeStep: (dayIndex, step) =>
        dispatch({ type: "completeStep", payload: { dayIndex, step } }),
    }),
    [state],
  );

  return (
    <LearningStoreContext.Provider value={value}>
      {children}
    </LearningStoreContext.Provider>
  );
}

export function useLearningStore() {
  const context = useContext(LearningStoreContext);
  if (!context) {
    throw new Error("useLearningStore must be used within LearningStoreProvider");
  }
  return context;
}
