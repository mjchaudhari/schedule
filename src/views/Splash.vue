<template>
<v-container
  class="fill-height justify-center bg"
  fluid
>
  <v-sheet
    color=""
    class="transperent text-center justify-center"
  >
    <h4>Hello</h4>
    <h5>Getting ready in few moments</h5>
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
    return {}
  },
  computed: {
    ...mapState({
    }),
    ...mapGetters({})
  },
  mounted () {
    try {
      const result = fb.monitorAuthState()
      console.log('user logged in', result)
      setTimeout(() => {
        this.$router.push({ name: 'HOME' })
      }, 3000)
    } catch (e) {
      console.log(e)
      setTimeout(() => {
        this.$router.push({ name: 'LOGIN' })
      }, 3000)
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
