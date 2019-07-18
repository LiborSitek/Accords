import { Component, OnInit } from '@angular/core';
import { AccordService } from '../../service/accord.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Config } from '../../../config';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  renderData = [
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '']
  ];
  accordId: number = null;
  accordGroup = Config.accordGroupEnum[0];
  accordType = Config.accordTypeEnum[0];
  accordSort: number;
  accordGroupEnum = Config.accordGroupEnum;
  accordTypeEnum = Config.accordTypeEnum;
  selectInputVisibility = false;
  selectInputPosition = {
    top: '0px', left: '0px'
  };
  selectOption: string[] = [];
  selectedValue: string;
  selectedRow: number;
  selectedColumn: number;

  constructor(private accordService: AccordService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');

    if (id) {
      this.accordService.getAccord(id).subscribe(accord => {
        this.accordId = accord.id_accord;
        this.accordGroup = accord.group;
        this.accordType = accord.type;
        this.accordSort = accord.sort;
        this.renderData = JSON.parse(accord.render_data);
      });
    }
  }

  onClick(event: MouseEvent, row: number, column: number) {
    this.selectedValue = '';
    this.selectedRow = row;
    this.selectedColumn = column;
    this.selectInputPosition.top = event.clientY + 'px';
    this.selectInputPosition.left = event.clientX + 'px';
    if (this.selectedColumn === 6) {
      this.selectOption = Config.thresholdSelect;
    } else if (this.selectedRow === 0) {
      this.selectOption = Config.stringRemarkSelect;
    } else {
      this.selectOption = Config.chordFingerSelect;
    }
    this.selectInputVisibility = true;
  }

  onSelect() {
    this.renderData[this.selectedRow][this.selectedColumn] = this.selectedValue;
    this.selectInputVisibility = false;
  }

  saveData() {
    const data = {
      group: this.accordGroup,
      type: this.accordType,
      sort: this.accordSort,
      render_data: this.renderData
    };
    this.accordService.getAccordsByGroupAndType(this.accordGroup, this.accordType).subscribe(accordList => {
      if (this.accordId) {
        if (accordList.length === 0 || (accordList.length === 1 && accordList[0].id_accord === this.accordId)) {
          this.accordService.updateAccord(this.accordId, data).subscribe(value => {
            this.router.navigate(['/list']);
          });
        }
      } else {
        if (accordList.length === 0) {
          this.accordService.saveAccord(data).subscribe(value => {
            this.router.navigate(['/list']);
          });
        }
      }
    });
  }

  deleteAccord() {
    this.accordService.deleteAccord(this.accordId).subscribe(value => {
      this.router.navigate(['/list']);
    });
  }
}
