import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Put,
} from "@nestjs/common";
import { HospitalService } from "./hospital.service";

@Controller("api/hospitals")
export class HospitalController {
  constructor(private service: HospitalService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.service.update(id, data);
  }

  @Put(":id/doctors/:index")
updateDoctor(
  @Param("id") id: string,
  @Param("index") index: string,
  @Body() data: any
) {
  return this.service.updateDoctor(id, Number(index), data);
}

  @Post(":id/doctors")
  addDoctor(@Param("id") id: string, @Body() doctor: any) {
    return this.service.addDoctor(id, doctor);
  }

  @Delete(":id/doctors/:index")
  deleteDoctor(
    @Param("id") id: string,
    @Param("index") index: string
  ) {
    return this.service.deleteDoctor(id, Number(index));
  }
}
