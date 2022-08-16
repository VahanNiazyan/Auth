<template>
  <div class="mx-auto text-center mt-4 text-gray-600 text-sm">
    <router-link :to="firstPath" target="_blank">
      {{ $t('common.legal_notice') }}
    </router-link>

    <router-link :to="secondPath" target="_blank">
      {{ $t('common.privacy') }}
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    firstPath: '',
    secondPath: ''
  },
}
</script>
