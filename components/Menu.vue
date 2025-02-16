<template>
    <div class="flex justify-between items-center p-4">
        <h1 class="font-extrabold uppercase"><NuxtLink to="/">GC — Gallerie Chériaux</NuxtLink></h1>

        <div>
            <NuxtLink to="/product">
                <el-button text>Gallerie</el-button>
            </NuxtLink>
            <NuxtLink to="/contact"> <el-button text>Contact</el-button> </NuxtLink
            ><NuxtLink to="/">
                <el-button text
                    ><img
                        src="/Users/amichaud/Documents/Eugenee Club/Chér/cheriaux-gallery/assets/svg/instagram.svg"
                        alt="Instagram"
                        class="w-6 h-6"
                /></el-button>
            </NuxtLink>
        </div>
    </div>
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
