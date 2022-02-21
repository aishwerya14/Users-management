<template>
	<div>
		<h5 class="mb-2">Pie Chart</h5>
		<p class="text-info mb-0">Enter name to filter the chart like Stephens Townsend or any other name from user array</p>
		<div class="d-flex justify-content-between align-items-center mt-2">
			<form>
				<div class="d-flex align-items-center me-3 mb-4">
					<input id="name" type = "text" v-model="inputValue" class="form-control" placeholder="Enter Name"/>
				</div>
			</form>
			<button type="button" @click="onRerender" class="btn  btn-primary">Filter</button>
		</div>
		<div v-if="fetchingData">Rendering chart</div>
		<div v-else	>
			<vue3-chart-js v-bind="returnChartData" />
		</div>
	</div>
</template>

<script>
import Vue3ChartJs from "@j-t-mcc/vue3-chartjs";

export default {
	name: "App",
	components: {
		Vue3ChartJs,
	},
	data: () => ({
		users: [],
		fetchingData: false,
		inputValue: "",
	}),
	methods: {
		onRerender() {
		this.fetchingData = true;
		setTimeout(() => (this.fetchingData = false), 500);
		},
		filter() {
		this.fetchingData = true;
		let url = encodeURI(`http://localhost:8080/files/people.json`);

		fetch(url)
			.then((res) => res.json())
			.then(( data ) => {
			this.users = data;
			this.fetchingData = false;
			});
		},
	},
	computed: {
	returnUsers() {
		if (this.inputValue) {
		return this.users.filter((user) => user.name === this.inputValue);
		}
		return this.users;
	},
    returnUniqueFruit() {
        // get all fuits in the uses array
		const fruit = this.returnUsers.map((user) => {
			return user.preferences.fruit
		});
    	// unique fuit
			const unique = [];
			fruit.forEach((fruit) => {
				if (!unique.includes(fruit)) {
					unique.push(fruit);
				}
			});
			console.log("Unique", Object.values(unique));
			return unique;
     },
	returnUniqueFruitCount() {
		const uniqueFruitCount = {};
		// get all fruit in the uses array
		const fruit = this.returnUsers.map((user) => {
			return user.preferences.fruit
		});
		console.log('Fruit', fruit);
		

		fruit.forEach((fruit) => {
			let counter = 0;
			this.returnUsers.forEach((user) => {
			user.preferences.fruit === fruit && counter++;
			});
			uniqueFruitCount[fruit] = counter;
		});

		console.log("uniqueFruitCount", Object.values(uniqueFruitCount));
		
		return uniqueFruitCount;
	},
    returnChartData() {
		return {
			type: "pie",
			data: {
			labels:  Object.values(this.returnUniqueFruit),
			datasets: [
				{
				label: ["My First Dataset"],
				backgroundColor:["#008744", "#0057e7" , "#d62d20" , "#ffa700"],
				data: 
					Object.values(this.returnUniqueFruitCount),
				
				},
			],
			},
		};
	},
},
created() {
	this.filter();
},
};
</script>