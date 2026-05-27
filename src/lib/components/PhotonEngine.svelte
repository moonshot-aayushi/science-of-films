<script lang="ts">
  import { onDestroy } from 'svelte';

  let step = 0; // 0=idle 1=photon-traveling 2=absorption 3=storing 4=charged
  let isPlaying = false;
  let timer: ReturnType<typeof setInterval>;

  const steps = [
    { label: 'Photons Approach', desc: '585 nm photons radiate outward from the stellar corona. The Astrophage membrane is tuned specifically to this wavelength; other wavelengths pass through or are reflected.' },
    { label: 'Membrane Absorption', desc: 'Photons penetrate the outer membrane and strike the photoreceptor lattice. Each receptor captures one photon and undergoes a conformational change, triggering the energy cascade.' },
    { label: 'Energy Storage', desc: 'The captured energy is converted into extremely dense chemical bonds within the energy vacuole. This process has no known analogue in terrestrial biochemistry. The energy density exceeds nuclear fission by a factor of 20.' },
    { label: 'Threshold Reached', desc: 'When the vacuole reaches ~80% charge capacity, the reproductive core activates. The cell undergoes binary fission within ~1 hour, doubling the local population and doubling the star\'s energy drain.' }
  ];

  function play() {
    isPlaying = true;
    timer = setInterval(() => {
      step = (step + 1) % 4;
    }, 2200);
  }

  function pause() {
    isPlaying = false;
    clearInterval(timer);
  }

  function toggle() {
    isPlaying ? pause() : play();
  }

  onDestroy(() => clearInterval(timer));

  $: energyPct = step === 0 ? 20 : step === 1 ? 45 : step === 2 ? 78 : 95;
  $: photonVisible = step === 0 || step === 1;
  $: absorbing = step === 1;
  $: storing = step === 2 || step === 3;
</script>

