# Shapes Example

A working example of this integration is provided in the `cap-angular-http` directory.

## WHAT YOU WILL NEED
* Access to a trial or paid Approov account
* [Android Studio](https://developer.android.com/studio) installed (version Chipmunk 2021.2.1 is used in this guide) if you will build the Android app. See information about [Android Development](https://ionicframework.com/docs/developing/android) for installation instructions. Note that the `ANDROID_HOME` value must be properly defined to allow building.
* [Xcode](https://developer.apple.com/xcode/) installed (version 13.4.1 is used in this guide) to build iOS version of application. See information about [iOS Development](https://ionicframework.com/docs/developing/ios) for installation instructions.
* [Cocoapods](https://cocoapods.org) installed to support iOS building (1.11.3 used in this guide)
* [NodeJS](https://nodejs.org/en/) v14+ installed in the system
* [Ionic CLI](https://ionicframework.com/docs/intro/cli) installed in the system (note you may need to use `sudo` when using npm to install the Ionic CLI globally)
* The `approov` command line tool [installed](https://approov.io/docs/latest/approov-installation/) with access to your account
* An iOS device or simulator if you are using the iOS platform
* An Android device or emulator if you are using the Android platform
* The content of this repo

## RUNNING THE SHAPES EXAMPLE

Firstly, clone this repo and do the following to install dependencies in `cap-angular-http`:

```
cd cap-angular-http
npm install
```

Now find the Approov initialization statement in the `src/app/app.module.ts` file:

```Typescript
http.approovInitialize("<enter-your-config-string-here>");
```
The Approov SDK needs a configuration string to identify the account associated with the app. It will have been provided in the Approov onboarding email (it will be something like `#123456#K/XPlLtfcwnWkzv99Wj5VmAxo4CrU267J1KlQyoz8Qo=`). Copy this to replace the text `<enter-your-config-string-here>`.

Now run the app on either Android or iOS as follows:

## Android

If you wish to run on a physical Android device then connect it to your host platform over USB. See [Run apps on a hardware device](https://developer.android.com/studio/run/device) for full instructions. Use `adb devices` to verify that this device is connected and no other device or emulator is running.

Firstly you need to prepare the Android build with:

```
ionic cap sync android
```

and then you can run the app on your device or emulator with:

```
ionic cap run android
```

Now register the built app with Approov as follows:

```
approov registration -add android/app/build/outputs/apk/debug/app-debug.apk
```

You should relaunch the app to force it to obtain a new Approov token (or wait at least 5 minutes).

You should be able to run the Shapes app and press the Shapes button to successfully get different Shapes. This indicates that Approov tokens are being auccessfully added to the Angular `Http` requests.

## iOS

If you run on a physical device then you will need to register an `.ipa` file. Since obtaining this is quite involved we suggest that you instead ensure that attestation [always passes](https://approov.io/docs/latest/approov-usage-documentation/#adding-a-device-security-policy) on a specific device. Launch the app using:

```
ionic cap sync ios
```

and then you can run the app on your device or simulator with:

```
ionic cap run ios
```

Make the device always pass by executing:

```
approov device -add latest -policy default,always-pass,all
```

You should relaunch the app to force it to obtain a new Approov token (or wait at least 5 minutes).

Note, that since a bitcode SDK is being used, this normally requires a registration to have been made. To work around this, issue the following command:

```
approov sdk -bitcodeAdd 6557
```

You should be able to run the Shapes app and press the Shapes button to successfully get different Shapes. This indicates that Approov tokens are being auccessfully added to the Angular `Http` requests.
