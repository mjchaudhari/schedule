<template>
  <div>
    <span>Login</span>
    <v-btn
      @click="signin"
    >
      Sign in
    </v-btn>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'Login',
  components: {},
  data () {
    return {}
  },
  computed: {
    ...mapState({
      data: state => state.data
    }),
    ...mapGetters({})
  },
  mounted () {

  },
  methods: {
    ...mapMutations({}),
    ...mapActions({
      signin: 'user/signIn'
    })
  }
}
</script>

<style>

</style>
