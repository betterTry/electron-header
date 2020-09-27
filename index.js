const electron = require('electron');

/**
 * 
 * @param {electron.BrowserWindow} win 
 * @param {Object | Function} headers 
 */
function insertHeader(win, headers) {
  win.webContents.session.webRequest.onBeforeSendHeaders({
		urls: ['<all_urls>'],
		types: ['xmlhttprequest'],
	}, (detail, cb) => {
    if (typeof headers === 'function') {
      headers = headers(detail)
    }
    const {requestHeaders} = detail;
    const _headers = Object.assign({}, requestHeaders, headers);

		cb({requestHeaders: _headers});
	});
}

module.exports = function (headers, win) {
  if (!headers || Object.prototype.toString.call(headers) !== '[object Object]'
               || Object.prototype.toString.call(headers) !== '[object Function]') {
    return new TypeError('Expected an Object Or Function');
  }
  if (win) {
    insertHeader(win, headers);
    return;
  }
  (electron.BrowserWindow || electron.remote.BrowserWindow).getAllWindows().forEach(win => {
		insertHeader(win, headers);
  });
  (electron.app || electron.remote.app).on('browser-window-created', (e, win) => {
		insertHeader(win, headers);
	});
}