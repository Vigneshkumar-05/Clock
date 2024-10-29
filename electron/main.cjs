"use-strict"

const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow;

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
        },
    }
    );
    const startURL = process.env.IS_DEV ? 'http://localhost:5173/' : `file://${path.join(__dirname, "../build/index.html")}`;
    mainWindow.loadURL(startURL);

    mainWindow.once("ready-to-show", () => {
        mainWindow.show();
    });
    app.on("closed", () => {
        mainWindow = null;
    });
}

app.whenReady().then(() => {
    createMainWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });

    app.on("window-all-closed", () => {
        if (process.platform !== "darwin") {
            app.quit();
        }
    });
})
    .catch((err) => {
        console.log(err);
    })