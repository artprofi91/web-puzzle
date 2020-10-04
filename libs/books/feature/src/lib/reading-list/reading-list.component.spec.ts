import {
  async,
  ComponentFixture,
  inject,
  TestBed
} from '@angular/core/testing';
import {
  createReadingListItem,
  SharedTestingModule
} from '@tmo/shared/testing';

import { ReadingListComponent } from './reading-list.component';
import { BooksFeatureModule } from '@tmo/books/feature';
import {
  removeFromReadingList,
  undoRemoveFromReadingList
} from '@tmo/books/data-access';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ReadingListItem } from '@tmo/shared/models';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;
  let readingList: ReadingListItem[];
  let dispatchSpy: any;
  let listItem: any;
  let button: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BooksFeatureModule,
        SharedTestingModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject([Store], (store: Store) => {
    dispatchSpy = spyOn(store, 'dispatch');
    readingList = [
      createReadingListItem('First'),
      createReadingListItem('Second')
    ];
    component.readingList$ = of(readingList);
    fixture.detectChanges();

    listItem = fixture.debugElement.queryAll(By.css('.reading-list-item'))[0];
    button = listItem.query(By.css('button')).nativeElement;
    button.click();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch removeFromReadingList action', () => {
    expect(dispatchSpy).toHaveBeenCalledWith(
      removeFromReadingList({ item: readingList[0] })
    );
  });

  it('should open snackbar on removeFromReadingList action', () => {
    const matSnackBarEl = document.querySelector('snack-bar-container');
    expect(matSnackBarEl).toBeTruthy();
  });

  it('should dispatch undoRemoveFromReadingList action on Undo button click', () => {
    const undoButton = document.querySelector(
      'div.mat-simple-snackbar-action button'
    );
    const mouseEvent = new MouseEvent('click');
    undoButton.dispatchEvent(mouseEvent);
    fixture.detectChanges();
    expect(dispatchSpy).toHaveBeenCalledWith(
      undoRemoveFromReadingList({ item: readingList[0] })
    );
  });
});
