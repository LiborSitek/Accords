import { Component, OnInit } from '@angular/core';
import { AccordService } from '../../service/accord.service';
import { Router } from '@angular/router';
import { Accord } from '../../model/accord';
import { Config } from '../../../config';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  accords: Accord[];
  accordGroupEnum: string[];

  constructor(private accordService: AccordService, private router: Router) { }

  ngOnInit() {
    this.accordGroupEnum = Config.accordGroupEnum;
    this.accordService.getAccords().subscribe(accords => {
      this.accords = accords;
    });
  }

  filterAccordsByGroup(groupValue: string): Accord[] {
    return this.accords.filter(accord => {
      return accord.group === groupValue;
    }).sort((a, b) => a.sort - b.sort);
  }
}
