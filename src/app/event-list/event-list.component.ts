import { Component, OnInit } from '@angular/core';
import { Events } from '../shared/events'; 
import { CrudService } from '../shared/crud.service';  // CRUD API service class
import { ToastrService } from 'ngx-toastr';      // Alert message using NGX toastr

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.sass']
})
export class EventListComponent implements OnInit {
  p: number = 1;                      // Settup up pagination variable
  Event: Event[];                 // Save events data in Event's array.
  hideWhenNoEvent: boolean = false; // Hide events data table when no event.
  noData: boolean = false;            // Showing No Event Message, when no event in database.
  preLoader: boolean = true;          
 

  constructor(
    public crudApi: CrudService,
    public toastr: ToastrService
  ) { }

  ngOnInit() {
    this.dataState(); // Initialize event's list, when component is ready
    let s = this.crudApi.GetEventsList(); 
    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.Event = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.Event.push(a as Event);
      })
    })
  }

   // Using valueChanges() method to fetch simple list of events data. It updates the state of hideWhenNoEvent, noData & preLoader variables when any changes occurs in event data list in real-time.
   dataState() {     
    this.crudApi.GetEventsList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if(data.length <= 0){
        this.hideWhenNoEvent = false;
        this.noData = true;
      } else {
        this.hideWhenNoEvent = true;
        this.noData = false;
      }
    })
  }

  // Method to delete event object
  deleteEvent(event) {
    if (window.confirm('Are sure you want to delete this event ?')) { // Asking from user before Deleting event data.
      this.crudApi.DeleteEvent(event.$key) // Using Delete event API to delete event.
      this.toastr.success(event.event + ' successfully deleted!'); // Alert message will show up when event successfully deleted.
    }
  }


}
