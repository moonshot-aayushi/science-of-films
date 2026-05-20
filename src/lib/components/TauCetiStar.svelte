<script lang="ts">
  type StarId = 'sun' | 'tau-ceti' | null;
  let selected: StarId = null;

  const comparisonRows = [
    { label: 'Temperature', sun: 5778, tau: 5344, max: 6500, unit: 'K', fmt: (v: number) => v.toLocaleString() + ' K' },
    { label: 'Luminosity',  sun: 1.0,  tau: 0.52, max: 1.2,  unit: 'L☉', fmt: (v: number) => v + ' L☉' },
    { label: 'Mass',        sun: 1.0,  tau: 0.78, max: 1.2,  unit: 'M☉', fmt: (v: number) => v + ' M☉' }
  ];

  const PLOT = { left: 55, top: 18, w: 420, h: 228 };
  const T_MIN = 3500, T_MAX = 10200;
  const LOG_L_MIN = Math.log10(0.04), LOG_L_MAX = Math.log10(100);

  function xPos(T: number) {
    return PLOT.left + (T_MAX - T) / (T_MAX - T_MIN) * PLOT.w;
  }
  function yPos(L: number) {
    return PLOT.top + (LOG_L_MAX - Math.log10(L)) / (LOG_L_MAX - LOG_L_MIN) * PLOT.h;
  }

  const stars = {
    sun: {
      name: 'Our Sun',
      type: 'G2V',
      T: 5778, L: 1.00, M: 1.00,
      age: '4.6 Gyr',
      metal: '1.0× Solar',
      color: '#FFE066',
      detail: 'The reference standard for solar-type stars. Its stable output over billions of years created the conditions for complex life. Its energy output is currently being siphoned by Astrophage.'
    },
    'tau-ceti': {
      name: 'Tau Ceti',
      type: 'G8.5V',
      T: 5344, L: 0.52, M: 0.78,
      age: '~5.8 Gyr',
      metal: '0.3× Solar',
      color: '#F5A623',
      detail: 'Older, cooler, and metal-poor compared to our Sun. Its low metallicity — 30% of solar — may be the key factor enabling Taumoeba to evolve there. Fewer heavy elements means different chemistry, different ecological niches, different predators for Astrophage.'
    }
  } as const;

  $: sunPos  = { x: xPos(stars.sun.T),          y: yPos(stars.sun.L) };
  $: tauPos  = { x: xPos(stars['tau-ceti'].T),   y: yPos(stars['tau-ceti'].L) };

  // Main sequence: (T, L) pairs spanning the plotted range
  const ms: [number, number][] = [
    [9800,55],[9200,30],[8600,16],[8000,8.5],[7500,5.5],[7000,3.4],
    [6700,2.4],[6300,1.7],[6000,1.25],[5778,1.0],[5344,0.52],
    [5000,0.3],[4700,0.19],[4400,0.13],[4000,0.08],[3700,0.055]
  ];
  $: msPath = ms.map(([T,L],i) => `${i===0?'M':'L'}${xPos(T).toFixed(1)},${yPos(L).toFixed(1)}`).join(' ');

  // Temp axis labels (K)
  const tempLabels = [9000, 7000, 5778, 5000, 4000];
  // Lum axis labels
  const lumLabels = [50, 5, 1, 0.2, 0.05];

  $: activeId = selected;
  $: activeStar = selected ? stars[selected] : null;
</script>

