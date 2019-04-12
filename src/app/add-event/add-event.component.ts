import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';    // CRUD services API
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.sass']
})
export class AddEventComponent implements OnInit {
  public eventsForm: FormGroup;  // Define FormGroup to event form

  constructor(
    public crudApi: CrudService,  // CRUD API services
    public fb: FormBuilder,       // Form Builder service for Reactive forms
    public toastr: ToastrService  // Toastr service for alert message
  ) { }

  ngOnInit() {
    this.crudApi.GetEventsList();  // Call GetEventsList() before main form is being called
    this.eventForm();              // Call event form when component is ready
  }

  // Reactive event form
  eventForm() {
    this.eventsForm = this.fb.group({
      event: [''],
      description: [''],
      time: [''],
      date: ['']
    })  
  }

   // Accessing form control using getters
   get event() {
    return this.eventsForm.get('event');
  }

  get description() {
    return this.eventsForm.get('desciption');
  }  

  get time() {
    return this.eventsForm.get('time');
  }

  get date() {
    return this.eventsForm.get('date');
  }

  // Reset event form's values
  ResetForm() {
    this.eventsForm.reset();
  }  

  submitEventData() {
    this.crudApi.AddEvent(this.eventsForm.value); // Submit event data using CRUD API
    this.toastr.success(this.eventsForm.controls['event'].value + ' successfully added!'); // Show success message when data is successfully submited
    this.ResetForm();  // Reset form when clicked on reset button
   };

}
