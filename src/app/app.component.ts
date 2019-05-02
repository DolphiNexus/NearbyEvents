import { Component} from '@angular/core';
import { CrudService } from './shared/crud.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  p: number = 1;                      // Settup up pagination variable
  Event: Event[];                 // Save events data in Event's array.
  hideWhenNoEvent: boolean = false; // Hide events data table when no event.
  noData: boolean = false;            // Showing No Event Message, when no event in database.
  preLoader: boolean = true;          

  title = 'NearbyEvents';

  constructor(
    public crudApi: CrudService,
    public toastr: ToastrService
  ) { }
}
