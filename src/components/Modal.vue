<template>
	<div class="user-modal text-center">
		<div class="model-content-wrap">
			<div class="user-model-content">
				<div class="row">
					<div class="col-sm-6 col-md-6">
						<div class="mb-3">
							<label for="name" class="form-label">Name</label>
							<input
							id="name"
							type="text"
							v-model="userData.name"
							class="form-control"
							/>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-6 col-sm-6 col-md-6">
						<div class="mb-3">
							<label for="age" class="form-label">Age</label>
							<input
							id="age"
							type="text"
							v-model="userData.age"
							class="form-control"
							/>
						</div>
					</div>
					<div class="col-6 col-sm-6 col-md-6">
						<div class="mb-3">
							<label for="gender" class="form-label">Gender</label>
							<input
							id="gender"
							type="text"
							v-model="userData.gender"
							class="form-control"
							/>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-4 col-sm-4 col-md-4">
						<div class="mb-3">
							<label for="eyecolor" class="form-label">Eye Color</label>
							<input
							id="eyecolor"
							type="text"
							v-model="userData.eyeColor"
							class="form-control"
							/>
						</div>
					</div>
					<div class="col-4 col-sm-4 col-md-4">
						<div class="mb-3">
							<label for="pet" class="form-label">Pet</label>
							<input
							id="pet"
							type="text"
							v-model="userData.preferences.pet"
							class="form-control"
							/>
						</div>
					</div>
					<div class="col-4 col-sm-4 col-md-4">
						<div class="mb-3">
							<label for="fruit" class="form-label">Fruit</label>
							<input
							id="fruit"
							type="text"
							v-model="userData.preferences.fruit"
							class="form-control"
							/>
						</div>
					</div>
				</div>
				<div>
				<button @click="saveModal" class="btn-sm btn btn-primary me-3 d-inline-block">Save</button>
				<button @click="closeModal" type="button" class="btn-sm btn btn-danger">
					Dismiss
				</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { reactive } from "vue";
import { useStore } from "vuex";
export default {
  props: ["user"],
  setup(props, context) {
    const store = useStore();
    console.log(props);
    let userData = reactive({
      _id: props.user._id,
      name: props.user.name,
      age: props.user.age,
      gender: props.user.gender,
      eyeColor: props.user.eyeColor,
      fruit: props.user.preferences.fruit,
      preferences: {
        fruit: props.user.preferences.fruit,
        pet: props.user.preferences.pet,
      },
    });
    console.log("trhis is user ", userData);
    const closeModal = () => {
      context.emit("closeModal");
    };
    const saveModal = () => {
      store.dispatch("updateUser", userData);
      context.emit("closeModal");
    };

    return {
      userData,
      closeModal,
      saveModal,
    };
  },
};
</script>

<style>
.user-modal {
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  position: fixed;
  overflow-y: auto;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  text-align: left;
}
.model-content-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100%;
}

.user-model-content {
  /* width: 300px; */
  padding: 30px;
  box-sizing: border-box;
  background-color: #fff;
  font-size: 20px;
  text-align: center;
}
</style>
