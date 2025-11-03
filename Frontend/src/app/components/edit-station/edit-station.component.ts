import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { StationDto } from 'src/app/models/station-dto.model';
import { RailwayService } from 'src/app/services/railway.service';

@Component({
  selector: 'app-edit-station',
  templateUrl: './edit-station.component.html',
  styleUrls: ['./edit-station.component.css'],
})
export class EditStationComponent implements OnInit {

  id: number = 0;
  station: StationDto = {
    id : 0,
    name : '',
    isExpress : false,
    isIntercity : false,
    isRegional : false,
    stateCode : '',
    type : ''
    };
  triedToSubmit = false;

  constructor(private route: ActivatedRoute, private railwayService: RailwayService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.load();
    });
  }


  load(): void {
    this.railwayService.getStation(this.id).subscribe({
      next: data => {
        this.station = data;
      },
      error: error => {
        console.error('Error loading station:', error);
      }
    });
  }

  onSubmit(form: NgForm) {
    this.triedToSubmit = true;

    if (form.valid) {
      this.railwayService.updateStation(this.station).subscribe({
        next: () => {
          this.router.navigate(['/station', this.station.id]);
        },
        error: (error) => {
          alert('station could not be saved ' + error.message);
        }
      });
    }
  }
}
