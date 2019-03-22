<template>
  <div>
    Should close, replace with loading spinner.
  </div>
</template>

<script>
export default {
  mounted () {
    const hash = this.$route.hash || ''

    if (!/access_token/.test(hash)) {
      postMessage({
        action: 'auth.instagram.failure'
      }, location.origin)

      return close()
    }

    localStorage.token = (this.$route.hash || '').replace('#access_token=', '')

    return close()
  }
}
</script>