<div class="flex flex-col gap-6">
  <!-- HR Diagram -->
  <div class="bg-deep-space border border-white/8 rounded-xl overflow-hidden">
    <svg viewBox="0 0 530 280" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <defs>
        <filter id="starGlowSun">
          <feGaussianBlur stdDeviation="6" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="starGlowTau">
          <feGaussianBlur stdDeviation="5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <linearGradient id="msGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stop-color="#00D4FF" stop-opacity="0.2"/>
          <stop offset="40%"  stop-color="#FFE066" stop-opacity="0.15"/>
          <stop offset="70%"  stop-color="#F5A623" stop-opacity="0.12"/>
          <stop offset="100%" stop-color="#FF6B35" stop-opacity="0.08"/>
        </linearGradient>
      </defs>

      <rect width="530" height="280" fill="#050A14"/>

      <!-- Subtle grid -->
      {#each [1,2,3,4,5] as i}
        <line x1={PLOT.left} y1={PLOT.top + i * PLOT.h/5} x2={PLOT.left+PLOT.w} y2={PLOT.top + i * PLOT.h/5}
          stroke="#F5A62308" stroke-width="0.6"/>
        <line x1={PLOT.left + i * PLOT.w/5} y1={PLOT.top} x2={PLOT.left + i * PLOT.w/5} y2={PLOT.top+PLOT.h}
          stroke="#F5A62308" stroke-width="0.6"/>
      {/each}

      <!-- Main sequence band -->
      <path d={msPath} fill="none" stroke="url(#msGrad)" stroke-width="18" stroke-linecap="round" stroke-linejoin="round" opacity="0.7"/>
      <path d={msPath} fill="none" stroke="white" stroke-width="1" opacity="0.08"/>

      <!-- Temp axis labels -->
      {#each tempLabels as T}
        {@const x = xPos(T)}
        <line x1={x} y1={PLOT.top+PLOT.h} x2={x} y2={PLOT.top+PLOT.h+4} stroke="#E8EDF230" stroke-width="0.8"/>
        <text x={x} y={PLOT.top+PLOT.h+14} text-anchor="middle" font-size="8.5" font-family="mono" fill="#E8EDF240">{T >= 1000 ? (T/1000).toFixed(0)+'k' : T}</text>
      {/each}
      <text x={PLOT.left + PLOT.w/2} y={PLOT.top+PLOT.h+26} text-anchor="middle" font-size="8" font-family="Inter" fill="#E8EDF225">← hotter · Temperature (K) · cooler →</text>

      <!-- Lum axis labels -->
      {#each lumLabels as L}
        {@const y = yPos(L)}
        <line x1={PLOT.left-4} y1={y} x2={PLOT.left} y2={y} stroke="#E8EDF230" stroke-width="0.8"/>
        <text x={PLOT.left-8} y={y+3} text-anchor="end" font-size="8" font-family="mono" fill="#E8EDF240">{L}</text>
      {/each}
      <text x="12" y={PLOT.top+PLOT.h/2} text-anchor="middle" font-size="8" font-family="Inter" fill="#E8EDF225"
        transform="rotate(-90, 12, {PLOT.top+PLOT.h/2})">L☉</text>

      <!-- Axis border -->
      <rect x={PLOT.left} y={PLOT.top} width={PLOT.w} height={PLOT.h} fill="none" stroke="#E8EDF210" stroke-width="0.8"/>

      <!-- Spectral type labels -->
      {#each [['A',9000],['F',7000],['G',5900],['K',4900]] as [stype, stemp]}
        <text x={xPos(Number(stemp))} y={PLOT.top-5} text-anchor="middle" font-size="9" font-family="mono"
          fill="#E8EDF230">{stype}</text>
      {/each}

      <!-- Sun corona glow -->
      {#if selected === 'sun'}
        <circle cx={sunPos.x} cy={sunPos.y} r="22" fill="#FFE066" opacity="0.08" filter="url(#starGlowSun)"/>
      {/if}

      <!-- Sun -->
      <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
      <circle cx={sunPos.x} cy={sunPos.y} r={selected === 'sun' ? 10 : 8}
        fill={selected === 'sun' ? '#FFFDE0' : '#FFE066'}
        filter="url(#starGlowSun)"
        style="cursor:pointer; transition: r 0.2s"
        on:click={() => selected = selected === 'sun' ? null : 'sun'}/>
      <text x={sunPos.x+14} y={sunPos.y+4} font-size="9" font-family="Inter" fill="#FFE066" opacity="0.7" style="pointer-events:none">Sun</text>

      <!-- Tau Ceti glow -->
      {#if selected === 'tau-ceti'}
        <circle cx={tauPos.x} cy={tauPos.y} r="20" fill="#F5A623" opacity="0.1" filter="url(#starGlowTau)"/>
      {/if}

      <!-- Tau Ceti -->
      <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
      <circle cx={tauPos.x} cy={tauPos.y} r={selected === 'tau-ceti' ? 9 : 7}
        fill={selected === 'tau-ceti' ? '#FFD080' : '#F5A623'}
        filter="url(#starGlowTau)"
        style="cursor:pointer; transition: r 0.2s"
        on:click={() => selected = selected === 'tau-ceti' ? null : 'tau-ceti'}/>
      <!-- Connector line between the two stars -->
      <line x1={sunPos.x} y1={sunPos.y} x2={tauPos.x} y2={tauPos.y}
        stroke="#F5A623" stroke-width="0.6" stroke-dasharray="3 3" opacity="0.2"/>
      <text x={tauPos.x+12} y={tauPos.y+4} font-size="9" font-family="Inter" fill="#F5A623" opacity="0.7" style="pointer-events:none">Tau Ceti</text>

      <!-- "Main sequence" label -->
      <text x="95" y="48" font-size="8.5" font-family="Inter" fill="#E8EDF230" transform="rotate(-38,95,48)">Main Sequence</text>
      <text x="480" y="15" text-anchor="end" font-size="8" font-family="Inter" fill="#E8EDF220">Click a star to explore</text>
    </svg>
  </div>

  <!-- Star info panel -->
  {#if activeStar}
    <div class="bg-deep-space border border-astrophage/30 rounded-xl p-5 glow-amber-sm">
      <div class="flex items-start gap-4 mb-4">
        <div class="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center" style="background: {activeStar.color}22; border: 1px solid {activeStar.color}44;">
          <div class="w-5 h-5 rounded-full" style="background: {activeStar.color}; box-shadow: 0 0 12px {activeStar.color}80"></div>
        </div>
        <div>
          <h3 class="font-semibold text-starlight text-lg">{activeStar.name}</h3>
          <span class="text-xs font-mono px-2 py-0.5 rounded border" style="color:{activeStar.color}; border-color:{activeStar.color}40">{activeStar.type}</span>
        </div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
        {#each [
          ['Temperature', `${activeStar.T.toLocaleString()} K`],
          ['Luminosity', `${activeStar.L} L☉`],
          ['Mass', `${activeStar.M} M☉`],
          ['Age', activeStar.age],
          ['Metallicity', activeStar.metal]
        ] as [label, value]}
          <div class="bg-black/20 rounded-lg p-2.5 text-center">
            <p class="text-[10px] font-mono text-starlight/30 uppercase tracking-wider mb-0.5">{label}</p>
            <p class="text-sm font-semibold text-starlight/85">{value}</p>
          </div>
        {/each}
      </div>

      <p class="text-sm text-starlight/65 leading-relaxed">{activeStar.detail}</p>
    </div>
  {:else}
    <div class="bg-deep-space/40 border border-white/5 rounded-xl p-6 text-center">
      <p class="text-starlight/30 text-sm">Click a star on the diagram to see its properties</p>
    </div>
  {/if}

  <!-- Comparison bars -->
  <div class="bg-deep-space border border-white/8 rounded-xl p-5">
    <p class="text-xs font-mono text-starlight/30 uppercase tracking-wider mb-4">Side-by-side comparison</p>
    <div class="space-y-4">
      {#each comparisonRows as row}
        <div>
          <div class="flex justify-between text-xs font-mono text-starlight/35 mb-1.5">
            <span>{row.label}</span>
          </div>
          <div class="flex items-center gap-3 mb-1">
            <span class="text-xs text-[#FFE066]/60 w-16 text-right">Sun</span>
            <div class="flex-1 h-2 bg-white/8 rounded-full overflow-hidden">
              <div class="h-full rounded-full bg-[#FFE066]" style="width:{(row.sun/row.max)*100}%; opacity:0.7"></div>
            </div>
            <span class="text-xs font-mono text-starlight/50 w-20">{row.fmt(row.sun)}</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-xs text-astrophage/60 w-16 text-right">Tau Ceti</span>
            <div class="flex-1 h-2 bg-white/8 rounded-full overflow-hidden">
              <div class="h-full rounded-full bg-astrophage" style="width:{(row.tau/row.max)*100}%; opacity:0.7"></div>
            </div>
            <span class="text-xs font-mono text-starlight/50 w-20">{row.fmt(row.tau)}</span>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
