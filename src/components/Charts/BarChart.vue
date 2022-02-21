 <template>
	<div>
		<h5>Bar Chart</h5>
		<p class="text-info mb-0">Enter name to filter the chart like Stephens Townsend or any other name from user array</p>
		<div class="d-flex justify-content-between align-items-center my-4">
			<form>
				<div class="d-flex align-items-center">
					<input 
						id="name" 
						type ="text"
						v-model="inputValue"
						class="form-control"
						placeholder="Enter Name like Stephens Townsend"
					/>
				</div>
			</form>
			<button type="button" @click="onRerender" class="btn  btn-primary">Filter</button>
		</div>
		<div v-if="fetchingData">Rendering chart</div>
		<div v-else class="mt-5">
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
			.then((data ) => {
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
		returnUniquePet() {
			// get all pet in the uses array
			const pet = this.returnUsers.map((user) => {
				return user.preferences.pet
			});
			// unique pet
			const unique = [];
			pet.forEach((pet) => {
				if (!unique.includes(pet)) {
				unique.push(pet);
				}
			});
			console.log("Unique", Object.values(unique));
			//  console.log("keys ",Object.keys(this.returnuniquepet))
			return unique;
		},
		returnUniquePetCount() {
			const uniquePetCount = {};
			// get all pets in the users array
			const pet = this.returnUsers.map((user) => {
			return user.preferences.pet
			});
			console.log('PET', pet);
			pet.forEach((pet) => {
				let counter = 0;
				this.returnUsers.forEach((user) => {
					user.preferences.pet === pet && counter++;
				});
				uniquePetCount[pet] = counter;
			});
			console.log("uniquePetCount", Object.values(uniquePetCount));
			return uniquePetCount;
		},
		returnChartData() {
			return {
				type: "bar",
				options: {
					scales: {
						y: {
							min: 0,
							max: 20,
							ticks: {
							callback: function (value) {
								return `${value}`;
							},
							},
						},
					}
				},
				data: {
					labels: Object.values(this.returnUniquePet),
					datasets: [
						{
							label: ["My First Dataset"],
							backgroundColor:["#008744", "rgb(0, 194, 255)" , "#d62d20" , "rgb(255, 85, 136)"],
							data:  this.returnUniquePetCount,
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