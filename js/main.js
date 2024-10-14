var app = new Vue({
	el: "#app",
	data: game,
	computed: false,
	methods: functions,
	created: onCreate,
});
function update()
{
	dt2 = Date.now();
	dt = (dt2 - dt1) / 1000;
	dt1 = Date.now();
	
	requestAnimationFrame(update);
}
function onCreate()
{
	game.upgrades.push(
		new Upgrade("exponent","your first upgrade",new ExpantaNum(2),new ExpantaNum(2),new ExpantaNum(1.8),"^")
	)
	initialGame = funcs.getSaveCode();

	functions.loadGame();

	functions.setTab(1);

	requestAnimationFrame(update)
}

setInterval(funcs.saveGame, 30000);
