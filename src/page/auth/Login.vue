<template>
  <Header :path="/register"/>

  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
    <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 mx-4 sm:mx-0">
      <form
          method="POST"
          @submit="userLogin"
          @submit.prevent="$emit('submit')"
      >
        <div>
          <label
              for="email"
              class="block text-sm font-medium leading-5 text-gray-700"
          >
            {{ $t('login.email') }}
          </label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <input
               id="email"
               type="email"
               :value="form.email"
               class="appearance-none block w-full px-3 py-2 border rounded-md focus:outline-none transition duration-150 ease-in-out sm:text-sm sm:leading-5"
               :class="{'border-gray-300': formErrors.email.length, 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red' : 'border-gray-300 placeholder-gray-400 focus:border-blue-300 focus:shadow-outline-blue'}"
               autocomplete="username"
               @input="handleInputChange('email', $event.target.value)"
               required
            />
            <div
                v-if="formErrors.email.length"
                class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg
                  class="h-5 w-5 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
              >
                <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
          <p
              v-if="formErrors.email.length"
              class="mt-2 text-sm text-red-600"
          >
            {{ formErrors.email[0] }}
          </p>
        </div>

        <div class="mt-6">
          <label
              for="password"
              class="block text-sm font-medium leading-5 text-gray-700"
          >
            {{ $t('login.password') }}
          </label>
          <div class="mt-1 rounded-md shadow-sm">
            <input
               id="password"
               type="password"
               class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
               autocomplete="current-password"
               :value="form.password"
               @input="handleInputChange('password', $event.target.value)"
               required
            />
          </div>
          <p
              v-if="formErrors.password.length"
              class=" mt-2 text-sm text-red-600"
          >
            {{ formErrors.password[0] }}
          </p>
        </div>

        <div class="mt-6 flex items-center justify-between">
          <div class="flex items-center">
            <input
                id="remember_me"
                value="1"
                type="checkbox"
                class="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
            />
            <label
                for="remember_me"
                class="ml-2 block text-sm leading-5 text-gray-900"
            >
              {{ $t('login.remember_me') }}
            </label>
          </div>

          <div class="text-sm leading-5">
            <router-link
                to="/forgot-password"
                class="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
            >
              {{ $t('login.forgot_password') }}
            </router-link>
          </div>
        </div>

        <div class="mt-6">
                    <span class="block w-full rounded-md shadow-sm">
                        <button
                            type="submit"
                            :disabled="form.submit"
                            class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
                        >
                          {{ $t('auth.login.sign_in') }}
                        </button>
                    </span>
        </div>
      </form>

    </div>
    <Footer firstPath="/customer/statics/legal-notice" secondPath="/customer/statics/privacy"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AuthLayout from '@/components/layout/AuthLayout'
import ButtonSpinner from '@/components/form/ButtonSpinner'
import Footer from '@/components/auth/AuthFooter'
import Header from '@/components/auth/AuthHeader'

export default {
  name: 'Login',

  components: { ButtonSpinner, AuthLayout, Footer, Header },

  data() {
    return {
      remember : 0,
      form     : {
        email    : '',
        password : '',
        remember : false,
        submit   : false
      },
      formErrors: {
        password : [],
        email    : []
      }
    }
  },

  computed: {
    ...mapGetters([
      'userLoginSuccess',
      'loginResponseMessage',
      'userLoginError'
    ])
  },

  beforeCreate() {
    const customer = localStorage.getItem('customer')

    if (customer) {
      this.$router.push({ path: '/' })
    }
  },

  methods: {
    handleInputChange(inputName, value) {
      this.formErrors[inputName] = []
      this.form[inputName]       = value
    },

    userLogin() {
      this.form.submit = true

      this.$store.dispatch('userLogin', {
        email    : this.form.email,
        password : this.form.password,
        remember : this.remember ? 1: 0
      })
    }
  },

  watch: {
    userLoginError(newValue) {
      if (newValue) {
        this.form.submit          = false
        const { errors, message } = this.loginResponseMessage
        this.formErrors           = {
          ...this.formErrors,
          ...errors
        }

        if (message) {
          this.$toast.error(message)
        }
      }
    },

    userLoginSuccess(newValue) {
      if (newValue) {
        this.$toast.success(this.$t('login.login_message'), {
          duration: 2000,
          onClose: () => {
            this.$router.push('/')
          }
        })
      }
    },
  },

  destroyed() {
    this.$destroy()
  }
}
</script>
