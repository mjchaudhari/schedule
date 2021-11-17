<template>
<v-container
  class="fill-height justify-center bg"
  fluid
>
  <v-sheet
    color=""
    class="transperent text-center justify-center"
  >
    <h3>Hello</h3>
    <h5
      v-if="!requireLogin"
    >
      Getting ready in few moments
    </h5>
    <v-btn
      v-if="requireLogin"
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
import fb from '../firebase'
export default {
  name: 'Splash',
  components: {},
  data () {
    return {
      requireLogin: false
    }
  },
  computed: {
    ...mapState({
    }),
    ...mapGetters({})
  },
  async mounted () {
    try {
      const result = await fb.monitorAuthState()
      console.log('user logged in', result)
      if (result) {
        this.requireLogin = false
        this.$router.push({ name: 'SCHEDULE' })
      } else {
        this.requireLogin = true
      }
    } catch (e) {
      console.log(e)
      this.requireLogin = true
    }
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
  .transperent {
    background: transparent !important
  }
  .bg {
    animation-name: bgColorPalette;
    animation-duration: 15s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-timing-function: linear;
  }

  @keyframes bgColorPalette {
    0% {
      background: #f6bd60;
    }
    25% {
      background: #f7ede2;
    }
    50% {
      background: #f5cac3;
    }
    75% {
      background: #84a59d;
    }
    100% {
      background: #f7ede2;
    }
  }
</style>
