<template>
	<div>
		<div class="container">
			<div class="scroll">
				<table class="table table-striped table-bordered">
					<thead>
						<tr>
							<th>Edit</th>
							<th>Id</th>
							<th>Name</th>
							<th>Age</th>
							<th>Eye Color</th>
							<th>Gender</th>
							<th>Latitude</th>
							<th>Longitude</th>
							<th>Pet</th>
							<th>Fruit</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="user in getUsers" :key="user._id">
							<td>
								<button
									@click="openEditModal(user)"
									type="button"
									class="btn btn-sm btn-primary"
								>
									<font-awesome-icon
									:icon="['fas', 'pen']"
									transform="shrink-6 left-4"
									:style="{ color: '#fff' }"
									/>
								</button>
							</td>
							<td>
								<p>{{ user._id }}</p>
							</td>
							<td>
								<p>{{ user.name }}</p>
							</td>
							<td>
								<p>{{ user.age }}</p>
							</td>
							<td>
								<p>{{ user.eyeColor }}</p>
							</td>
							<td>
								<p>{{ user.gender }}</p>
							</td>
							<td>
								<p>{{ user.location.latitude }}</p>
							</td>
							<td>
								<p>{{ user.location.longitude }}</p>
							</td>
							<td>
								<p>{{ user.preferences.pet }}</p>
							</td>
							<td>
								<p>{{ user.preferences.fruit }}</p>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<Modal
			v-if="isModalOpen"
			:user="target.user"
			@saveModal="saveModal"
			@closeModal="closeModal"
		></Modal>
	</div>
</template>

<script>

import Modal from "../components/Modal";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { watch, ref, onMounted, computed, reactive } from "vue";
import { useStore } from "vuex";

export default {
	components: {
		FontAwesomeIcon,
		Modal,
	},
	setup() {
		const store = useStore();
		let isModalOpen = ref(false);
		let target = reactive({ user: {} });
    	let allUsers = ref([]);

		onMounted(() => {
			store.dispatch("getUsers").then((users) => {
				allUsers.value = users;
				console.log("Dispatch called");
			});
		});
    	const getUsers = computed(() => store.getters.allUsers);
		const users = computed(() => {
			return allUsers;
		});

		watch(
			() => target.user,
			() => {
				isModalOpen.value = Object.keys(target.user).length > 0 ? true : false;
			}
		);

		const openEditModal = (user) => {
			target.user = JSON.parse(JSON.stringify(user));
			console.log(target.user);
		};

		const saveModal = () => {
			store.commit("updateModal", {
				key: "instance",
				data: target.user,
			});
		};

		const closeModal = () => {
			console.log("close Event fired");
			target.user = {};
		};

		return {
			getUsers,
			isModalOpen,
			openEditModal,
			saveModal,
			closeModal,
			target,
		};
  	},
};
</script>

