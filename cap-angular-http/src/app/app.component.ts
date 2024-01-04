import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HTTP } from '@awesome-cordova-plugins/approov-advanced-http/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  private http: HTTP = new HTTP();
  readonly imageBaseUrl = 'assets/';
  readonly imageExtension = 'png';
  readonly VERSION = 'v3';
  readonly HELLO_URL = `https://shapes.approov.io/${this.VERSION}/hello`;
  readonly SHAPE_URL = `https://shapes.approov.io/${this.VERSION}/shapes`;
  readonly API_KEY = "yXClypapWNHIifHUWmBIyPFAm";
  private image = 'approov';
  message = 'Tap Hello to Start...';
  imageUrl = this.getImageUrl(this.image);

  constructor(private httpClient: HttpClient) {
    // PROVIDE THE CONFIGURATION STRING BELOW
    this.http.approovInitialize("<enter-your-config-string-here>");
  }

  onHelloClick(): void {
    this.httpClient.get(this.HELLO_URL).subscribe({
      next: (response: { text: string; message: string }) => {
        console.log('Hello Response => ', response);
        this.message = response.text;
        this.imageUrl = this.getImageUrl('hello');
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.log('Hello API Error Response ', errorResponse);
        this.message = `Error: ${errorResponse.status}, Message: ${errorResponse.statusText}`;
        this.imageUrl = this.getImageUrl('confused');
      }
    });
  }

  onShapeClick(): void {
    this.httpClient.get(this.SHAPE_URL, { headers: { "Api-Key": this.API_KEY } }).subscribe({
      next: (response: any) => {
        console.log('Shapes Response => ', response);
        this.message = response.status;
        this.imageUrl = this.getImageUrl(response.shape.toLowerCase());
      },
      error: (err: HttpErrorResponse) => {
        console.log('Shapes API Error Response => ', err);
        this.message = `Error: ${err.status}, Message: ${err.statusText}`;
        this.imageUrl = this.getImageUrl('confused');
      }
    });
  }

  getImageUrl(name: string): string {
    return `${this.imageBaseUrl}${name}.${this.imageExtension}`;
  }
}
