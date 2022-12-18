<template>
  <div id="complete">
    <div id="title">Complete</div>

    <h2 style="margin: 80px auto; font-weight: bold; text-align: center;">Thank you!</h2>

    <div id="textBox">
      <p style="margin-top: 20px; font-weight: bold; font-size: 22px;">Here is Your Number 
        <br>{{this.number}}</p>
    </div>

    <router-link :to="{name: 'Home Page'}">
          <button class="checkBtn">Home</button>
    </router-link> 

  </div>
</template>

<script>
export default {
  name: 'Complete',
  data() {
    return {
      number:''
    }
  },
  methods: {
    getNumber() {
      this.number = JSON.parse(localStorage.getItem('number'));
    }
  },
  mounted() {
    this.getNumber()
  }
}
</script>

<style>
#complete {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#title {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 30px;
  color: white;
  background: #5029AA;
  Height: 50px;
  line-height: 50px;
}

#textBox {
  width: 400px;
  height: 200px;
  border-style: solid;
  margin: 80px auto;
  border-radius:30px;
}
</style>