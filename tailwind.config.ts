import type { Config } from 'tailwindcss'

export default <Config>{
  important: true, // 👈 Ajoute !important à toutes les classes Tailwind
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./app.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}