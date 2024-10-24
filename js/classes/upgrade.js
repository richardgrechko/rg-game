class Upgrade
{
	constructor(name, desc, in_Price, priceIncrease, multi, prefix)
	{
    		this.name = name;
		this.desc = desc;
		this.in_Price = in_Price;
		this.priceIncrease = priceIncrease;
		this.multi = multi; // mor poents
		this.prefix = prefix;
		this.level = new ExpantaNum(0);
	}

	getMultiplier()
	{
		let base = E(this.multi).pow(this.level);
		return base;
	}

	getPrice()
	{
		let price = this.in_Price.pow(ExpantaNum.pow(this.priceIncrease, this.level));
		let dilating = price.gte(E(10).pow(E(Number.MAX_VALUE))) ? ((ExpantaNum.log(ExpantaNum.root(price.pow(E(Number.MAX_VALUE)), 1e135), 10) / 2) + 1) : 1;
		return price.pow(dilating);
	}
	
	buy() {
		if (this.getPrice().lt(game.points))
		{
			game.points = game.points.div(this.getPrice());
			this.level = new ExpantaNum(this.level).add(1);
			return true;
		}
		return false;
	}
	
	buyMax()
	{
		while (this.buy());
	}
}
