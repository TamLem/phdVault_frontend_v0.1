<template>
	<div id="signup-view">
		<!--wrapper-->
		<div class="wrapper">
			<div class="d-flex align-items-center justify-content-center my-5 my-lg-0">
				<div class="container">
					<div class="row row-cols-1 row-cols-lg-2 row-cols-xl-2">
						<div class="col mx-auto">
							<div class="my-4 text-center">
								<img src="assets/images/logo-img.png" width="180" alt="" />
							</div>
							<div class="card">
								<div class="card-body">
									<div class="border p-4 rounded">
										<div class="text-center">
											<h3 class="">Sign Up</h3>
											<p>Already have an account? <a href="/login">Sign in here</a>
											</p>
										</div>
										<div class="d-grid">
											<a class="btn my-4 shadow-sm btn-light" href="javascript:;"> <span
													class="d-flex justify-content-center align-items-center">
													<img class="me-2" src="assets/images/icons/search.svg" width="16" alt="Image Description">
													<span>Sign Up with Google</span>
												</span>
											</a> <a href="javascript:;" class="btn btn-light"><i class="bx bxl-facebook"></i>Sign Up with
												Facebook</a>
										</div>
										<div class="login-separater text-center mb-4"> <span>OR SIGN UP WITH EMAIL</span>
											<hr />
										</div>
										<div class="form-body">
											<form class="row g-3" method="post" @submit="onSubmit">
												<div class="col-sm-6">
													<label for="inputFirstName" class="form-label">First Name</label>
													<Field type="text" v-model="firstName" :validateOnInput='true' name="firstName" :class="{'form-control': true, 'is-invalid': errors.firstName ? true : false}" id="inputFirstName"
														placeholder="Jhon" required/>
													<span class="text-danger">{{ errors.firstName }}</span>
												</div>
												<div class="col-sm-6">
													<label for="inputLastName" class="form-label">Last Name</label>
													<Field type="text" v-model="lastName" :validateOnInput='true' name="lastName" :class="{'form-control': true, 'is-invalid': errors.lastName ? true : false}" id="inputLastName" placeholder="Deo"
														required/>
													<span class="text-danger">{{ errors.lastName }}</span>
												</div>
												<div class="col-12">
													<label for="inputEmailAddress" class="form-label">Email Address</label>
													<Field type="email" v-model="email" :validateOnInput='true' name="email" :class="{'form-control': true, 'is-invalid': errors.email ? true : false}" id="inputEmailAddress"
														placeholder="example@user.com"/>
													<span class="text-danger">{{ errors.email }}</span>
												</div>
												<div class="col-12">
													<label for="inputChoosePassword" class="form-label">Password</label>
													<div class="input-group" id="show_hide_password">
														<Field type="password" v-model="password" :validateOnInput='true' name="password" :class="{'form-control': true, 'is-invalid': errors.password ? true : false}"
															id="inputChoosePassword" placeholder="Enter Password"/> <a @click="showPassword"
															class="input-group-text bg-transparent"><i class='bx bx-hide'></i></a>
													</div>
													<span class="text-danger">{{ errors.password }}</span>
												</div>
												<div class="col-12">
													<label for="inputChooseConfirmPassword" class="form-label">Confirm Password</label>
													<div class="input-group" id="show_hide_confirm_password">
														<Field type="password" v-model="confirmPassword" :validateOnInput='true' name="confirmPassword" :class="{'form-control': true, 'is-invalid': errors.confirmPassword ? true : false}"
															id="inputChooseConfirmPassword" placeholder="Confirm Password"/> <a
															@click="showConfirmPassword" class="input-group-text bg-transparent"><i
																class='bx bx-hide'></i></a>
													</div>
													<span class="text-danger">{{ errors.confirmPassword }}</span>
												</div>
												<!-- <div class="col-12">
												<label for="inputSelectCountry" class="form-label">Country</label>
												<select class="form-select" id="inputSelectCountry" aria-label="Default select example">
													<option selected>India</option>
													<option value="1">United Kingdom</option>
													<option value="2">America</option>
													<option value="3">Dubai</option>
												</select>
											</div> -->
												<div class="col-12">
													<div class="form-check form-switch">
														<input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" required>
														<label class="form-check-label" for="flexSwitchCheckChecked">I read and agree to Terms &
															Conditions</label>
													</div>
												</div>
												<div class="col-12">
													<div class="d-grid">
														<button type="submit" :disabled='firstName && lastName && email && password && confirmPassword && !errors.firstName && !errors.lastName && !errors.email && !errors.password && !errors.confirmPassword ? false : true' class="btn btn-light"><i class='bx bx-user'></i>Sign up</button>
													</div>
												</div>
											</form>
										</div>
									</div>
									<div v-if="message" class="alert col-12 text-center" :class="successful ? 'alert-success' : 'alert-danger'">
										{{ message }}
									</div>
								</div>
							</div>
						</div>
					</div>
					<!--end row-->
				</div>
			</div>
		</div>
		<!--end page wrapper -->
	</div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useForm, Field } from 'vee-validate';
import * as yup from "yup";
import useStore from "../store/index";
import { useRouter } from "vue-router";

const router = useRouter();

