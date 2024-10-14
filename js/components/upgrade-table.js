Vue.component("upgrade-table", {
	props: ["upgrades"],
	methods:
	{
		formatNumber: function(n, prec, lim)
		{
			return format(n, prec, lim)
		},
	},
	template: `
	<table class="numberupgrade-table">
 		<div class="default center">upgrades</div>
   		<button @click="maxUpgrades" style="background-color: #999; color: #eee;">max all</button>
  		<upgrade v-for="(p, i) in upgrades" :upgrade="p" :key="i"></upgrade>
	</table>
	`,
});
