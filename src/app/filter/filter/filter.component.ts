import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Dimension} from '../models/dimension';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im1oYW5uZWNrZUBhbGlnbi1hbHl0aWNzLmNvbSIsImlzcyI6Im9tZ' +
        'WdhIiwic3ViIjoxOSwidXNlciI6eyJpZCI6MTksInVzZXJfbmFtZSI6Im1oYW5uZWNrZUBhbGlnbi1hbHl0aWNzLmNvbSIsImZ1bGxfbmFtZSI6Ik1hcmNvcyBIYW' +
        '5uZWNrZSIsImRpc2FibGVkIjpmYWxzZSwic3VwZXJfdXNlciI6dHJ1ZSwib3JnYW5pc2F0aW9uIjp7ImlkIjoxLCJuYW1lIjoiQWxpZ25BbHl0aWNzIiwic2V0dGlu' +
        'Z3MiOnt9LCJpc19vd25lciI6ZmFsc2V9fSwiaWF0IjoxNTM5NjgyNzI0LCJleHAiOjE1Mzk3NjkxMjR9.sdGG4eoyvwVlRqYQRUEIxzlIlv3MUlhBpq6MYjg3p-8'
    })
  };
  dimensionSelected: Dimension;
  query: Array<object>;
  queryResults: any;
  queryResultsFound: any;
  searchValue: string;
  areAllChecked: boolean;
  conditions: Array<object> = [];
  spinner: boolean;


  @Input() endpoint: string;
  @Input() cardEndpoint: string;
  @Input() dimensions: any;


  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.dimensionSelected = {id: null};

    if (!this.endpoint) {
      this.endpoint = 'http://localhost:9000/api/v2/sources/2';
      this.cardEndpoint = 'http://localhost:9000/api/v2/decks/1/cards/1';
    }
    // Requests
    this.getRequest();
  }

  /**
   * GET
   */
  getRequest() {
    this.http.get(this.cardEndpoint, this.httpOptions)
      .subscribe((res): any => {
        this.dimensions = res['data_source'].dimensions;
      }, err => {
        console.log(err);
      });
  }

  /**
   * POST
   */
  postRequest() {
    // Build query
    this.query = [
      {
        'fields': [{
          name: this.dimensionSelected.display_name,
          alias: 'name'
        }],
        'simple': true
      }
    ];
    if (this.conditions.length > 0) {
      this.query.push(
        {
          'fields': [{
            name: this.dimensionSelected.display_name,
            alias: 'name'
          }],
          'filter': {
            'conditions': this.conditions
          },
          'simple': true
        }
      );
    }

    // Request
    this.http.post(`${this.endpoint}?action=query`, this.query, this.httpOptions)
      .subscribe((res): any => {
        this.spinner = false;
        let resp: any = res;
        if (this.conditions.length > 0) {
          if (this.dimensions.find(obj => obj.display_name === this.dimensionSelected.display_name).values) {
            resp = this.dimensions.find(obj => obj.display_name === this.dimensionSelected.display_name).values;
          } else {
            resp = res[0];
          }
        }

        this.queryResults = this.queryResultsFound = resp; // used for search

        // dimension values
        this.dimensions.forEach(d => {
          if (d.display_name === this.dimensionSelected.display_name) {
            d.values = resp;
          }
        });
        this.allChecked();
      }, err => {
        this.spinner = false;
        console.log(err);
      });
  }

  /**
   * Select dimension
   * @param dimension --> Dimension selected
   */
  selectDimension(dimension: Dimension) {
    this.spinner = true;
    this.dimensionSelected = dimension;
    this.areAllChecked = false;
    this.queryResultsFound = null;
    this.searchValue = '';

    // Check if dimensions have been loaded before
    this.dimensions.forEach((d, i) => {
      if (d.display_name === dimension.display_name && d.values) {
        this.queryResults = d.values;
        this.queryResultsFound = d.values;
        this.allChecked();
      }
      if (i === this.dimensions.length - 1) {
        this.postRequest();
      }
    });
  }

  /**
   * Select / Deselect all
   */
  selectAll() {
    if (this.areAllChecked) {
      this.queryResultsFound.forEach(qr => qr.checked = true);
      this.areAllChecked = true;
    } else {
      this.queryResultsFound.forEach(qr => qr.checked = false);
      this.areAllChecked = false;

    }
  }

  /**
   * Check if all checkboxes are checked
   */
  allChecked() {
    this.areAllChecked = this.queryResultsFound.every(qr => qr.checked);
  }

  /**
   * Search
   */
  search() {
    if (this.searchValue.length === 0) {
      this.queryResultsFound = this.queryResults;
    } else {
      this.queryResultsFound = this.queryResults.filter(qrf => {
        if (qrf.name.toLowerCase().includes(this.searchValue.toLowerCase())) {
          return qrf;
        }
      });
    }
    this.allChecked();
  }

  /**
   * Build conditions
   * @param cond -->  removes 'cond' from 'this.conditions'
   */
  buildConditions(cond?) {
    if (!cond) {
      cond = '';
    }
    this.conditions = [];
    let key = 'in';
    let condition;

    this.dimensions.forEach(d => {
      if (d.excluded) {
        key = 'nin';
      }
      if (d.values) {
        condition = {
          'name': d.display_name,
        };
        condition[key] = d.values.map(v => {
          if (cond.name === d.display_name) {
            v.checked = false;
          } else if (v.checked) {
            return v.name;
          }
        }).filter(e => e);
        if (condition[key].length > 0) {
          this.conditions.push(condition);
        }
      }
    });
    this.allChecked();
  }

  /**
   * Exclude option
   * @param e --> param
   */
  exclude(e) {
    this.dimensions.forEach(d => {
      if (d.display_name === this.dimensionSelected.display_name) {
        d.excluded = e.checked;
      }
    });
    this.buildConditions();
  }
}

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.html',
  styles: ['/deep/.mat-dialog-container{width: 60vw !important;  padding: 0 !important;}']
})
export class DialogComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(FilterComponent, {});
  }
}
