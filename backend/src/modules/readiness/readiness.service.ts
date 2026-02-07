import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../../shared/firebase/firebase.service';

@Injectable()
export class ReadinessService {
  constructor(private firebase: FirebaseService) {}

  async get(hospitalId: string) {
    const snap = await this.firebase
      .getReadiness()
      .where('hospitalId', '==', hospitalId)
      .get();

    if (snap.empty) return null;

    return { id: snap.docs[0].id, ...snap.docs[0].data() };
  }

  async compute(hospitalId: string) {
    const bedsSnap = await this.firebase
      .getBeds()
      .where('hospitalId', '==', hospitalId)
      .get();

    if (bedsSnap.empty) return null;

    const beds = bedsSnap.docs[0].data();

    const totalBeds =
      beds.icuBeds.total +
      beds.emergencyBeds.total +
      beds.generalBeds.total;

    const freeBeds =
      beds.icuBeds.free +
      beds.emergencyBeds.free +
      beds.generalBeds.free;

    const score = Math.round((freeBeds / totalBeds) * 100);

    const record = {
      hospitalId,
      totalBeds,
      freeBeds,
      score,
      computedAt: this.firebase.getTimestamp(),
    };

    const doc = await this.firebase.getReadiness().add(record);

    return { id: doc.id, ...record };
  }
}
