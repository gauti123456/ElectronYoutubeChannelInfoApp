'use strict'
const electron = require("electron");

const { app, BrowserWindow,Menu } = electron;

const url = require("url");

const path = require("path");

process.env.NODE_ENV = 'production';

require('electron-reload')(__dirname)


let mainWindow;
let aboutWindow

app.on("ready", function() {
  mainWindow = new BrowserWindow({});

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "mainWindow.html"),
      protocol: "file:",
      slashes: true
    })
    );

    mainWindow.on('closed', function () {
        app.quit()
    })

    const mainMenu = Menu.buildFromTemplate(menuTemplate)
    
    Menu.setApplicationMenu(mainMenu)
    
   
});

function createAboutWindow() {
    aboutWindow = new BrowserWindow({
        width: 500,
        height: 350,
        title: 'Youtube Data API',
    });

  aboutWindow.setMenuBarVisibility(false)

  aboutWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "aboutWindow.html"),
      protocol: "file:",
      slashes: true
    })
    );
}


// menu template

const menuTemplate = [
    {
        label: 'App',
        submenu: [
            {
                label: 'Quit',
                click() {
                    app.quit()
                }
            },
            {
                label: 'About',
                click() {
                    createAboutWindow()
                }
            }
        ]
    }
];

// Add developer tools option if in dev
if(process.env.NODE_ENV !== 'production'){
    menuTemplate.push({
      label: 'Developer Tools',
      submenu:[
        {
          role: 'reload'
        },
        {
          label: 'Toggle DevTools',
          click(item, focusedWindow){
            focusedWindow.toggleDevTools();
          }
        }
      ]
    });
  }