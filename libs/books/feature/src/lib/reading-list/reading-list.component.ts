import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import {
  getReadingList,
  removeFromReadingList,
  undoRemoveFromReadingList
} from '@tmo/books/data-access';
import { ReadingListItem } from '@tmo/shared/models';
import { take } from 'rxjs/operators';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(
    private readonly store: Store,
    private readonly matSnackBar: MatSnackBar
  ) {}

  removeFromReadingList(item: ReadingListItem) {
    this.store.dispatch(removeFromReadingList({ item }));
    const message = `Removed ${item.title} from reading list.`;
    this.matSnackBar
      .open(message, 'Undo', {
        duration: 2000
      })
      .onAction()
      .pipe(take(1))
      .subscribe(() =>
        this.store.dispatch(undoRemoveFromReadingList({ item }))
      );
  }
}
