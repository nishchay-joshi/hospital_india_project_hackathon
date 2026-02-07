import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseService {
  private db: admin.firestore.Firestore;

  constructor(private config: ConfigService) {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: this.config.get('FIREBASE_PROJECT_ID'),
          clientEmail: this.config.get('FIREBASE_CLIENT_EMAIL'),
          privateKey: this.config
            .get('FIREBASE_PRIVATE_KEY')
            ?.replace(/\\n/g, '\n'),
        }),
      });
    }

    this.db = admin.firestore();
  }

  getHospitals() {
    return this.db.collection('hospitals');
  }

  getBeds() {
    return this.db.collection('beds');
  }

  getDoctors() {
    return this.db.collection('doctors');
  }

  getAmbulances() {
    return this.db.collection('ambulances');
  }

  getReadiness() {
    return this.db.collection('readiness');
  }

  getTimestamp() {
    return admin.firestore.FieldValue.serverTimestamp();
  }

  getEmergencies() {
  return this.db.collection("emergency");
}

}
