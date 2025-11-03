import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StationOverview } from '../models/station-overview.model';
import { StationDto } from '../models/station-dto.model';
import { tick } from '@angular/core/testing';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
    //,'Authorization': 'my-auth-token'
  })
}
@Injectable({
  providedIn: 'root'
})
export class RailwayService {

  private apiUrl = "http://localhost:5000";

  constructor(private http: HttpClient) { }

  getStationsOverview() {
    return this.http.get<StationOverview[]>(`${this.apiUrl}/Station/overview`);
  }
  
  getStation(id: number) {
    return this.http.get<StationDto>(`${this.apiUrl}/Station/${id}`);
  }

  updateStation(station: StationDto) {
    const url = `${this.apiUrl}/Station/${station.id}`;
    return this.http.put(url, station);
  }
}
