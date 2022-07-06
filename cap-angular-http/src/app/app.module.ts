import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpBackend, HttpXhrBackend } from '@angular/common/http';
import { NativeHttpModule, NativeHttpBackend, NativeHttpFallback } from '@approov/ionic-native-http-connection-backend';
import { Platform } from '@ionic/angular';
import { HTTP } from '@awesome-cordova-plugins/approov-advanced-http/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, NativeHttpModule],
  providers: [{ provide: HttpBackend, useClass: NativeHttpFallback, deps: [Platform, NativeHttpBackend, HttpXhrBackend] }],
  bootstrap: [AppComponent],
})

export class AppModule {
  constructor(private http: HTTP) {
    // PROVIDE THE CONFIGURATION STRING BELOW
    http.approovInitialize("<enter-your-config-string-here>");
  }
}
