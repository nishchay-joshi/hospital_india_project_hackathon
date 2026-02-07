import { Controller, Get } from "@nestjs/common";
import { FirebaseService } from "../../shared/firebase/firebase.service";

@Controller("api/emergency")
export class EmergencyController {
  constructor(private firebase: FirebaseService) {}

  @Get()
  async getAll() {
    const snap = await this.firebase.getEmergencies().get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  }
}
