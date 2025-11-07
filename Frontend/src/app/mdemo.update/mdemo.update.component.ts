import { Component, OnInit, inject, InputSignal, input, effect } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-mdemo-update.component',
  imports: [FormsModule],
  templateUrl: './mdemo.update.component.html',
  styleUrl: './mdemo.update.component.css'
})
export class MDemoUpdateComponent {

  protected mdemoIdVal: number = 0;
  protected mdemoNameVal: string | null = null;
  protected mdemoAgeVal: number | null = null;
  protected mdemoMaxPlayerVal: number | null = null;
  protected mdemoMinPlayerVal: number | null = null;

  id: InputSignal<number | undefined> = input();

  private dataService = inject(DataService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor() {
    effect(() => {
      this.mdemoIdVal = this.id()!;
      this.load();
    });
  }

  load() {
    this.dataService.getMDemo(this.mdemoIdVal).subscribe({
      next: data => {
        this.mdemoNameVal = data.name;

      },
      error: error => {
        console.error('Error loading mdemo:', error)
      }
    })
  }

  onUpdateMDemo() {
    this.dataService.updateMDemo({
      id: this.mdemoIdVal,
      name: this.mdemoNameVal!,
      fDemoId: 1
    }).subscribe({
      next: () => {
        this.router.navigate(['/mdemos']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  validateMinMaxPlayers(controlMin: NgModel, controlMax: NgModel) {
    const minValue = controlMin.value;
    const maxValue = controlMax.value;

    if (minValue && minValue < 1) {
      minValue.control.setErrors({ minPlayerInvalid: true });
    }
    if ((maxValue && maxValue < 1)) {
      minValue.control.setErrors({ maxPlayerInvalid: true });
    }
    if (minValue && maxValue && minValue > maxValue) {
      minValue.control.setErrors({ minGreaterMax: true });
      minValue.control.setErrors({ minGreaterMax: true });
    }
  }

  validateAge(control: NgModel) {
    const value = control.value;
    if (value < 0) {
      control.control.setErrors({ ageInvalid: true });
    } else {
      control.control.setErrors(null);
    }
  }
}
