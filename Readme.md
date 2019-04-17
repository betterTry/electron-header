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
	

## API
Header(headers, [win])

headers
	
Type: `Object`

> An object containing HTTP headers

win

Type: `BrowserWindow `

When not specified, headers will be added to all existing and new windows.


