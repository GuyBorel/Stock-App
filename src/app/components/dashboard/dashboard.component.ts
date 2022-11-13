import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InsideSentiment } from 'src/app/models/inside-sentiment';
import { StockDataService } from 'src/app/service/stock-data.service';
import { Sentiment } from '../../models/sentiment';

/*
@Component initialize the component with the specified html template and css properties;
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  insideSentiments: InsideSentiment[] = [] ;
  description: string = '';
  @Input() valuesDashboard: any;
  sentimentsArray: Sentiment[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private stockDataService: StockDataService
  ) {}

  /**
   * @ngOnInit(): void {
   *   initialize the page to display Values for inside-sentiment
   * }
   * @stockDataService.getSentimentsvalues() return all values for inside-sentiment through this service according
   * to the interface InsideSentiment;
   */

  ngOnInit(): void {
    const stock = this.route.snapshot.params['id'];

    this.stockDataService.getSentimentsValues(stock).subscribe({
      next: (values) => {
        values.data.forEach(
          (element: { month: any; change: any; mspr: any }) => {
            let insideSentiment = {
              month: element.month,
              change: element.change,
              MSPR: element.mspr,
            };
            this.insideSentiments.push(insideSentiment);
          }
        );
      },
    });
    this.valuesDashboard = this.stockDataService.symbolValues;
    this.description = this.stockDataService.descriptionSymbol;
    this.sentimentsArray = this.stockDataService.sentiments;
  }

  /*
  @backToListsStock helper function to back to Stocks List.
   */

  backToListsStock() {
    this.router.navigateByUrl(`track-by`);
  }
}
