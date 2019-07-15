import { Component, OnInit } from '@angular/core';
import { AccordService } from '../../service/accord.service';
import { ActivatedRoute, Router } from '@angular/router';

const accordGroupEnum = ['C', 'D', 'E', 'F', 'G', 'A', 'H'];

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
  accordGroup = 'C';
  accordName: string;
  accordSort: number;
  accordGroupEnum = accordGroupEnum;
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
        this.accordName = accord.name;
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
      this.selectOption = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
    } else if (this.selectedRow === 0) {
      this.selectOption = ['', 'x', 'o'];
    } else {
      this.selectOption = ['', '1', '2', '3', '4', '5'];
    }
    this.selectInputVisibility = true;
  }

  onSelect() {
    this.renderData[this.selectedRow][this.selectedColumn] = this.selectedValue;
    this.selectInputVisibility = false;
  }

  saveData() {
    if (this.accordName) {
      const data = {
        group: this.accordGroup,
        name: this.accordName,
        sort: this.accordSort,
        render_data: this.renderData
      };
      if (this.accordId) {
        this.accordService.updateAccord(this.accordId, data).subscribe(value => {
          this.router.navigate(['/list']);
        });
      } else {
        this.accordService.saveAccord(data).subscribe(value => {
          this.router.navigate(['/list']);
        });
      }
    }
  }
}
