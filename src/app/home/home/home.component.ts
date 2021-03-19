import { Component, OnInit } from '@angular/core';
import { EncrytStorageService } from 'src/app/services/security/encryt-storage.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(
        private secureStorageService: EncrytStorageService
    ) { }

    ngOnInit(): void {
        
        setTimeout(() => {
          //alert("Cleaning data");
          this.secureStorageService.setdata('saige-tr', false);
        }, 1000 * 10);
    }

}
