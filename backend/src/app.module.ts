import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from './shared/firebase/firebase.module';
import { NominatimModule } from './shared/nominatim/nominatim.module';
import { RealtimeModule } from './shared/realtime/realtime.module';
import { HospitalModule } from './modules/hospital/hospital.module';
import { ReadinessModule } from './modules/readiness/readiness.module';
import { EmergencyModule } from "./modules/emergency/emergency.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    FirebaseModule,
    NominatimModule,
    RealtimeModule,
    HospitalModule,
    ReadinessModule,
    EmergencyModule,
  ]
})
export class AppModule {}
