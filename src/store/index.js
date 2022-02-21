import { createStore } from "vuex";
import axios from 'axios'


//load Vuex
// Vue.use(Vuex);


export default createStore({
  // state: {},

	//to handle state
	state : {
		users: []
	},

	//to handle getters
	getters : {
		allUsers: (state) => state.users
	},
	
	//to handle mutations
	mutations : {
		SET_USERS(state, users) {
			state.users = users
		},
		// updateUser(state, {index, currentUser}) {
		// 	state.users[index]._id = currentUser._id
		// 	state.users[index].name = currentUser.name
		// }
		updateUser(state, {index, currentUser}) {
			state.users[index].name = currentUser.name
			state.users[index]._id = currentUser._id,
			state.users[index].age = currentUser.age,
			state.users[index].gender = currentUser.gender,
			state.users[index].preferences.pet = currentUser.preferences.pet,
			state.users[index].preferences.fruit = currentUser.preferences.fruit,
			state.users[index].eyeColor = currentUser.eyeColor
		}
	},
	//to handle actions
	actions : {
		// getUsers({ commit }) {
		// 	axios.get('http://localhost:8080/files/people.json')
		// 		.then(response => {
		// 			commit('SET_USERS', response.data)
		// 	   })
		// },
		async getUsers({ commit }) {
			let users = axios.get('http://localhost:8080/files/people.json')
			.then(response => {
				commit('SET_USERS', response.data)
				return this.getters.allUsers
			})
			// .then(response => {
			// 	return JSON.parse(JSON.stringify(response.data))
			// })
			return Promise.resolve(users)
		},
		updateUser({ state, commit }, currentUser) {
			const index = state.users.findIndex(aUser => {
				return aUser._id === currentUser._id
			})
			if (index >= 0) {
				// replace user details
				commit('updateUser', {index, currentUser })
			}
			console.log(currentUser, state.users); 
		}
	},
});
