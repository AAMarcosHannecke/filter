# Filter Module
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.3.

## Requirements
* Angular material `https://material.angular.io/guide/getting-started`

## Getting started

1. Copy filter folder to your application.  
e.g. `src/app/components/filter`
2. Add FilterModule to the imports in app.module.ts
3. Add directive `<app-filter></app-filter>` to the component template where you want to use the filter

## Directive properties

| Name                                | Description |
|-------------------------------------|-------------|
| @Input() <br> endpoint: string      |  Endpoint to make queries            |
| @Input() <br> cardEndpoint: string  |  Endpoint to get card dimensions         |
| @Input() <br> dimensions: string    |  Card dimensions            |


