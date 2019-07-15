import { Component, OnInit } from '@angular/core';
import { AccordService } from '../../service/accord.service';
import { Router } from '@angular/router';

const accordGroupEnum = ['C', 'D', 'E', 'F', 'G', 'A', 'H'];

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  accords = [];
  accordGroupEnum = accordGroupEnum;

  constructor(private accordService: AccordService, private router: Router) { }

  ngOnInit() {
    this.accordService.getAccords().subscribe(accords => {
      this.accords = accords;
    });
  }

  deleteAccord(idAccord: number) {
    this.accordService.deleteAccord(idAccord).subscribe(value => {
      this.accords = this.accords.filter((accord) => {
        return accord.id_accord !== idAccord;
      });
    });
  }

  filterAccordsByGroup(groupValue: string) {
    return this.accords.filter((accord) => {
      return accord.group === groupValue;
    });
  }
}
