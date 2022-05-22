// main.js

// 控制应用程序生命周期和创建原生浏览器窗口的模块
const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
  // 创建浏览器窗口。
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // 加载 index.html
  win.loadFile('index.html')

  // 打开开发工具
  // win.webContents.openDevTools()
}

// 这段程序将会在 Electron 结束初始化和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // 在 macOS 上，如果没有开启的窗口，通常都会在任务栏图标被点击后新建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

})

// 除了 macOS 外，当所有窗口都被关闭的时候就退出程序。
app.on('window-all-closed', () => {
  if (process.platform != 'darwin') app.quit()
})