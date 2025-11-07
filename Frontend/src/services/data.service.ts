import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MDemo, MDemoOverview } from '../models/mdemo.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class DataService {

private apiUrl = "https://h-aitenbichler.cloud.htl-leonding.ac.at/demosypapi";
//private apiUrl = "/api";
// use /api to proxy requests => see proxy.conf.json 
//                  to avoid CORS issues in development

  constructor(private http: HttpClient) { }

  getMDemos() {
    return this.http.get<MDemoOverview[]>(`${this.apiUrl}/demo`);
  }
  
  getMDemo(id: number) {
    return this.http.get<MDemo>(`${this.apiUrl}/demo/${id}`);
  }

  updateMDemo(mdemo: MDemo) {
    const url = `${this.apiUrl}/demo/${mdemo.id}`;
    return this.http.put(url, mdemo);
  }

  addMDemo(name: string, age: number, minPlayers: number|null, maxPlayers: number|null): Observable<MDemo> {

    const url = `${this.apiUrl}/demo`;
    let createMDemoDto: MDemo = {
      id: 0,
      name: name,
      fDemoId: 1
    };

    return this.http.post<MDemo>(url, createMDemoDto);
  }  

  deleteMDemo(id: number) {
    const url = `${this.apiUrl}/demo/${id}`;
    return this.http.delete(url, { responseType: 'text' });
  }
}
