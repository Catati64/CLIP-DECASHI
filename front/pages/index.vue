<template>
  <cardLogin />
</template>

<script>
import cardLogin from '~/components/auth/card-login.vue'
export default {
  name: 'IndexPage',
  components: {
    cardLogin
  },
  layout: 'signin'
}
</script>
