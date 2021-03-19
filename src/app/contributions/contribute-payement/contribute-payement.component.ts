import { Component, OnInit } from '@angular/core';
import { SaigeCheckoutService } from 'src/app/services/http/payment/saige-checkout.service';

@Component({
  selector: 'app-contribute-payement',
  templateUrl: './contribute-payement.component.html',
  styleUrls: ['./contribute-payement.component.css']
})
export class ContributePayementComponent implements OnInit {

    constructor(
        private checkoutService: SaigeCheckoutService
    ) { }

    ngOnInit(): void {
    }



    onPay() {
       // this.checkoutService.checkOutPayment();
    }

}
