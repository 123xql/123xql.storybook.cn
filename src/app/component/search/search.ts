import { CommonModule } from '@angular/common';
import { Component, computed, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormComponent } from '../form-component/form-component';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule, FormComponent, ReactiveFormsModule, ],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {

}
