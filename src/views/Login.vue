<template>
  <v-container
    class="fill-height justify-center bg"
    fluid
  >
    <v-sheet
      color=""
      class="transperent text-center justify-center"
    >
      <v-btn
        color="success"
        @click="signin"
      >
        Sign in with Google
      </v-btn>

    </v-sheet>
  </v-container>
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
