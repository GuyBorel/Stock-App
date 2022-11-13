import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Sentiment} from '../models/sentiment';

@Injectable({
  providedIn: 'root',
})
export class StockDataService {
  sentiments!: Sentiment[];
  stockDescription: string = '';
  symbolValues: string = '';
  descriptionSymbol: string = '';

  public getStockDescription() {
    return this.stockDescription;
  }

  constructor(private http: HttpClient) {
    this.sentiments = this.loadLocalStorage();
  }

  public getStocks(stocksId: string) {
    let parameter = new HttpParams()
      .append('symbol', stocksId)
      .append('token', environment.token);
    return this.http.get<any>(environment.currentstocksUrl, {
      params: parameter,
    });
  }

  public getNameStocks(name: string): Observable<any> {
    let parameter = new HttpParams()
      .append('q', name)
      .append('token', environment.token);
    return this.http.get<any>(environment.nameStockUrl, { params: parameter });
  }

  public getNameStocks2(name: string) {
    return new Promise<void>((resolve, reject) => {
      let parameter = new HttpParams()
        .append('q', name)
        .append('token', environment.token);
      this.http
        .get<any>(environment.nameStockUrl, {params: parameter})
        .toPromise()
        .then(
          (res) => {
            this.stockDescription = res.result[0].description;
            resolve();
          },
          (msg) => {
            reject(msg);
          }
        );
    });
  }

  public getSentimentsValues(name: string) {
    let parameter = new HttpParams()
      .append('symbol', name)
      .append('token', environment.token)
      .append('from', '2022-08-01')
      .append('to', '2022-11-01');
    return this.http.get<any>(environment.insideSentimentUrl, {
      params: parameter,
    });
  }

  public addStock(sentiment: Sentiment) {
    if (sentiment != null) {
      this.sentiments.push(sentiment);
      localStorage.setItem('sentiments', JSON.stringify(this.sentiments));
    }
  }

  public removeStock(sentiment: Sentiment) {
    const keys = this.sentiments.indexOf(sentiment, 0);
    if (keys > -1) {
      this.sentiments.splice(keys, 1);
    }
    localStorage.setItem('sentiments', JSON.stringify(this.sentiments));
  }

  loadLocalStorage(): Sentiment[] {
    let values = localStorage.getItem('sentiments');
    return values != null ? JSON.parse(values) : [];
  }

  getSymbol(item: string, description: string) {
    this.symbolValues = item;
    this.descriptionSymbol = description;
  }
}
