<template>
  <cardRegister />
</template>

<script>
import cardRegister from '~/components/auth/card-register.vue'
export default {
  name: 'IndexPage',
  components: {
    cardRegister
  },
  layout: 'signin'
}
</script>
