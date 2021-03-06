import { Component, OnInit,  AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../shared/crud.service';
import { ActivatedRoute, Router } from "@angular/router"; // ActivatedRoue is used to get the current associated components information.
import { Location } from '@angular/common';  // Location service is used to go back to previous component
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.sass']
})
export class EditEventComponent implements OnInit {
  editForm: FormGroup;  // Define FormGroup to event edit form

  constructor(
    private crudApi: CrudService,       // Inject CRUD API in constructor
    private fb: FormBuilder,            // Inject Form Builder service for Reactive forms
    private location: Location,         // Location service to go back to previous component
    private actRoute: ActivatedRoute,   // Activated route to get the current component's inforamation
    private router: Router,             // Router service to navigate to specific component
    private toastr: ToastrService       // Toastr service for alert message
  ) { }

  ngOnInit() {
    this.updateEventData();   // Call updateEventData() as soon as the component is ready 
    const id = this.actRoute.snapshot.paramMap.get('id');  // Getting current component's id or information using ActivatedRoute service
    this.crudApi.GetEvent(id).valueChanges().subscribe(data => {
    this.editForm.setValue(data)  // Using SetValue() method, It's a ReactiveForm's API to store intial value of reactive form 
    })
  }
  // Accessing form control using getters
  get event() {
  return this.editForm.get('event');
  }
  get description() {
  return this.editForm.get('description');
  }
  get time() {
  return this.editForm.get('time');
  }
  get date() {
  return this.editForm.get('date');
  }  

  // Contains Reactive Form logic
  updateEventData() {
    this.editForm = this.fb.group({
    event: [''],
    description: [''],
    time: [''],
    date: ['']
    })
    }
    // Go back to previous component
  goBack() {
  this.location.back();
  }
// Below methods fire when somebody click on submit button
  updateForm(){
  this.crudApi.UpdateEvent(this.editForm.value);       // Update event data using CRUD API
  this.toastr.success(this.editForm.controls['event'].value + ' updated successfully');   // Show succes message when data is successfully submited
  this.router.navigate(['view-event']);               // Navigate to event list page when event data is updated
  }

}
