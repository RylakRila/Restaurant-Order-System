<template>
  <div id="home">
    <div id="title">Home Page</div> 
    <div>
      <router-link :to="{name: 'Foods'}">
      <button id="orderbtn" @click="TakeOut">Place Order TakeOut</button>
    </router-link>

    <router-link :to="{name: 'Foods'}">
      <button id="orderbtn" @click="DineIn">Place Order DineIn</button>
    </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  methods: {
    TakeOut() {
      let queueType = 'TakeOut';
      sessionStorage.setItem('temp', JSON.stringify(queueType));
    },
    DineIn(){
      let queueType = 'DineIn';
      sessionStorage.setItem('temp', JSON.stringify(queueType));
    }
  }
}
</script>

<style>
#home {
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

#orderbtn {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 24px;
  color: white;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px ;
  width: 200px;
  background: #5FB371;
}
</style>
