<template>
	<div>
		<h5>Geo Chart</h5>
		<div v-if="fetchingData">Fetching data...</div>
		<div v-show="!fetchingData">
			<div id="visualization"></div>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	export default {
	data() {
		return {
			google: null,
			fetchingData: true,
		};
	},
    mounted() {
		let gscript = document.createElement("script");
		gscript.setAttribute("src", "https://www.google.com/jsapi?fake=.js");
		document.head.appendChild(gscript);
		if (window.addEventListener) {
			window.addEventListener('resize', this.drawVisualization);
		}
		else {
			window.attachEvent('onresize', this.drawVisualization);
		}
		setTimeout(() => {
			if (window.google) {
				this.google = window.google;
				this.google.load("visualization", "1", { packages: ["geochart"] });
				window.onresize = this.google.setOnLoadCallback(this.drawVisualization);
			
			}
		},
		3000);
		
    },
    methods : {
       	drawVisualization() {
			   
            axios
				.get("http://localhost:8080/files/people.json")
				.then((response) => {
                const geos = response.data.map(
                  (addressObject) => addressObject.location
                );
				
				this.fetchingData = false
                var data = new this.google.visualization.DataTable();
                data.addColumn("number", "Lat");
                data.addColumn("number", "Long");
                data.addColumn("number", "Value");
                data.addColumn({ type: "string", role: "tooltip" });
                for (const geoObject of geos) {
					data.addRows([
						[
						Number(geoObject.latitude),
						Number(geoObject.longitude),
						0,
						"tooltip",
						],
					]);
                }
                var options = {
					colorAxis: { minValue: 0, maxValue: 0, colors: ["ff5588"] },
					legend: "none",
					backgroundColor: {
						fill: "transparent",
						stroke: "#FFF",
						strokeWidth: 0,
					},
					datalessRegionColor: "#00D8FF",
					displayMode: "markers",
					enableRegionInteractivity: "true",
					resolution: "countries",
					sizeAxis: {
						minValue: 1,
						maxValue: 1,
						minSize: 5,
						maxSize: 5,
					},
					region: "world",
					keepAspectRatio: true,
					// width: "100%",
					// height: "auto",
					tooltip: { textStyle: { color: "orange" } },
                };
                var chart = new this.google.visualization.GeoChart(
					
		// this.fetchingData = true,
					document.getElementById("visualization")
                );
                chart.draw(data, options);
			});
		}
    }
};
</script>