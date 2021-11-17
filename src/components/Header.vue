<template>
  <div>
    <v-navigation-drawer
      v-model="openDrawer"
      app
      fixed
      temporary
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="profile.thumbnail"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ profile.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <v-list dense>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              @click="logOff"
            >
              Log Off
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      dark
      color="primary"
      fixed
    >
      <!-- <v-app-bar-nav-icon
        @click="openDrawer=true"
      /> -->
      <v-icon
        @click="openDrawer=true"
        size="28"
        class="mr-1"
      >
        mdi-menu
      </v-icon>
      <v-toolbar-title>
        Schedule
      </v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import fb from '../firebase'
export default {
  name: 'Header',
  components: {},
  data () {
    return {
      openDrawer: false
    }
  },
  computed: {
    ...mapState({
    }),
    ...mapGetters({
      profile: 'user/profile'
    })
  },
  mounted () {
    fb.monitorAuthState()
      .then(() => {
        // okay
      }, () => {
        this.$router.push({ name: '' })
      })
  },
  methods: {
    ...mapMutations({}),
    ...mapActions({
      signout: 'user/signOff'
    }),
    async logOff () {
      await this.signout()
      this.$router.push({ name: 'SPLASH' })
    }
  }
}
</script>

<style>

</style>
