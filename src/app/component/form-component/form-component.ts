import { CommonModule } from '@angular/common';
import { Component, forwardRef, input} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-component',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form-component.html',
  styleUrl: './form-component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormComponent),
      multi: true
    }
  ]
})
export class FormComponent implements ControlValueAccessor{
  value: string = '';

  placeholder = input.required<string>();

  isDisabled = input(false);

  /**
   * @ignore
   * 这是内部使用的私有属性，不对外暴露
   */
  private onChange = (value: string | null) => { };

  /**
   * @ignore
   * 这是内部使用的私有属性，不对外暴露
   */
  private onTouched = () => { };


  writeValue(value: string | null): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);  
    this.onTouched();         
  }
}
