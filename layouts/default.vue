<template>
    <el-container class="h-screen">
        <el-header><Menu /></el-header>
        <h1 v-if="handleTitle" class="text-6xl py-6 px-20">{{ displayTitle }}</h1>
        <el-main class="mx-16"><slot /></el-main>
    </el-container>
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const handleTitle = computed(() =>
    ['/contact', '/payment'].some((path) => route.path.startsWith(path))
)

const displayTitle = computed(() => (route.path === '/contact' ? 'Contact' : 'Passer la commande'))
</script>
