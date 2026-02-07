import { Hospital } from '../../types/hospital';

export default function HospitalList({
  hospitals,
  onSelect,
}: {
  hospitals: Hospital[];
  onSelect: (h: Hospital) => void;
}) {
  return (
    <div>
      <h2>Hospitals</h2>

      {hospitals.map(h => (
        <div
          key={h.id}
          onClick={() => onSelect(h)}
          style={{
            padding: 10,
            borderBottom: '1px solid #ddd',
            cursor: 'pointer',
          }}
        >
          <strong>{h.name || h.id}</strong>
          <div>{h.city}</div>
        </div>
      ))}
    </div>
  );
}
