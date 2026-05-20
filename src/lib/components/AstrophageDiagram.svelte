<script lang="ts">
  type Region = 'membrane' | 'photoreceptors' | 'vacuole' | 'core' | null;

  let activeRegion: Region = null;

  const info: Record<NonNullable<Region>, { name: string; detail: string; science: string; parallel: string }> = {
    membrane: {
      name: 'Outer Membrane',
      detail: 'Selectively transmits 585 nm light',
      science: 'The outer membrane is approximately 60× thicker than a typical terrestrial cell membrane. It is composed of a carbon-based polymer that is nearly opaque to radiation above 700 nm and below 400 nm, protecting the interior while permitting the 585 nm "Petrova frequency" light to pass through and reach the photoreceptor lattice.',
      parallel: 'Analogous to the glass of a greenhouse — transparent to useful wavelengths, a barrier to damaging ones.'
    },
    photoreceptors: {
      name: 'Photoreceptor Lattice',
      detail: '~10⁸ receptors per μm², tuned to 585 nm',
      science: 'An array of protein-analogue structures arranged in a crystalline lattice directly beneath the membrane. Each receptor captures individual photons and initiates a cascade that ultimately stores energy as chemical bonds in the vacuole. The 585 nm resonance matches the peak spectral output of a mid-sequence star\'s corona.',
      parallel: 'Functionally mirrors chlorophyll in plant chloroplasts — photon-harvesting molecular arrays that initiate energy conversion.'
    },
    vacuole: {
      name: 'Energy Storage Vacuole',
      detail: '~1 petajoule stored per gram',
      science: 'The vacuole stores photon-derived energy as extremely dense chemical bonds — far exceeding any known terrestrial biochemistry. 1 gram of fully charged Astrophage stores approximately 1 × 10¹⁵ joules (1 petajoule). By comparison, 1 gram of TNT releases ~4,600 joules. Astrophage is ~2 × 10¹¹ times more energy-dense.',
      parallel: 'ATP is biology\'s energy currency on Earth — but ATP stores only ~0.05 eV per bond. Astrophage bonds store orders of magnitude more per unit mass.'
    },
    core: {
      name: 'Reproductive Core',
      detail: 'Binary fission, energy-threshold gated',
      science: 'The core contains an RNA-equivalent genetic strand that encodes all cellular information. Crucially, reproduction only initiates when the energy vacuole exceeds ~80% capacity. Under ideal stellar corona conditions, division takes approximately 1 hour — implying exponential colony growth that can dim a star within centuries.',
      parallel: 'Similar to how yeast enter a dormant state until nutrient thresholds are met, then proliferate explosively.'
    }
  };

  // Precomputed photoreceptor dot positions
  const outerDots = Array.from({ length: 20 }, (_, i) => ({
    x: 200 + 128 * Math.cos((i / 20) * Math.PI * 2),
    y: 200 + 108 * Math.sin((i / 20) * Math.PI * 2)
  }));

  const innerDots = Array.from({ length: 16 }, (_, i) => ({
    x: 200 + 110 * Math.cos((i / 16) * Math.PI * 2 + 0.2),
    y: 200 + 93 * Math.sin((i / 16) * Math.PI * 2 + 0.2)
  }));

  function toggle(r: Region) {
    activeRegion = activeRegion === r ? null : r;
  }
</script>

