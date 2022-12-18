<template>
  <div id="confirm">
    <div id="title">Confirm</div>

    <h3 style="margin: 30px; font-weight: bold; text-align: center;">Please Confirm Your Order</h3>
    <hr style="width: 30%; margin: auto;">

    <div id="orderBox">
      <table style="width: 60%; margin:0 auto 0 auto;">
        <thead>
          <tr>
            <th style="width:40%">Name</th>
            <th style="width:20%">Price</th>
            <th style="width:25%">Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody >
          <tr v-for="food in cart" :key="food._id">
            <th style="width:40%">{{ food.foodName }}</th>
            <th style="width:20%;">{{ food.price }}</th>
            <th style="width:25%">{{ food.quantity}}</th>
          </tr>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th>{{countTotal | toCurrency}}</th>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      <router-link :to="{name: 'Payment'}">
        <button id="payBtn" @click="sendOrder">Pay</button>
      </router-link>
      <router-link :to="{name: 'Foods'}">
        <button id="payBtn" @click="cancelOrder">Cancel</button>
      </router-link>    
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';

const confirmUrl = 'order/add/save';
const deleteUrl = 'order/cancel';
export default {
  name: 'Confirm',
  data() {
    return {
      order: [],
      cart: []
    }
  },
  mounted() {
    this.getOrder();
  },
  methods: {
    async beforeEnter(to, from, next) {
      let postUrl = `${Vue.prototype.$backEndUrl}order/add`,
          items = [],
          cart = JSON.parse(localStorage.getItem('cart')),
          queueType = JSON.parse(sessionStorage.getItem('temp'));
          
      cart.forEach(item => {
        items.push({
          foodId: item._id,
          quantity: item.quantity
        })
      });
      
      const response = await axios.post(postUrl, {
        items: items,
        queueType: queueType
      }, (error) => {
        console.log(error);
      });
      
      console.log(response.data.items);
      
      if(response.data) {
        localStorage.setItem('order', JSON.stringify(response.data))
        next();
      }
    },
    getOrder() {
      this.order = JSON.parse(localStorage.getItem('order'));
      console.log('Order: ')
      console.log(this.order._id)
      this.cart = JSON.parse(localStorage.getItem('cart'))
    },
    sendOrder() {
      this.$axios.post(`${this.$backEndUrl}${confirmUrl}`, {
        items: this.order.items,
        orderDate: this.order.orderDate,
        totalPrice: this.order.totalPrice,
        userId: this.order.userId,
        queue: this.order.queue,
        finished: this.order.finished,
        _id: this.order._id
      })
      .then(response => {
        console.log(response.data)
        localStorage.setItem('number', JSON.stringify(response.data.queue.queueNumber))
      })
      .catch(error => {
        console.log(error)
      })
    },
    async cancelOrder() {
      await axios.delete(`${this.$backEndUrl}${deleteUrl}`, {data: {
        items: this.order.items,
        orderDate: this.order.orderDate,
        totalPrice: this.order.totalPrice,
        userId: this.order.userId ? this.order.userId : undefined,
        queue: {
          queueType: this.order.queue.queueType,
        },
        finished: this.order.finished,
        _id: this.order._id
      }})
      .then(response => {
        console.log(response.data)
        console.log(this.order.items)
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
  computed:{
    countTotal() {
      let countTotal = 0;
      for(let i in this.cart){
        countTotal += parseFloat(this.cart[i].quantity * this.cart[i].price);
      }
      return countTotal;
    }
  },
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