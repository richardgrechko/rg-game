class Upgrade
{
	constructor(name, desc, in_Price, priceIncrease, multi, prefix)
	{
    		this.name = name;
		this.desc = desc;
		this.in_Price = in_Price;
		this.priceIncrease = priceIncrease;
		this.multi = multi; // mor poents
		this.prefix = "×";
		this.level = new ExpantaNum(0);
	}

	getMultiplier()
	{
		let base = E(this.multi).pow(this.level);
		let softcap = base.gte(this.multi.pow(1000)) ? (this.level.add(573).mul(0.00063589192)) : E(1); // Here goes a softcap
		let softcap2 = softcap.gte(1000) ? (softcap.add(573).mul(0.00063589192)) : E(1); // Softcap^2
		return base.div(softcap).div(softcap2);
	}

	getPrice()
	{
		let price = this.in_Price.pow(Decimal.pow(this.priceIncrease, this.level));
		let dilating = price.gte(E(10).pow(E(Number.MAX_VALUE))) ? ((OmegaNum.log(OmegaNum.root(price.pow(E(Number.MAX_VALUE)), 1e135), 10) / 2) + 1) : 1;
		return price.pow(dilating);
	}
	
	buy() {
		if (this.getPrice().lt(game.number))
		{
			game.number = game.number.div(this.getPrice());
			this.level = new Decimal(this.level).add(1);
			return true;
		}
		return false;
	}
	
	buyMax()
	{
		while (this.buy());
	}
}
