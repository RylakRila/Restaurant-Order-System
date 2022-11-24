<template>
  <div id="confirm">
    <div id="title">Confirm</div>

    <h3 style="margin: 30px; font-weight: bold; text-align: center;">Please Confirm Your Order</h3>
    <hr style="width: 30%; margin: auto;">

    <div id="orderBox">
      <!--Place order here--> 
    </div>

    <div>
      <router-link :to="{name: 'Payment'}">
        <button id="payBtn">Pay</button>
      </router-link>  
    </div>
  </div>
</template>

<script>
export default {
  name: 'Confirm'
}
</script>

<style>
#confirm {
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

#orderBox {
  Height: 50vh;
  margin-top: 20px;
}

</style>