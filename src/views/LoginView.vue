<template>
	<div id="login-view">
		<!--wrapper-->
		<div class="wrapper">
			<div class="section-authentication-signin d-flex align-items-center justify-content-center my-5 my-lg-0">
				<div class="container-fluid">
					<div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3">
						<div class="col mx-auto">
							<div class="mb-4 text-center">
								<img src="assets/images/logo-img.png" width="180" alt="" />
							</div>
							<div class="card">
								<div class="card-body">
									<div class="border p-4 rounded">
										<div class="text-center">
											<h3 class="">Sign in</h3>
											<p>Don't have an account yet? <a href="/signup">Sign up
													here</a>
											</p>
										</div>
										<div class="d-grid">
											<a class="btn my-4 shadow-sm btn-light" href="javascript:;"> <span
													class="d-flex justify-content-center align-items-center">
													<img class="me-2" src="assets/images/icons/search.svg" width="16"
														alt="Image Description">
													<span>Sign in with Google</span>
												</span>
											</a> <a href="javascript:;" class="btn btn-light"><i
													class="bx bxl-facebook"></i>Sign in with Facebook</a>
										</div>
										<div class="login-separater text-center mb-4"> <span>OR SIGN IN WITH
												EMAIL</span>
											<hr />
										</div>
										<div class="form-body">
											<form class="row g-3" method="post" @submit="onSubmit">
												<div class="col-12">
													<label for="inputEmailAddress" class="form-label">Email
														Address</label>
													<Field v-model="email" :validateOnInput='true' type="email" name="email" :class="{'form-control': true, 'is-invalid': errors.email ? true : false}" id="inputEmailAddress"
														placeholder="Email Address" />
													<span class="text-danger">{{ errors.email }}</span>
												</div>
												<div class="col-12">
													<label for="inputChoosePassword" class="form-label">Enter
														Password</label>
													<div class="input-group" id="show_hide_confirm_password">
														<Field v-model="password" type="password" name="password" :class="{'form-control': true }"
															id="inputChoosePassword" placeholder="Password"/> <a
															@click="showPassword" class="input-group-text bg-transparent"><i
																class='bx bx-hide'></i></a>
													</div>
												</div>
												<div class="col-md-6">
													<div class="form-check form-switch">
														<input class="form-check-input" type="checkbox"
															id="flexSwitchCheckChecked" checked>
														<label class="form-check-label"
															for="flexSwitchCheckChecked">Remember Me</label>
													</div>
												</div>
												<div class="col-md-6 text-end"> <a
														href="authentication-forgot-password.html">Forgot Password ?</a>
												</div>
												<div class="col-12">
													<div class="d-grid">
														<button type="submit" :disabled='email && password && !errors.email ? false : true' class="btn btn-light"><i
																class="bx bxs-lock-open"></i>Sign in</button>
													</div>
												</div>
											</Form>
										</div>
										<div v-if="message" class="alert mt-5 col-12 text-center" :class="successful ? 'alert-success' : 'alert-danger'">
											{{ message }}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!--end row-->
				</div>
			</div>
		</div>
		<!--end wrapper-->
		<!--start switcher-->
		<div class="switcher-wrapper">
			<div class="switcher-btn"> <i class='bx bx-cog bx-spin'></i>
			</div>
			<div class="switcher-body">
				<div class="d-flex align-items-center">
					<h5 class="mb-0 text-uppercase">Theme Customizer</h5>
					<button type="button" class="btn-close ms-auto close-switcher" aria-label="Close"></button>
				</div>
				<hr />
				<p class="mb-0">Gaussian Texture</p>
				<hr>
				<ul class="switcher">
					<li id="theme1"></li>
					<li id="theme2"></li>
					<li id="theme3"></li>
					<li id="theme4"></li>
					<li id="theme5"></li>
					<li id="theme6"></li>
				</ul>
				<hr>
				<p class="mb-0">Gradient Background</p>
				<hr>
				<ul class="switcher">
					<li id="theme7"></li>
					<li id="theme8"></li>
					<li id="theme9"></li>
					<li id="theme10"></li>
					<li id="theme11"></li>
					<li id="theme12"></li>
					<li id="theme13"></li>
					<li id="theme14"></li>
					<li id="theme15"></li>
				</ul>
			</div>
		</div>
		<!--end switcher-->
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
	email: yup.string().email().required(),
	password: yup.string().required(),
});

const message = ref('');
const successful = ref(false);
const store = useStore();

const { useFieldModel, errors, handleSubmit } = useForm({
  validationSchema: schema,
});

const [email, password] = useFieldModel(['email', 'password']);

function onSubmit(e){
	//alert(JSON.stringify(values, null, 2));
	e.preventDefault();
	const { email, password } = e.target.elements;
	//console.log(firstName.value, lastName.value, email.value, password.value, confirmPassword.value	
	schema.validate({
		email: email.value,
		password: password.value
	}).then(async (data) => {
		try {
			await store.login(data);
			successful.value = true;
			message.value = 'User logged in successfully';
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

</script>