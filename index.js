const {app, BrowserWindow, ipcMain} = require('electron');
const selenium = require('./selenium');

const createWindow = () => {
    window = new BrowserWindow({
        width: 600, 
        height: 600
    });
    //window.webContents.openDevTools();
    window.setMenu(null);
    window.loadFile('index.html');
}

// 창 만들기
app.on('ready', createWindow);

// 화면에서 실행 버튼을 누르면 Selenium 실행 API(Node)에 실행 명령 전송
ipcMain.on('run', (event) => {
    selenium.run(event);
})