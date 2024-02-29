const { app } = require('electron');

function quitApp() {
  app.quit();
}

module.exports = { quitApp };
