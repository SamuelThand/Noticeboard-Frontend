import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  protected searchString: string = '';
  @Output() searchChange = new EventEmitter<string>();

  protected onSearchChange(): void {
    this.searchChange.emit(this.searchString);
  }
}
