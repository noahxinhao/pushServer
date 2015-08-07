var http = require('http');
var apn = require('apn');
var url = require('url');
 
/* The registration id returned upon the call to register in the app - this would be retrieved from a db where originally stored */
//var iPhone6 = "9feab04e0143c6b1d2e451980e100abfb6833e9a2f954949c1d12e9a0c8b4d49";
var iPhone5 = "f60b921c6252c3fd7552a36050974c318290ac918d9ff49852795f3936faa058";
 
var myDevice = new apn.Device(iPhone5);
 
var note = new apn.Notification();
note.badge = 1;//显示在客户端上的消息条数
note.sound = "beep.wav"; //path to your sound
note.contentAvailable = 1;

// You could specify this way
//note.alert = "Jennifer L commented on your photo:\n Congratulations!! \u270C\u2764\u263A ";

// Or this way below to set a certain phrase on the button if the user has alert set for the notifications on the app and not just banner
// and a custom image to show upon launch from the notification.
note.alert = { "body" : "这是一条测试推送消息，小董是个逗逼！！！ \u270C\u2764\u263A ","action-loc-key" : "查看" , "launch-image" : "mysplash.png"};

/* payload property is custom internal use data - use for alert title in my sample app when in the foreground 
Providers can specify custom payload values outside the Apple-reserved aps namespace. Custom values 
must use the JSON structured and primitive types: dictionary (object), array, string, number, and Boolean. 
You should not include customer information (or any sensitive data) as custom payload data. Instead, use it 
for such purposes as setting context (for the user interface) or internal metrics. For example, a custom payload 
value might be a conversation identifier for use by an instant-message client app or a timestamp identifying 
when the provider sent the notification. */

note.payload = {'messageFrom': 'Push Notification Sample App'}; // additional payload
 
note.device = myDevice;
 
var callback = function(errorNum, notification){
    console.log('Error is: %s', errorNum);
    console.log("Note " + JSON.stringify(notification));
}
var options = {
    gateway: 'gateway.sandbox.push.apple.com', // this URL is different for Apple's Production Servers and changes when you go to production
    errorCallback: callback,
    cert: 'PushChatCert.pem', // ** NEED TO SET TO YOURS - see this tutorial - http://www.raywenderlich.com/32960/apple-push-notification-services-in-ios-6-tutorial-part-1
    key:  'PushChatKey.pem',  // ** NEED TO SET TO YOURS
    passphrase: 'itlxh784533', // ** NEED TO SET TO YOURS
    port: 2195,                       
    enhanced: true,                   
    cacheLength: 100                  
};
var apnsConnection = new apn.Connection(options);

console.log("Note " + JSON.stringify(note));
apnsConnection.sendNotification(note);
