import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StationOverview } from 'src/app/models/station-overview.model';
import { RailwayService } from 'src/app/services/railway.service';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css'],
})
export class StationsComponent implements OnInit {
  stations: StationOverview[] = [];

  constructor(private router: Router,private railwayService: RailwayService) {}

  ngOnInit(): void {
    this.railwayService.getStationsOverview().subscribe({
      next: data=>{
        this.stations = data;
      },
      error: error=>{
        console.error('Error loading stations:', error);
      }
    });
  }

  showDetail(station: StationOverview): void {
    this.router.navigate(['/station',station.id]);
  }
}
