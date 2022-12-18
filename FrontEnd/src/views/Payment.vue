<template>
  <div id="payment">
    <div id="title">Payment</div>
      <div id = card>
        <h3 style="margin: 30px; font-weight: bold; text-align: center;">Total: $</h3>

        <img src="@/assets/images/creditcardlogo.png"/>

        <input type="text" class="inputName" placeholder="Card Holder Name"/>
        <input type="text" class="inputNumber" placeholder="Cord Number"/>
        <input type="text" class="inputDate" placeholder="MM / YY"/>
        <input type="text" class="inputCVV" placeholder="CVV"/>

        
      </div>
      <div class="payBox">
        <router-link :to="{name: 'Complete'}">
          <button id="payBtn">Pay Now</button>
        </router-link>  
      </div>
  </div>

</template>

<script>
export default {
  name: 'Payment'
}
</script>

<style>
#payment {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#title {
  font-size: 30px;
  color: white;
  background: #5029AA;
  Height: 50px;
  line-height: 50px;
}

#card {
  width: 673px;
  display: block;
  text-align: left;
  margin:20px auto;
}

.inputName, 
.inputNumber, 
.inputDate, 
.inputCVV {
  height: 30px;
  font-size: 20px;
  border-style: none;
  display: inline;
  border-bottom: 1px solid lightgrey;
}

.inputName {
  width: 100%;
  margin-top: 20px;
}

.inputNumber {
  width: 50%;
  margin: 40px 20px 0 0;
}

.inputDate {
  width: 20%;
  margin: 40px 21px 0 13px;
}

.inputCVV {
  width: 20%;
  margin: 40px 0 0 13px;
}

::placeholder {
  color: black;
  opacity: 0.6;
}

.payBox {
  width: 673px;
  margin: 15% auto;
}

#payBtn {
  color: white;
  width: 150px;
  height: 50px;
  background: #5029AA;
  border-style: none;
  margin: 0 20px 0 20px;
}

</style>