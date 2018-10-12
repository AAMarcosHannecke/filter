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
      // 'Authorization': 'Bearer'
    })
  };
  selectedDimension: Dimension;

  @Input() endpoint: string;
  @Input() dimensions: Array<Dimension>;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    console.log(this.dimensions);

    this.selectedDimension = {id: null};

    // Requests
    this.getRequest();
  }

  /**
   * GET
   */
  getRequest() {
    this.http.get('https://jsonplaceholder.typicode.com/posts')
      .subscribe(res => {
        console.log(res);
      }, err => {
        alert('error');
        console.log(err);
      });
  }

  /**
   * POST
   */
  postRequest() {
    const body = {};
    this.http.post(`${this.endpoint}?action=query`, body, this.httpOptions)
      .subscribe(res => {
        console.log(res);
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
    this.postRequest();
  }
}
