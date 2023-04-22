<template>
  <v-app id="inspire" data-app>
    <v-row>
      <v-col>
        <v-sheet height="400">
          <v-calendar
            ref="calendar"
            :now="today"
            :value="today"
            :events="events"
            color="primary"
            type="week"
          ></v-calendar>
        </v-sheet>
      </v-col>
      <showListDocument :callByScheduler="true" @toConfigScheduler="toConfigScheduler"></showListDocument>
    </v-row>
  </v-app>
</template>

<script>
import { schedulerAPI } from "@/api/scheduler";
import ShowListDocument from "../document/ShowListDocument.vue";
import dayjs from 'dayjs'
export default {
  components: {
    ShowListDocument,
  },
  data: () => ({
    today: dayjs().format("YYYY-MM-DD"),
    focus: "",
    type: "week",
    selectedEvent: {},
    selectedOpen: false,
    events: []
  }),
  async created() {
    let monday = dayjs().subtract(dayjs().day(), 'day').format("YYYY-MM-DD")
    let sunday = dayjs().add(7-dayjs().day(), 'day').format("YYYY-MM-DD")
    // let sunday =dayjs().add(dayjs().day())
    // dayjs().add(7); // last Sunday
    // dayjs().weekday(7); // next Sunday
    console.log(monday,sunday)
    // var curr = new Date(); // get current date
    // var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    // var last = first + 6; // last day is the first day + 6
    // var firstday = new Date(curr.setDate(first)).toJSON().slice(0,10)
    // var lastday = new Date(curr.setDate(last)).toJSON().slice(0,10)

    var firstday = monday;
    var lastday = sunday;

    let res = await schedulerAPI.getScheduler(firstday, lastday);
    // console.log(res);
    var a = res;
    let result = [];
    let schedulerId = a.map((i) => {
      return i.scheduler;
    });
    function onlyUnique(value, index, array) {
      return array.indexOf(value) === index;
    }
    schedulerId = schedulerId.filter(onlyUnique);
    // console.log(schedulerId);

    for (let i of schedulerId) {
      let sessionBySchedulerId = a.filter((a) => {
        return a.scheduler == i;
      });
      // console.log(sessionBySchedulerId);
      let mergeSession = {
        name: sessionBySchedulerId[0].scheduler, // tạm để cái này, sau sẽ trả ra name
        startDate: sessionBySchedulerId[0].date,
        endDate: sessionBySchedulerId[0].date
      };
      let startTime = {
        current: 0,
        value: ""
      };
      let endTime = {
        current: 0,
        value: ""
      };
      for (let ses of sessionBySchedulerId) {
        switch (ses.time_slot) {
          case 1:
            if (ses.time_slot < startTime.current || startTime.current == 0) {
              startTime.value = "07:00";
              startTime.current = ses.time_slot;
            }
            if (ses.time_slot > endTime.current || endTime.current == 0) {
              endTime.value = "07:50";
              endTime.current = ses.time_slot;
            }

            break;
          case 2:
            if (ses.time_slot < startTime.current || startTime.current == 0) {
              startTime.value = "07:50";
              startTime.current = ses.time_slot;
            }
            if (ses.time_slot > endTime.current || endTime.current == 0) {
              endTime.value = "08:40";
              endTime.current = ses.time_slot;
            }

            break;
          case 3:
            if (ses.time_slot < startTime.current || startTime.current == 0) {
              startTime.value = "08:50";
              startTime.current = ses.time_slot;
            }
            if (ses.time_slot > endTime.current || endTime.current == 0) {
              endTime.value = "09:40";
              endTime.current = ses.time_slot;
            }

            break;
          case 4:
            if (ses.time_slot < startTime.current || startTime.current == 0) {
              startTime.value = "09:50";
              startTime.current = ses.time_slot;
            }
            if (ses.time_slot > endTime.current || endTime.current == 0) {
              endTime.value = "10:40";
              endTime.current = ses.time_slot;
            }

            break;
          case 5:
            if (ses.time_slot < startTime.current || startTime.current == 0) {
              startTime.value = "10:40";
              startTime.current = ses.time_slot;
            }
            if (ses.time_slot > endTime.current || endTime.current == 0) {
              endTime.value = "11:30";
              endTime.current = ses.time_slot;
            }

            break;
          case 7:
            if (ses.time_slot < startTime.current || startTime.current == 0) {
              startTime.value = "12:30";
              startTime.current = ses.time_slot;
            }
            if (ses.time_slot > endTime.current || endTime.current == 0) {
              endTime.value = "13:20";
              endTime.current = ses.time_slot;
            }

            break;
          case 8:
            if (ses.time_slot < startTime.current || startTime.current == 0) {
              startTime.value = "13:20";
              startTime.current = ses.time_slot;
            }
            if (ses.time_slot > endTime.current || endTime.current == 0) {
              endTime.value = "14:10";
              endTime.current = ses.time_slot;
            }

            break;
          case 9:
            if (ses.time_slot < startTime.current || startTime.current == 0) {
              startTime.value = "14:20";
              startTime.current = ses.time_slot;
            }
            if (ses.time_slot > endTime.current || endTime.current == 0) {
              endTime.value = "15:10";
              endTime.current = ses.time_slot;
            }

            break;
          case 10:
            if (ses.time_slot < startTime.current || startTime.current == 0) {
              startTime.value = "15:20";
              startTime.current = ses.time_slot;
            }
            if (ses.time_slot > endTime.current || endTime.current == 0) {
              endTime.value = "16:10";
              endTime.current = ses.time_slot;
            }

            break;
          case 11:
            if (ses.time_slot < startTime.current || startTime.current == 0) {
              startTime.value = "16:10";
              startTime.current = ses.time_slot;
            }
            if (ses.time_slot > endTime.current || endTime.current == 0) {
              endTime.value = "17:00";
              endTime.current = ses.time_slot;
            }

            break;
          case 13:
            if (ses.time_slot < startTime.current || startTime.current == 0) {
              startTime.value = "17:30";
              startTime.current = ses.time_slot;
            }
            if (ses.time_slot > endTime.current || endTime.current == 0) {
              endTime.value = "18:20";
              endTime.current = ses.time_slot;
            }

            break;
          case 14:
            if (ses.time_slot < startTime.current || startTime.current == 0) {
              startTime.value = "18:20";
              startTime.current = ses.time_slot;
            }
            if (ses.time_slot > endTime.current || endTime.current == 0) {
              endTime.value = "19:10";
              endTime.current = ses.time_slot;
            }

            break;
          case 15:
            if (ses.time_slot < startTime.current || startTime.current == 0) {
              startTime.value = "19:20";
              startTime.current = ses.time_slot;
            }
            if (ses.time_slot > endTime.current || endTime.current == 0) {
              endTime.value = "20:10";
              endTime.current = ses.time_slot;
            }
            break;
          case 16:
            if (ses.time_slot < startTime.current || startTime.current == 0) {
              startTime.value = "20:10";
              startTime.current = ses.time_slot;
            }
            if (ses.time_slot > endTime.current || endTime.current == 0) {
              endTime.value = "21:00";
              endTime.current = ses.time_slot;
            }

            break;
        }
      }
      mergeSession.startDate = mergeSession.startDate + " " + startTime.value;
      mergeSession.endDate = mergeSession.endDate + " " + endTime.value;
      result.push(mergeSession);
    }
    console.log(result);
    for (var i=0; i<result.length; i++) {
      this.events.push({
        name: result[i].name,
        start: result[i].startDate,
        end: result[i].endDate,
      });
    }
  },
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    toConfigScheduler(id) {
      this.$router.push(`scheduler/editScheduler/${id}`)
    }
  }
};
</script>
