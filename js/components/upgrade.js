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
  		<button :disabled="!canAfford" @click="upgrade.buy()">
 		<nt>[Level {{upgrade.level}}]</nt>
 		<nu>{{upgrade.name}}</nu>
 		<nt>{{upgrade.desc}}</nt>
 		<nt>Cost: {{format(upgrade.level, 0, 10)}}</nt>
 		<nt>Effect: {{upgrade.prefix}}{{upgrade.getMultiplier()}}</nt>
 		</button>
 	`
})
