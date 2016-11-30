// run the main from the main
var Main = require('./Main.purs');
console.log(window);
console.log(Main);
Main.main();

window.Main = Main;