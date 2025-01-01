<template>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :router="true"
        :ellipsis="false"
    >
        <div>Gallerie Chériaux</div>
        <el-menu-item index="1" route="/">Gallerie</el-menu-item>
        <el-menu-item index="2" route="/contact">Contact</el-menu-item>
    </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const route = useRoute()

const activeIndex = ref('1')
</script>

<style>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
    margin-right: auto;
}
</style>
