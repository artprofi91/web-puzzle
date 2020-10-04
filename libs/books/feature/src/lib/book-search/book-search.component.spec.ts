import {
  async,
  ComponentFixture,
  inject,
  TestBed
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { addToReadingList, undoAddToReadingList } from '@tmo/books/data-access';
import { createBook, SharedTestingModule } from '@tmo/shared/testing';

import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';

describe('BookSearchComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;
  let booksList: any;
  let dispatchSpy: any;
  let book: any;
  let button: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, NoopAnimationsModule, SharedTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject([Store], (store: Store) => {
    dispatchSpy = spyOn(store, 'dispatch');
    booksList = [createBook('First'), createBook('Second')];
    component.searchForm.controls.term.setValue('First');
    component.books = booksList;
    fixture.detectChanges();

    book = fixture.debugElement.queryAll(By.css('.book'))[0];
    button = book.query(By.css('button')).nativeElement;
    button.click();
  }));

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should dispatch addToReadingList action', () => {
    expect(dispatchSpy).toHaveBeenCalledWith(
      addToReadingList({ book: booksList[0] })
    );
  });

  it('should open snackbar in addToReadingList action', () => {
    const matSnackBarEl = document.querySelector('snack-bar-container');
    expect(matSnackBarEl).toBeTruthy();
  });

  it('should dispatch undoAddToReadingList action on Undo button click', () => {
    const undoButton = document.querySelector(
      'div.mat-simple-snackbar-action button'
    );
    const mouseEvent = new MouseEvent('click');
    undoButton.dispatchEvent(mouseEvent);
    fixture.detectChanges();
    expect(dispatchSpy).toHaveBeenCalledWith(
      undoAddToReadingList({ book: booksList[0] })
    );
  });

  it('should call searchBooks on searchExample', () => {
    spyOn(component, 'searchBooks');
    component.searchExample();
    expect(component.searchBooks).toHaveBeenCalled();
  });

  it('should setForm value on searchBooks', () => {
    spyOn(component, 'searchForm');
    component.searchBooks();
    expect(component.searchForm).toBeDefined();
  });
});
