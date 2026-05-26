<script lang="ts">
  import { films } from '$lib/data/films';
</script>

<!-- Hero -->
<section class="relative overflow-hidden min-h-[60vh] flex items-center starfield">
  <div class="absolute inset-0 bg-gradient-to-b from-void via-void/80 to-void pointer-events-none"></div>
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
    <span class="text-xs font-mono text-starlight/20">{films.filter(f => f.status === 'available').length} available · {films.filter(f => f.status === 'coming-soon').length} coming soon</span>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    {#each films as film}
      {#if film.status === 'available'}
        <a href="/films/{film.slug}"
          class="group relative bg-deep-space border border-white/8 rounded-2xl overflow-hidden hover:border-astrophage/40 transition-all duration-300 hover:glow-amber-sm">

          <div class="absolute inset-0 bg-gradient-to-br from-astrophage/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

          <!-- Visual header -->
          <div class="relative h-44 overflow-hidden sci-grid">
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="relative">
                <div class="absolute inset-0 rounded-full blur-2xl scale-150 animate-pulse-slow
                  {film.slug === 'interstellar' ? 'bg-amber-400/10' : 'bg-astrophage/20'}"></div>

                {#if film.slug === 'interstellar'}
                  <!-- Gargantua black hole -->
                  <svg width="100" height="100" viewBox="0 0 100 100" class="animate-float">
                    <defs>
                      <radialGradient id="bhHalo-{film.slug}" cx="50%" cy="50%" r="50%">
                        <stop offset="55%"  stop-color="#000000"  stop-opacity="0"/>
                        <stop offset="85%"  stop-color="#F5A623"  stop-opacity="0.10"/>
                        <stop offset="100%" stop-color="#FFD080"  stop-opacity="0.28"/>
                      </radialGradient>
                      <radialGradient id="diskGrad-{film.slug}" cx="22%" cy="50%" r="78%">
                        <stop offset="0%"   stop-color="#FFFFFF"  stop-opacity="0.95"/>
                        <stop offset="35%"  stop-color="#FFD080"  stop-opacity="0.85"/>
                        <stop offset="100%" stop-color="#C07C0A"  stop-opacity="0.05"/>
                      </radialGradient>
                      <filter id="bhGlow-{film.slug}">
                        <feGaussianBlur stdDeviation="2" result="b"/>
                        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                      </filter>
                      <clipPath id="diskFront-{film.slug}">
                        <rect x="0" y="50" width="100" height="50"/>
                      </clipPath>
                      <clipPath id="diskBack-{film.slug}">
                        <rect x="0" y="0" width="100" height="50"/>
                      </clipPath>
                    </defs>
                    <!-- Stars -->
                    {#each Array.from({length: 18}, (_, i) => i) as i}
                      <circle
                        cx={((Math.sin(i * 2.399) + 1) / 2) * 100}
                        cy={((Math.cos(i * 1.701) + 1) / 2) * 100}
                        r={i % 5 === 0 ? 1.1 : 0.5}
                        fill="white" opacity={0.12 + (i % 6) * 0.07}/>
                    {/each}
                    <!-- Ambient halo -->
                    <circle cx="50" cy="50" r="44" fill="url(#bhHalo-{film.slug})"/>
                    <!-- Lensing ring hint -->
                    <circle cx="50" cy="50" r="27" fill="none" stroke="#F5A623" stroke-width="0.5" opacity="0.2"/>
                    <!-- Disk — back half (dim, above equator) -->
                    <g clip-path="url(#diskBack-{film.slug})">
                      <ellipse cx="50" cy="50" rx="36" ry="9"
                        fill="url(#diskGrad-{film.slug})" fill-opacity="0.22"
                        stroke="#F5A623" stroke-width="1.5" stroke-opacity="0.28"/>
                    </g>
                    <!-- Event horizon -->
                    <circle cx="50" cy="50" r="18" fill="#000000"/>
                    <!-- Disk — front half (bright, below equator) -->
                    <g clip-path="url(#diskFront-{film.slug})">
                      <ellipse cx="50" cy="50" rx="36" ry="9"
                        fill="url(#diskGrad-{film.slug})" fill-opacity="0.72"
                        stroke="#FFD080" stroke-width="2.5" stroke-opacity="0.9"
                        filter="url(#bhGlow-{film.slug})"/>
                    </g>
                    <!-- Photon ring -->
                    <circle cx="50" cy="50" r="19.5" fill="none"
                      stroke="#FFD080" stroke-width="1" stroke-opacity="0.8"
                      filter="url(#bhGlow-{film.slug})"/>
                  </svg>

                {:else}
                  <!-- Astrophage star (Project Hail Mary + default) -->
                  <svg width="100" height="100" viewBox="0 0 100 100" class="animate-float">
                    <defs>
                      <radialGradient id="orbGrad-{film.slug}" cx="40%" cy="35%" r="60%">
                        <stop offset="0%" stop-color="#FFD080" stop-opacity="0.9"/>
                        <stop offset="60%" stop-color="#F5A623" stop-opacity="0.7"/>
                        <stop offset="100%" stop-color="#C07C0A" stop-opacity="0.3"/>
                      </radialGradient>
                      <filter id="orbGlow-{film.slug}">
                        <feGaussianBlur stdDeviation="3" result="blur"/>
                        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                      </filter>
                    </defs>
                    <ellipse cx="50" cy="50" rx="36" ry="30" fill="url(#orbGrad-{film.slug})" filter="url(#orbGlow-{film.slug})"/>
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
                {/if}
              </div>
            </div>
            <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-deep-space pointer-events-none"></div>
          </div>

          <div class="p-6">
            <div class="text-astrophage text-xs font-mono tracking-wider mb-1 opacity-70">
              {film.author} · {film.year}
            </div>
            <h3 class="text-xl font-bold text-starlight mb-1 group-hover:text-astrophage transition-colors">
              {film.title}
            </h3>
            <p class="text-starlight/50 text-sm mb-4 leading-snug">{film.tagline}</p>

            <div class="flex flex-wrap gap-1.5 mb-5">
              {#each film.concepts as concept}
                <span class="text-xs font-mono px-2 py-0.5 rounded-full border border-astrophage/25 text-astrophage/80 bg-astrophage/5">
                  {concept}
                </span>
              {/each}
            </div>

            <div class="flex items-center gap-1.5 text-sm font-medium text-astrophage">
              Explore Science
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" class="group-hover:translate-x-1 transition-transform">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        </a>

      {:else}
        <div class="relative bg-deep-space/50 border border-white/5 rounded-2xl overflow-hidden opacity-55">
          <div class="h-44 sci-grid flex items-center justify-center">
            <div class="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
              <span class="text-starlight/20 text-xl">+</span>
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
            <span class="text-xs font-mono text-starlight/25 border border-white/8 rounded-full px-3 py-1">
              Coming Soon
            </span>
          </div>
        </div>
      {/if}
    {/each}
  </div>
</section>

<footer class="border-t border-white/5 py-10 px-6 text-center">
  <p class="text-starlight/25 text-sm font-mono">REEL SCIENCE — science is the best sci-fi</p>
</footer>
