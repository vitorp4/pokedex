import { SortResult } from '../sort-dropdown/sort-dropdown.component';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { GenResult } from '../gen-dropdown/gen-dropdown.component';

@Component({
  selector: 'app-sort-gen',
  templateUrl: './sort-gen.component.html',
  styleUrls: ['./sort-gen.component.scss'],
})
export class SortGenComponent implements OnInit {
  constructor() {}

  @Output() sortResult: EventEmitter<SortResult> =
    new EventEmitter<SortResult>();
  @Output() genResult: EventEmitter<GenResult> = new EventEmitter<GenResult>();

  ngOnInit(): void {}

  onSortResult(event: SortResult) {
    this.sortResult.emit(event);
  }
  onGenResult(event: GenResult) {
    this.genResult.emit(event);
  }
}
