import {Component, OnInit} from '@angular/core';
import {Dimension} from '../../filter/models/dimension';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.scss']
})
export class TestComponentComponent implements OnInit {
  dimensions: Array<Dimension>;

  constructor() {
  }

  ngOnInit() {
    this.dimensions = [
      {
        data_options: {},
        display_name: 'City',
        id: 20,
        options: {},
        type: 'category',
        value: 'city',
      },
      {
        data_options: {},
        display_name: 'Bottle Size',
        id: 19,
        options: {},
        type: 'category',
        value: 'city',
      },
      {
        data_options: {},
        display_name: 'Spirit Category',
        id: 18,
        options: {},
        type: 'category',
        value: 'city',
      },
      {
        aggregation: 'sum',
        data_options: {},
        display_name: 'Total Volume',
        id: 17,
        options: {},
        type: 'category',
        value: 'city',
      },
      {
        aggregation: 'sum',
        data_options: {},
        display_name: 'Total Value',
        id: 16,
        options: {},
        type: 'category',
        value: 'city',
      },
      {
        data_options: {},
        display_name: 'Average Price per Litre',
        id: 15,
        options: {},
        type: 'category',
        value: 'city',
      },
      {
        data_options: {},
        display_name: 'Month',
        id: 14,
        options: {format: '%b %y'},
        type: 'time',
        value: 'city',
      },
    ];
  }
}
