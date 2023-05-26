# Approov Quickstart: Ionic Angular Http

This quickstart is written specifically for Android and iOS apps that are implemented in [Ionic](https://ionicframework.com/) using the [`Angular Http or HttpClient`](https://angular.io/guide/http).

This uses a fork of the [`ionic-native-http-connection-backend` project](https://github.com/sneas/ionic-native-http-connection-backend) to allow Angular network requests to be redirected to the [Approov capable `cordova-plugin-advanced-http` plugin](https://www.npmjs.com/package/@approov/cordova-plugin-advanced-http). We would like to thank the developers of both of these projects.

A worked example using a [Shapes App](https://github.com/approov/quickstart-ionic-angular-http/blob/main/SHAPES-EXAMPLE.md) is also available.

The [Approov backend connection package](https://www.npmjs.com/package/@approov/ionic-native-http-connection-backend) works as follows:

- The package provides a `HttpBackend` interface for Angular's `HttpClient`
- This `HttpBackend` interface tries to use `@awesome-cordova-plugins/approov-advanced-http` whenever it is possible
- If `HttpBackend` finds it impossible to use `@awesome-cordova-plugins/approov-advanced-http`, it falls back to standard Angular code (`HttpXhrBackend`, which uses `XmlHttpRequest`)
- This strategy allows developers to use Angular's `HttpClient` transparently in both environments: Browser and Device.

To follow this guide you should have received an onboarding email for a trial or paid Approov account.

Note that the minimum OS requirement for iOS is 10 and for Android the minimum SDK version is 21 (Android 5.0). You cannot use Approov in apps that need to support OS versions older than this.

## ADDING APPROOV

In order to use Approov you must add the Approov enabled Advanced HTTP package, its `@awesome-cordova-plugins` wrapper and the `Http` connection bridge as follows:

```
npm install @approov/cordova-plugin-advanced-http
npm install @awesome-cordova-plugins/approov-advanced-http
npm install @approov/ionic-native-http-connection-backend
```

Note that for Android the minimum SDK version you can use is 21 (Android 5.0). Please [read this](https://approov.io/docs/latest/approov-usage-documentation/#targeting-android-11-and-above) section of the reference documentation if targeting Android 11 (API level 30) or above.

## USING APPROOV

In order to use Approov you must add `NativeHttpModule`, `NativeHttpBackend` and `NativeHttpFallback` into the application's module

```Typescript
import { NgModule } from '@angular/core';
import { HttpBackend, HttpXhrBackend } from '@angular/common/http';
import { NativeHttpModule, NativeHttpBackend, NativeHttpFallback } from '@approov/ionic-native-http-connection-backend';
import { Platform } from '@ionic/angular';
import { HTTP } from '@awesome-cordova-plugins/approov-advanced-http/ngx';

@NgModule({
    declarations: [],
    imports: [
        NativeHttpModule
    ],
    bootstrap: [],
    entryComponents: [],
    providers: [
        {provide: HttpBackend, useClass: NativeHttpFallback, deps: [Platform, NativeHttpBackend, HttpXhrBackend]},
    ],
})
```

You must also initialize the plugin in `AppModule` as follows:

```Typescript
export class AppModule {
  constructor(private http: HTTP) {
    http.approovInitialize("<enter-your-config-string-here>");
  }
}
```

This initialization should be done prior to any network requests that you wish to protect.  The `<enter-your-config-string-here>` in the examples below is a custom string that configures your Approov account access. This will have been provided in your Approov onboarding email.

Existing Angular `Http` and `HttpClient` requests in your app will then use the Approov capable networking stack.

## CHECKING IT WORKS
Once the initialization is called, it is possible for any network requests to have Approov tokens or secret substitutions made. Initially you won't have set which API domains to protect, so the requests will be unchanged. It will have called Approov though and made contact with the Approov cloud service. You will see `ApproovService` logging indicating `UNKNOWN_URL` (Android) or `unknown URL` (iOS).

On Android, you can see logging using [`logcat`](https://developer.android.com/studio/command-line/logcat) output from the device. You can see the specific Approov output using `adb logcat | grep ApproovService`. On iOS, look at the console output from the device using the [Console](https://support.apple.com/en-gb/guide/console/welcome/mac) app from MacOS. This provides console output for a connected simulator or physical device. Select the device and search for `ApproovService` to obtain specific logging related to Approov.

Your Approov onboarding email should contain a link allowing you to access [Live Metrics Graphs](https://approov.io/docs/latest/approov-usage-documentation/#metrics-graphs). After you've run your app with Approov integration you should be able to see the results in the live metrics within a minute or so. At this stage you could even release your app to get details of your app population and the attributes of the devices they are running upon.

## NEXT STEPS
To actually protect your APIs and/or secrets there are some further steps. Approov provides two different options for protection:

* [API PROTECTION](https://github.com/approov/quickstart-ionic-advancedhttp/blob/main/API-PROTECTION.md): You should use this if you control the backend API(s) being protected and are able to modify them to ensure that a valid Approov token is being passed by the app. An [Approov Token](https://approov.io/docs/latest/approov-usage-documentation/#approov-tokens) is short lived crytographically signed JWT proving the authenticity of the call.

* [SECRETS PROTECTION](https://github.com/approov/quickstart-ionic-advancedhttp/blob/main/SECRETS-PROTECTION.md): This allows app secrets, including API keys for 3rd party services, to be protected so that they no longer need to be included in the released app code. These secrets are only made available to valid apps at runtime.

Note that it is possible to use both approaches side-by-side in the same app.

See [REFERENCE](https://github.com/approov/quickstart-ionic-advancedhttp/blob/main/REFERENCE.md) for a complete list of all of the Approov related methods.
