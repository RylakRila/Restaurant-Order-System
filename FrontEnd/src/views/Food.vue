<template>
  <div id="food">
    <div id="title">Foods</div>
　  <div id="sidebar_left">
      <button class="menuBtn" >Meal</button>
      <button class="menuBtn" >Snack</button>
      <button class="menuBtn" >Dessert</button>
      <button class="menuBtn" >Drink</button>
    </div>

    <div id="sidebar_right">Shopping Cart
      <div class="checkDiv">
        <p>Total: $</p>
        <button class="checkBtn">Check Out</button>
      </div>
    </div>
　  
    <div id="content">
      <input type="text" class="search" placeholder="Search foods..."/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Food Page'
}
</script>

<style>
#food {
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

#sidebar_left{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 24px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  float: left;
  color: black;
  background: #FAFAFA;
  Height: 87.5vh;
  Width: 20vh;
}

#sidebar_right{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 24px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  float: right;
  color: black;
  background: #FAFAFA;
  Height: 87.5vh;
  Width: 18vh;
  justify-content: center;
}

#content{
　font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 24px;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: black;
  Height: 87.5vh;
  margin-left: 20vh;
  margin-right: 20vh;
}

.menuBtn {
  display: block;
  Height: 100px;
  width: 20vh;
  border-style: none;
}
.menuBtn:hover {
  background: #E7E7E7;
}

.search {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 24px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  background: #9471DC;
  border-radius:5px;
  border: none;
  width: 300px;
  height: 46px;  
  margin: 20px 60px;
  float: left;
}
::placeholder {
  color: white;
  opacity: 0.6;
}

.checkDiv {
  display: inline-block;
  width: 150px;
  height: 120px;
  border: 2px #5029AA solid;
  margin-top: 70vh;
}

.checkBtn {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  display:inline-block;
  width: 100px;
  height: 50px;
  background: #5029AA;
}

</style>
