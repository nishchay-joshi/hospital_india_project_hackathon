import { useEffect, useState } from 'react';
import { bedsAPI } from '../../services/api';

export default function BedsPanel({ hospitalId }: { hospitalId: string }) {
  const [beds, setBeds] = useState<any>(null);

  useEffect(() => {
    bedsAPI.get(hospitalId).then(res => setBeds(res.data));
  }, [hospitalId]);

  if (!beds) return <p>Loading beds...</p>;

  return (
    <div>
      <h3>Beds</h3>

      {['icuBeds', 'emergencyBeds', 'generalBeds'].map(key => (
        <div key={key}>
          <strong>{key}</strong>
          <div>Total: {beds[key].total}</div>
          <div>Occupied: {beds[key].occupied}</div>
          <div>Free: {beds[key].free}</div>
        </div>
      ))}
    </div>
  );
}
