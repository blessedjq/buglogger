const { spawn } = require("child_process");

// Start Vite
const vite = spawn("npx", ["vite"], { stdio: "inherit" });

// Wait 1.5 seconds before starting Electron
setTimeout(() => {
  console.log("Starting Electron after delay...");
  const electron = spawn("npx", ["electron", "./electron/main.cjs"], { stdio: "inherit" });

  electron.on("close", () => process.exit(0));
}, 1500);
