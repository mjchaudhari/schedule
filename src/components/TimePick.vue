<template>
  <v-menu
    ref="menu"
    :close-on-content-click="false"
    :return-value.sync="time"
    transition="scale-transition"
    min-width="350"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="time"
        :label="label"
        prepend-icon="mdi-clock-time-four-outline"
        readonly
        v-bind="attrs"
        v-on="on"
      />
    </template>
    <v-time-picker
      v-model="time"
      :allowed-hours="allowedHours"
      :allowed-minutes="allowedMinutes"
      :min="min"
      :max="max"
      full-width
      format="24hr"
      @click:minute="$refs.menu.save(time)"
      @input="input"
    />
  </v-menu>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'TimePick',
  components: {},
  props: {
    value: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: 'Time'
    },
    allowedHours: {
      type: Array,
      default: function () {
        return [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]
      }
    },
    allowedMinutes: {
      type: Array,
      default: function () {
        return [0, 15, 30, 45]
      }
    },
    min: {
      type: String,
      default: undefined
    },
    max: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      time: null
    }
  },
  computed: {
    ...mapState({
      data: state => state.data
    }),
    ...mapGetters({})
  },
  watch: {
    value (v) {
      this.time = v
    }
  },
  mounted () {

  },
  methods: {
    ...mapMutations({}),
    ...mapActions({}),
    input () {
      this.$emit('input', this.time)
    }
  }
}
</script>

<style>

</style>
