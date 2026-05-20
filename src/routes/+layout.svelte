<script lang="ts">
  import '../app.css';
</script>

<nav class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-void/80 backdrop-blur-md border-b border-white/5">
  <a href="/" class="flex items-center gap-2.5 group">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8" stroke="#F5A623" stroke-width="1.5"/>
      <circle cx="12" cy="12" r="3.5" fill="#F5A623" opacity="0.85"/>
      <path d="M4 12 Q8 7 12 12 Q16 17 20 12" stroke="#F5A623" stroke-width="1" opacity="0.35" stroke-dasharray="2 2" fill="none"/>
    </svg>
    <span class="font-semibold tracking-widest text-sm text-starlight group-hover:text-astrophage transition-colors">REEL SCIENCE</span>
  </a>
  <div class="flex items-center gap-6 text-sm text-starlight/50">
    <a href="/" class="hover:text-astrophage transition-colors">Films</a>
    <span class="hover:text-astrophage transition-colors cursor-pointer">About</span>
  </div>
</nav>

<main class="min-h-screen pt-16">
  <slot />
</main>
