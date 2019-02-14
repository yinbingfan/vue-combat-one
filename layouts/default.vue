<template>
  <div>
    <nuxt/>
  </div>
</template>

<script>
  export default {
    methods:{
      sessionLangCode() {
        let langCode = sessionStorage.getItem('langCode')
        if(langCode) {
          this.$store.commit('SET_LANGUAGE_ID', langCode)
          this.$store.commit('SET_DEFAULT_LANG',String(this.$store.state.languageId) )
        }
      }
    },
    mounted(){
      this.sessionLangCode()
    }


  }

</script>

<style>

</style>
