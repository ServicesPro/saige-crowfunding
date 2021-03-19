import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { loadStripe } from '@stripe/stripe-js';
import { AnyMxRecord } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class SaigeCheckoutService {

    checkoutUrl: string = "https://www.saige-financialplateform.com/create-checkout-session";


    stripe: any;

    constructor(
        private http: HttpClient 
    ) { 
        
    }


    async checkOutPayment(amount: number, name: string, email: string, project_data: any, errorCallback: any) {

        this.stripe = await loadStripe(
            'pk_test_51HtWOeCU7mLHHV7kuQN3I543ZGUUjtUrYwjllSNUMix1QwFBYx22pArXczY0s816bFV0M1OZA38nTDllWu5wZgrv00OtvAWdOs'
        );

        let options = {headers: {'Content-Type': 'application/json'}};

        var data =  {
            email: email,
            name: name,
            amount: amount,
            project: project_data
        };

        
        fetch(this.checkoutUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
               data
            )
          })
          .then(function(response) {
            //For test
            const data = response.json();
            //console.log("Data on check form", data);
            return data;
          })
          .then( (session) => {
            return this.stripe.redirectToCheckout({ sessionId: session.id });
          })
          .then(function(result) {
            // If `redirectToCheckout` fails due to a browser or network
            // error, you should display the localized error message to your
            // customer using `error.message`.
            if (result.error) {
              errorCallback();
              alert(result.error.message);
            }
          })
          .catch(function(error) {
            errorCallback();
            //console.error('Error:', error);
          });
        
        
        
    }
}
