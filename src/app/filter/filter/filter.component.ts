import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Dimension} from '../models/dimension';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im1oYW5uZWNrZUBhbGlnbi1hbHl0aWNzLmNvbSIsImlzcyI' +
        '6Im9tZWdhIiwic3ViIjoxOSwidXNlciI6eyJpZCI6MTksInVzZXJfbmFtZSI6Im1oYW5uZWNrZUBhbGlnbi1hbHl0aWNzLmNvbSIsImZ1bGxfbmFtZSI6Ik' +
        '1hcmNvcyBIYW5uZWNrZSIsImRpc2FibGVkIjpmYWxzZSwic3VwZXJfdXNlciI6dHJ1ZSwib3JnYW5pc2F0aW9uIjp7ImlkIjoxLCJuYW1lIjoiQWxpZ25BbH' +
        'l0aWNzIiwic2V0dGluZ3MiOnt9LCJpc19vd25lciI6ZmFsc2V9fSwiaWF0IjoxNTM5MzU5MjU4LCJleHAiOjE1Mzk0NDU2NTh9.nONxqGQvTCG1jf0YYpwt9C' +
        'h6EAup2ZzleKE6K5c2Odo'
    })
  };
  selectedDimension: Dimension;
  query: object;
  queryResults: any;
  areAllChecked: boolean;

  @Input() endpoint: string;
  @Input() cardEndpoint: string;
  @Input() dimensions: Array<Dimension>;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.selectedDimension = {id: null};

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
    this.query = {
      'fields': [
        {
          name: this.selectedDimension.display_name,
          alias: 'name'
        }
      ],
      simple: true
    };
    // Request
    this.http.post(`${this.endpoint}?action=query`, this.query, this.httpOptions)
      .subscribe((res): any => {
        console.log(res);
        this.queryResults = res;
      }, err => {
        console.log(err);
      });
  }

  /**
   * Select dimension
   * @param dimension --> Dimension selected
   */
  selectDimension(dimension: Dimension) {
    this.selectedDimension = dimension;
    this.areAllChecked = false;
    this.queryResults = null;
    console.log(this.selectedDimension);
    this.postRequest();
  }

  /**
   * Select / Deselect all
   * @param e --> event target checked
   */
  selectAll(e: boolean) {
    if (e) {
      this.queryResults.forEach(qr => qr.checked = true);
      this.areAllChecked = true;
    } else {
      this.queryResults.forEach(qr => qr.checked = false);
      this.areAllChecked = false;
    }
  }

  /**
   * Check if all checkboxes are checked
   */
  allChecked() {
    this.areAllChecked = this.queryResults.every(qr => qr.checked);
  }


}
