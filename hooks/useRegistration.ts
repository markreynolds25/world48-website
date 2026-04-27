"use client";
import { useState, useEffect } from "react";

export interface Registration {
  name: string;
  email: string;
  role: string;
}

const STORAGE_KEY = "w48_registration";

export function useRegistration() {
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setRegistration(JSON.parse(raw) as Registration);
    } catch {
      // ignore parse errors
    }
    setLoaded(true);
  }, []);

  function register(data: Registration) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore storage errors
    }
    setRegistration(data);
  }

  return { registration, register, loaded };
}
