export class CollectionDto {
  constructor(
    public id: number,
    public user_id: number,
    public species_database_id: number,
    public name: string,
    public location: string,
    public description: string,
    public state: string,
    public field_visits: [{
            id: number,
            date: string
          }],
    public collectionIsVisible: boolean
  ) {
  }
}
