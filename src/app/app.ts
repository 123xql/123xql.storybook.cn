import { ChangeDetectionStrategy, Component, inject, effect, computed, viewChild, viewChildren } from '@angular/core';
import { BookSearchStore } from '../store/book-store/book-search-store';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { FormComponent } from "./component/form-component/form-component";

export interface User {
  id: number;
  name: string;
  sex: string;
  city: string;
  hobby: string;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, FormComponent, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  providers: [BookSearchStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  readonly store = inject(BookSearchStore);
  myQuery = '';
  placeholder = '请输入姓名';
  head = viewChildren(FormComponent);
  header = computed(() => this.head().map(item => item.value));

  contactForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: new FormControl("张三", Validators.required),
      id: new FormControl("123456", Validators.required)
    });
    this.init();
    effect(() => {
      const action = this.store.action(); 
      if(action === 'loadAllSuccessfully') {
        console.log('加载全部信息，成功执行了books更新操作');
      }
      if(action === 'loadByQuerySuccessfully') {
        console.log('查询信息，成功执行了books更新操作');
      }
      if(action === 'loadByQueryError') {
        console.log('查询信息，失败执行了books更新操作');
      }
      if(action === 'loadAllError') {
        console.log('加载全部信息，失败执行了books更新操作');
      }
    });
  }

  async init(){
    try{
      await this.store.loadAllBooks();
      console.log('Books loaded successfully:', this.store.books());
    }catch(error){
      console.error('Failed to load books:', error);
    }  
  }

  onSearch() {
    this.store.updateQuery(this.myQuery);
    this.store.loadByQuery(this.myQuery);
  }

  onSubmit() {
    console.log("打印元素值：", this.header());
  }

  get name() {
    return this.contactForm.get('name') as FormControl;
  }

  get id() {
    return this.contactForm.get('id') as FormControl;
  }
}