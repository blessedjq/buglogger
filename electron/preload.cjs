const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  getData: () => ipcRenderer.invoke("req:data"),
  submitData: (data) => ipcRenderer.invoke("submit:data", data),
});
