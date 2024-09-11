import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../book-list/books.model';

@Component({
  selector: 'app-book-collection',
  templateUrl: './book-collection.component.html',
  styleUrls: ['./book-collection.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class BookCollectionComponent {
//   @Input() books: ReadonlyArray<Book> = [];
  @Input() books: any = [];
  @Output() remove = new EventEmitter<string>();
}