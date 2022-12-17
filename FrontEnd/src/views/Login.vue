<template>
    <div>
        <h1>Login</h1>
        <form>
            <input type="text" v-model="username" placeholder="User Name" class="login" id="username" required/>
            <input type="password" v-model="password" placeholder="Password" class="login" id="password" required/>
            <button type="submit" class="submitBtn" @click="login">Log in</button>
            <button type="reset" class="submitBtn" @click="removeCookie">Clear</button>
        </form>
    </div>

</template>

<script>

export default {
    data() {
        return {
            username:'',
            password:'',
        }
    },
    methods: {
        login() {
            const url = 'http://localhost:3000/api/login';
            let name = this.username;
            let pw = this.password;
            let token = '';

            if(name != '' && pw != ''){
                this.$axios.post(url, {
                    username: name,
                    password: pw
                })                
                .then(response => {
                    console.log(response.data);
                    localStorage.setItem('token', response.data.token);
                    token = localStorage.getItem('token');
                    console.log(token);
                    //localStorage.setItem('expiresIn', response.data.expiresIn);
                })
                .catch(error =>{
                    console.log(error);
                })
            }

            this.$cookies.set('login', name , "30min");
            console.log("Cookie:")
            console.log(this.$cookies.get('login'));

            if(this.$cookies.get('login') && token) {
                this.$router.push({name: 'Home Page'});
            }

        },
        removeCookie() {
            this.$cookies.remove('login');
            localStorage.clear();
        }
    }
}
</script>

<style>
.login {
    width: 250px;
    height: 36px;
    font-size: 16px;
    background: #dfe7ff;
    display: block;
    border: 2px solid Transparent;
    border-radius: 5px;
    margin: 20px auto 20px;
}

.submitBtn {
    width: 258px;
    height: 42px;
    font-size: 20px;
    text-align: center;
    color: #FFFFF6;
    border-radius: 5px;
    border: 0;
    justify-content: center;
    background: #b3b6c9;
    display: block;
    cursor: pointer;
    margin: 20px auto;
}

.submitBtn:hover {
    opacity: 0.8;
}
</style>