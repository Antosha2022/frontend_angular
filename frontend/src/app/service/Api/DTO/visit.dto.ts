export class VisitDto {
  public id?: number
  public user_id?: number
  public collection_id?: number
  public name?: string
  public location?: string
  public date?: any
  public description?: string
  public has_pending_review?: number
  public has_completed_review?: number
  public last_review_version?: number
}
