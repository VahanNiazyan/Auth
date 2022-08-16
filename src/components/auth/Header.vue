<template>
  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <div class="mx-auto h-12 w-64">
      <img src="~@/assets/images/logo.svg">
    </div>
    <h2 class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
      {{ $t('login.header_cta') }}
    </h2>
    <p class="mt-2 text-center text-sm leading-5 text-gray-600 max-w">
      {{ $t('common.or') }}
      <router-link :to="path" class="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
        {{ $t('login.header_sub') }}
      </router-link>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    path: '',
  },
}
</script>
