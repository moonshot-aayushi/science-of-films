<script lang="ts">
  const films = [
    {
      slug: 'project-hail-mary',
      title: 'Project Hail Mary',
      year: 2025,
      author: 'Andy Weir',
      status: 'available',
      tagline: 'A lone astronaut. A dying star. An impossible mission.',
      concepts: ['Astrobiology', 'Photon Physics', 'Extremophiles'],
      color: '#F5A623'
    },
    {
      slug: 'interstellar',
      title: 'Interstellar',
      year: 2014,
      author: 'Christopher Nolan',
      status: 'coming-soon',
      tagline: '',
      concepts: ['General Relativity', 'Black Holes', 'Time Dilation'],
      color: '#00D4FF'
    },
    {
      slug: 'the-martian',
      title: 'The Martian',
      year: 2015,
      author: 'Andy Weir',
      status: 'coming-soon',
      tagline: '',
      concepts: ['Botany', 'Orbital Mechanics', 'Survival Chemistry'],
      color: '#FF6B35'
    }
  ];
</script>

<!-- Hero -->
<section class="relative overflow-hidden min-h-[60vh] flex items-center starfield">
  <div class="absolute inset-0 bg-gradient-to-b from-void via-void/80 to-void pointer-events-none"></div>

  <!-- Ambient glow -->
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-astrophage/5 blur-3xl pointer-events-none"></div>

  <div class="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center">
    <div class="inline-flex items-center gap-2 text-astrophage/70 text-xs font-mono tracking-widest uppercase mb-6 border border-astrophage/20 rounded-full px-4 py-1.5">
      <span class="w-1.5 h-1.5 rounded-full bg-astrophage animate-pulse"></span>
      Interactive Science Breakdowns
    </div>

    <h1 class="text-5xl sm:text-7xl font-bold leading-tight mb-6">
      <span class="text-starlight">The Science</span><br/>
      <span class="text-gradient-amber">Behind the Screen</span>
    </h1>

    <p class="text-starlight/60 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
      Real physics. Real biology. Real wonder. Explore the science that makes
      sci-fi films more than fiction.
    </p>
  </div>
</section>

<!-- Films -->
<section class="max-w-6xl mx-auto px-6 py-20">
  <div class="flex items-center gap-4 mb-12">
    <h2 class="text-sm font-mono text-starlight/40 tracking-widest uppercase">Featured Films</h2>
    <div class="flex-1 h-px bg-white/5"></div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    {#each films as film}
      {#if film.status === 'available'}
        <a href="/films/{film.slug}"
          class="group relative bg-deep-space border border-white/8 rounded-2xl overflow-hidden hover:border-astrophage/40 transition-all duration-300 hover:glow-amber-sm">

          <!-- Card glow bg -->
          <div class="absolute inset-0 bg-gradient-to-br from-astrophage/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

          <!-- Organism dots -->
          <div class="relative h-44 overflow-hidden sci-grid">
            <div class="absolute inset-0 flex items-center justify-center">
              <!-- Animated astrophage orb -->
              <div class="relative">
                <div class="absolute inset-0 rounded-full bg-astrophage/20 blur-2xl scale-150 animate-pulse-slow"></div>
                <svg width="100" height="100" viewBox="0 0 100 100" class="animate-float">
                  <defs>
                    <radialGradient id="orbGrad" cx="40%" cy="35%" r="60%">
                      <stop offset="0%" stop-color="#FFD080" stop-opacity="0.9"/>
                      <stop offset="60%" stop-color="#F5A623" stop-opacity="0.7"/>
                      <stop offset="100%" stop-color="#C07C0A" stop-opacity="0.3"/>
                    </radialGradient>
                    <filter id="orbGlow">
                      <feGaussianBlur stdDeviation="3" result="blur"/>
                      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                  </defs>
                  <ellipse cx="50" cy="50" rx="36" ry="30" fill="url(#orbGrad)" filter="url(#orbGlow)"/>
                  <ellipse cx="50" cy="50" rx="36" ry="30" fill="none" stroke="#F5A623" stroke-width="1" opacity="0.6"/>
                  {#each Array.from({length: 12}, (_, i) => i) as i}
                    <circle
                      cx={50 + 35 * Math.cos((i / 12) * Math.PI * 2)}
                      cy={50 + 29 * Math.sin((i / 12) * Math.PI * 2)}
                      r="2.5" fill="#F5A623" opacity="0.7"/>
                  {/each}
                  <circle cx="50" cy="50" r="10" fill="#C07C0A" opacity="0.6"/>
                  <circle cx="50" cy="50" r="5" fill="#FFD080" opacity="0.9"/>
                </svg>
              </div>
            </div>
            <!-- Scan line effect -->
            <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-deep-space pointer-events-none"></div>
          </div>

          <div class="p-6">
            <div class="text-astrophage text-xs font-mono tracking-wider mb-1 opacity-70">{film.author} · {film.year}</div>
            <h3 class="text-xl font-bold text-starlight mb-1 group-hover:text-astrophage transition-colors">{film.title}</h3>
            <p class="text-starlight/50 text-sm mb-4 leading-snug">{film.tagline}</p>

            <div class="flex flex-wrap gap-1.5 mb-5">
              {#each film.concepts as concept}
                <span class="text-xs font-mono px-2 py-0.5 rounded-full border border-astrophage/25 text-astrophage/80 bg-astrophage/5">
                  {concept}
                </span>
              {/each}
            </div>

            <div class="flex items-center gap-1.5 text-astrophage text-sm font-medium">
              Explore Science
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" class="group-hover:translate-x-1 transition-transform">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        </a>

      {:else}
        <div class="relative bg-deep-space/50 border border-white/5 rounded-2xl overflow-hidden opacity-60">
          <div class="h-44 sci-grid flex items-center justify-center">
            <div class="text-center">
              <div class="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-2">
                <span class="text-starlight/30 text-xl">+</span>
              </div>
            </div>
          </div>
          <div class="p-6">
            <div class="text-starlight/30 text-xs font-mono tracking-wider mb-1">{film.year}</div>
            <h3 class="text-xl font-bold text-starlight/40 mb-3">{film.title}</h3>
            <div class="flex flex-wrap gap-1.5 mb-5">
              {#each film.concepts as concept}
                <span class="text-xs font-mono px-2 py-0.5 rounded-full border border-white/8 text-starlight/25">
                  {concept}
                </span>
              {/each}
            </div>
            <span class="text-xs font-mono text-starlight/25 border border-white/8 rounded-full px-3 py-1">Coming Soon</span>
          </div>
        </div>
      {/if}
    {/each}
  </div>
</section>

<!-- Footer -->
<footer class="border-t border-white/5 py-10 px-6 text-center">
  <p class="text-starlight/25 text-sm font-mono">REEL SCIENCE — science is the best sci-fi</p>
</footer>
