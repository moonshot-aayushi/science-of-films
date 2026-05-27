<script lang="ts">
  type Region = 'shadow' | 'ring' | 'disk' | 'lensed' | null;
  let active: Region = null;

  // Deterministic star positions (no Math.random)
  const stars = Array.from({length: 95}, (_, i) => ({
    x: ((Math.sin(i * 2.3999) + 1) / 2) * 500,
    y: ((Math.cos(i * 1.6180) + 1) / 2) * 360,
    r: i % 5 === 0 ? 1.6 : i % 3 === 0 ? 1.0 : 0.55,
    o: 0.2 + (i % 6) * 0.1
  })).filter(s => {
    const dx = s.x - 250, dy = s.y - 185;
    return Math.sqrt(dx * dx + dy * dy) > 108;
  });

  const regions = {
    shadow: {
      label: 'Event Horizon Shadow',
      color: '#00D4FF',
      stat: 'Apparent radius: ~2.6 r_s',
      body: "The dark circle isn't the black hole itself. It's the photon capture cross-section. Any light entering this region is permanently captured. The apparent shadow is about 2.6× larger than the actual event horizon because Gargantua's gravity bends nearby light paths inward. For a 100-million solar-mass black hole, this shadow spans roughly 5 AU, wider than Jupiter's orbit."
    },
    ring: {
      label: 'Photon Ring',
      color: '#FFD080',
      stat: 'Location: 1.5 r_s',
      body: "At exactly 1.5 Schwarzschild radii, photons travel in unstable circular orbits. Light grazing this boundary loops the black hole one, two, or many times before escaping; each extra half-loop creates another sub-ring. The cumulative effect is an intensely bright, hair-thin luminous ring just outside the shadow. Kip Thorne's equations produced the correct appearance for the first time in cinema history."
    },
    disk: {
      label: 'Accretion Disk',
      color: '#F5A623',
      stat: 'Temperature: millions K',
      body: "Plasma heated to millions of Kelvin orbits at near-light speeds. The left (approaching) side is dramatically brighter: relativistic Doppler beaming amplifies photon energy as the disk rotates toward the observer, while the receding right side is dim and redshifted. Rendering this correctly for Interstellar produced two peer-reviewed scientific papers as a side effect."
    },
    lensed: {
      label: 'Lensed Disk Image',
      color: '#A0C4FF',
      stat: 'Same disk, bent 180°+',
      body: "Light from the far side of the accretion disk (which should be completely hidden behind the black hole) is bent entirely over the shadow by Gargantua's extreme gravity, reappearing as a bright arc above and below it. This is the same disk seen along a different curved light path. Successive lensed copies stack up as increasingly thin arcs near the photon ring."
    }
  } as const;

  $: info = active ? regions[active] : null;
</script>

