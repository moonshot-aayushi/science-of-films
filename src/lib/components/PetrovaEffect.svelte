<script lang="ts">
  let coverage = 0.5; // percent, 0–100

  // Sun's luminosity: 3.828 × 10^26 W
  const solarLuminosity = 3.828e26;
  const earthEnergyUse = 2.3e13; // watts

  $: extractedWatts = (coverage / 100) * solarLuminosity;
  $: earthMultiple = extractedWatts / earthEnergyUse;
  $: brightness = Math.max(0.15, 1 - coverage / 120);

  function formatSci(n: number): string {
    if (n === 0) return '0';
    const exp = Math.floor(Math.log10(n));
    const mantissa = n / Math.pow(10, exp);
    return `${mantissa.toFixed(2)} × 10<sup>${exp}</sup>`;
  }

  function formatEarth(n: number): string {
    if (n < 1000) return n.toFixed(0);
    if (n < 1e6) return `${(n/1e3).toFixed(1)}K`;
    if (n < 1e9) return `${(n/1e6).toFixed(1)}M`;
    if (n < 1e12) return `${(n/1e9).toFixed(1)}B`;
    return `${(n/1e12).toFixed(2)} trillion`;
  }
</script>

<div class="flex flex-col gap-8">
  <!-- Star visualization -->
  <div class="flex flex-col sm:flex-row gap-6 items-center">
    <div class="flex-shrink-0">
      <svg viewBox="0 0 260 260" class="w-56 h-56">
        <defs>
          <radialGradient id="starBase" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#FFFDE0" stop-opacity={brightness}/>
            <stop offset="40%" stop-color="#FFE066" stop-opacity={brightness * 0.9}/>
            <stop offset="75%" stop-color="#F5A623" stop-opacity={brightness * 0.6}/>
            <stop offset="100%" stop-color="#FF6B35" stop-opacity={brightness * 0.1}/>
          </radialGradient>
          <radialGradient id="petrovaOverlay" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#F5A623" stop-opacity={coverage / 400}/>
            <stop offset="60%" stop-color="#C07C0A" stop-opacity={coverage / 250}/>
            <stop offset="100%" stop-color="#2A1A00" stop-opacity={coverage / 150}/>
          </radialGradient>
          <filter id="starBlur">
            <feGaussianBlur stdDeviation={12 * brightness + 2} result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        <rect width="260" height="260" fill="#050A14"/>

        <!-- Corona glow -->
        <circle cx="130" cy="130" r="105" fill="url(#starBase)" filter="url(#starBlur)" opacity={brightness}/>

        <!-- Star surface -->
        <circle cx="130" cy="130" r="72" fill="url(#starBase)"/>

        <!-- Astrophage colony overlay (amber-dark patches) -->
        <circle cx="130" cy="130" r="72" fill="url(#petrovaOverlay)"/>

        <!-- Individual colony patches when coverage > 5 -->
        {#if coverage > 5}
          {#each Array.from({length: Math.min(30, Math.floor(coverage * 0.6))}, (_, i) => i) as i}
            <circle
              cx={130 + 55 * Math.cos((i * 137.5 * Math.PI) / 180)}
              cy={130 + 55 * Math.sin((i * 137.5 * Math.PI) / 180)}
              r={2 + (coverage / 30)}
              fill="#3A1A00"
              opacity={Math.min(0.7, coverage / 60)}/>
          {/each}
        {/if}

        <!-- Star label -->
        <text x="130" y="228" text-anchor="middle" fill="#E8EDF2" font-size="11" font-family="Inter" opacity="0.4">
          {coverage < 1 ? 'Tau Ceti — baseline' : coverage < 10 ? 'early colonization' : coverage < 40 ? 'Petrova dimming' : 'critical coverage'}
        </text>
      </svg>
    </div>

    <!-- Stats -->
    <div class="flex-1 space-y-4 w-full">
      <div class="bg-deep-space border border-white/8 rounded-xl p-4">
        <p class="text-xs font-mono text-starlight/35 uppercase tracking-widest mb-1">Astrophage Coverage</p>
        <p class="text-3xl font-bold text-astrophage">{coverage.toFixed(1)}<span class="text-lg font-normal opacity-60">%</span></p>
      </div>

      <div class="bg-deep-space border border-white/8 rounded-xl p-4">
        <p class="text-xs font-mono text-starlight/35 uppercase tracking-widest mb-1">Energy Extracted</p>
        <p class="text-lg font-mono text-starlight/85 leading-snug">
          {@html formatSci(extractedWatts)} W
        </p>
      </div>

      <div class="bg-deep-space border {coverage > 0.001 ? 'border-astrophage/30' : 'border-white/8'} rounded-xl p-4">
        <p class="text-xs font-mono text-starlight/35 uppercase tracking-widest mb-1">Equivalent to Earth's Energy Needs</p>
        <p class="text-lg font-bold {coverage > 0.001 ? 'text-astrophage' : 'text-starlight/50'}">
          {formatEarth(earthMultiple)}×
        </p>
      </div>

      <div class="bg-deep-space border border-white/8 rounded-xl p-4">
        <p class="text-xs font-mono text-starlight/35 uppercase tracking-widest mb-1">Star Brightness</p>
        <div class="flex items-center gap-3 mt-1">
          <div class="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
            <div class="h-full rounded-full bg-gradient-to-r from-astrophage to-[#FFFDE0] transition-all duration-300"
              style="width: {Math.max(2, brightness * 100)}%"></div>
          </div>
          <span class="text-sm font-mono text-starlight/60 w-12 text-right">{(brightness * 100).toFixed(0)}%</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Slider -->
  <div>
    <div class="flex justify-between text-xs font-mono text-starlight/35 mb-2">
      <span>0% — pristine star</span>
      <span>100% — complete colonization</span>
    </div>
    <input type="range" min="0" max="100" step="0.1" bind:value={coverage} class="w-full"/>
  </div>

  <!-- Context note -->
  <div class="bg-astrophage/6 border border-astrophage/20 rounded-xl p-4">
    <p class="text-xs font-mono text-astrophage/70 uppercase tracking-wider mb-2">In the Novel</p>
    <p class="text-sm text-starlight/65 leading-relaxed">
      The "Petrova line" — a visible dimming of affected stars — is detectable at just 0.1–3% coverage.
      At the start of <em>Project Hail Mary</em>, 14 stars show the Petrova line. Earth's sun has already begun to dim.
      Ryland Grace's mission is to find out why Tau Ceti <em>doesn't</em> have the problem — and reverse-engineer the solution.
    </p>
  </div>
</div>
