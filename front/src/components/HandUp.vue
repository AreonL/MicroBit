<template>
  <div class="handUp">
    <div class="bigBox red" v-if="hand1 === 0" @click="handUp">Räck upp handen</div>
    <div class="bigBox kapitel-center" v-else-if="hand1 === 1" @click="kapitelUp">
      <div class="kapitel" :key="index" v-for="(item, index) in kapitel" @click="kapitel">
        Kapitel {{ index+1 }}. {{ item }}
      </div>
      <div class="kapitel">Övrigt</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      hand1: 0,
      kapitel: [
        "Mängdlära",
        "Kongruensräkning",
        "Talföljder och induktionsbevis",
        "Kombinatorik",
        "Differentialekvationer"
      ]
    }
  },
  methods: {
    handUp () {
      console.log("Räckte upp handen")
      this.hand1++
    },
    kapitelUp () {
      console.log("Valde kapitel")
      this.hand1++
    }
  }
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
  margin: 0;
  padding: 20px;
  background-color: green;
  color: white;
}

.bigBox {
  width: 400px;
  height: 400px;
  margin: 0 auto;
  box-shadow: 0 0 0;
}

.red {
  background-color: red;
}

.green {
  background-color: green;
}
</style>