import { Injectable } from '@angular/core';
import { Events } from '../shared/events';  // Event data type interface class
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database, Data list and Single object


@Injectable({
  providedIn: 'root'
})
export class CrudService {
  eventsRef: AngularFireList<any>;    // Reference to Event data list, its an Observable
  eventRef: AngularFireObject<any>;   // Reference to Event object, its an Observable too
  
  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private db: AngularFireDatabase) { }

   // Create Event
   AddEvent(events: Events) {
    this.eventsRef.push({
      event: events.event,
      description: events.description,
      time: events.time,
      date: events.date
    })
  }

   // Fetch Single Event Object
   GetEvent(id: string) {
    this.eventRef = this.db.object('events-list/' + id);
    return this.eventRef;
  }

   // Fetch Events List
   GetEventsList() {
    this.eventsRef = this.db.list('events-list');
    return this.eventsRef;
  }  

  // Update Event Object
  UpdateEvent(events: Events) {
    this.eventRef.update({
      event: events.event,
      description: events.description,
      time: events.time,
      date: events.date
    })
  }  

   // Delete Event Object
   DeleteEvent(id: string) { 
    this.eventRef = this.db.object('events-list/'+id);
    this.eventRef.remove();
  }

}
