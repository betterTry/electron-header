const electron = require('electron');

function insertHeader(win, headers) {
  win.webContents.session.webRequest.onBeforeSendHeaders({
		urls: ['<all_urls>'],
		types: ['xmlhttprequest'],
	}, (detail, cb) => {
    const {requestHeaders} = detail;
    const _headers = Object.assign({}, requestHeaders, headers);

		cb({requestHeaders: _headers});
	});
}

module.exports = function (headers, win) {
  if (!headers || Object.prototype.toString.call(headers) !== '[object Object]') {
    return new TypeError('Expected an Object');
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