import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor() { }

  pokeResult = [];

  @Input() searchActive = false;
  @Output() searchActiveChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {
  }

  toggleSearchActive(bool: boolean) {
    this.searchActiveChange.emit(bool);
  }

}
