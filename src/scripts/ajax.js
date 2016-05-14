/**
 * XHR call implementation with ECMA-Script 2015 Promises
 */

function ajaxGet(url) {
  // Return ecmascript new promise object
  return new Promise(function(resolve, reject) {
    // Creating a js xhr request
    let req = new XMLHttpRequest();
    // Open the xhr request based on url passed in function
    req.open("GET", url);
    // Success and Error callbacks
    req.onload = function() {
      if (req.status === 200) {
        resolve(req.response);
      } else {
        reject(new Error(req.statusText));
      }
    };
    req.onerror = function() {
      reject(new Error("Network error"));
    };
    // Start the process
    req.send();
  });
}

// Export the module
export default { ajaxGet };
