import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';
@Component({
  selector: 'app-saige-summary',
  templateUrl: './saige-summary.component.html',
  styleUrls: ['./saige-summary.component.css']
})



export class SaigeSummaryComponent implements OnInit, AfterViewInit {

  constructor() { }

  

    ngAfterViewInit(): void {

        function isInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)

            );
        }

        document.querySelectorAll('.number-animate').forEach( (el) => {

            const endValue = el.getAttribute('data-end-value');
                const incrementValue = el.getAttribute('data-increment');
                const durationValue = el.getAttribute('data-duration');
            
                
                if (endValue) numberAnimation(el, endValue, incrementValue, durationValue);
                
                
            
            
                function numberAnimation(el, endValue, incrementor, duration) {
                    anime({
                        targets: el,
                        textContent: endValue,
                        round: incrementor ? 1/incrementor : 1/5,
                        easing: 'easeInOutQuad',
                        duration: duration ? duration : 4000,
                    });
                }

                el.addEventListener('mouseover', function() {
           
                    this.innerHTML = "1";
                    
                    const endValue = this.getAttribute('data-end-value');
                    const incrementValue = this.getAttribute('data-increment');
                    const durationValue = this.getAttribute('data-duration');
                      
                    if (endValue) numberAnimation(el, endValue, incrementValue, durationValue);
                      
                });
        
        });
    }

    ngOnInit(): void {
    }

}
