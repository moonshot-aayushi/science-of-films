<script lang="ts">
  // Proximity: 0 = far from Gargantua, 100 = Miller's planet
  let proximity = 0;

  // Dilation factor scales exponentially: 1.0 → 61,320
  $: dilationFactor = Math.pow(10, (proximity / 100) * Math.log10(61320));

  // Earth time per 1 local hour
  $: earthHoursPerLocalHour = dilationFactor;

  function formatTime(hrs: number): { value: string; unit: string } {
    if (hrs < 1.1) return { value: hrs.toFixed(3), unit: 'hrs' };
    if (hrs < 48)  return { value: hrs.toFixed(1),  unit: 'hrs' };
    if (hrs < 8760) return { value: (hrs / 24).toFixed(1), unit: 'days' };
    return { value: (hrs / 8760).toFixed(2), unit: 'yrs' };
  }

  $: earthTime = formatTime(earthHoursPerLocalHour);

  // Reference locations
  const refs = [
    { label: 'Deep Space',     prox: 0,   note: 'No dilation' },
    { label: 'Near Saturn',    prox: 18,  note: 'Wormhole location' },
    { label: 'Endurance Orbit',prox: 52,  note: "Cooper's ship" },
    { label: "Miller's Planet",prox: 100, note: '1 hr = 7 yrs' }
  ];

  // Bar width for visualization (capped for display)
  $: barFraction = Math.min(dilationFactor / 61320, 1);
</script>

<div class="flex flex-col gap-5">
  <!-- Dual clock display -->
  <div class="grid grid-cols-2 gap-3">
    <div class="bg-deep-space border border-white/8 rounded-xl p-5 text-center">
      <p class="text-[10px] font-mono text-starlight/30 uppercase tracking-wider mb-3">Your Time</p>
      <div class="font-mono text-3xl font-bold text-starlight mb-1">1:00:00</div>
      <p class="text-xs text-starlight/40">1 hour passes locally</p>
    </div>
    <div class="bg-deep-space border rounded-xl p-5 text-center transition-colors"
      style="border-color: {proximity > 60 ? '#F5A623' : '#ffffff'}18">
      <p class="text-[10px] font-mono text-starlight/30 uppercase tracking-wider mb-3">Earth's Time</p>
      <div class="font-mono text-3xl font-bold transition-colors"
        style="color: {proximity > 80 ? '#F5A623' : proximity > 40 ? '#FFD080' : '#E8EDF2'}">
        {earthTime.value}
      </div>
      <p class="text-xs text-starlight/40">{earthTime.unit} pass on Earth</p>
    </div>
  </div>

  <!-- Visual time bar comparison -->
  <div class="bg-deep-space border border-white/8 rounded-xl p-5">
    <p class="text-[10px] font-mono text-starlight/30 uppercase tracking-wider mb-3">Time passing per local hour</p>
    <div class="space-y-3">
      <div class="flex items-center gap-3">
        <span class="text-xs text-starlight/40 w-20 text-right font-mono">Local</span>
        <div class="flex-1 h-3 bg-white/5 rounded-full overflow-hidden">
          <div class="h-full bg-sci-cyan rounded-full" style="width: 100%; opacity: 0.7"></div>
        </div>
        <span class="text-xs font-mono text-starlight/50 w-20">1 hour</span>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-xs text-starlight/40 w-20 text-right font-mono">Earth</span>
        <div class="flex-1 h-3 bg-white/5 rounded-full overflow-hidden">
          <div class="h-full rounded-full transition-all duration-200"
            style="width: {Math.max(barFraction * 100, 0.3)}%;
                   background: {proximity > 70 ? '#F5A623' : '#FFD080'};
                   opacity: 0.8"></div>
        </div>
        <span class="text-xs font-mono w-20 transition-colors"
          style="color: {proximity > 70 ? '#F5A623' : '#E8EDF280'}">
          {earthTime.value} {earthTime.unit}
        </span>
      </div>
    </div>
  </div>

  <!-- Slider -->
  <div class="bg-deep-space border border-white/8 rounded-xl p-5">
    <div class="flex justify-between items-center mb-4">
      <p class="text-[10px] font-mono text-starlight/30 uppercase tracking-wider">Proximity to Gargantua</p>
      <span class="text-xs font-mono text-astrophage/70 border border-astrophage/25 rounded-full px-2 py-0.5">
        ×{dilationFactor >= 1000 ? (dilationFactor/1000).toFixed(1)+'k' : dilationFactor.toFixed(1)} dilation
      </span>
    </div>

    <input type="range" min="0" max="100" step="0.5" bind:value={proximity}
      class="w-full accent-astrophage mb-4"/>

    <!-- Reference markers -->
    <div class="relative h-5">
      {#each refs as ref}
        <button
          on:click={() => proximity = ref.prox}
          class="absolute -translate-x-1/2 flex flex-col items-center gap-0.5"
          style="left: {ref.prox}%">
          <div class="w-px h-2 bg-white/20"></div>
          <span class="text-[9px] font-mono text-starlight/30 whitespace-nowrap">{ref.label}</span>
        </button>
      {/each}
    </div>
  </div>

  <!-- Physics explanation -->
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
    <div class="bg-deep-space border border-white/8 rounded-xl p-4">
      <p class="text-[10px] font-mono text-starlight/30 uppercase tracking-wider mb-2">Schwarzschild Formula</p>
      <p class="font-mono text-sm text-sci-cyan mb-2">Δt∞ / Δtlocal = 1 / √(1 − rₛ/r)</p>
      <p class="text-xs text-starlight/50 leading-relaxed">
        Time flows slower closer to a massive object. At the event horizon (r = rₛ), time stops entirely from a distant observer's perspective.
      </p>
    </div>
    <div class="bg-deep-space border border-white/8 rounded-xl p-4">
      <p class="text-[10px] font-mono text-starlight/30 uppercase tracking-wider mb-2">Why Miller's Planet Works</p>
      <p class="text-xs text-starlight/50 leading-relaxed">
        The 61,320:1 dilation requires a near-extremal <em>Kerr</em> black hole (spin parameter a ≈ 1). Gargantua's rapid spin allows stable prograde orbits far closer to the event horizon than Schwarzschild geometry permits — making Miller's planet physically possible.
      </p>
    </div>
  </div>

  {#if proximity >= 95}
    <div class="bg-astrophage/8 border border-astrophage/30 rounded-xl p-4">
      <p class="text-sm text-astrophage/90 leading-relaxed">
        <strong>Miller's Planet:</strong> Every hour here, 7 years pass on Earth. Cooper's children age decades while he experiences hours. This is not science fiction — it is a direct consequence of Einstein's general relativity.
      </p>
    </div>
  {/if}
</div>
