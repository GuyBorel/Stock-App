import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockDataService } from '../../service/stock-data.service';
import { Router } from '@angular/router';
import { Sentiment } from 'src/app/models/sentiment';

/*
@Component initialize the component with the specified html template and css properties;
 */

@Component({
  selector: 'app-track-by',
  templateUrl: './track-by.component.html',
  styleUrls: ['./track-by.component.css'],
})
export class TrackByComponent implements OnInit {
  public form!: FormGroup;
  sentimentsArray: Sentiment[] = [];

  constructor(
    private f: FormBuilder,
    private stockDataService: StockDataService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.form = this.f.group({
      stockId: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(5)],
      ],
    });

    this.sentimentsArray = this.stockDataService.sentiments;
  }

  removeSentiment(sentiment: Sentiment) {
    this.stockDataService.removeStock(sentiment);
  }

  getSentiment(symbol: string, description: string) {
    let sentiment: Sentiment = {
      symbol: symbol,
      description: description,
      changeToday: 0,
      currentPrice: 0,
      highPrice: 0,
      openPrice: 0,
    };
    this.stockDataService.getStocks(symbol).subscribe({
      next: (data) => {
        sentiment.changeToday = data.d;
        sentiment.highPrice = data.h;
        sentiment.openPrice = data.o;
        sentiment.currentPrice = data.c;
        this.stockDataService.addStock(sentiment);
      },
    });
  }

  async uploadData() {
    let stockId = this.form.controls['stockId'].value;
    await this.stockDataService.getNameStocks2(stockId);
    this.getSentiment(stockId, this.stockDataService.getStockDescription());
  }

  uploadSentimentData(index: string) {
    this.route.navigateByUrl(`sentiment/${index}`);
  }

  shareData(tmp: string, description: string) {
    this.stockDataService.getSymbol(tmp, description);
  }
}
