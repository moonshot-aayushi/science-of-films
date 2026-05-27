<script lang="ts">
  // Wave height bars (in meters)
  const waves = [
    { label: "Miller's Waves",   height: 1200, color: '#F5A623', note: 'Tidal forces from Gargantua' },
    { label: 'Lituya Bay 1958',  height: 524,  color: '#00D4FF', note: 'Largest recorded on Earth' },
    { label: 'Tōhoku 2011',      height: 40,   color: '#60A0C0', note: 'Deadliest modern tsunami' },
    { label: 'Bay of Fundy',     height: 17,   color: '#4080A0', note: 'Largest tidal range on Earth' },
    { label: 'Storm surge',      height: 9,    color: '#305070', note: 'Hurricane Katrina, 2005' }
  ];

  const maxH = 1200;

  let activeWave: number | null = null;

  // Tidal force slider: distance from Gargantua in units of Miller's orbital radius
  let distMultiple = 1.0; // 1 = Miller's orbit, 5 = far
  // Tidal force scales as 1/r³ relative to Miller's
  $: tidalFactor = 1 / Math.pow(distMultiple, 3);
  $: waveHeightAtDist = Math.round(1200 * tidalFactor);
</script>

<div class="flex flex-col gap-5">
  <!-- Wave height comparison -->
  <div class="bg-deep-space border border-white/8 rounded-xl p-5">
    <p class="text-[10px] font-mono text-starlight/30 uppercase tracking-wider mb-4">Wave Height Comparison</p>
    <div class="space-y-3">
      {#each waves as w, i}
        <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
        <div class="cursor-pointer" on:click={() => activeWave = activeWave === i ? null : i}>
          <div class="flex items-center gap-3 mb-1">
            <span class="text-xs font-mono w-32 flex-shrink-0"
              style="color: {w.color}; opacity: {activeWave === null || activeWave === i ? 1 : 0.4}">
              {w.label}
            </span>
            <div class="flex-1 h-5 bg-white/5 rounded-full overflow-hidden">
              <div class="h-full rounded-full transition-all duration-300"
                style="width: {(w.height / maxH) * 100}%;
                       background: {w.color};
                       opacity: {activeWave === null || activeWave === i ? 0.8 : 0.2}">
              </div>
            </div>
            <span class="text-xs font-mono text-starlight/50 w-16 text-right">{w.height >= 1000 ? (w.height/1000).toFixed(1)+'km' : w.height+'m'}</span>
          </div>
          {#if activeWave === i}
            <p class="text-xs text-starlight/45 ml-36 mb-1">{w.note}</p>
          {/if}
        </div>
      {/each}
    </div>
  </div>

  <!-- Tidal force diagram -->
  <div class="bg-deep-space border border-white/8 rounded-xl overflow-hidden">
    <div class="px-5 pt-5 pb-3">
      <p class="text-[10px] font-mono text-starlight/30 uppercase tracking-wider mb-1">Tidal Force Diagram</p>
      <p class="text-xs text-starlight/40">Gravity is stronger on the near side of the planet than the far side. This differential stretches the planet along the line toward Gargantua.</p>
    </div>
    <svg viewBox="0 0 480 160" class="w-full">
      <rect width="480" height="160" fill="#050A14"/>

      <!-- Gargantua (left) -->
      <circle cx="60" cy="80" r="42" fill="#050A14" stroke="#F5A623" stroke-width="1.5" opacity="0.7"/>
      <circle cx="60" cy="80" r="30" fill="#050A14" stroke="#FFD080" stroke-width="1" opacity="0.4"/>
      <circle cx="60" cy="80" r="16" fill="#1a0a00" stroke="#F5A623" stroke-width="0.8" opacity="0.6"/>
      <text x="60" y="84" text-anchor="middle" font-size="8" font-family="Inter" fill="#F5A62370">Gargantua</text>

      <!-- Miller's planet (right) -->
      <circle cx="330" cy="80" r="28" fill="#0a1428" stroke="#00D4FF" stroke-width="1.2" opacity="0.7"/>
      <!-- Ocean surface -->
      <ellipse cx="330" cy="58" rx="27" ry="8" fill="#00D4FF" opacity="0.15"/>

      <!-- Tidal force arrows (pointing toward and away from Gargantua) -->
      <!-- Near side (left of planet) — strongest pull toward Gargantua -->
      <line x1="303" y1="80" x2="272" y2="80" stroke="#F5A623" stroke-width="2"/>
      <polygon points="272,80 280,76 280,84" fill="#F5A623"/>
      <!-- Far side (right of planet) — weakest pull, net away from Gargantua -->
      <line x1="357" y1="80" x2="390" y2="80" stroke="#F5A623" stroke-width="1.2" opacity="0.6"/>
      <polygon points="390,80 382,76.5 382,83.5" fill="#F5A623" opacity="0.6"/>
      <!-- Top/bottom squeeze -->
      <line x1="330" y1="51" x2="330" y2="40" stroke="#00D4FF" stroke-width="1" opacity="0.4"/>
      <polygon points="330,40 326.5,48 333.5,48" fill="#00D4FF" opacity="0.4"/>
      <line x1="330" y1="109" x2="330" y2="120" stroke="#00D4FF" stroke-width="1" opacity="0.4"/>
      <polygon points="330,120 326.5,112 333.5,112" fill="#00D4FF" opacity="0.4"/>

      <!-- Gravity strength labels -->
      <text x="280" y="72" text-anchor="middle" font-size="8" font-family="mono" fill="#F5A62370">stronger</text>
      <text x="384" y="72" text-anchor="middle" font-size="8" font-family="mono" fill="#F5A62340">weaker</text>

      <!-- Orbital line -->
      <line x1="102" y1="80" x2="302" y2="80" stroke="#E8EDF210" stroke-width="0.8" stroke-dasharray="6 4"/>
      <text x="200" y="74" text-anchor="middle" font-size="8" font-family="mono" fill="#E8EDF218">orbital radius</text>

      <!-- Wave on planet -->
      <path d="M 305,55 Q 315,38 330,35 Q 345,38 355,55" fill="none" stroke="#F5A623" stroke-width="1.5" opacity="0.6"/>
      <text x="330" y="30" text-anchor="middle" font-size="8" font-family="mono" fill="#F5A62370">wave</text>
    </svg>
  </div>

  <!-- Distance slider -->
  <div class="bg-deep-space border border-white/8 rounded-xl p-5">
    <div class="flex justify-between items-center mb-3">
      <p class="text-[10px] font-mono text-starlight/30 uppercase tracking-wider">Distance from Gargantua</p>
      <span class="text-xs font-mono text-astrophage/70">{distMultiple.toFixed(1)}× Miller's orbit</span>
    </div>
    <input type="range" min="1" max="5" step="0.05" bind:value={distMultiple} class="w-full accent-astrophage mb-4"/>
    <div class="flex justify-between text-xs font-mono text-starlight/30">
      <span>Miller's orbit</span>
      <span>5× further</span>
    </div>
    <div class="mt-4 flex items-center gap-3">
      <div class="flex-1 bg-black/20 rounded-lg p-3 text-center border border-white/6">
        <p class="text-[10px] font-mono text-starlight/30 mb-1">Tidal Force</p>
        <p class="text-lg font-bold text-astrophage">{(tidalFactor * 100).toFixed(2)}%</p>
        <p class="text-xs text-starlight/30">of Miller's</p>
      </div>
      <div class="flex-1 bg-black/20 rounded-lg p-3 text-center border border-white/6">
        <p class="text-[10px] font-mono text-starlight/30 mb-1">Wave Height</p>
        <p class="text-lg font-bold text-astrophage">
          {waveHeightAtDist >= 1000 ? (waveHeightAtDist/1000).toFixed(2)+'km' : waveHeightAtDist+'m'}
        </p>
        <p class="text-xs text-starlight/30">estimated</p>
      </div>
      <div class="flex-1 bg-black/20 rounded-lg p-3 text-center border border-white/6">
        <p class="text-[10px] font-mono text-starlight/30 mb-1">Force Law</p>
        <p class="text-lg font-bold text-sci-cyan">1/r³</p>
        <p class="text-xs text-starlight/30">falls fast</p>
      </div>
    </div>
  </div>

  <!-- The tidal force note -->
  <div class="bg-deep-space border border-white/8 rounded-xl p-5">
    <p class="text-[10px] font-mono text-starlight/30 uppercase tracking-wider mb-2">Why the Waves Are So Fast</p>
    <p class="text-sm text-starlight/60 leading-relaxed">
      Miller's planet is tidally locked: the same face always points toward Gargantua. The enormous waves aren't caused by orbital motion. They're stationary bulges held in place by the tidal force. The planet's own orbital motion means the crew's ship moves <em>through</em> the wave, not that the wave moves toward them. Kip Thorne calculated the waves at roughly 1.2 km tall.
    </p>
  </div>
</div>
