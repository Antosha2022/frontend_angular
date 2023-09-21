export class ReviewDto {
  constructor(
    public id: number,
  public requester_id: number,
  public reviewer_id: number,
  public reviewer_email: string,
  public field_visit_id: number,
  public details: string,
  public status: string,
  public version: number,
  public field_visit: {
    id: number,
    date: string
  },
  public requester: {
    first_name: string,
    id: number,
    last_name: string
  },
  public reviewer: {
    first_name: string,
    id: number,
    last_name: string
  }
  ) {
  }
}
