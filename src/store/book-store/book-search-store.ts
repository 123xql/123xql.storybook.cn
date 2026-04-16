import { computed, inject } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  pipe,
  switchMap,
  tap,
} from 'rxjs';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { Book } from '../../model/book';
import { BookService } from '../../service/book-service';

type BookSearchState = {
  books: Book[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
  action: string | null;
};

const initialState: BookSearchState = {
  books: [],
  isLoading: false,
  filter: { query: '', order: 'asc' },
  action: null,
};

export const BookSearchStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ books, filter }) => ({
    booksCount: computed(() => books().length),
    sortedBooks: computed(() => {
      const direction = filter.order() === 'asc' ? 1 : -1;
      return books().sort(
        (a, b) => direction * a.title.localeCompare(b.title)
      );
    }),
  })),
  // BooksService can be injected within the withMethodsfactory.
  withMethods((store, bookService = inject(BookService)) => ({
    updateQuery(query: string): void {
      patchState(store, (state) => ({
        filter: { ...state.filter, query },
      }));
    },
    updateOrder(order: 'asc' | 'desc'): void {
      patchState(store, (state) => ({
        filter: { ...state.filter, order },
      }));
    },
    async loadAllBooks(): Promise<void> {
      try {
        const books = await bookService.loadAllBooks();
        patchState(store, { books: books, isLoading: false });
      } catch (error) {
        console.error("错误:", error);
        patchState(store, { isLoading: false, action: 'loadAllError' });
      }
    },
    loadByQuery: rxMethod<string>(
      pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true , action: null })),
        switchMap((query) => {
          return bookService.getByQuery(query).pipe(
            tapResponse({
              next: (books) => {
                patchState(store, {books: books, action: 'loadByQuerySuccessfully'});
              },
              error: (error) => { 
                console.error("错误:", error); 
                patchState(store, { action: 'loadByQueryError' });
              },
              finalize: () => patchState(store, { isLoading: false }),
            })
          );
        })
      )
    ),
  }))
);