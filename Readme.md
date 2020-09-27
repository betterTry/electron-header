# electron-header

> Set or modify header for electron app.
> 
> It can be used both in main process and render process.

## Install

	 $  npm install electron-header


## Usage
	const {app, BrowserWindow} = require('electron');

	require('electron-header')({
		Referer: 'http://www.ysl.cn',
	});

	let win;

	app.on('ready', () => {
  		win = new BrowserWindow();
	});

with callback

	const {app, BrowserWindow} = require('electron');

	require('electron-header')((details) => {
		if (details.request.host === 'xxx') {
			return {
				Referer: 'http://www.ysl.cn',
			}
		} else {
			return {
				Referer: 'http://www.ysl.com',
			}
		}
	});
	

## API
Header(headers, [win])

headers
	
Type: `Object` | `Function`

> An object containing HTTP headers
> Or callback with a return value containing the request header


win

Type: `BrowserWindow `

When not specified, headers will be added to all existing and new windows.


