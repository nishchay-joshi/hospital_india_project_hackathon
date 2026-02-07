// import { useEffect, useState } from 'react';
// import { hospitalAPI, readinessAPI } from '../../services/api';

// export default function Dashboard() {
//   const [stats, setStats] = useState({
//     totalHospitals: 0,
//     readyHospitals: 0,
//   });

//   useEffect(() => {
//     loadStats();
//   }, []);

//   async function loadStats() {
//     const hospitalsRes = await hospitalAPI.getAll();
//     const readinessRes = await readinessAPI.getAll();

//     setStats({
//       totalHospitals: hospitalsRes.data.length,
//       readyHospitals: readinessRes.data.filter((r: any) => r.ready).length,
//     });
//   }

//   return (
//     <div>
//       <h2>Dashboard</h2>
//       <p>Total Hospitals: {stats.totalHospitals}</p>
//       <p>Ready Hospitals: {stats.readyHospitals}</p>
//     </div>
//   );
// }
