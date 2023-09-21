import {HttpClient} from "@angular/common/http";
import {VisitDto} from "../DTO/visit.dto";
import {Observable} from "rxjs";
import * as moment from "moment";
import {DATE_FORMAT_SERVER} from "../../../constants/date-format.constant";

export class VisitEndpoint {
  constructor(private http: HttpClient, private apiUrl: string) {}

  private convertFromClientToServer(visit: VisitDto): VisitDto
  {
    return Object.assign({}, visit, {
      date: moment(visit.date).format(DATE_FORMAT_SERVER)
    })
  }

  getAllVisits(collectionId: number) {
    return this.http.get<VisitDto[]>(this.apiUrl + '/collections/'+ collectionId +'/field-visits', {withCredentials: true}).pipe();
  }
  getOneVisit(collectionId: number, visitId: number){
    return this.http.get<VisitDto>(this.apiUrl + '/collections/'+ collectionId +'/field-visits/'+ visitId, {withCredentials: true}).pipe();
  }
  createVisit(collectionId: number, field_visit: VisitDto): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(
      this.apiUrl + '/collections/'+ collectionId+'/field-visits',
      this.convertFromClientToServer(field_visit),
      {withCredentials: true}).pipe();
  }
  updateVisit(collectionId: number, field_visit: VisitDto) {
    return this.http.put<object>(
      this.apiUrl + '/collections/'+ collectionId+'/field-visits/'+ field_visit.id,
      this.convertFromClientToServer(field_visit),
      {withCredentials: true}).pipe();
  }
  deleteVisit(collectionId: number, field_visit: VisitDto): Observable<object> {
    return this.http.delete<object>(this.apiUrl + '/collections/'+ collectionId +'/field-visits/'+ field_visit.id).pipe();
  }

  printTag (collectionId: number, visitId: number, width: number, height: number, version: number, template: string): Observable<{ uri: string }> {
    return this.http.get<{ uri: string }>(this.apiUrl+ `/collections/`+ collectionId+`/field-visits/`+visitId+`/tags?width=${width}&height=${height}&version=${version}&template=${template}`,
      {withCredentials: true}).pipe()
  }
}
