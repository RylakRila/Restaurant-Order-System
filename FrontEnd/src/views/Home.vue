<template>
  <div id="home">
    <div id="title">Home Page</div>

    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <b-carousel-slide
        caption="Food 1"
        text=""
        img-src="https://picsum.photos/1024/480/?image=52"
      ></b-carousel-slide>
      <b-carousel-slide
        caption="Food 2"
        text=""
        img-src="https://picsum.photos/1024/480/?image=52"
      ></b-carousel-slide>
    </b-carousel>  

    <router-link :to="{name: 'Foods'}">
      <button id="orderbtn">Place Order TakeOut</button>
    </router-link>

    <router-link :to="{name: 'Foods'}">
      <button id="orderbtn">Place Order Dining</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Home Page'
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
