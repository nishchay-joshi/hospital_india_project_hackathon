// import React, { useEffect, useState } from 'react';
// import { doctorsAPI } from '../../services/api';

// export default function DoctorsPanel({ hospital }: { hospital: any }) {
//   const [doctors, setDoctors] = useState<any[]>([]);
//   const [filtered, setFiltered] = useState<any[]>([]);

//   const [name, setName] = useState('');
//   const [specialization, setSpecialization] = useState('');
//   const [search, setSearch] = useState('');

//   useEffect(() => {
//     loadDoctors();
//   }, [hospital]);

//   useEffect(() => {
//     filterDoctors();
//   }, [search, doctors]);

//   async function loadDoctors() {
//     const { data } = await doctorsAPI.getByHospital(hospital.id);
//     setDoctors(data);
//     setFiltered(data);
//   }

//   function filterDoctors() {
//     const q = search.toLowerCase();

//     setFiltered(
//       doctors.filter(d =>
//         d.name.toLowerCase().includes(q) ||
//         d.specialization.toLowerCase().includes(q)
//       )
//     );
//   }

//   async function addDoctor() {
//     if (!name || !specialization) return;

//     await doctorsAPI.create({
//       hospitalId: hospital.id,
//       name,
//       specialization,
//       available: true,
//     });

//     setName('');
//     setSpecialization('');
//     loadDoctors();
//   }

//   async function toggle(id: string, available: boolean) {
//     await doctorsAPI.toggleAvailability(id, !available);
//     loadDoctors();
//   }

//   async function remove(id: string) {
//     if (!confirm('Delete this doctor?')) return;

//     await doctorsAPI.delete(id);
//     loadDoctors();
//   }

//   return (
//     <div className="bg-white p-6 rounded shadow space-y-4">

//       <h2 className="text-xl font-bold">
//         Doctors — {hospital.name}
//       </h2>

//       {/* SEARCH */}
//       <input
//         className="border p-2 rounded w-full"
//         placeholder="Search by name or specialization"
//         value={search}
//         onChange={e => setSearch(e.target.value)}
//       />

//       {/* ADD FORM */}
//       <div className="flex gap-2">
//         <input
//           className="border p-2 rounded flex-1"
//           placeholder="Doctor name"
//           value={name}
//           onChange={e => setName(e.target.value)}
//         />

//         <input
//           className="border p-2 rounded flex-1"
//           placeholder="Specialization"
//           value={specialization}
//           onChange={e => setSpecialization(e.target.value)}
//         />

//         <button
//           onClick={addDoctor}
//           className="bg-blue-600 text-white px-4 rounded"
//         >
//           Add
//         </button>
//       </div>

//       {/* LIST */}
//       <div className="space-y-2">
//         {filtered.map(d => (
//           <div
//             key={d.id}
//             className="border p-3 rounded flex justify-between items-center"
//           >
//             <div>
//               <strong>{d.name}</strong>
//               <div className="text-sm text-gray-600">
//                 {d.specialization}
//               </div>
//             </div>

//             <div className="flex gap-2 items-center">
//               <button
//                 onClick={() => toggle(d.id, d.available)}
//                 className={`px-3 py-1 rounded text-white ${
//                   d.available ? 'bg-green-600' : 'bg-red-600'
//                 }`}
//               >
//                 {d.available ? 'Available' : 'Unavailable'}
//               </button>

//               <button
//                 onClick={() => remove(d.id)}
//                 className="bg-gray-800 text-white px-3 py-1 rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}

//         {!filtered.length && (
//           <p className="text-gray-500 text-center">No doctors found</p>
//         )}
//       </div>
//     </div>
//   );
// }
