import { ChangeDetectionStrategy, Component, inject, effect } from '@angular/core';
import { BookSearchStore } from '../store/book-store/book-search-store';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule,FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  providers: [BookSearchStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  readonly store = inject(BookSearchStore);
  myQuery = '';
  constructor() {
    this.store.loadAllBooks();
  }

  onSearch() {
    this.store.updateQuery(this.myQuery);
    this.store.loadByQuery(this.myQuery);
  }
}