import { Injectable } from "@nestjs/common";
import { FirebaseService } from "../../shared/firebase/firebase.service";

@Injectable()
export class HospitalService {
  constructor(private firebase: FirebaseService) {}

  async getAll() {
    const snap = await this.firebase.getHospitals().get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  }

  async addDoctor(hospitalId: string, doctor: any) {
    const ref = this.firebase.getHospitals().doc(hospitalId);
    const doc = await ref.get();

    const doctors = doc.data()?.topDoctors || [];

    doctors.push({
      ...doctor,
      isAvailable: true,
      availableAt: new Date()
    });

    await ref.update({ topDoctors: doctors });
    return doctors;
  }

  async updateDoctor(hospitalId: string, index: number, data: any) {
    const ref = this.firebase.getHospitals().doc(hospitalId);
    const doc = await ref.get();

    const doctors = doc.data()?.topDoctors || [];
    doctors[index] = { ...doctors[index], ...data };

    await ref.update({ topDoctors: doctors });
    return doctors;
  }

  async update(id: string, data: any) {
  const ref = this.firebase.getHospitals().doc(id);

  await ref.update({
    ...data
  });

  return { success: true };
}

  async deleteDoctor(hospitalId: string, index: number) {
    const ref = this.firebase.getHospitals().doc(hospitalId);
    const doc = await ref.get();

    const doctors = doc.data()?.topDoctors || [];
    doctors.splice(index, 1);

    await ref.update({ topDoctors: doctors });
    return doctors;
  }
}
