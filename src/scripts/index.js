"use strict";

//only because the requirements ask for helper functions
function getElementArrayByClassName(className) {
  return [...document.getElementsByClassName(className)];
}

let elementsOS = getElementArrayByClassName("os");
let elementsLanguage = getElementArrayByClassName("language");
let elementsBrowser = getElementArrayByClassName("browser");

let elementsWidth = getElementArrayByClassName("width");
let elementsHeight = getElementArrayByClassName("height");
let elementsOrientation = getElementArrayByClassName("orientation");

let elementsBatteryLevel = getElementArrayByClassName("level");
let elementsBatteryStatus = getElementArrayByClassName("status");

let elementsOnline = getElementArrayByClassName("online");

function updateOS() {
  let os = getOS();
  elementsOS.forEach(e=>{
    e.innerHTML = `OS: ${os}`;
  });
}
function updateLanguage() {
  let language = getLanguage();
  elementsLanguage.forEach(e=>{
    e.innerHTML = `Language: ${language}`;
  });
}
function updateBrowser() {
  let browser = getBrowser();
  elementsBrowser.forEach(e=>{
    e.innerHTML = `Browser: ${browser}`;
  });
}

function updateWidth() {
  let width = getWindowWidth();
  elementsWidth.forEach(e=>{
    e.innerHTML = `Width: ${width}`;
  });
}
function updateHeight() {
  let height = getWindowHeight();
  elementsHeight.forEach(e=>{
    e.innerHTML = `Height: ${height}`;
  });
}
function updateOrientation() {
  let orientation = getOrientation();
  elementsOrientation.forEach(e=>{
    e.innerHTML = `Orientation: ${orientation}`;
  });
}

async function updateLevel() {
  let level = await getBatteryLevel();
  elementsBatteryLevel.forEach(e=>{
    e.innerHTML = `Level: ${level}`;
  });
}
async function updateStatus() {
  let status = await getBatteryStatus();
  elementsBatteryStatus.forEach(e=>{
    e.innerHTML = `Status: ${status}`;
  });
}
function updateNetworkStatus() {
  let onlineStatus = getNetworkStatus();
  elementsOnline.forEach(e=>{
    e.querySelector("p").innerHTML = onlineStatus;
    if (onlineStatus==="Online") {
      e.classList.add("on");
    } else {
      e.classList.remove("on");
    }
  });
}


updateOS();
updateLanguage();
updateBrowser();

updateWidth();
updateHeight();
updateOrientation();

updateLevel();
updateStatus();
updateNetworkStatus();

//ok but what's the point in adding an event listener helper function when it's already 1 line of code.
window.addEventListener('resize', e=>{
  updateWidth();
  updateHeight();
});
//This is depreciated and MOZ says that no browsers support it.
//YET IT'S THE ONLY ONE THAT WORKS PROPERLY FOR SOME REASON.
// window.addEventListener('orientationchange', e=>{
//   updateOrientation();
//   console.log("here");
// })
//THIS DOES NOT WORK DESPITE BEING THE PROPER WAY OF DOING IT.
// screen.orientation.addEventListener('change', e=>{
//   updateOrientation();
//   console.log("here");
// })
//THIS ONE DOESN'T WORK ON FIREFOX FOR SOME REASON. WHAT THE HECK?
screen.orientation.onchange = e=>{
  updateOrientation();
}


(async () => { //you need a function here to use async. We don't really care about order.
  //Just update the battery status when we can.
  if (navigator.getBattery) {
    let battery = await navigator.getBattery();
    battery.addEventListener("levelchange", e=>{
      updateLevel();
    });
    battery.addEventListener("chargingchange", e=>{
      updateStatus();
    });
  }
})();

//nevermind, this is the wrong one to use
// if (navigator.connection) {
//   navigator.connection.onchange = e => {
//     console.log(e);
//       updateNetworkStatus();
//   };
// } else {
//   setInterval(updateNetworkStatus, 4000);
// }

window.addEventListener('online', updateNetworkStatus);
window.addEventListener('offline', updateNetworkStatus);