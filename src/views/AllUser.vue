<template>
	<div class="hello">
		<div class="container">
		<input
			type="text"
			class="search-input mb-3"
			v-model.trim="search"
			placeholder="Search people..."
		/>
		<nav>
			<ul class="pagination">
			<template v-if="page.length > 1 || !search">
				<li class="page-item">
				<button
					type="button"
					class="btn btn-sm btn-primary text-white me-3 prev"
					@click="changeActivePageNumber(activePageNumber -= 1)"
				>
					Previous
				</button>
				</li>
				<li
					class="page-item mb-2"
					v-for="n in new Array(totalPages).fill(0).map((n, i) => i)"
					:key="n"
				>
					<button class="page-link"
					:class="[activePageNumber + 0  === n ? 'active' : '' ]" 
						@click="changeActivePageNumber(n)">
						{{ n +1 }}
					</button>
				</li>
				<li class="page-item">
					<button
						type="button"
						@click="changeActivePageNumber(activePageNumber += 1)"
						class="btn btn-sm btn-primary text-white ms-3"
					>
						Next
					</button>
				</li>
			</template>
			</ul>
		</nav>
		<div class="row">
			<div class="col-sm-12 col-md-4" v-for="user in page" :key="user.id">
				<div class="flip-card">
					<div class="flip-card-inner">
						<div class="flip-card-front">
						<div class="">
							<h5>{{ user.name }}</h5>
							<p><span class="text-primary">Age: </span>{{ user.age }}</p>
							<p><span class="text-primary">Gender: </span>{{ user.gender }}</p>
							<p><span class="text-primary">Eye Color: </span>{{ user.eyeColor }}</p>
						</div>
						</div>
						<div class="flip-card-back bg-info">
							<p><span class="">Id: </span>{{ user._id }}</p>
							<p><span class="">Longitude: </span>{{ user.location.longitude }}</p>
							<p><span class="">Pet: </span>{{ user.preferences.pet }}</p>
							<p><span class="">Fruit: </span>{{ user.preferences.fruit }}</p> 
						</div>
					</div>
				</div>
			</div>
		</div>
		<template v-if="!people.length">
			<p>No Search Found</p>
		</template>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import { ref, computed } from "vue";

export default {
	setup() {
		const search = ref("");
		const allPeople = ref([]);
		const activePageNumber = ref(0);
		const resultsPerPage = 6;
		const page = computed(() => paginate(activePageNumber.value));

		const people = computed(() =>
			allPeople.value.filter((person) => {
				const byName = person.name.includes(search.value.toLowerCase());
				const byID = person._id.toLowerCase().includes(search.value.toLowerCase());
				const byEyeColor = person.eyeColor.toLowerCase().includes(search.value.toLowerCase());
				const byPet = person.preferences.pet.toLowerCase() .includes(search.value.toLowerCase());
				const byFriut = person.preferences.fruit  .toLowerCase() .includes(search.value.toLowerCase());
				const byGender = person.gender.toLowerCase().includes(search.value.toLowerCase());
				const byAge = Number(person.age) === Number(search.value);
				const byLatitude = Number(person.location.latitude) === Number(search.value);
				const byLongitude =Number(person.location.longitude) === Number(search.value);

				return (
					byName ||
					byEyeColor ||
					byPet ||
					byFriut ||
					byID ||
					byAge ||
					byGender ||
					byLatitude ||
					byLongitude
				);
			})
		);

		const totalPages = computed(() => {
			return Math.floor(people.value.length / resultsPerPage) + 1;
		});

		axios
		.get("http://localhost:8080/files/people.json")
		.then((response) => {
			allPeople.value = response.data;
		})
		.catch(console.error);

		const paginate = (toPage) => {
		const offset = toPage * resultsPerPage;
		const newPage = people.value.slice(offset, offset + resultsPerPage);
		return newPage;
		};
		
		const changeActivePageNumber = (newPageNumber) => {
			let page = newPageNumber
			if(page < 0){
				page = 0
			} else if(page >= totalPages._value) {
				page = totalPages._value - 1
			}
			activePageNumber.value = page;
		}
		

		return {
			search,
			people,
			page,
			totalPages,
			activePageNumber,
			changeActivePageNumber,
			take: resultsPerPage,
		};
	},
};
</script>
