  
<template>
  <div class="question-box-container">
    <b-jumbotron>
      <template slot="lead">
        {{ currentQuestion.question }}
      </template>
      <hr class="my-4" />
      <b-list-group>
        <b-list-group-item v-for="(answer, id) in shuffledAnswers" :key="id" @click.prevent="selectAnswer(id)" :class="Class(id)"> {{ answer }} </b-list-group-item>
      </b-list-group>
      <b-button variant="success" @click="submitAnswer" :disabled="selectedIndex === null || answered"> Submit </b-button>
      <b-button v-if="index != 9" @click="next" variant="primary" :disabled="!answered || index === 9"> Next </b-button>
      <b-button v-if="index === 9" @click="refresh" variant="danger" :disabled="!answered"> Refresh </b-button>
    </b-jumbotron>
  </div>
</template>

<script>
import lodash from 'lodash'
export default {
  props: {
    currentQuestion: Object,
    next: Function,
    refresh: Function,
    increment: Function,
    index: Number
  },
  data: function() {
    return {
      selectedIndex: null,
      correctIndex: null,
      shuffledAnswers: [],
      answered: false
    }
  },
  watch: {
    currentQuestion: {
      immediate: true,
      handler() {
        this.selectedIndex = null
        this.answered = false
        this.shuffleAnswers()
      }
    }
  },
  methods: {
    selectAnswer(id) {
      if (this.answered) {
        return
      }
      this.selectedIndex = id
    },
    submitAnswer() {
      let Correct = false
      if (this.selectedIndex === this.correctIndex) {
        Correct = true
      }
      this.answered = true
      this.increment(Correct)
    },
    shuffleAnswers() {
      let answers = [...this.currentQuestion.incorrect_answers, this.currentQuestion.correct_answer]
      this.shuffledAnswers = lodash.shuffle(answers)
      this.correctIndex = this.shuffledAnswers.indexOf(this.currentQuestion.correct_answer)
    },
    Class(id) {
      let Class = ''
      if (!this.answered && this.selectedIndex === id) {
        Class = 'selected'
      } else if (this.answered && this.correctIndex === id) {
        Class = 'correct'
      } else if (this.answered &&
        this.selectedIndex === id && this.correctIndex !== id
      ) {
        Class = 'incorrect'
      }
      return Class
    }
  }
}
</script>

<style scoped>
.list-group {
  margin-bottom: 15px;
}
.list-group-item:hover {
  background: #EEE;
  cursor: pointer;
}
.btn {
  margin: 0 5px;
}
.selected {
  background-color: lightblue;
}
.correct {
  background-color: lightgreen;
}
.incorrect {
  background-color: red;
}
</style>