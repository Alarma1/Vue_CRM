<template>
      <form class="card auth-card" @submit.prevent="submitHandler">
        <div class="card-content">
          <span class="card-title">{{'Home bookkeeping' | localize}}</span>
          <div class="input-field">
            <input
              id="email"
              type="text"
              v-model.trim="email"
              :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
            >
            <label for="email">Email
            </label>
            <small class="helper-text invalid"
                   v-if="$v.email.$dirty && !$v.email.required"
            >{{'Email field must not be empty' | localize}}</small>
            <small class="helper-text invalid"
                   v-else-if="$v.email.$dirty && !$v.email.email"
            >{{'Please enter a valid Email' | localize}}</small>
          </div>
          <div class="input-field">
            <input
              id="password"
              type="password"
              v-model.trim="password"
              :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
            >
            <label for="password">{{'Password' | localize}}
            </label>
            <small class="helper-text invalid"
                   v-if="$v.password.$dirty && !$v.password.required"
            >{{'Enter password' | localize}}
            </small>
            <small class="helper-text invalid"
                   v-else-if="$v.password.$dirty && !$v.password.minLength"
            >
              {{'The password must be' | localize}} {{$v.password.$params.minLength.min}} {{'Characters' | localize}} {{password.length}}
            </small>
          </div>
          <div class="input-field">
            <input
              id="name"
              type="text"
              v-model.trim="name"
              :class="{invalid: $v.name.$dirty && !$v.name.required}"
            >
            <label for="name">{{'Name' | localize}}</label>
            <small class="helper-text invalid"
                   v-if="$v.name.$dirty && !$v.name.required"
            >
              {{'Enter your name' | localize}}
            </small>
          </div>
          <p>
            <label for="acceptRules">
              <input id="acceptRules" type="checkbox" v-model="agree" />
              <span>{{'I agree with the rules' | localize}}</span>
            </label>
          </p>
        </div>
        <div class="card-action">
          <div>
            <button
              class="btn waves-effect waves-light auth-submit"
              type="submit"
            >
              {{'Register' | localize}}
              <i class="material-icons right">send</i>
            </button>
          </div>

          <p class="center">
            {{'Already have an account?' | localize}}
            <router-link to="/login">{{'Enter' | localize}}!</router-link>
          </p>
        </div>
      </form>

</template>
<script>
  import { email, minLength, required } from 'vuelidate/lib/validators';

  export default {
    name: 'register',
    metaInfo() {
      return {
        title: this.$title('Register')
      }
    },
    data: () => ({
      email: '',
      password: '',
      name: '',
      agree: false
    }),
    validations: {
      email:{email, required},
      password:{required, minLength: minLength(6)},
      name:{required},
      agree: {checked: v => v}
    },
    methods: {
      async submitHandler() {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }

        const formData = {
          email: this.email,
          password: this.password,
          name: this.name
        }

        try{
          await this.$store.dispatch('register', formData)
          this.$router.push('/')
        } catch (e) {}
        }
      },
  };
</script>
