<template>
  <div id="food">
    <div id="title">Foods</div>
　  <div id="sidebar_left">
      <button class="menuBtn" id="meal" value="meals" @click="meal">Meal</button>
      <button class="menuBtn" id="snack" value="snacks" @click="snack">Snack</button>
      <button class="menuBtn" id="dessert" value="desserts" @click="dessert">Dessert</button>
      <button class="menuBtn" id="drink" value="drinks" @click="drink">Drink</button>
</div>

    <div id="sidebar_right">Shopping Cart
      <table style="width: 100%">
        <thead>
          <tr>
            <th style="width:35%; text-align: left; font-size: 16px;">Name</th>
            <th style="width:25%; text-align: left; font-size: 16px;">Price</th>
            <th style="width:25%; text-align: left; font-size: 16px;">Quantity</th>
            <th style="width:15%; text-align: left;"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="food in Cart" :key="food.foodName">
            <th style="width:35%; font-size:12px; margin:0; text-align:left;">{{ food.foodName }}</th>
            <th style="width:25%; font-size:12px; text-align:left;">{{ food.price }}</th>
            <th style="width:25%; font-size:12px; text-align:left;" >{{ food.quantity }}</th>
            <td style="width:15%">
              <button id="addFoods" @click="removeFood(food)" style="font-size:12px">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="checkDiv">
        <p>Total: {{countTotal | toCurrency}}</p>
        <router-link :to="{name: 'Confirm'}">
          <button class="checkBtn" @click="checkOut">Check Out</button>
        </router-link>
      </div>
    </div>
　  
    <div id="content">
      <input type="text" class="search" placeholder="Search foods..."/>
      <table style="width: 100%">
        <thead>
          <tr>
            <th style="width:40%">Name</th>
            <th style="width:20%">Price</th>
            <th style="width:25%">Image</th>
            <th style="width:15%"></th>
          </tr>
        </thead>
        <tbody id="t">
          <tr v-for="food in Foods" :key="food.foodName">
            <th style="width:40%">{{ food.foodName }}</th>
            <th style="width:20%;">{{ food.price }}</th>
            <th style="width:25%">
              <img v-bind:src="food.imageLink" width="100" height="100"/>
            </th>
            <td style="width:15%">
              <button @click="addFood(food)">Add</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
const url = 'food/';
let choose;

export default {
  name: 'FoodPage',
  data() {
    return {
      Foods: [],
      AddFoods: [],
      Cart: [],
    }
  },
  methods: {
    meal() {
      const meal = document.getElementById("meal");
      choose = meal.value;
      this.$axios.get(`${this.$backEndUrl}${url}` + choose)
        .then((response) => {
          this.Foods = response.data
        })
        .catch(error => {
          console.log(error);
        });
    },
    snack() {
      const snack = document.getElementById("snack");
        choose = snack.value;
        this.$axios.get(`${this.$backEndUrl}${url}` + choose)
          .then((response) => {
            this.Foods = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
    },
    dessert() {
      const dessert = document.getElementById("dessert");
        choose = dessert.value;
        this.$axios.get(`${this.$backEndUrl}${url}` + choose)
          .then((response) => {
            this.Foods = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
    },
    drink() {
      const drink = document.getElementById("drink");
        choose = drink.value;
        this.$axios.get(`${this.$backEndUrl}${url}` + choose)
          .then((response) => {
            this.Foods = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
    },
    addFood(food) {
      this.AddFoods = {
        _id: food._id,
        foodName: food.foodName,
        price: food.price,
        quantity: 1
      }

      if(this.Cart.length == 0){
        this.Cart.push(this.AddFoods)
      }
      else {
        for(let i = 0; i < this.Cart.length; i++) {
          if(this.Cart[i]._id === food._id) {
            this.Cart[i].quantity ++;
          }
        }
      }
      if(!this.Cart.some(f => f._id === this.AddFoods._id)) {
        this.Cart.push(this.AddFoods)
      }
    },
    removeFood(food) {
      let remove = {
        _id: food._id,
      }

      for(let i = 0; i < this.Cart.length; i++) {
        if(this.Cart[i]._id === remove._id && this.Cart[i].quantity > 1){
          this.Cart[i].quantity --;
        }
        else if(this.Cart[i]._id === remove._id && this.Cart[i].quantity === 1){
          const itemRemove = this.Cart.findIndex(food => this.Cart[i]._id === food._id);
          this.Cart.splice(itemRemove, 1);
        }
      }
    },
    async checkOut(){
      localStorage.setItem('cart', JSON.stringify(this.Cart))
      this.Cart = [];
    }
  },
  computed:{
    countTotal:function(){
      let countTotal = 0;
      for(let i in this.Cart){
        countTotal += parseFloat(this.Cart[i].quantity * this.Cart[i].price);
      }
      return countTotal;
    }
  },
  mounted(){
    this.meal();
  },
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
  Width: 40vh;
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
  margin-left: 21vh;
  margin-right: 41vh;
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
  background: #9471DC;
  border-radius:5px;
  border: none;
  width: 300px;
  height: 46px;  
  margin: 20px 60px;
  float: left;
  display: block;
}

.checkDiv {
  width: 40vh;
  height: 120px;
  border: 2px #5029AA solid;
  position: relative;
  bottom: 0px;
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
  border-style: none;
}

table{
  border: 1px solid black;
}
</style>