<template>
    <header>
        <h3>Group 1 - Restaurant Order System</h3>
        <nav>
            <router-link class="router-link" to="/Login" tag="button">Login</router-link>
        </nav>
    </header>
</template>

<style>
header {
    display: flex;
    border-bottom: 1px solid;
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
}

</style>