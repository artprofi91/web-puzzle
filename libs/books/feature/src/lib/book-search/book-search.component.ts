import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit, OnDestroy {
  books: ReadingListBook[];

  searchForm = this.fb.group({
    term: ''
  });

  ngDestroyed$ = new Subject();

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.getBooks();
    this.instantSearch();
  }

  getBooks(): void {
    this.store
      .select(getAllBooks)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((books) => {
        this.books = books;
      });
  }

  instantSearch(): void {
    this.searchForm.controls.term.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((res: any) => {
        this.searchBooks();
      });
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks() {
    this.searchForm.value.term
      ? this.store.dispatch(searchBooks({ term: this.searchTerm }))
      : this.store.dispatch(clearSearch());
  }

  ngOnDestroy(): void {
    this.ngDestroyed$.next();
  }
}
