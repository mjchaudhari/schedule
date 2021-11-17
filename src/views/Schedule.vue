<template>
  <v-sheet
    class="pa-0"
    column
  >
    <v-card-title
      class="pt-2 mb-2"
    >
      <span>{{ new Date().toISOString() | formatDate }}</span>
      <v-spacer />
      <span class="body-2 mr-2">{{ calType | iniCap }}</span>
      <v-menu offset-y>
        <template v-slot:activator="{on, attrs}">
          <v-icon
            color="grey"
            v-bind="attrs"
            v-on="on"
          >
            settings
          </v-icon>
        </template>
        <v-list>
          <v-list-item
            @click="calType='month'"
          >
            <v-list-item-title>Month</v-list-item-title>
          </v-list-item>
          <v-list-item
            @click="calType='week'"
          >
            <v-list-item-title>Week</v-list-item-title>
          </v-list-item>
          <v-list-item
            @click="calType='day'"
          >
            <v-list-item-title>Day</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-title>
    <v-row
      class="pl-3 pr-3 align-center"
    >
      <v-btn
        fab
        small
        dark
        color="dark"
        @click="prev"
      >
        <v-icon small>
          mdi-chevron-left
        </v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <h4 v-if="$refs.calendar">
        {{ $refs.calendar.title }}
      </h4>
      <v-spacer></v-spacer>
      <v-btn
        fab
        small
        dark
        color="dark"
        @click="next"
      >
        <v-icon small>
          mdi-chevron-right
        </v-icon>
      </v-btn>
    </v-row>
    <v-calendar
      v-model="focus"
      :now="today"
      :events="events"
      :type="calType"
      ref="calendar"
      color="primary"
      class="mt-5"
      interval-count="13"
      first-interval="9"
      first-time="9"
      :interval-minutes="60"
      @change="dateRangeChanged"
      @click:event="showEvent"
      @click:date="createEvent"
      @click:day="createEvent"
      @click:time="createEvent"
    />
    <event-dialog
      :isOpen="showEventDialog"
      :event-details="selectedEvent"
      @cancel="eventDialogCancel"
      @ok="eventDialogOk"
    />
  </v-sheet>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import eventDialog from '../components/EventDialog.vue'
export default {
  name: 'Schedule',
  components: {
    eventDialog
  },
  data () {
    return {
      calType: 'week',
      focus: '',
      today: this.$options.filters.formatDate(new Date().toISOString(), 'YYYY-MM-DD hh:mm:ss'),
      viewStart: '',
      viewEnd: '',
      showEventDialog: false,
      selectedEvent: null
    }
  },
  computed: {
    ...mapState({
    }),
    ...mapGetters({
      events: 'schedule/events',
      profile: 'user/profile'
    })
  },
  mounted () {
    this.$refs.calendar.checkChange()
  },
  methods: {
    ...mapMutations({}),
    ...mapActions({
      fetchEvents: 'schedule/getEvents',
      saveEvent: 'schedule/saveEvent'
    }),
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    dateRangeChanged ({ start, end }) {
      this.viewStart = start.date
      this.viewEnd = end.date
      this.fetchEvents({ start: this.viewStart, end: this.viewEnd })
    },
    createEvent (data) {
      console.log('create new event', data)

      let hours = data.hour <= 9 ? 9 : (data.allowedHours || data.hour)
      hours = hours > 21 ? 21 : hours
      const minutes = data.minute >= 30 ? '30' : '00'
      this.selectedEvent = {
        start: `${data.date} ${hours}:${minutes}`,
        // startDate: data.date,
        // startTimeHH: data.hour,
        // startTimeMM: minutes,
        end: `${data.date} ${hours + 1}:${minutes}`,
        // endDate: data.date,
        // endTimeHH: data.hour + 1,
        // endTimeMM: minutes
        createdBy: this.profile.name
      }
      this.showEventDialog = true
    },
    showEvent (data) {
      // console.log('show new event', data)
      data.nativeEvent.stopPropagation()
      this.selectedEvent = data.event
      this.showEventDialog = true
    },
    eventDialogCancel () {
      this.showEventDialog = false
      this.selectedEvent = null
    },
    async eventDialogOk (data) {
      this.showEventDialog = false
      try {
        await this.saveEvent(data)
        await this.fetchEvents({ start: this.viewStart, end: this.viewEnd })
      } catch (error) {
        console.log(error)
      }
      this.selectedEvent = null
    }
  }
}
</script>

<style>

</style>
