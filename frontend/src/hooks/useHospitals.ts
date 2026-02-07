import { useEffect, useState } from 'react';
import { hospitalAPI } from '../services/api';
import { Hospital } from '../types/hospital';

export function useHospitals() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const res = await hospitalAPI.getAll();
    setHospitals(res.data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  return { hospitals, loading, reload: load };
}
