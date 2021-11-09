<template>
  <div>
    <app-header />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import AppHeader from '../components/Header.vue'
export default {
  name: 'Home',
  components: {
    AppHeader
  },
  data () {
    return {}
  },
  computed: {
    ...mapState({
      data: state => state.data
    }),
    ...mapGetters({

    })
  },
  mounted () {

  },
  methods: {
    ...mapMutations({}),
    ...mapActions({})
  }
}
</script>

<style>

</style>
