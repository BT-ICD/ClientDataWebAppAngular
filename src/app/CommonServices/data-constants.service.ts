import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataConstantsService {
  // http://localhost:7459/API/ProjectServerMapping/List/1
readonly BASEAPIURL:string ='http://localhost:7459/API/';
  constructor() { }
}
