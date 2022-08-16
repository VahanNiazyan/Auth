<template>
  <Header :path="/login"/>

  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
    <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 mx-4 sm:mx-0">
      <form
          method="POST"
          @submit="userRegistration"
          @submit.prevent="$emit('submit')"
      >
        <div class="md:grid md:grid-cols-6 md:gap-6">
          <div class="md:col-span-3">
            <label
                for="first_name"
                class="block text-sm font-medium leading-5 text-gray-700"
            >
              {{ $t('register.first_name') }}
            </label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <input
                 id="first_name"
                 type="text"
                 class="appearance-none block w-full px-3 py-2 border rounded-md focus:outline-none transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                 :class="{'border-gray-300': !formErrors.first_name.length, 'border-red-500': formErrors.first_name.length}"
                 :value="form.first_name"
                 @input="handleInputChange('first_name', $event.target.value)"
              />
              <div
                  class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
                  v-if="formErrors.first_name.length"
              >
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
                class="mt-2 text-sm text-red-500"
                v-if="formErrors.first_name.length"
            >
              {{ formErrors.first_name[0] }}
            </p>
          </div>

          <div class="md:col-span-3 md:mt-0 mt-3">
            <label
                for="last_name"
                class="block text-sm font-medium leading-5 text-gray-700"
            >
              {{ __('app.customer.auth.register.last_name') }}
            </label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <input
                 id="last_name"
                 type="text"
                 class="appearance-none block w-full px-3 py-2 border rounded-md focus:outline-none transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                 :class="{'border-gray-300': !formErrors.last_name.length, 'border-red-500': formErrors.last_name.length}"
                 :value="form.last_name"
                 @input="handleInputChange('last_name', $event.target.value)"
              />
              <div
                  class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
                  v-if="formErrors.last_name.length"
              >
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
            <p class="mt-2 text-sm text-red-600">
              {{ formErrors.last_name[0] }}
            </p>
          </div>

          <div class="md:col-span-6 md:mt-0 mt-3">
            <label
                for="email"
                class="block text-sm font-medium leading-5 text-gray-700"
            >
              {{ $t('register.email') }}
            </label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <input
                 id="email"
                 type="email"
                 class="appearance-none block w-full px-3 py-2 border rounded-md focus:outline-none transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                 :value="form.email"
                 :class="{'border-gray-300': !formErrors.email.length, 'border-red-500': formErrors.email.length}"
                 @input="handleInputChange('email', $event.target.value)"
                 required
              />
              <div
                  class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
                  v-if="formErrors.email.length"
              >
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
                class="mt-2 text-sm text-red-500"
                v-if="formErrors.email.length"
            >
              {{ formErrors.email[0] }}
            </p>
            <p
                class="mt-2 text-sm text-gray-500"
                id="email-description"
            >
              {{ $t('register.email_instructions') }}
            </p>
          </div>

          <div class="md:col-span-6 md:mt-0 mt-3">
            <label
                for="password"
                class="block text-sm font-medium leading-5 text-gray-700"
            >
              {{ $t('register.password') }}
            </label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <input
                 id="password"
                 name="password"
                 type="password"
                 class="appearance-none block w-full px-3 py-2 border rounded-md focus:outline-none transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                 :class="{'border-gray-300': !formErrors.password.length, 'border-red-500': formErrors.password.length}"
                 :value="form.password"
                 @input="handleInputChange('password', $event.target.value)"
              />
              <div
                  class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
                  v-if="formErrors.password.length"
              >
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
                class="mt-2 text-sm text-red-500"
                v-if="formErrors.password.length"
            >
              {{ formErrors.password[0] }}
            </p>
            <p
                class="mt-2 text-sm text-gray-500"
                v-else id="password-description"
            >
              {{ $t('register.password_instructions') }}
            </p>
          </div>

          <div class="md:col-span-6 md:mt-0 mt-3">
            <label
                for="password_confirmation"
                class="block text-sm font-medium leading-5 text-gray-700"
            >
              {{ $t('register.password_confirmation') }}
            </label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <input
                 id="password_confirmation"
                 type="password"
                 class="appearance-none block w-full px-3 py-2 border rounded-md focus:outline-none transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                 :class="{'border-gray-300': !formErrors.password_confirmation.length, 'border-red-500': formErrors.password_confirmation.length}"
                 :value="form.password_confirmation"
                 @input="handleInputChange('password_confirmation', $event.target.value)"
              />
              <div
                  class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
                  v-if="formErrors.password_confirmation.length"
              >
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
                class="mt-2 text-sm text-red-500"
                v-if="formErrors.password_confirmation.length"
            >
              {{ formErrors.password_confirmation[0] }}
            </p>
          </div>
        </div>

        <div class="mt-6 flex items-center">
          <div class="flex items-justify">
            <input
               style="margin-top: 2px;"
               id="terms"
               value="1"
               v-model="terms"
               type="checkbox"
               class="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
               :class="{'focus:ring-red-500 text-red-500': formErrors.terms, 'focus:ring-blue-500 text-blue-600': !formErrors.terms}"
            />
            <div class="ml-3 text-sm">
              <label
                  for="terms"
                  :class="{'text-gray-700': !formErrors.terms, 'text-red-500': formErrors.terms}"
              >
                <span v-html="$t('register.terms')"></span>
              </label>
            </div>
          </div>
        </div>

        <div class="mt-4 flex items-center">
          <div class="flex items-justify">
            <input
                 style="margin-top: 2px;"
                 id="newsletter"
                 name="newsletter"
                 v-model="newsletter"
                 value="1"
                 type="checkbox"
                 class="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
            />
            <label
                for="newsletter"
                class="ml-2 block text-sm leading-5 text-gray-800"
            >
              <span v-html="$t('register.newsletter')"></span>
            </label>
          </div>
        </div>

        <div class="mt-6">
                    <span class="block w-full rounded-md shadow-sm">
                        <button
                            :disabled="form.submit"
                            class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
                        >
                                      {{ $t('register.register') }}
                        </button>
                    </span>
        </div>
      </form>

    </div>
     <Footer firstPath="/customer/statics/legal-notice" secondPath="/customer/statics/privacy"/>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import AuthLayout from '@/components/layout/AuthLayout';
