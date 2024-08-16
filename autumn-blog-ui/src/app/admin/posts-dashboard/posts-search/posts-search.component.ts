import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-posts-search',
  standalone: true,
  imports: [ReactiveFormsModule,  MatRadioModule, FormsModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatButtonModule, MatLabel,
    MatCardModule,
    MatInputModule,
    MatSortModule,
    MatDatepickerModule,],
  templateUrl: './posts-search.component.html',
  styleUrl: './posts-search.component.scss'
})
export class PostsSearchComponent {
  searchForm: FormGroup;

  @Output() searchCriteria = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      title: [''],
      createdDate: [''],
      updatedDate: [''],
      status: [''],
      category: ['']
    });
  }

  onSearch(): void {
    this.searchCriteria.emit(this.searchForm.value);
  }

  onReset(): void {
    this.searchForm.reset();
    this.searchCriteria.emit(this.searchForm.value);
  }
}
