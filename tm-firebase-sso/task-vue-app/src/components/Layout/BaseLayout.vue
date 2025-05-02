<template>
    <div>
        <!-- <AppHeader/> -->
        <AppNavBar/>
        <main>
            <slot>
                <h3 class = "home-page" > Welcome to home page</h3>
                <HomePage/>
                <OrganiseComponent/>
            </slot>
        </main>
        <!-- <AppFooter/> -->
    </div>
</template>
<script setup>
// import AppHeader from './AppHeader.vue';
// import AppFooter from './AppFooter.vue';
import AppNavBar from './AppNavBar.vue';
import HomePage from '../Dashboard/HomePage.vue';

</script>

<style scoped>

.home-page{
    text-align: center;
    margin-top: 20px;
}
</style>