import ButtonSpinner from '@/components/form/ButtonSpinner';
import Header from "../../components/auth/Header";
import Footer from "../../components/auth/Footer";

export default {
  name: 'Register',

  components: {Header, AuthLayout, ButtonSpinner, Footer},
  data() {
    return {
      terms: 0,
      newsletter: 0,
      form: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        submit: false
      },
      formErrors: {
        first_name: [],
        last_name: [],
        email: [],
        password: [],
        password_confirmation: [],
        terms: false
      }
    }
  },

  computed: {
    ...mapGetters([
      'registrationMessage',
      'registrationResponseMessage',
      'userRegistrationError'
    ])
  },

  beforeCreate() {
    const customer = localStorage.getItem('customer');

    if (customer) {
      this.$router.push({path: '/'});
    }
  },

  methods: {
    ...mapActions({
      handleUserRegistration: 'userRegistration'
    }),

    handleInputChange(inputName, value) {
      this.formErrors[inputName] = []
      this.form[inputName] = value
    },

    userRegistration() {
      if (this.terms) {
        this.form.submit = true

        this.$store.dispatch('userRegistration', {
          first_name: this.form.first_name,
          last_name: this.form.last_name,
          email: this.form.email,
          password: this.form.password,
          password_confirmation: this.form.password_confirmation,
          terms: this.terms ? 1 : 0,
          newsletter: this.newsletter ? 1 : 0
        })
      } else {
        this.formErrors.terms = true
      }
    }
  },

  watch: {
    terms() {
      if (this.terms) {
        this.formErrors.terms = false
      } else {
        this.formErrors.terms = true
      }
    },

    userRegistrationError(newValue) {
      if (newValue) {
        this.form.submit = false
        const {errors, message} = this.registrationResponseMessage
        this.formErrors = {
          ...this.formErrors,
          ...errors
        }

        this.$toast.error(message)
      }
    },

    registrationMessage(newValue) {
      if (newValue) {
        this.$toast.success(this.$t('register.register_successfully'), {
          duration: 2000,
          onClose: () => {
            this.$router.push('/login')
          }
        })
      }
    }
  },

  destroyed() {
    this.$destroy()
  }
}
</script>
