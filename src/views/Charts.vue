<template>
	<div>
		<div class="container-fluid">
		<div class="row mx-auto">
			<div class="col-sm-12 col-md-12 col-lg-3">
			<div class="card">
				<Piechart />
			</div>
			</div>
			<div class="col-sm-12 col-md-12 col-lg-4">
			<div class="card">
				<BarChart />
			</div>
			</div>
			<div class="col-sm-12 col-md-12 col-lg-5">
			<div class="card">
				<GeoChart />
			</div>
			</div>
		</div>
		</div>
	</div>
</template>

<script>
import Piechart from "@/components/Charts/PieChart";
import GeoChart from "@/components/Charts/GeoChart";
import BarChart from "@/components/Charts/BarChart";

export default {
	name: "App",
	components: {
		Piechart,
		GeoChart,
		BarChart
	},
};
</script>
