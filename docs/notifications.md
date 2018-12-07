# Notifications on different platforms
HTML 5: https://www.w3.org/TR/notifications/
Demo for HTML Notifications API: http://elfoxero.github.io/html5notifications/
HTML APIs compatibility: http://mobilehtml5.org/
### OperaTV
As the standard JavaScript methods for alert(), prompt() and confirm() are not supported on all platforms that run the Opera TV Store (since they require platform integration), applications that needs modal dialogs (such as data entry prompts or general alerts/messages) need to provide these using HTML/CSS/JavaScript – which also allows for these modal dialogs to be styled in line with the rest of the application.
https://dev.opera.com/tv/building-applications-for-the-opera-tv-store/#requirements-navigation
### LG WebOS
All types of notifications are reserved for system related events. Only system apps can show messages ( toasts, alerts ).
http://webostv.developer.lge.com/design/webos-tv-system-ui/notifications/
https://www.lgwebos.com/topic/2036-notifications/
### Amazon Fire TV + Fire tablets
The Amazon API for web apps doesn't contain notifications specific to the platform.
Amazon API: https://developer.amazon.com/public/solutions/platforms/webapps/javadocs/api-reference.html
### Windows 10 ecosystem (Win Phone, Win Tablet, Xbox One, etc. )
Your web application can have full access to the Universal Windows Platform (UWP), activating native features on Windows devices, benefiting from Windows security, calling Windows Runtime APIs directly from script hosted on a server.
https://docs.microsoft.com/en-us/windows/uwp/porting/hwa-access-features
https://gist.github.com/Gr8Gatsby/3d471150e5b317eb1813#file-windows-ui-notifications-js
### Samsung Tizen OS
Tizen OS apps on mobiles and wearables have a Notification API, but the their TV platform doesn't have a seperate Notification interface.
