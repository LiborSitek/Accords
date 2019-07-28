import { Component, OnInit } from '@angular/core';
import { AccordService } from '../../service/accord.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Config } from '../../../config';
import { Accord } from '../../model/accord';
import { FlashMessagesService } from 'angular2-flash-messages';

const accordRemarkRow = 0;
const accordThresholdColumn = 6;

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  accord: Accord;
  accordGroupEnum: string[];
  accordTypeEnum: string[];
  selectInputVisibility: boolean;
  selectInputPosition: {top: string, left: string };
  selectOption: string[];
  selectedValue: string;
  selectedRow: number;
  selectedColumn: number;
  accordRemarkRow = accordRemarkRow;
  accordThresholdColumn = accordThresholdColumn;

  constructor(
    private accordService: AccordService,
    private route: ActivatedRoute,
    private router: Router,
    private flashMessageService: FlashMessagesService
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');

    if (id) {
      this.accordService.getAccordById(id).subscribe(accord => {
        this.accord = accord;
      });
    }

    this.accord = {
      id_accord: null,
      group: Config.accordGroupEnum[0],
      type: Config.accordTypeEnum[0],
      sort: null,
      render_data: [
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '']
      ]
    };
    this.selectInputPosition = { top: '0px', left: '0px'};
    this.selectInputVisibility = false;
    this.accordGroupEnum = Config.accordGroupEnum;
    this.accordTypeEnum = Config.accordTypeEnum;
    this.selectOption = [];
  }

  onClick(event: MouseEvent, row: number, column: number) {
    this.selectedValue = '';
    this.selectedRow = row;
    this.selectedColumn = column;
    this.selectInputPosition.top = event.clientY + 'px';
    this.selectInputPosition.left = event.clientX + 'px';
    if (this.selectedColumn === this.accordThresholdColumn) {
      this.selectOption = Config.thresholdSelect;
    } else if (this.selectedRow === this.accordRemarkRow) {
      this.selectOption = Config.stringRemarkSelect;
    } else {
      this.selectOption = Config.chordFingerSelect;
    }
    this.selectInputVisibility = true;
  }

  onSelect() {
    this.accord.render_data[this.selectedRow][this.selectedColumn] = this.selectedValue;
    this.selectInputVisibility = false;
  }

  saveData() {
    this.accordService.findAccordsByGroupAndType(this.accord.group, this.accord.type).subscribe(accordList => {
      if (this.accord.id_accord) {
        if (accordList.length === 0 || (accordList.length === 1 && accordList[0].id_accord === this.accord.id_accord)) {
          this.accordService.updateAccord(this.accord).subscribe(apiResult => {
            if (apiResult.result) {
              this.flashMessageService.show('Položka byla upravena', { cssClass: 'alert alert-success' });
            } else {
              this.flashMessageService.show('Položku se nepodařilo upravit', { cssClass: 'alert alert-danger' });
            }
            this.router.navigate(['/list']);
          });
        } else {
          this.flashMessageService.show('Položka s takovými údaji již existuje', { cssClass: 'alert alert-warning' });
        }
      } else {
        if (accordList.length === 0) {
          this.accordService.saveAccord(this.accord).subscribe(apiResult => {
            if (apiResult.result) {
              this.flashMessageService.show('Položka byla vytvořena', { cssClass: 'alert alert-success' });
            } else {
              this.flashMessageService.show('Položku se nepodařilo vytvořit', { cssClass: 'alert alert-danger' });
            }
            this.router.navigate(['/list']);
          });
        } else {
          this.flashMessageService.show('Položka s takovými údaji již existuje', { cssClass: 'alert alert-warning' });
        }
      }
    });
  }

  deleteAccord() {
    this.accordService.deleteAccord(this.accord.id_accord).subscribe(apiResult => {
      if (apiResult.result) {
        this.flashMessageService.show('Položka byla odstraněna', { cssClass: 'alert alert-success' });
      } else {
        this.flashMessageService.show('Položku se nepodařilo odstranit', { cssClass: 'alert alert-danger' });
      }
      this.router.navigate(['/list']);
    });
  }
}
