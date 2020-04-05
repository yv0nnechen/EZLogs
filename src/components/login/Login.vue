<template>
  <v-app>
    <v-container class="fill-height" fluid>
      <transition name="fade">
        <v-overlay :value="performingRequest">
          <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
          Loading...
        </v-overlay>
      </transition>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>{{ toolbarTitle }}</v-toolbar-title>
              <v-spacer />
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn icon large v-on="on" @click="togglePasswordReset">
                    <v-icon>mdi-lock-reset</v-icon>
                  </v-btn>
                </template>
                <span v-if="!showForgotPassword">Reset Password</span>
                <span v-else>Back to Sign In</span>
              </v-tooltip>
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-btn icon large v-on="on" @click="toggleForm" v-show="showLoginForm">
                    <v-icon>mdi-account-plus</v-icon>
                  </v-btn>
                </template>
                <span>Create an account</span>
              </v-tooltip>
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-btn icon large v-on="on" @click="toggleForm" v-show="!showLoginForm">
                    <v-icon>mdi-clipboard-account</v-icon>
                  </v-btn>
                </template>
                <span>Back to Sign In</span>
              </v-tooltip>
            </v-toolbar>
            <v-card-text>
              <v-form v-if="showLoginForm" ref="login" lazy-validation>
                <v-text-field
                  label="Login"
                  name="login"
                  prepend-icon="mdi-account"
                  type="text"
                  placeholder="you@email.com"
                  v-model.trim="loginForm.email"
                  :rules="[rules.required, rules.email]"
                />
                <v-text-field
                  id="password"
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                  placeholder="******"
                  v-model.trim="loginForm.password"
                  :rules="[rules.required]"
                />
                <v-card-actions>
                  <v-spacer />
                  <v-btn color="primary" @click="login">Login</v-btn>
                </v-card-actions>
              </v-form>

              <v-form v-if="!showLoginForm && !showForgotPassword" ref="signup" lazy-validation>
                <v-text-field
                  label="Name"
                  name="name"
                  prepend-icon="mdi-account"
                  type="text"
                  placeholder="Your name here"
                  v-model.trim="signupForm.name"
                  :rules="[rules.required]"
                />

                <v-text-field
                  label="Title"
                  name="title"
                  prepend-icon="mdi-subtitles"
                  type="text"
                  placeholder="Site Superintendent"
                  v-model.trim="signupForm.title"
                  :rules="[rules.required]"
                />

                <v-text-field
                  label="Email"
                  name="email2"
                  prepend-icon="mdi-at"
                  type="text"
                  placeholder="you@email.com"
                  v-model.trim="signupForm.email"
                  :rules="[rules.required, rules.email]"
                />

                <v-text-field
                  id="password2"
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                  placeholder="******"
                  v-model.trim="signupForm.password"
                  :rules="[rules.required]"
                />

                <v-card-actions>
                  <v-spacer />
                  <v-btn color="primary" @click="signup">Sign Up</v-btn>
                </v-card-actions>
              </v-form>

              <v-form v-if="showForgotPassword" ref="resetPassword" lazy-validation>
                <div v-if="!passwordResetSuccess">
                  <p>We will send you an email to reset your password</p>

                  <v-text-field
                    label="Email"
                    name="email3"
                    prepend-icon="mdi-at"
                    type="text"
                    placeholder="you@email.com"
                    v-model.trim="passwordForm.email"
                    :rules="[rules.required, rules.email]"
                  />

                  <v-card-actions>
                    <v-spacer />
                    <v-btn color="primary" @click="resetPassword">Reset Password</v-btn>
                  </v-card-actions>
                </div>
                <div v-else>
                  <h1>Email Sent</h1>
                  <p>check your email for a link to reset your password</p>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn color="primary" @click="togglePasswordReset">Back to login</v-btn>
                  </v-card-actions>
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-snackbar v-model="snackbar" :timeout="timeout">
        {{ errorMsg }}
        <v-btn color="blue" text @click="snackbar = false">
          <v-icon dark>mdi-close-circle</v-icon>
        </v-btn>
      </v-snackbar>
    </v-container>
  </v-app>
</template>

<script>
import FormValidator from '@/utils/FormValidation';

const fb = require('@/plugins/firebaseConfig.js');

export default {
  data() {
    return {
      loginForm: {
        email: '',
        password: '',
      },
      signupForm: {
        name: '',
        title: '',
        email: '',
        password: '',
      },
      passwordForm: {
        email: '',
      },
      showLoginForm: true,
      showForgotPassword: false,
      passwordResetSuccess: false,
      performingRequest: false,
      snackbar: false,
      toolbarTitle: 'Login',
      errorMsg: '',
      timeout: 2000,
      rules: FormValidator,
    };
  },
  methods: {
    toggleForm() {
      this.showErrorMessage('');
      if (this.showLoginForm) {
        this.toolbarTitle = 'Get Started';
      } else {
        this.toolbarTitle = 'Login';
      }

      this.showLoginForm = !this.showLoginForm;
    },
    togglePasswordReset() {
      if (this.showForgotPassword) {
        this.showLoginForm = true;
        this.showForgotPassword = false;
        this.passwordResetSuccess = false;
        this.toolbarTitle = 'Login';
      } else {
        this.showLoginForm = false;
        this.showForgotPassword = true;
        this.toolbarTitle = 'Reset Password';
      }
    },
    login() {
      if (this.$refs.login.validate()) {
        this.performingRequest = true;
        fb.auth
          .signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password)
          .then(() => {
            this.performingRequest = false;
            this.$router.push('/dashboard');
          })
          .catch((err) => {
            console.log(err);
            this.performingRequest = false;
            this.showErrorMessage(err);
          });
      }
    },
    signup() {
      if (this.$refs.signup.validate()) {
        this.performingRequest = true;
        fb.auth
          .createUserWithEmailAndPassword(this.signupForm.email, this.signupForm.password)
          .then(() => {
            // this.$store.commit("setCurrentUser", user);
            // create user obj
            this.$router.push('/dashboard');
            this.performingRequest = false;
          })
          .catch((err) => {
            console.log(err);
            this.performingRequest = false;
            this.showErrorMessage(err);
          });
      }
    },
    resetPassword() {
      this.performingRequest = true;
      fb.auth
        .sendPasswordResetEmail(this.passwordForm.email)
        .then(() => {
          this.performingRequest = false;
          this.passwordResetSuccess = true;
          this.passwordForm.email = '';
        })
        .catch((err) => {
          console.log(err);
          this.performingRequest = false;
          this.showErrorMessage(err);
        });
    },
    showErrorMessage(err) {
      if (!err) {
        this.errorMsg = '';
        return;
      }
      this.snackbar = true;
      this.errorMsg = err.message;
    },
  },
};
</script>
