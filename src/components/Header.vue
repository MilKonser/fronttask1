<script lang="ts" setup>
import IconLogo from './icons/IconLogo.vue';
</script>
<template>
    <header>
        <IconLogo></IconLogo>
        <a href="">Все кейсы</a>
        <a href="">Кейсы в работе</a>
        <a href="">Команды</a>
        <div id="profile">
            <a href="">Adolf</a>
        </div>
    </header>
</template>

<style scoped>
header {
    width: 100%;
    height: 80px;
    display: flex;
    padding: 20px;
    justify-content: center;
    align-items: center;
    background-color: dimgrey;
    margin-bottom: 37px;

    a {
        display: block;
    }

    * {
        margin: 0 15px;
    }

    #profile {
        display: flex;
        justify-content: right;
        flex-grow: 1;
    }
}
</style>