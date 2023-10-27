"use strict";
//Read information about the browser client

//I'm going to make an implementation using an object to cache information.
//actually nevermind, we should only need the information once, no need for caching
// const CLIENT_READER = {
//   os: null,
//   language: null,
//   browser: null,
//   windowHeight: null,
//   windowWidth: null,
//   windowOrientation: null,
//   batteryLevel: null,
//   batteryStatus: null,
//   networkStatus: null,
//   /**
//    * Gets all the information about the client. Call this a second time to update it.
//    */
//   refresh: function() {

//   }
// }
// CLIENT_READER.refresh();

function getOS() {
  if (navigator.userAgentData) { //experimental feature, not on all browsers
    return navigator.userAgentData.platform;
  }
  //desperate
  let str = navigator.userAgent;
  for (let i=0;i<str.length;++i) {
    if (str.charAt(i)==="(") {
      str = str.substring(i+1, str.length);
      let j=str.indexOf(" ");
      return str.substring(0,j);
    }
  }
  // if (navigator.platform) { //extremely desprit
  //   return navigator.platform;
  // }
  
}
function getLanguage() {
  return navigator.language;
}
function getBrowser() {
  //navigator.userAgentData.brands; //I don't think this works well
  let str = navigator.userAgent;
 
  
  if (str.indexOf("Edg") > 0) {return "Microsoft Edge";}
  if (str.indexOf("Firefox") > 0) {return "Mozilla FireFox";}
  //I don't have the rest of these so I don't know if they work. They will avoid false positives though
  if (str.indexOf("OPR") > 0) {return "Opera";} 
  if (str.indexOf("SamsungBrowser") > 0) {return "Samsung Internet";}
  //Unfortunately, not all browsers are this easy, Google chrome in particular is a pain
  //We're just going to say chrome here because a lot of browsers will have a false positive
  if (str.indexOf("Chrome") > 0 && str.indexOf("Safari") > 0) {
    if (navigator.vendor==="Google Inc.") { // I really don't know how else to try detecting google specifically.
      return "Google Chrome";
    }
    return "Chrome"; //some Chrome based browser, not sure what
  }
  //Safari without chrome is probably just safari
  //if (str.indexOf("Safari") > 0) {return str}
  //actually, we're better off using our backup strategy to detect safari
  
  //At this point we have no clue what browser they have so we're just going to return the last browser listed.
  let a = str.lastIndexOf(" ")+1;
  let b = str.lastIndexOf("/");
  if (b<0) {b = str.length;}
  return str.substring(a,b);
}
function getWindowWidth() {
  return window.innerWidth;
}
function getWindowHeight() {
  return window.innerHeight;
}
function getOrientation() {
  let str = screen.orientation.type;
  let a = str.indexOf("-"); //get rid of the primary or secondary part
  if (a>0) {
    return str.substring(0,a);
  }
  return str;
}
async function getBatteryLevel() {
  if (navigator.getBattery) {
    let battery = await navigator.getBattery();
    return `${battery.level*100}%`;
  }

  return "unavailable";
}
async function getBatteryStatus() {
  if (navigator.getBattery) {
    let battery = await navigator.getBattery();
    return battery.charging ? "Charging" : "Not Charging";
  }

  return "unavailable";
}
function getNetworkStatus() {
  return navigator.onLine ? "Online" : "Offline";
}

// console.log(getOS());
// console.log(getLanguage());
// console.log(getBrowser());
// console.log(getWindowWidth());
// console.log(getWindowHeight());
// console.log(getOrientation());
// (async () => { //yuck
//   let p = await getBatteryLevel();
//   console.log(p);
//   p = await getBatteryStatus();
//   console.log(p);
// })();
// console.log(getNetworkStatus());