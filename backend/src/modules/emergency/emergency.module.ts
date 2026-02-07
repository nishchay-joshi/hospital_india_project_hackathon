import { Module } from "@nestjs/common";
import { EmergencyController } from "./emergency.controller";
import { FirebaseService } from "../../shared/firebase/firebase.service";

@Module({
  controllers: [EmergencyController],
  providers: [FirebaseService],
})
export class EmergencyModule {}
