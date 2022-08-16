<template>
  <AuthLayout>
    <Header :path="/login"/>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
      <transition>
        <div
            class="rounded-md bg-green-50 p-4 mb-4 shadow"
            v-if="isSuccess"
        >
          <div class="flex">
            <div class="flex-shrink-0">
              <svg
                  class="h-5 w-5 text-green-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
              >
                <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm leading-5 font-medium text-green-800">
                {{ $t('passwordRequest.success') }}
              </p>
            </div>
          </div>
        </div>
      </transition>

      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 mx-4 sm:mx-0">
        <form
            method="POST"
            @submit="forgotPassword"
            @submit.prevent="$emit('submit')"
        >
          <div>
            <label
                for="email"
                class="block text-sm font-medium leading-5 text-gray-700"
            >
              {{ $t('passwordRequest.email') }}
            </label>
            <div class="mt-1 rounded-md shadow-sm">
              <input
                 id="email"
                 name="email"
                 type="email"
                 class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                 v-model="form.email"
                 required
              />
            </div>
            <p
                class="mt-2 text-sm text-gray-500"
                id="email-description">
              {{ $t('passwordRequest.reset_instructions') }}
            </p>
          </div>

          <div class="mt-6">
            <span class="block w-full rounded-md shadow-sm">
              <button-spinner :disabled="form.submit">
                {{ $t('passwordRequest.reset') }}
              </button-spinner>
            </span>
          </div>
        </form>

      </div>
      <AuthFooter />
    </div>
  </AuthLayout>
</template>

<script>
import { mapGetters } from 'vuex'
import AuthLayout from '@/components/layout/AuthLayout'
import ButtonSpinner from '@/components/form/ButtonSpinner'
import Header from "../../components/auth/AuthHeader";
import Footer from "../../components/auth/AuthFooter";

export default {
  name: 'ForgotPassword',

  components: { Footer, AuthLayout, ButtonSpinner, Header },

  data() {
    return {
      isSuccess : false,
      form      : {
        email  : '',
        submit : false
      }
    }
  },

  computed: {
    ...mapGetters([
      'forgotPasswordSuccess',
      'forgotPasswordMessage',
      'forgotPasswordError'
    ])
  },

  methods: {
    forgotPassword() {
      this.form.submit = true

      this.$store.dispatch('forgotPassword', {
        email: this.form.email
      })
    }
  },

  watch: {
    forgotPasswordError(newValue) {
      if (newValue) {
        this.form.submit  = false
        this.isSuccess    = false
        const { message } = this.forgotPasswordMessage

        this.$toast.error(message)
      }
    },

    forgotPasswordSuccess(newValue) {
      if (newValue) {
        this.form.submit = false
        this.form.email  = null
        this.isSuccess   = true
      }
    },
  },

  destroyed() {
    this.$destroy()
  }
}
</script>
