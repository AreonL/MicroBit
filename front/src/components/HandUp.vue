<template>
  <div class="handUp">
    <!-- <div class="bigBox red" v-if="hand1 === 0" @click="handUp">Välj delmoment</div> -->
    <div class="bigBox kapitel-center" @click="kapitelUp">
      <div
        :class="['kapitel', item.selected ? 'active' : 'deactive']"
        :key="index"
        v-for="(item, index) in kapitel"
        @click="pickStage(item)"
      >
        <div v-if="item.selected" class="active">
          <div class="teacher">{{item.teacher}}</div>
          <div class="stage">{{item.stage}}</div>
        </div>
        <div v-else class="deactive">
          <div class="stage">{{item.stage}}</div>
          <div class="teacher">{{item.teacher}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // hand1: 1,
      kapitel: [
        {
          stage: 'Bråktal',
          teacher: 'Johan S.',
          selected: true
        },
        {
          stage: 'Statistik',
          teacher: 'Jenny A.',
          selected: false
        },
        {
          stage: 'Geometri',
          teacher: 'Johan S.',
          selected: false
        },
        {
          stage: 'Övrigt',
          teacher: 'Välj Lärare',
          selected: false
        },
      ]
    }
  },
  methods: {
    pickStage (event) {
      console.log("Chose stage", event.stage)
      const stage = this.kapitel.find(item => item.stage === event.stage)
      stage.selected = true
      this.kapitel.forEach(item => {
        if (item.stage !== stage.stage) {
          item.selected = false
        }
      })
    },
    // kapitelUp () {
    //   console.log("Valde kapitel")
    //   this.hand1++
    // }
  },
  computed: {}
}
</script>

<style>
.kapitel-center {
  display: flex;
  flex-direction: column;
	flex-wrap: nowrap;
	justify-content: space-between;
	align-items: stretch;
	align-content: stretch;
}

div.kapitel {
  margin: 50px 0 0 0;
  padding: 20px;
  border-radius: 15px;
}

div.kapitel.active {
  border: 3.5px solid #00A6CB;
  background-color: white;
  color: #323232;
}

div.kapitel.deactive {
  background-color: #00A6CB;
  color: white;
}

.bigBox {
  width: 75%;
  margin: 0 auto;
}

.red {
  background-color: red;
}

.green {
  background-color: green;
}
</style>