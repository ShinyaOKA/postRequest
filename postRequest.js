function postRequestPromise (url, param){
  return new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    let timedout = false;
    let timer = setTimeout (function(){
        timedout = true;
        request.abort();
      },
    5000);
    request.open ("POST", url);
    request.setRequestHeader("Content-Type", "text/plain");
    request.onreadystatechange = function() {
      if (request.readyState !== 4) return ;
      if (timedout) {
        reject("timeout");
      };
      clearTimeout (timer);
      if (request.readyState === 4 & request.status === 200) {
        resolve(request.responseText);
      } else if (request.readyState === 4 & request.status !== 200){
        reject (request.status);
      }
    };
    request.onerror = function (error) {reject(error);}
    request.send (param);
  });
}
