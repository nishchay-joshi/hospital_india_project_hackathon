export function totalBeds(beds: any) {
  return (
    beds.icuBeds.total +
    beds.emergencyBeds.total +
    beds.generalBeds.total
  );
}

export function freeBeds(beds: any) {
  return (
    beds.icuBeds.free +
    beds.emergencyBeds.free +
    beds.generalBeds.free
  );
}