<div class="flex flex-col lg:flex-row gap-8 items-start">
  <!-- SVG diagram -->
  <div class="w-full lg:w-[420px] flex-shrink-0">
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <defs>
        <pattern id="diagGrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(245,166,35,0.06)" stroke-width="0.5"/>
        </pattern>
        <radialGradient id="cellBodyGrad" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stop-color="#F5A623" stop-opacity="0.13"/>
          <stop offset="100%" stop-color="#050A14" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="vacuoleGrad" cx="45%" cy="40%" r="55%">
          <stop offset="0%" stop-color="#FFD080" stop-opacity="0.55"/>
          <stop offset="60%" stop-color="#F5A623" stop-opacity="0.35"/>
          <stop offset="100%" stop-color="#C07C0A" stop-opacity="0.05"/>
        </radialGradient>
        <radialGradient id="coreGrad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#FFFDE0" stop-opacity="1"/>
          <stop offset="100%" stop-color="#F5A623" stop-opacity="0.7"/>
        </radialGradient>
        <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="glowStrong" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="9" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      <rect width="400" height="400" fill="#050A14"/>
      <rect width="400" height="400" fill="url(#diagGrid)"/>

      <!-- Outer ambient glow when membrane selected -->
      {#if activeRegion === 'membrane'}
        <ellipse cx="200" cy="200" rx="160" ry="138" fill="none" stroke="#F5A623" stroke-width="12" opacity="0.1" filter="url(#glowStrong)"/>
      {/if}

      <!-- Cell body fill -->
      <ellipse cx="200" cy="200" rx="140" ry="120" fill="url(#cellBodyGrad)"/>

      <!-- Outer membrane (interactive) -->
      <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
      <ellipse cx="200" cy="200" rx="140" ry="120" fill="transparent"
        stroke={activeRegion === 'membrane' ? '#FFD080' : '#F5A623'}
        stroke-width={activeRegion === 'membrane' ? 3.5 : 2}
        filter={activeRegion === 'membrane' ? 'url(#glow)' : undefined}
        style="cursor:pointer; transition: stroke 0.2s"
        on:click={() => toggle('membrane')}/>

      <!-- Inner membrane dashed -->
      <ellipse cx="200" cy="200" rx="130" ry="111" fill="none"
        stroke="#F5A623" stroke-width="0.6" stroke-dasharray="3 4" opacity="0.25"/>

      <!-- Photoreceptor dots (inner ring) -->
      {#each innerDots as dot}
        <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
        <circle cx={dot.x} cy={dot.y} r="3"
          fill={activeRegion === 'photoreceptors' ? '#FFD080' : '#F5A623'}
          opacity={activeRegion === 'photoreceptors' ? 1 : 0.55}
          filter={activeRegion === 'photoreceptors' ? 'url(#glow)' : undefined}
          style="cursor:pointer; transition: opacity 0.2s"
          on:click={() => toggle('photoreceptors')}/>
      {/each}

      <!-- Photoreceptor dots (outer ring) -->
      {#each outerDots as dot}
        <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
        <circle cx={dot.x} cy={dot.y} r="4"
          fill={activeRegion === 'photoreceptors' ? '#FFD080' : '#F5A623'}
          opacity={activeRegion === 'photoreceptors' ? 1 : 0.75}
          filter={activeRegion === 'photoreceptors' ? 'url(#glow)' : undefined}
          style="cursor:pointer; transition: opacity 0.2s"
          on:click={() => toggle('photoreceptors')}/>
      {/each}

      <!-- Energy vacuole (interactive) -->
      <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
      <ellipse cx="200" cy="200" rx="72" ry="62" fill="url(#vacuoleGrad)"
        stroke={activeRegion === 'vacuole' ? '#FFD080' : '#F5A623'}
        stroke-width={activeRegion === 'vacuole' ? 2 : 1}
        filter={activeRegion === 'vacuole' ? 'url(#glow)' : undefined}
        style="cursor:pointer; transition: stroke 0.2s"
        on:click={() => toggle('vacuole')}/>

      <!-- Reproductive core (interactive) -->
      <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
      <circle cx="200" cy="200" r="23" fill="url(#coreGrad)" filter="url(#glow)"
        stroke={activeRegion === 'core' ? '#FFFDE0' : '#FFD080'}
        stroke-width={activeRegion === 'core' ? 2.5 : 1.5}
        style="cursor:pointer; transition: stroke 0.2s"
        on:click={() => toggle('core')}/>
      <circle cx="200" cy="200" r="11" fill="#050A14" opacity="0.75" style="pointer-events:none"/>
      <circle cx="200" cy="200" r="5" fill="#F5A623" opacity="0.95" filter="url(#glow)" style="pointer-events:none"/>

      <!-- Labels -->
      <line x1="342" y1="198" x2="314" y2="198" stroke="#F5A623" stroke-width="0.6" opacity="0.4"/>
      <text x="347" y="194" fill={activeRegion === 'membrane' ? '#FFD080' : '#E8EDF280'} font-size="10" font-family="Inter" style="pointer-events:none">Outer</text>
      <text x="347" y="206" fill={activeRegion === 'membrane' ? '#FFD080' : '#E8EDF280'} font-size="10" font-family="Inter" style="pointer-events:none">Membrane</text>

      <line x1="313" y1="108" x2="282" y2="124" stroke="#F5A623" stroke-width="0.6" opacity="0.4"/>
      <text x="318" y="105" fill={activeRegion === 'photoreceptors' ? '#FFD080' : '#E8EDF280'} font-size="10" font-family="Inter" style="pointer-events:none">Photoreceptor</text>
      <text x="318" y="117" fill={activeRegion === 'photoreceptors' ? '#FFD080' : '#E8EDF280'} font-size="10" font-family="Inter" style="pointer-events:none">Lattice</text>

      <line x1="45" y1="193" x2="128" y2="200" stroke="#F5A623" stroke-width="0.6" opacity="0.4"/>
      <text x="6" y="187" fill={activeRegion === 'vacuole' ? '#FFD080' : '#E8EDF280'} font-size="10" font-family="Inter" style="pointer-events:none">Energy</text>
      <text x="6" y="199" fill={activeRegion === 'vacuole' ? '#FFD080' : '#E8EDF280'} font-size="10" font-family="Inter" style="pointer-events:none">Vacuole</text>

      <line x1="222" y1="228" x2="213" y2="218" stroke="#F5A623" stroke-width="0.6" opacity="0.4"/>
      <text x="228" y="248" fill={activeRegion === 'core' ? '#FFD080' : '#E8EDF280'} font-size="10" font-family="Inter" style="pointer-events:none">Reproductive</text>
      <text x="228" y="260" fill={activeRegion === 'core' ? '#FFD080' : '#E8EDF280'} font-size="10" font-family="Inter" style="pointer-events:none">Core</text>

      <!-- Scale bar -->
      <line x1="22" y1="372" x2="72" y2="372" stroke="#E8EDF2" stroke-width="1" opacity="0.25"/>
      <line x1="22" y1="367" x2="22" y2="377" stroke="#E8EDF2" stroke-width="1" opacity="0.25"/>
      <line x1="72" y1="367" x2="72" y2="377" stroke="#E8EDF2" stroke-width="1" opacity="0.25"/>
      <text x="27" y="388" fill="#E8EDF2" font-size="9" font-family="Inter" opacity="0.25" style="pointer-events:none">1 μm</text>

      <text x="200" y="392" text-anchor="middle" fill="#F5A623" font-size="9.5" font-family="Inter" opacity="0.5" style="pointer-events:none">
        click any structure to explore
      </text>
    </svg>
  </div>

  <!-- Info panel -->
  <div class="flex-1 min-h-[220px]">
    {#if activeRegion}
      <div class="bg-deep-space border border-astrophage/30 rounded-xl p-6 glow-amber-sm">
        <div class="flex items-start gap-3 mb-4">
          <div class="w-2 h-2 rounded-full bg-astrophage mt-[6px] flex-shrink-0 animate-pulse"></div>
          <div>
            <h3 class="text-lg font-semibold text-astrophage">{info[activeRegion].name}</h3>
            <p class="text-xs font-mono text-starlight/50 mt-0.5">{info[activeRegion].detail}</p>
          </div>
        </div>
        <p class="text-starlight/80 text-sm leading-relaxed mb-5">{info[activeRegion].science}</p>
        <div class="border-t border-white/8 pt-4">
          <p class="text-xs font-mono text-starlight/35 uppercase tracking-widest mb-2">Earth Parallel</p>
          <p class="text-sm text-starlight/55 italic">{info[activeRegion].parallel}</p>
        </div>
      </div>
    {:else}
      <div class="bg-deep-space/40 border border-white/5 rounded-xl p-8 flex flex-col items-center justify-center min-h-[220px] text-center">
        <svg width="36" height="36" viewBox="0 0 36 36" class="mb-3 opacity-30">
          <circle cx="18" cy="18" r="14" fill="none" stroke="#F5A623" stroke-width="1.5"/>
          <circle cx="18" cy="18" r="5" fill="#F5A623" opacity="0.6"/>
          {#each Array.from({length: 8}, (_, i) => i) as i}
            <circle cx={18 + 13 * Math.cos((i/8)*Math.PI*2)} cy={18 + 13 * Math.sin((i/8)*Math.PI*2)} r="2" fill="#F5A623"/>
          {/each}
        </svg>
        <p class="text-starlight/30 text-sm">Select a structure in the diagram<br/>to explore its biology</p>
      </div>
    {/if}
  </div>
</div>
