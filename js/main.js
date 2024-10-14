var app = new Vue({
	el: "#app",
	data: game,
	computed: false,
	methods: funcs,
	created: onCreate,
});
function update()
{
	dt2 = Date.now();
	dt = (dt2 - dt1) / 1000;
	dt1 = Date.now();
	game.statsPerSecond = funcs.getStatProduction();
	game.exponent = E(game.exponent).add(game.statsPerSecond.mul(dt));
	game.number = new LayerRequirement(game.exponent);
	game.layerStyle = 
		`color: ${funcs.rainbowTransition(game.exponent.floor().root(1.1).add(1).log(1.01))}; text-shadow: 0 0 ${game.exponent.floor().root(1.1).add(1).log(1.01)}em currentColor, 0 0 ${game.exponent.floor().root(1.1).add(1).log(1.01).div(1.41)}em currentColor, 0 0 ${game.exponent.floor().root(1.1).add(1).log(1.01).div(2)}em currentColor;`
	document.getElementById("tabs").innerHTML = game.tabs;
	if (E(2).lte(game.prestige))
	{
		game.gotAutoNumUP = true;
	}
	while(game.autoNumUP)
	{
		game.numberUpgrades[i].buy()
	}
	if (keyMap.includes("m"))
	{
		funcs.maxAll();
	}
	requestAnimationFrame(update);
}
function onCreate()
{
	game.upgrades.push(
		new NumberUpgrade("Stat Quickener 1","Your numbers exponentiate!",E(5),E(1.1),E(1.05)),
		new NumberUpgrade("Stat Quickener 2","Strong Exponent!",E(5).pow(10),E(1.2),E(1.1)),
		new NumberUpgrade("Stat Quickener 3","Triangular!",E(5).pow(52),E(1.35),E(1.2)),
		new NumberUpgrade("Stat Quickener 4","Square power!",E(5).pow(260),E(1.5),E(1.35)),
		new NumberUpgrade("Stat Quickener 5","Powerfully Upgraded!",E(5).pow(520),E(2),E(1.5)),
		new NumberUpgrade("Stat Quickener 6","Hexagon to the Sixth!",E(5).pow(2756),E(3),E(2.5)),
		new NumberUpgrade("Stat Quickener 7","Very Strong!",E(5).pow(E(52).pow(3)),E(4),E(3)),
		new NumberUpgrade("Stat Quickener 8","Octant to the Eighth!",E(5).pow(E(52).pow(4)),E(5),E(4.5)),
		new NumberUpgrade("Overpowerer","Only gods can buy it",E(5).pow(E(52).pow(E(52).pow(52))),E(1e249),E(1e210)),
	)
	initialGame = funcs.getSaveCode();

	funcs.loadGame();

	funcs.setTab(1);

	requestAnimationFrame(update)
}

setInterval(funcs.saveGame, 30000);
