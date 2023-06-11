<template>
  <h1>Sign out</h1>
</template>

<script>
export default {
  asyncData () {
    // eslint-disable-next-line no-undef
    $nuxt.$fire.auth.signOut()
  }
}
</script>
