<template>
    <header>
        <h3>Group 1 - Restaurant Order System</h3>
        <nav>
            <router-link class="router-link" to="/login" tag="button">Log in</router-link>
            <router-link :to="{path: '/login'}" class="router-link">
                <button class="router-link" @click="logout">Log out</button>
            </router-link>
        </nav>
    </header>
</template>

<script>
export default {
    methods: {
        logout() {
            localStorage.clear();
            sessionStorage.clear();
        }
    }  
}
</script>

<style>
header {
    display: flex;
    border-bottom: 1px solid;
    height: 54px;
}

h3 {
    padding: 10px;
}

nav {
    margin-left: auto;
}

.router-link {
    color: inherit;
    height: 54px;
    width: 100px;
    border-radius: 10px;
    font-size: 20px;
    margin-left: 10px;
}

</style>