<div class="flex flex-col gap-6">
  <!-- Animation canvas -->
  <div class="bg-deep-space border border-white/8 rounded-xl overflow-hidden">
    <svg viewBox="0 0 560 220" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <defs>
        <radialGradient id="peGrad" cx="45%" cy="40%" r="58%">
          <stop offset="0%" stop-color="#FFD080" stop-opacity="0.7"/>
          <stop offset="55%" stop-color="#F5A623" stop-opacity="0.45"/>
          <stop offset="100%" stop-color="#C07C0A" stop-opacity="0.05"/>
        </radialGradient>
        <radialGradient id="vacGrad2" cx="45%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#FFD080" stop-opacity={energyPct / 100}/>
          <stop offset="100%" stop-color="#F5A623" stop-opacity={energyPct / 200}/>
        </radialGradient>
        <radialGradient id="starGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFFDE0" stop-opacity="1"/>
          <stop offset="50%" stop-color="#FFD080" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#FF6B35" stop-opacity="0.4"/>
        </radialGradient>
        <filter id="peGlow">
          <feGaussianBlur stdDeviation="5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="peGlowSm">
          <feGaussianBlur stdDeviation="2.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      <rect width="560" height="220" fill="#050A14"/>

      <!-- Grid -->
      <pattern id="peGrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(245,166,35,0.04)" stroke-width="0.5"/>
      </pattern>
      <rect width="560" height="220" fill="url(#peGrid)"/>

      <!-- Star (left) -->
      <circle cx="70" cy="110" r="45" fill="url(#starGrad)" filter="url(#peGlow)" opacity="0.85"/>
      <circle cx="70" cy="110" r="32" fill="#FFFDE0" opacity="0.9" filter="url(#peGlow)"/>
      <text x="70" y="170" text-anchor="middle" fill="#E8EDF2" font-size="10" font-family="Inter" opacity="0.4">Star</text>

      <!-- Photon beams (animated via CSS) -->
      {#if photonVisible}
        {#each [0, 1, 2, 3] as i}
          <circle
            cx={absorbing ? 310 : 150 + i * 30}
            cy={110 + (i - 1.5) * 22}
            r="3.5"
            fill="#FFFDE0"
            filter="url(#peGlowSm)"
            opacity={absorbing ? 0 : 0.9}
            style="transition: cx 0.8s ease, opacity 0.4s"/>
        {/each}
      {/if}

      <!-- Astrophage cell (center) -->
      <!-- Outer glow when absorbing -->
      {#if absorbing}
        <ellipse cx="320" cy="110" rx="65" ry="57" fill="none" stroke="#FFD080" stroke-width="10" opacity="0.12" filter="url(#peGlow)"/>
      {/if}

      <ellipse cx="320" cy="110" rx="55" ry="48" fill="url(#peGrad)"/>
      <ellipse cx="320" cy="110" rx="55" ry="48" fill="none"
        stroke={absorbing ? '#FFD080' : '#F5A623'}
        stroke-width={absorbing ? 2.5 : 1.5}
        style="transition: stroke 0.3s"/>

      <!-- Photoreceptor dots -->
      {#each Array.from({length: 14}, (_, i) => i) as i}
        <circle
          cx={320 + 54 * Math.cos((i/14)*Math.PI*2)}
          cy={110 + 47 * Math.sin((i/14)*Math.PI*2)}
          r="3"
          fill={absorbing ? '#FFD080' : '#F5A623'}
          opacity={absorbing ? 0.95 : 0.65}
          filter={absorbing ? 'url(#peGlowSm)' : undefined}
          style="transition: fill 0.3s, opacity 0.3s"/>
      {/each}

      <!-- Vacuole - grows with energy -->
      <ellipse cx="320" cy="110" rx={22 + energyPct * 0.15} ry={19 + energyPct * 0.13}
        fill="url(#vacGrad2)"
        stroke="#F5A623" stroke-width="1" opacity={0.4 + energyPct * 0.005}
        style="transition: rx 0.7s ease, ry 0.7s ease, opacity 0.7s"/>

      <!-- Core -->
      <circle cx="320" cy="110" r={step === 3 ? 11 : 7} fill="#FFD080" filter="url(#peGlowSm)"
        style="transition: r 0.5s ease"/>
      <circle cx="320" cy="110" r={step === 3 ? 5 : 3} fill="#050A14" opacity="0.7"
        style="transition: r 0.5s ease"/>

      <!-- Energy arrow -->
      {#if storing}
        <path d="M 310 85 Q 315 72 320 85" fill="none" stroke="#FFD080" stroke-width="1.5" opacity="0.6" marker-end="url(#arrow)"/>
      {/if}

      <!-- Energy bar on right -->
      <rect x="440" y="40" width="18" height="140" rx="3" fill="#0D1525" stroke="#F5A623" stroke-width="0.6" opacity="0.5"/>
      <rect x="440" y={40 + 140 * (1 - energyPct/100)} width="18" height={140 * energyPct/100} rx="2"
        fill="#F5A623" opacity="0.7"
        style="transition: height 0.7s ease, y 0.7s ease"/>
      <text x="449" y="200" text-anchor="middle" fill="#F5A623" font-size="9" font-family="mono" opacity="0.6">{energyPct}%</text>
      <text x="449" y="32" text-anchor="middle" fill="#E8EDF2" font-size="9" font-family="Inter" opacity="0.35">charge</text>

      <!-- Step label -->
      <text x="320" y="185" text-anchor="middle" fill="#F5A623" font-size="11" font-family="Inter" font-weight="500" opacity="0.8">
        {steps[step].label}
      </text>
    </svg>
  </div>

  <!-- Controls & description -->
  <div class="flex gap-4 items-start">
    <button on:click={toggle}
      class="flex-shrink-0 w-12 h-12 rounded-full border-2 border-astrophage flex items-center justify-center hover:bg-astrophage/10 transition-colors glow-amber-sm">
      {#if isPlaying}
        <!-- Pause icon -->
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#F5A623">
          <rect x="6" y="4" width="4" height="16" rx="1"/>
          <rect x="14" y="4" width="4" height="16" rx="1"/>
        </svg>
      {:else}
        <!-- Play icon -->
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#F5A623">
          <path d="M8 5v14l11-7z"/>
        </svg>
      {/if}
    </button>

    <div class="flex-1">
      <div class="flex gap-2 mb-3">
        {#each steps as s, i}
          <button on:click={() => { pause(); step = i; }}
            class="h-1 flex-1 rounded-full transition-all duration-300 {step === i ? 'bg-astrophage' : 'bg-white/15'}"/>
        {/each}
      </div>
      <p class="text-starlight/70 text-sm leading-relaxed">{steps[step].desc}</p>
    </div>
  </div>
</div>
