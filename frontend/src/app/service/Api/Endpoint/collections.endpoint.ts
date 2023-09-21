import {HttpClient} from "@angular/common/http";
import {CollectionDto} from "../DTO/collections.dto";
import {Observable} from "rxjs";
import {CollectionDetailDto} from "../DTO/collection-detail.dto";

export class CollectionEndpoint {
  constructor(private http: HttpClient, private apiUrl: string) {
  }

  public getAllCollections(): Observable<CollectionDto[]> {
    return this.http.get<CollectionDto[]>(this.apiUrl + '/collections', {withCredentials: true}).pipe();
  }

  getCollectionDetail(collectionId: number): Observable<CollectionDetailDto> {
    return this.http.get<CollectionDetailDto>(this.apiUrl + '/collections/' + collectionId, {withCredentials: true}).pipe();
  }

  createCollection(collectionDto: CollectionDto): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(this.apiUrl + '/collections', collectionDto, {withCredentials: true}).pipe();
  }

  updateCollection(collection: CollectionDto) {
    return this.http.put<object>(this.apiUrl + '/collections/' + collection.id, collection, {withCredentials: true}).pipe();
  }

  archiveCollection(collection: CollectionDto): Observable<object> {
    return this.http.put<object>(this.apiUrl + '/collections/' + collection.id + '/archive', collection, {withCredentials: true}).pipe();
  }

  restoreCollection(collection: CollectionDto): Observable<object> {
    return this.http.delete<object>(this.apiUrl + '/collections/' + collection.id + '/archive').pipe();
  }
}
