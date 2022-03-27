import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

export interface GenResult {
  genI: boolean;
  genII: boolean;
  genIII: boolean;
  genIV: boolean;
  genV: boolean;
  genVI: boolean;
  genVII: boolean;
  genVIII: boolean;
}

export const  gens: any[] = [
  {
    id: 'gen-i',
    label: 'Gen I',
    range: {
      from: 1,
      to: 151,
    },
  },
  {
    id: 'gen-ii',
    label: 'Gen II',
    range: {
      from: 152,
      to: 251,
    },
  },
  {
    id: 'gen-iii',
    label: 'Gen III',
    range: {
      from: 252,
      to: 386,
    },
  },
  {
    id: 'gen-iv',
    label: 'Gen IV',
    range: {
      from: 387,
      to: 493,
    },
  },
  {
    id: 'gen-v',
    label: 'Gen V',
    range: {
      from: 494,
      to: 649,
    },
  },
  {
    id: 'gen-vi',
    label: 'Gen VI',
    range: {
      from: 650,
      to: 721,
    },
  },
  {
    id: 'gen-vii',
    label: 'Gen VII',
    range: {
      from: 722,
      to: 809,
    },
  },
  {
    id: 'gen-viii',
    label: 'Gen VIII',
    range: {
      from: 810,
      to: 898,
    },
  },
];

@Component({
  selector: 'app-gen-dropdown',
  templateUrl: './gen-dropdown.component.html',
  styleUrls: ['./gen-dropdown.component.scss'],
})
export class GenDropdownComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    window.addEventListener('click', (event: any) => {
      let isInGenDropdown = event.path.some(
        (el: any) => el.tagName === 'APP-GEN-DROPDOWN'
      );
      if (!isInGenDropdown && this.active) {
        this.active = false;
      }
    });
  }

  @Output() formResult: EventEmitter<GenResult> = new EventEmitter<GenResult>();
  active = false;
  gens = gens;

  toggleActive() {
    this.active = !this.active;
  }

  onSubmit(form: NgForm) {
    this.formResult.emit(form.value);
    this.active = false;
  }
}
