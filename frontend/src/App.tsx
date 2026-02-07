import { useEffect, useState } from "react";
import { hospitalAPI } from "./services/api";
import { distanceKm } from "./utils/distance";

type Doctor = {
  name: string;
  specialization: string;
  isAvailable: boolean;
};

type Hospital = {
  id: string;
  name: string;
  city: string;
  lat: number;
  lng: number;
  availableBeds: number;
  totalBeds: number;
  isActive: boolean;
  topDoctors: Doctor[];
};

type Tab = "dashboard" | "hospitals" | "beds" | "doctors" | "emergency";

export default function App() {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [search, setSearch] = useState("");
  const [emergencies, setEmergencies] = useState<any[]>([]);

  useEffect(() => {
    loadHospitals();
  }, []);

  const nearbyEmergencies = selectedHospital
  ? emergencies.filter(e =>
      distanceKm(
        selectedHospital.lat,
        selectedHospital.lng,
        e.lat,
        e.lng
      ) <= 5
    )
  : [];

  async function loadHospitals() {
    const res = await hospitalAPI.getAll();
    setHospitals(res.data);
    setSelectedHospital(res.data[0] || null);
  }

  const freeBeds = hospitals.reduce(
    (sum, h) => sum + Number(h.availableBeds || 0),
    0
  );

  const readyHospitals = hospitals.filter(h => h.availableBeds > 0).length;

  const filtered = hospitals.filter(h =>
    `${h.name} ${h.city}`.toLowerCase().includes(search.toLowerCase())
  );

  async function updateBeds(field: string, value: number) {
    if (!selectedHospital) return;

    await hospitalAPI.update(selectedHospital.id, {
      [field]: Number(value),
    });

    loadHospitals();
  }

  async function loadEmergencies() {
  const res = await hospitalAPI.getEmergencies();
  setEmergencies(res.data);
}

  async function toggleDoctor(index: number, current: boolean) {
    if (!selectedHospital) return;

    await hospitalAPI.updateDoctor(selectedHospital.id, index, {
      isAvailable: !current,
    });

    loadHospitals();
  }

  useEffect(() => {
  loadHospitals();
  loadEmergencies();
}, []);

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", fontFamily: "Inter, system-ui" }}>
      <header style={header}>
        <strong>🏥 MedIntel</strong>
        <nav style={{ display: "flex", gap: 18 }}>
          {["dashboard", "hospitals", "beds", "doctors", "emergency"].map(t => (
            <Nav key={t} active={tab === t} onClick={() => setTab(t as Tab)}>
              {t.toUpperCase()}
            </Nav>
          ))}
        </nav>
      </header>

      <main style={{ padding: 36 }}>

        {tab === "dashboard" && (
          <div style={grid}>
            <Stat title="Hospitals" value={hospitals.length}/>
            <Stat title="Ready Hospitals" value={readyHospitals}/>
            <Stat title="Free Beds" value={freeBeds}/>
          </div>
        )}

        {tab === "hospitals" && (
          <section>
            <input
              placeholder="Search hospitals..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={searchBox}
            />

            <div style={list}>
              {filtered.map(h => (
                <HospitalCard
                  key={h.id}
                  active={selectedHospital?.id === h.id}
                  onClick={() => setSelectedHospital(h)}
                >
                  <strong>{h.name}</strong>
                  <span>{h.city}</span>
                </HospitalCard>
              ))}
            </div>
          </section>
        )}

        {tab === "beds" && selectedHospital && (
          <section style={grid}>
            <BedEditor
              label="Total Beds"
              value={selectedHospital.totalBeds}
              onSave={v => updateBeds("totalBeds", v)}
            />
            <BedEditor
              label="Available Beds"
              value={selectedHospital.availableBeds}
              onSave={v => updateBeds("availableBeds", v)}
            />
          </section>
        )}

        {tab === "doctors" && selectedHospital && (
          <section style={{ maxWidth: 600 }}>
            {selectedHospital.topDoctors?.map((d, i) => (
              <DoctorRow key={i}>
                <div>
                  <strong>{d.name}</strong><br></br>
                  <small>{d.specialization}</small>
                </div>

                <button
                  onClick={() => toggleDoctor(i, d.isAvailable)}
                  style={{
                    background: d.isAvailable ? "#dc2626" : "#16a34a",
                    color: "white",
                    border: "none",
                    padding: "6px 14px",
                    borderRadius: 6,
                    cursor: "pointer",
                  }}
                >
                  {d.isAvailable ? "Set Unavailable" : "Set Available"}
                </button>
              </DoctorRow>
            ))}
          </section>
        )}
        {tab === "emergency" && selectedHospital && (
  <section style={{ maxWidth: 700 }}>
    <h2>Nearby Emergencies (5km radius)</h2>

    {nearbyEmergencies.length === 0 && (
      <p>No active emergencies near this hospital.</p>
    )}

    {nearbyEmergencies.map(e => (
      <div
        key={e.id}
        style={{
          background: "white",
          padding: 16,
          marginTop: 12,
          borderRadius: 8,
          borderLeft: "6px solid red",
          boxShadow: "0 2px 6px rgba(0,0,0,.08)"
        }}
      >
        <strong>{e.type}</strong>
        <div>Severity: {e.severity}</div>
        <div>
          Location: {e.lat.toFixed(3)}, {e.lng.toFixed(3)}
        </div>
      </div>
    ))}
  </section>
)}

      </main>
    </div>
  );
}

/* ---------------- UI Components ---------------- */

const header = {
  background: "#1e40af",
  color: "white",
  padding: "16px 40px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: 24,
};

const searchBox = {
  padding: 12,
  borderRadius: 8,
  border: "1px solid #cbd5f5",
  width: "100%",
  marginBottom: 16,
};

const list = {
  display: "grid",
  gap: 12,
};

function Nav({ active, children, onClick }: any) {
  return (
    <span
      onClick={onClick}
      style={{
        cursor: "pointer",
        fontWeight: 600,
        borderBottom: active ? "2px solid white" : "none",
      }}
    >
      {children}
    </span>
  );
}

function Stat({ title, value }: any) {
  return (
    <div style={{ background: "white", padding: 26, borderRadius: 12 }}>
      <small>{title}</small>
      <h1>{value}</h1>
    </div>
  );
}

function HospitalCard({ active, children, onClick }: any) {
  return (
    <div
      onClick={onClick}
      style={{
        background: active ? "#eef2ff" : "white",
        padding: 16,
        borderRadius: 10,
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {children}
    </div>
  );
}

function BedEditor({
  label,
  value,
  onSave,
}: {
  label: string;
  value: number;
  onSave: (v: number) => void;
}) {
  const [val, setVal] = useState<number>(value);

  return (
    <div style={{ background: "white", padding: 24, borderRadius: 12 }}>
      <strong>{label}</strong>

      <input
        type="number"
        value={val}
        onChange={e => setVal(Number(e.target.value))}
        style={{
          width: "100%",
          marginTop: 10,
          padding: 10,
          borderRadius: 6,
          border: "1px solid #ccc",
        }}
      />

      <button
        onClick={() => onSave(val)}
        style={{
          marginTop: 12,
          width: "100%",
          background: "#1e40af",
          color: "white",
          border: "none",
          padding: 10,
          borderRadius: 6,
        }}
      >
        Save
      </button>
    </div>
  );
}

function DoctorRow({ children }: any) {
  return (
    <div
      style={{
        background: "white",
        padding: 16,
        borderRadius: 10,
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 12,
      }}
    >
      {children}
    </div>
  );
}
