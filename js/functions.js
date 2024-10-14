var functions = {
	getSaveCode: function()
	{
		return btoa(unescape(encodeURIComponent(JSON.stringify(game))));
	},
	saveGame: function()
	{
		let str = funcs.getSaveCode();
		localStorage.setItem("AbsoluteLayerumGameSave", str);
	},
	loadGame: function(importString)
    	{
        	let loadVal = function(v, alt)
		{
			return v !== undefined ? v : alt;
        	}

        	let item = importString !== undefined ? importString : localStorage.getItem("AbsoluteLayerumGameSave");
		if(item !== null)
		{
			let obj;
			try
			{
				obj = JSON.parse(decodeURIComponent(escape(atob(item))));
			}
			catch(e)
			{
 				alert("Error loading Game: " + e);
				return;
			}
			game.number = loadVal(obj.number, E(1));
			game.prestige = loadVal(obj.prestige, E(0));
			game.statsPerSecond = loadVal(obj.statsPerSecond, E(0.01));
			game.layerRequirement = loadVal(obj.layerRequirement, E(5));
			for (let i = 0; i < game.numberUpgrades.length; i++)
			{
				game.numberUpgrades[i].level = E(0) /*obj.numberUpgrades[i].level*/
			}
		}
	},
	hardReset: function()
	{
		let times = 3;
		do
		{
			if(!confirm("Are you really sure you want to hard reset?\nYou will lose everything.\nClick " + times + " more times and you will lose everything."))
			{
				break;
			}
			times--;
		} while(times > 0)
		if(times === 0)
		{
			localStorage.removeItem("AbsoluteLayerumGameSave");
			this.loadGame(initialGame);
			this.saveGame();
			this.setTab(1);
		}
	}
}
