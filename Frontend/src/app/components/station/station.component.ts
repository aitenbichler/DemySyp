import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { StationDto } from 'src/app/models/station-dto.model';
import { RailwayService } from 'src/app/services/railway.service';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css'],
})
export class StationComponent implements OnInit {

  id: number = 0;
  station: StationDto = {
    id : 0,
    name : '',
    isExpress : false,
    isIntercity : false,
    isRegional : false,
    stateCode : '',
    type : ''
  }

  constructor(private route: ActivatedRoute, private railwayService: RailwayService, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.load();
    });
  }


  load(): void {
    this.railwayService.getStation(this.id).subscribe({
      next: data=>{
        this.station = data;
      },
      error: error=>{
        console.error('Error loading station:', error);
      }
    });
  }
  
  editStation(station: StationDto): void {
    this.router.navigate(['/edit-station',station.id]);
  }  
}
