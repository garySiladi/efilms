# Economist Films TV platforms
### Amazon Fire TV + Fire tablets
Amazon Fire tablets use FireOS which is essentially Android under the hood, but they don't pack Google Play Store or Google Play Services. They have their own Amazon App Store which supports adding hosted apps, which are URLs wrapped to an app.
It supports local storage [read more](https://developer.amazon.com/public/solutions/platforms/webapps/docs/runtime-feature-support.html)
We can test websites with the help of:
* https://www.amazon.com/Amazon-Digital-Services-Inc-Tester/dp/B00DZ3I1W8 on Android devices

Sources:
* https://developer.amazon.com/public/solutions/platforms/webapps/docs/getting-started-with-web-apps-for-fire-tv

| Resolutions |
| -----  |
|1280 x 720 (720p) - 60Hz|
|1920 x 1080 (1080p) - 60Hz|

Just FYI: these devices have their own web-browser: Amazon Silk.
### Windows 10 ecosystem (Win Phone, Win Tablet, Xbox One, etc.)
Microsoft Windows OS supports UWP (Universal Windows Platform) which packages your existing website for publishing to the Store.
https://developer.microsoft.com/en-us/windows/bridges/hosted-web-apps
This includes all Windows-based devices, including PCs, tablets, phones, HoloLens, Surface Hub, Xbox and Raspberry Pi.
It supports local storage [read more](https://docs.microsoft.com/en-us/windows/uwp/app-settings/store-and-retrieve-app-data)

|Resolutions|
| ---- |
| 320 x 569|
|360 x 640|
|480 x 854|
|960 x 540|
|1024 x 640|
|1366 x 768|
|1920 x 1080|
### Opera TV (Chromium based)
Opera TV can be tested using their emulator: http://www.operasoftware.com/products/tv/tv-developer-tools
Technical documentation about app requirements for Opera TV: http://acp.otvs.tv/doc/
They support standard HTML5, CSS3, JS, Local storage.

| Resolutions |
| -----  |
|1280 x 720 (720p)|
|1920 x 1080 (1080p)|
### Opera TV (Presto based)
This is an older version of the Opera TV system. It has its own emulator on their site. This version doesn't support newer CSS technologies. For example it doesn't support `display: flex`, so we must take that into consideration while we develop. Local storage supported.
### LG WebOS
LG WebOS is not very popular, so the knowledge surrounding it is fairly limited. It supports wrapped web apps. The devs can emulate it in VirtualBox.
http://webostv.developer.lge.com/sdk/emulator/introduction-emulator/

| Resolutions |
| -----  |
|1280 x 720 (720p)|
|1920 x 1080 (1080p)|
### Samsung Tizen OS
Samsung Tizen OS - they have a clean guide how to run their emulator, they provide a number of dev tools to help with app building for their OS.
Requirements: http://developer.samsung.com/tv/develop/specification/general-features/
Guide: http://developer.samsung.com/tv/develop/getting-started/using-sdk/tv-emulator/
For some reason I couldn't manage yet to run the emulator in UNIX env.
Local storage supported.[Read more](https://developer.tizen.org/community/tip-tech/html5-local-storage)

| Resolutions |
| -----  |
|1280 x 720|
|1920 x 1080|
|4096 x 2160|
