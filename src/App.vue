<template>
    <div id="app">
        <el-container>
            <el-header style="padding: 0px;">
                <el-menu
                    :default-active="activeIndex"
                    class="el-menu-demo"
                    mode="horizontal"
                    @select="handleSelect"
                    :background-color="navbarTheme"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    style="border-bottom: 0px; padding-left: 145px;"
                >
                    <el-menu-item index="1" @click="navigate('/')">Home</el-menu-item>
                    <el-menu-item index="2" @click="navigate('/dashboard')">Dashboard</el-menu-item>
                </el-menu>
            </el-header>
            <el-main style="padding: 0px;">
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>
<script>
import router from './router'

export default {
    name: 'app',
    data(){
        return {
            activeIndex: '1',
            darkNavbar: false
        }
    },
    computed: {
        navbarTheme(){
            return this.darkNavbar ? '#222' : '#111'
        }
    },
    created(){
        this.activeIndex = this.getActiveIndex()
    },
    watch: {
        '$route': 'getActiveIndex'
    },
    methods: {
        handleSelect(key, keyPath){
            console.log(key, keyPath)
        },
        navigate(to){
            router.push({ path: to })
        },
        getActiveIndex(){
            let currentUrl = window.location.href
            currentUrl = currentUrl.split("/")
            let page = currentUrl[currentUrl.length-1]
            switch(page){
                case 'settings':
                    this.darkNavbar = false
                    return '3'
                case 'dashboard':
                    this.darkNavbar = true
                    return '2'
                case '':
                    this.darkNavbar = false
                    return '1'
                default:
                    this.darkNavbar = true
                    return '2'
            }
        }
    }
}
</script>
<style>
* {
    font-family: 'CeraPro Regular';
}

#app {
    font-family: 'CeraPro Light';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

body{
    margin: 0px;
    background-color: #fff;
}
</style>