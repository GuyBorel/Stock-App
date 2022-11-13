import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0)')
      ),
    ]),
  ],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Stock Tracking App';

  form = {
    symbol: '',
    exchange: 'Nasdaq',
  };

  ngOnInit(): void {
    // url to backend service
  }

  ngAfterViewInit(): void {}
}
