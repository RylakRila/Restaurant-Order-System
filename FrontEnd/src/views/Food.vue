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
      <div class="checkDiv">
        <p>Total: $</p>
        <router-link :to="{name: 'Confirm'}">
          <button class="checkBtn">Check Out</button>
        </router-link>  
      </div>
    </div>
　  
    <div id="content">
      <input type="text" class="search" placeholder="Search foods..."/>
      <table style="width: 100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="food in Foods" :key="food.foodName">
            <td>{{ food.foodName}}</td>
            <td>{{ food.price}}</td>
            <td>
              <img v-bind:src="food.imageLink" width="100" height="100"/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const url = 'http://localhost:3000/api/food/';
let choose;

const URL = '/testData.json';
export default {
  name: 'FoodPage',
  data() {
    return {
      Foods: [],
    }
  },
  methods: {
    meal() {
      const meal = document.getElementById("meal");
      //console.log(meal.value)
      choose = meal.value;
      console.log(choose)
      axios.get(url + choose)
        .then((response) => {
          console.log(response.data);
          this.Foods = response.data
        })
        .catch((error) => {
          console.log(error);
        });
    },
    snack() {
      const snack = document.getElementById("snack");
        choose = snack.value;
        console.log(choose)
        axios.get(url + choose)
          .then((response) => {
            console.log(response.data);
            this.Foods = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
    },
    dessert() {
      const dessert = document.getElementById("dessert");
        choose = dessert.value;
        console.log(choose)
        axios.get(url + choose)
          .then((response) => {
            console.log(response.data);
            this.Foods = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
    },
    drink() {
      const drink = document.getElementById("drink");
        choose = drink.value;
        console.log(choose)
        axios.get(url + choose)
          .then((response) => {
            console.log(response.data);
            this.Foods = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
    }
  },
  mounted(){
    /*
    // Test uses
    axios.get(URL)
      .then((response) => {
        console.log(response.data);
        this.Foods = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
      */
  }
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
  Width: 20vh;
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
  border-style: none;
}

table{
  border: 1px solid black;
}

</style>
