<template>
    <div>
        <h1 style="display: flex; justify-content: center;">Login</h1>
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
            password:''
        }
    },
    methods: {
        login() {
            const url = `${this.$backEndUrl}login`;
            let name = this.username;
            let pw = this.password;
            
            if (!name || !pw) return;
            
            this.$axios.post(url, {
                username: name,
                password: pw
            })                
            .then(response => {
                localStorage.setItem('token', response.data.token);

                if(localStorage.getItem('token') !== undefined) {
                    this.$router.push({name: 'Home Page'});
                }
            })
            .catch(error =>{
                console.log(error);
            })
        },
        removeCookie() {
            localStorage.clear();
            sessionStorage.clear();
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