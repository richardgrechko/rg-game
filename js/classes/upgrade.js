Vue.component("upgrade", {
	props: ["upgrade"],
	methods: 
	{
		formatNumber: function(n, prec, lim)
		{
			return format(n, prec, lim)
		},
	},
	computed:
	{
		canAfford: function()
		{
			return this.upgrade.getPrice().lt(game.points)
      		},
	},
	template:
	`
  		<button :disabled="!canAfford" @click="numberupgrade.buy()">
 		<nu>{{upgrade.name}}</nu>
 		<nt>{{upgrade.desc}}</nt>
 		<nt>Cost: {{formatNumber(upgrade.level, 0, 10)}}</nt>
 		</button>
 	`
})
