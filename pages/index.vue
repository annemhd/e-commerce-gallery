<template>
    <div class="h-full relative">
        <div class="absolute flex flex-col items-center justify-center w-full h-full z-40">
            <h3 class="text-white">Bienvenue dans la</h3>
            <h1 class="text-6xl text-white mb-6">Gallerie Chériaux</h1>
            <p class="text-white text-center w-1/2 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pretium interdum
                sodales. Cras eget arcu fermentum, tincidunt ex nec, commodo justo.
            </p>
            <NuxtLink to="/product"><el-button round>Acceder à la gallerie</el-button></NuxtLink>
        </div>

        <el-image
            style="width: 100%; height: 100%"
            src="/img/test.jpg"
            fit="cover"
            class="rounded-md"
        />
    </div>
</template>
