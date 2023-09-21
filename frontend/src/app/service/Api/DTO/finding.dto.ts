export class FindingDto {
  constructor(
    public id: number,
  public user_id: number,
  public collection_id: number,
  public field_visit_id: number,
  public number: string,
  public details: string,
  public location_latitude: number,
  public location_longitude: number,
  public location_altitude: number,
  public version: number,
  public species_id: number,
  public latin_name: string,
  public trivial_name: string,
  public sex: string,
  public comment: string,
  public status: string
  ) {
  }

}
