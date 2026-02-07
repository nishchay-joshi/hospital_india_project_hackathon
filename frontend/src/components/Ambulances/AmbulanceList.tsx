import { useEffect, useState } from 'react';
import { ambulanceAPI } from '../../services/api';
import { Ambulance } from '../../types/ambulance';

export default function AmbulanceList({ hospital }: { hospital: any }) {
  const [ambulances, setAmbulances] = useState<Ambulance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAmbulances();
  }, [hospital]);

  const loadAmbulances = async () => {
    try {
      const { data } = await ambulanceAPI.getByHospital(hospital.id);
      setAmbulances(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading ambulances...</p>;

  return (
    <div className="bg-white rounded shadow p-6">
      <h2 className="text-xl font-bold mb-4">
        Ambulances — {hospital.name}
      </h2>

      {ambulances.length === 0 && (
        <p className="text-gray-500">No ambulances registered</p>
      )}

      <div className="space-y-3">
        {ambulances.map(a => (
          <div
            key={a.id}
            className="border rounded p-4 flex justify-between"
          >
            <div>
              <p className="font-medium">
                Driver: {a.driverName || 'N/A'}
              </p>
              <p className="text-sm text-gray-600">
                Status: {a.status}
              </p>
            </div>

            <div className="text-sm text-gray-600">
              📍 {a.location.lat}, {a.location.lng}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
