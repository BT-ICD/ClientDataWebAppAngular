import { Component } from '@angular/core';
import {Event, NavigationStart, NavigationEnd, Router, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ClientDataWebApp';
  loading:boolean=true;
/**
 *
 */
constructor(private router:Router) {
 // super();
  this.router.events.subscribe((routerEvent:Event)=>{
    this.checkRouterEvent(routerEvent);
  });
}
  checkRouterEvent(routerEvent:Event):void{
    if(routerEvent instanceof NavigationStart){
      console.log('Navigation Start');
      this.loading=true;
    }
    if(routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError)
    {
      console.log('Navigation Ends');
      this.loading=false;
    }
  }
}
