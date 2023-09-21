import {HttpClient} from "@angular/common/http";
import {SpeciesDatabaseDto} from "../DTO/speciesdatabase.dto";
import {SpeciesItemDto} from "../DTO/species-item.dto";

export class SpeciesDatabaseEndpoint {
  constructor(private http: HttpClient, private apiUrl: string) {}

  public getAllDatabases() {
    return this.http.get<SpeciesDatabaseDto[]>(this.apiUrl + '/species-database', {withCredentials: true}).pipe();
  }

  public getAllSpecies(){
    return this.http.get<SpeciesItemDto[]>(this.apiUrl + '/species-database/{database_id}/species', {withCredentials: true}).pipe();
  }

  public getOneSpecies(speciesId: number){
    return this.http.get<SpeciesItemDto>(this.apiUrl + '/species-database/{database_id}/species/'+ speciesId, {withCredentials: true}).pipe();
  }
}
