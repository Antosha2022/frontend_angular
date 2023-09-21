import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {SpeciesInterface} from "../components/shared/speciesdatabase/species.interface";
import {HttpClient, HttpContext, HttpHeaders, HttpParams} from "@angular/common/http";
import {ApiService} from "./Api/api.service";
import {GpsDto} from "./Api/DTO/gps.dto";

@Injectable()
export class SpeciesService{
  constructor(
    private http: HttpClient,
    private api: ApiService,
  ) {
  }
  fetchSpecies(searchValue: string): Observable<SpeciesInterface[]>{
    const url = `http://backend.species-collector.test/api/v1/species-database/{collection_id}/species?filter=${searchValue}`;
    return this.http.get<SpeciesInterface[]>(url)
  }

  convertGpsToLv03 (lat:number, long: number, alt: number): Observable<object>{
    const url = `http://geodesy.geo.admin.ch/reframe/wgs84tolv03?easting=${lat}&northing=${long}&altitude=${alt}&format=json`;
    return this.http.get<object>(url,{observe:"events", responseType:"json"})
  }
  convertLv03ToGps (lat:number, long: number, alt: number): Observable<object>{
    const url = `http://geodesy.geo.admin.ch/reframe/lv03towgs84?easting=${lat}&northing=${long}&altitude=${alt}&format=json`;
    return this.http.get<object>(url,{observe:"events", responseType:"json"})
  }

  // printTag (collectionId: number, visitId: number){
  //   const url = `http://backend.species-collector.test/api/v1/collections/{collection_id}/field-visits/{field_visit_id}/tags`;
  //   return this.http.get(url, {width:} )
  // }
}