const schema = yup.object().shape({
	firstName: yup.string().required("This is a required field"),
	lastName: yup.string().required("This is a required field"),
	email: yup.string().email("Email must be valid").required("This is a required field"),
	password: yup.string().required("This is a required field").min(8).matches(/^(?=\D*\d)[^a-z]*[a-z].*$/i, "Password must contain at least one letter and a number"),
	confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Password and Confirm Password don't match.").required("This is a required field"),
});

const message = ref('');
const successful = ref(false);
const store = useStore();

const { useFieldModel, errors, handleSubmit } = useForm({
  validationSchema: schema,
});

const [firstName, lastName, email, password, confirmPassword] = useFieldModel(['firstName', 'lastName', 'email', 'password', 'conform', 'confirmPassword']);

function onSubmit(e) {
	e.preventDefault();
	const { firstName, lastName, email, password, confirmPassword } = e.target.elements;
	//console.log(firstName.value, lastName.value, email.value, password.value, confirmPassword.value);

	schema.validate({
		firstName: firstName.value,
		lastName: lastName.value,
		email: email.value,
		password: password.value,
		confirmPassword: confirmPassword.value,
	}).then(async (data) => {
		try {
			await store.register(data);
			successful.value = true;
			message.value = 'User registered successfully';
			router.push({name: 'home'})
		} catch (error) {
			successful.value = false;
			message.value = error;
		}
		
	}).catch((err) => {
		successful.value = false;
		message.value = err.message;
		console.log(err.message);
	});
};

function showPassword() {
	var x = document.getElementById("inputChoosePassword");
	if (x.type === "password") {
		x.type = "text";
	} else {
		x.type = "password";
	}
};

function showConfirmPassword() {
	var x = document.getElementById("inputChooseConfirmPassword");
	if (x.type === "password") {
		x.type = "text";
	} else {
		x.type = "password";
	}
};
/* export default {
	name: "Register",
	// message: "",
	data() {
		return {
			message: "",
			store: useStore(),
			successful: false
			// form: store.state.form,
			// message: store.state.message,
			// successful: store.state.successful
		}
	},
	methods: {
		showPassword() {
			var x = document.getElementById("inputChoosePassword");
			if (x.type === "password") {
				x.type = "text";
			} else {
				x.type = "password";
			}
		},

		onSubmit(e) {
			e.preventDefault();
			const { firstName, lastName, email, password, confirmPassword } = e.target.elements;
			//console.log(firstName.value, lastName.value, email.value, password.value, confirmPassword.value);

			schema.validate({
				firstName: firstName.value,
				lastName: lastName.value,
				email: email.value,
				password: password.value,
				confirmPassword: confirmPassword.value,
			}).then(async (data) => {
				try {
					await this.store.register(data);
					this.successful = true;
					this.message = 'User registered successfully';
				} catch (error) {
					this.successful = false;
					this.message = error;
				}
				
			}).catch((err) => {
				this.successful = false;
				this.message = err.message;
				console.log(err.message);
			});
		},

		showConfirmPassword() {
			var x = document.getElementById("inputChooseConfirmPassword");
			if (x.type === "password") {
				x.type = "text";
			} else {
				x.type = "password";
			}
		}
	}
} */



/*
export default {
		setup() {
			const store = useStore();
			return { store };
		},	
		name: "SignUp",
		data() {
			let show = false;

			const schema = yup.object({
				firstName: yup.string().required("First Name is required"),
				lastName: yup.string().required("Last Name is required"),
				email: yup.string().email().required("Email is required"),
				password: yup.string().required().min(6, 'Password must be at least 6 characters')
					.max(20, 'Password must be at most 20 characters'),
				confirmPassword: yup.string().required("Confirm Password is required").oneOf([yup.ref('password'), null], 'Passwords must match')
			});
			
			return {
				successful: false,
				message: '',
				loading: false,
				schema,
				agreed: false,
				form: {
					firstName: '',
					lastName: '',
					email: '',
					password: '',
					confirmPassword: '',
				},
			}
		},
		computed: {
			loggeIn() {
				return this.store.isLoggedIn;
			}
		},
		mounted() {
			if (this.loggeIn) {
				this.$router.push('/home');
			}
		},
		methods: {
				togglePassword() {
						this.show = !this.show;
				},
				async register(e) {
					e.preventDefault();
					console.log("in register");
					console.log(this.form)
					this.loading = true;
					this.schema.isValid(this.form)
					.then((valid) => {console.log(valid);})
					.catch(err => {
						console.log(err);
						this.message = err.errors[0];
						this.loading = false;
					});
					return;
					const { firstName, lastName, email, password, confirmPassword } = this.$refs.form.model;
					const fullName = `${firstName} ${lastName}`;
					if (password !== confirmPassword) {
						this.loading = false;
						this.message = 'Password and Confirm Password must be same';
						this.successful = false;
						return;
					}
					try {
						const response = await this.$store.dispatch('register', { fullName, email, password });
						this.message = response.data.message;
						this.successful = true;
						this.$router.push('/login');
					} catch (error) {
						this.message = error.response.data.message;
						this.successful = false;
					}
					this.loading = false;
				}
		},
};
*/

</script>