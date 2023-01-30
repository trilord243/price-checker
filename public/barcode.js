var scannerArrayNew = [];
var scannerArray
// listing
function listing(scannerArray) {
  if(scannerArray.length > 0) {
    for (i = 0; i < scannerArray.length; i++) {
      if(scannerArray[i][2] == "SCANNER_CLASS_IMAGER" && scannerArray[i][1] == "SCANNER_INTERNAL") {
        scannerInfo = scannerArray[i][0];
        scannerArrayNew.push(scannerInfo);
        break;
      }
    }
  }
}

// retrieving
function onDecodeEventJSON(jsonObject) {
  console.log(jsonObject.data)
  document.dispatchEvent(new CustomEvent('scanResult', {detail: jsonObject.data}))
}

// enabling
function disableCommonAPI() {
  scanner.disable();
}

// enabling
// enabling
function enableCommonAPI() {
  scanner.enable()
}
// start
function startScanner() {
  scanner.start();
}
// stop
function stopScanner() {
  scanner.stop();
}
// enumerating scanners
enumeration()