<div class="flex flex-col gap-5">
  <!-- Main SVG -->
  <div class="bg-black rounded-xl overflow-hidden border border-white/6">
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <svg viewBox="0 0 500 360" class="w-full" style="max-height:360px">
      <defs>
        <linearGradient id="diskMain" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stop-color="#FFEE70" stop-opacity="1"/>
          <stop offset="12%"  stop-color="#FFB030" stop-opacity="0.95"/>
          <stop offset="38%"  stop-color="#E06010" stop-opacity="0.8"/>
          <stop offset="68%"  stop-color="#803010" stop-opacity="0.4"/>
          <stop offset="100%" stop-color="#200600" stop-opacity="0.08"/>
        </linearGradient>
        <linearGradient id="diskOuter" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stop-color="#FF9020" stop-opacity="0.28"/>
          <stop offset="50%"  stop-color="#C05010" stop-opacity="0.12"/>
          <stop offset="100%" stop-color="#200800" stop-opacity="0.02"/>
        </linearGradient>
        <filter id="gSm"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="gMd"><feGaussianBlur stdDeviation="5"   result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="gLg"><feGaussianBlur stdDeviation="12"  result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>

      <!-- Background -->
      <rect width="500" height="360" fill="#020408"/>

      <!-- Stars -->
      {#each stars as s}
        <circle cx={s.x} cy={s.y} r={s.r} fill="white" opacity={s.o}/>
      {/each}

      <!-- Outer disk halo -->
      <ellipse cx="250" cy="185" rx="248" ry="38" fill="url(#diskOuter)" filter="url(#gLg)"/>

      <!-- Main accretion disk -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <ellipse cx="250" cy="185" rx="220" ry="29"
        fill="url(#diskMain)"
        opacity={active === 'disk' ? 1 : 0.87}
        on:click={() => active = active === 'disk' ? null : 'disk'}
        style="cursor:pointer"/>

      <!-- Shadow covers disk center -->
      <circle cx="250" cy="185" r="80" fill="#020408"/>

      <!-- Lensed upper arc — far-side disk bent over shadow -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <path d="M 170,176 C 198,140 254,124 308,140 L 330,176"
        fill="none"
        stroke="#FFAA30"
        stroke-width={active === 'lensed' ? 7 : 5}
        stroke-linecap="round"
        opacity={active === 'lensed' ? 0.92 : 0.68}
        filter="url(#gSm)"
        on:click={() => active = active === 'lensed' ? null : 'lensed'}
        style="cursor:pointer"/>

      <!-- Lensed lower arc — secondary image, fainter -->
      <path d="M 170,194 C 198,230 254,246 308,230 L 330,194"
        fill="none" stroke="#904020" stroke-width="3" stroke-linecap="round"
        opacity={active === 'lensed' ? 0.5 : 0.18}
        filter="url(#gSm)"/>

      <!-- Photon ring glow -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <circle cx="250" cy="185" r={active === 'ring' ? 85 : 83}
        fill="none"
        stroke="#FFD080"
        stroke-width={active === 'ring' ? 3.5 : 2.5}
        opacity={active === 'ring' ? 0.98 : 0.78}
        filter="url(#gMd)"
        on:click={() => active = active === 'ring' ? null : 'ring'}
        style="cursor:pointer"/>

      <!-- Shadow click target -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <circle cx="250" cy="185" r="78" fill="transparent"
        on:click={() => active = active === 'shadow' ? null : 'shadow'}
        style="cursor:pointer"/>

      <!-- Cyan selection ring for shadow -->
      {#if active === 'shadow'}
        <circle cx="250" cy="185" r="82" fill="none"
          stroke="#00D4FF" stroke-width="1.5" stroke-dasharray="5 4" opacity="0.55"/>
      {/if}

      <!-- Hint text -->
      {#if !active}
        <text x="250" y="352" text-anchor="middle" font-size="9" font-family="Inter" fill="#E8EDF228">
          Click the shadow · ring · disk · or arc above it
        </text>
      {/if}
    </svg>
  </div>

  <!-- Info panel -->
  {#if info}
    <div class="bg-deep-space border rounded-xl p-5" style="border-color: {info.color}28">
      <div class="flex items-center justify-between flex-wrap gap-2 mb-3">
        <div class="flex items-center gap-2">
          <div class="w-2.5 h-2.5 rounded-full flex-shrink-0" style="background:{info.color}"></div>
          <p class="font-semibold text-starlight">{info.label}</p>
        </div>
        <span class="text-[10px] font-mono px-2 py-0.5 rounded border"
          style="color:{info.color}; border-color:{info.color}40">{info.stat}</span>
      </div>
      <p class="text-sm text-starlight/65 leading-relaxed">{info.body}</p>
    </div>
  {:else}
    <div class="bg-deep-space/40 border border-white/5 rounded-xl p-4 text-center">
      <p class="text-starlight/30 text-sm">Click any element of the black hole to explore its physics</p>
    </div>
  {/if}

  <!-- Kip Thorne note -->
  <div class="bg-deep-space border border-white/8 rounded-xl p-5">
    <p class="text-[10px] font-mono text-starlight/30 uppercase tracking-wider mb-2">The Science Behind the Rendering</p>
    <p class="text-sm text-starlight/60 leading-relaxed">
      Physicist Kip Thorne (Nobel Prize 2017) wrote the gravitational lensing equations used by
      DNEG's rendering team. The simulation was accurate enough to produce two unexpected
      scientific discoveries about the photon ring's appearance. Both were published in
      peer-reviewed journals. It was the first scientifically accurate black hole depicted in cinema.
    </p>
  </div>
</div>
