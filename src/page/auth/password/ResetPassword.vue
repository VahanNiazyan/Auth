<template>
  <Header :path="/login"/>

  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
    <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 mx-4 sm:mx-0">
      <form method="POST" @submit="" @submit.prevent="$emit('submit')">
        <div>
          <label for="email" class="block text-sm font-medium leading-5 text-gray-700">
            {{ $t('password-reset.email') }}
          </label>
          <div class="mt-1 relative  rounded-md shadow-sm">
            <input id="email"
                   type="email"
                   :value="form.email"
                   class="appearance-none block w-full px-3 py-2 border rounded-md focus:outline-none transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                   :class="{'border-gray-300': formErrors.email.length, 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red' : 'border-gray-300 placeholder-gray-400 focus:border-blue-300 focus:shadow-outline-blue'}"
                   @input="handleInputChange('email', $event.target.value)"
                   autocomplete="username"
                   required
            />
            <div v-if="formErrors.email.length"
                 class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
          <p v-if="formErrors.email.length" class="mt-2 text-sm text-red-600">
            {{ formErrors.email[0] }}
          </p>
        </div>

        <div class="mt-6">
          <label
              for="email"
              class="block text-sm font-medium leading-5 text-gray-700"
          >
            {{ $t('password-reset.password') }}
          </label>
          <div class="mt-1 relative  rounded-md shadow-sm">
            <input
               id="password"
               type="password"
               class="appearance-none block w-full px-3 py-2 border rounded-md focus:outline-none transition duration-150 ease-in-out sm:text-sm sm:leading-5"
               :value="form.password"
               @input="handleInputChange('password', $event.target.value)"
            />
            <div
                v-if="formErrors.password.length"
                class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
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
              v-if="formErrors.password.length"
              class=" mt-2 text-sm text-red-600"
          >
            {{ formErrors.password[0] }}
          </p>
        </div>

        <div class="mt-6">
          <label
              for="email"
              class="block text-sm font-medium leading-5 text-gray-700"
          >
            {{ $t('password-reset.password_confirmation') }}
          </label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <input
              id="password_confirmation"
               type="password"
               class="appearance-none block w-full px-3 py-2 border rounded-md focus:outline-none transition duration-150 ease-in-out sm:text-sm sm:leading-5"
               :value="form.password_confirmation"
               @input="handleInputChange('password_confirmation', $event.target.value)"
            />
            <div
                v-if="formErrors.password_confirmation.length"
                class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
          <p
              v-if="formErrors.password_confirmation.length"
              class=" mt-2 text-sm text-red-600"
          >
            {{ formErrors.password_confirmation[0] }}
          </p>
        </div>

        <div class="mt-6">
                    <span class="block w-full rounded-md shadow-sm">
                        <button
                            type="submit"
                            class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out">
                                          {{ $t('password-reset.reset') }}
                        </button>
                    </span>
        </div>
      </form>

    </div>
    <Footer
        firstPath="/customer/statics/legal-notice"
        secondPath="/customer/statics/privacy"
    />
  </div>
</template>
