<script lang="ts">
  let activeExp = 0;

  const evolXScale = (g: number) => 40 + (g / 500) * 400;
  const evolYScale = (t: number) => 130 - ((t - 40) / 120) * 100;

  const experiments = [
    {
      id: 'exp-01',
      label: 'Confirmation',
      shortLabel: 'Exp 01',
      title: 'Is It Alive?',
      date: 'Day 3 — Initial Isolation',
      hypothesis: 'The dimming substance is organic and self-replicating, not a chemical deposit.',
      method: 'Isolated a 1 mg sample from Petrova-line rock scrapings. Placed under modified phase-contrast microscope. Observed at 3-hour intervals across 24 hours.',
      finding: 'The sample doubled in mass within 6 hours under 585 nm light exposure. Cell division confirmed at 40× magnification. It is alive.',
      significance: 'Confirms the solar dimming is biological in origin — not a dust cloud, comet, or chemical film. The threat is an organism.',
      notebook: [
        { time: '00:00', note: 'Sample mass: 1.000 mg. No visible activity.' },
        { time: '03:00', note: 'Slight turbidity under 585nm lamp. Mass: 1.021 mg.' },
        { time: '06:00', note: 'Clear doubling pattern. Mass: 2.017 mg. Division confirmed.' },
        { time: '24:00', note: 'Exponential growth arrested at 8.2 mg — resource-limited.' }
      ],
      svg: 'division'
    },
    {
      id: 'exp-02',
      label: 'Petrova Peak',
      shortLabel: 'Exp 02',
      title: 'Finding 585 nm',
      date: 'Day 7 — Spectral Analysis',
      hypothesis: 'Astrophage metabolizes photons at a specific wavelength, which should correspond to the spectral line missing from dimmed stars.',
      method: 'Exposed isolated colonies to a swept monochromatic light source, 400–750 nm, in 1 nm increments. Measured mass gain at each wavelength after 30 minutes.',
      finding: 'A sharp absorption peak at exactly 585.5 nm. Growth rate 12× higher at this wavelength than any other tested. Below 560 nm and above 610 nm: essentially inert.',
      significance: 'The 585 nm "Petrova line" — named for Irina Petrova who first noticed the dimming — is the direct signature of Astrophage feeding. It is how we detect them from Earth.',
      notebook: [
        { time: '400–560 nm', note: 'Negligible mass gain (< 0.3 mg/hr). No resonance.' },
        { time: '570–582 nm', note: 'Rising growth curve. Approaching resonance.' },
        { time: '585 nm', note: 'PEAK. 6.1 mg/hr mass gain. Bright orange absorption.' },
        { time: '610–750 nm', note: 'Rapid fall-off. Confirmed single resonant frequency.' }
      ],
      svg: 'spectrum'
    },
    {
      id: 'exp-03',
      label: 'Mass-Energy',
      shortLabel: 'Exp 03',
      title: 'One Petajoule Per Gram',
      date: 'Day 12 — Calorimetry',
      hypothesis: 'If Astrophage can accelerate a ship to 0.92c, the energy density must far exceed chemical reactions and even fission.',
      method: 'Destroyed a precisely-weighed 1 mg sample using high-voltage discharge in a calorimetric chamber. Measured total energy release. Repeated 12 times for statistical validity.',
      finding: '1 mg of Astrophage releases exactly 1 petajoule (10¹⁵ J) upon destruction. This is ~170× the Hiroshima bomb per gram. Approximately E = mc² efficiency (matter-antimatter equivalent).',
      significance: 'Resolves the "impossible rocket" problem. At 1 PJ/mg, carrying fuel for a 12 light-year journey is physically achievable. The Hail Mary can be built.',
      notebook: [
        { time: 'Trial 1', note: '1.001 mg → 9.98 × 10¹² J. Within margin.' },
        { time: 'Trials 2–6', note: 'Mean: 1.002 × 10¹⁵ J/mg. σ = 0.003.' },
        { time: 'Trials 7–12', note: 'Confirmed. E/m ratio: 1.000 × 10¹⁸ J/kg = c².' },
        { time: 'Conclusion', note: 'Energy density matches matter-antimatter annihilation.' }
      ],
      svg: 'energy'
    },
    {
      id: 'exp-04',
      label: 'Taumoeba',
      shortLabel: 'Exp 04',
      title: 'The Predator Discovery',
      date: 'Day 41 — Tau Ceti e Sample',
      hypothesis: 'If Tau Ceti is dimming less than expected, something at that star may be consuming or killing Astrophage.',
      method: 'Rocky provided atmospheric gas samples collected near Tau Ceti e during its survey missions. Grace cultured Astrophage colonies, then introduced Tau Ceti e atmospheric extract.',
      finding: 'Astrophage colonies died within 4 hours of contact with the Tau Ceti e sample. Microscopy revealed a second microorganism — smaller, faster-dividing — actively lysing Astrophage cells. Named: Taumoeba.',
      significance: 'The solution to Earth\'s extinction exists in biology, not engineering. A predator-prey relationship already established at Tau Ceti can be exported back to our solar system.',
      notebook: [
        { time: '00:00', note: 'Healthy Astrophage colony introduced to Tau Ceti e extract.' },
        { time: '01:00', note: 'Unusual clearing pattern forming at extract interface.' },
        { time: '02:30', note: 'Visible die-off. Second organism at 400× — it\'s eating them.' },
        { time: '04:00', note: 'Colony 98% dead. Taumoeba thriving. This is the answer.' }
      ],
      svg: 'predator'
    },
    {
      id: 'exp-05',
      label: 'Evolution',
      shortLabel: 'Exp 05',
      title: 'Breeding for Temperature',
      date: 'Days 52–71 — Directed Evolution',
      hypothesis: 'Taumoeba evolved at Tau Ceti e (circa 40°C) but must survive at 150°C+ to thrive near Earth\'s sun. Directed selection can achieve this in accelerated lab generations.',
      method: 'Cultured Taumoeba across generations while gradually raising temperature 1°C per generation. Selected only the survivors at each step to continue the line. Used Rocky\'s DNA synthesis equipment to accelerate mutation rate.',
      finding: 'After 500 generations over 19 days, a heat-tolerant strain survived at 152°C — above the minimum threshold needed to survive in Earth\'s solar corona. Mission-viable.',
      significance: 'Proves that a biologically engineered solution is deliverable within the mission timeline. Grace doesn\'t bring technology home — he brings life.',
      notebook: [
        { time: 'Gen 1–100', note: '40°C → 80°C. Normal selection pressure, ~30% survival.' },
        { time: 'Gen 100–300', note: '80°C → 120°C. Added chemical mutagens. 12% survival/gen.' },
        { time: 'Gen 300–450', note: '120°C → 145°C. Critical phase — 6 total colony extinctions.' },
        { time: 'Gen 500', note: '152°C survival confirmed. Heat-shock proteins radically upregulated.' }
      ],
      svg: 'evolution'
    }
  ];

  $: exp = experiments[activeExp];
</script>

<div class="flex flex-col gap-5">
  <!-- Experiment tabs -->
  <div class="flex gap-1.5 flex-wrap">
    {#each experiments as e, i}
      <button on:click={() => activeExp = i}
        class="px-3 py-1.5 rounded-full text-xs font-mono transition-all border
          {activeExp === i
            ? 'bg-astrophage/15 text-astrophage border-astrophage/40'
            : 'text-starlight/40 border-white/10 hover:border-white/20 hover:text-starlight/60'}">
        {e.shortLabel}
      </button>
    {/each}
  </div>

  <!-- Experiment header -->
  <div class="bg-deep-space border border-white/8 rounded-xl p-5">
    <div class="flex items-start justify-between flex-wrap gap-2 mb-3">
      <div>
        <p class="text-[10px] font-mono text-astrophage/60 uppercase tracking-widest mb-1">{exp.date}</p>
        <h3 class="text-xl font-bold text-starlight">{exp.title}</h3>
      </div>
      <span class="text-xs font-mono px-2 py-1 rounded border border-astrophage/25 text-astrophage/70">{exp.id.toUpperCase()}</span>
    </div>

    <!-- SVG visualization -->
    <div class="my-4 rounded-lg bg-black/20 border border-white/5 overflow-hidden">
      {#if exp.svg === 'division'}
        <!-- Cell division animation -->
        <svg viewBox="0 0 480 160" class="w-full">
          <rect width="480" height="160" fill="#050A14"/>
          <!-- Time labels -->
          {#each [['0h', 80], ['6h', 240], ['24h', 400]] as [t, x]}
            <text x={x} y="148" text-anchor="middle" font-size="9" font-family="mono" fill="#E8EDF235">{t}</text>
          {/each}
          <!-- t=0: single cell -->
          <circle cx="80" cy="75" r="18" fill="none" stroke="#F5A623" stroke-width="1.5" opacity="0.7"/>
          <circle cx="80" cy="75" r="6" fill="#F5A623" opacity="0.4"/>
          <text x="80" y="105" text-anchor="middle" font-size="8" font-family="mono" fill="#E8EDF230">1 mg</text>
          <!-- t=6h: two cells -->
          <circle cx="226" cy="75" r="18" fill="none" stroke="#F5A623" stroke-width="1.5" opacity="0.7"/>
          <circle cx="226" cy="75" r="6" fill="#F5A623" opacity="0.4"/>
          <circle cx="254" cy="75" r="18" fill="none" stroke="#F5A623" stroke-width="1.5" opacity="0.7"/>
          <circle cx="254" cy="75" r="6" fill="#F5A623" opacity="0.4"/>
          <line x1="226" y1="75" x2="254" y2="75" stroke="#F5A623" stroke-width="0.8" stroke-dasharray="3 2" opacity="0.3"/>
          <text x="240" y="105" text-anchor="middle" font-size="8" font-family="mono" fill="#E8EDF230">2 mg</text>
          <!-- t=24h: cluster -->
          {#each [[385,65],[400,58],[415,65],[408,78],[393,78]] as [cx,cy]}
            <circle {cx} {cy} r="14" fill="none" stroke="#F5A623" stroke-width="1.2" opacity="0.6"/>
            <circle {cx} {cy} r="5" fill="#F5A623" opacity="0.3"/>
          {/each}
          <text x="400" y="105" text-anchor="middle" font-size="8" font-family="mono" fill="#E8EDF230">8.2 mg</text>
          <!-- Arrows -->
          {#each [[120,75,180,75],[290,75,355,75]] as [x1,y1,x2,y2]}
            <line {x1} {y1} {x2} {y2} stroke="#E8EDF215" stroke-width="1" stroke-dasharray="4 3"/>
            <polygon points="{x2},{y2} {x2-6},{y2-3} {x2-6},{y2+3}" fill="#E8EDF215"/>
          {/each}
          <text x="240" y="20" text-anchor="middle" font-size="10" font-family="Inter" fill="#F5A62380">Exponential growth confirmed under 585 nm light</text>
        </svg>

      {:else if exp.svg === 'spectrum'}
        {@const peakX = 40 + ((585.5 - 400) / 320) * 400}
        <!-- Absorption spectrum -->
        <svg viewBox="0 0 480 160" class="w-full">
          <rect width="480" height="160" fill="#050A14"/>
          <!-- Spectrum gradient bar -->
          <defs>
            <linearGradient id="specGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#8B00FF"/>
              <stop offset="22%" stop-color="#0000FF"/>
              <stop offset="38%" stop-color="#00BFFF"/>
              <stop offset="50%" stop-color="#00FF00"/>
              <stop offset="63%" stop-color="#FFFF00"/>
              <stop offset="72%" stop-color="#FF8C00"/>
              <stop offset="85%" stop-color="#FF2200"/>
              <stop offset="100%" stop-color="#8B0000"/>
            </linearGradient>
          </defs>
          <rect x="40" y="120" width="400" height="14" rx="2" fill="url(#specGrad)" opacity="0.5"/>
          <!-- Wavelength labels -->
          {#each [[400,'400nm'],[480,'480nm'],[560,'560nm'],[640,'640nm'],[720,'720nm']] as [nm, label]}
            {@const x = 40 + ((Number(nm) - 400) / 320) * 400}
            <line x1={x} y1="120" x2={x} y2="135" stroke="#E8EDF220" stroke-width="0.8"/>
            <text x={x} y="148" text-anchor="middle" font-size="8" font-family="mono" fill="#E8EDF230">{label}</text>
          {/each}
          <!-- Absorption curve -->
          <path d="M40,110 Q{peakX - 60},108 {peakX - 25},90 Q{peakX},20 {peakX + 25},90 Q{peakX + 60},108 440,110"
            fill="none" stroke="#F5A623" stroke-width="2" opacity="0.8"/>
          <!-- Peak marker -->
          <line x1={peakX} y1="20" x2={peakX} y2="118" stroke="#F5A623" stroke-width="1" stroke-dasharray="4 3" opacity="0.6"/>
          <circle cx={peakX} cy="20" r="4" fill="#F5A623" opacity="0.9"/>
          <text x={peakX} y="14" text-anchor="middle" font-size="9" font-family="mono" fill="#F5A623">585 nm</text>
          <text x="240" y="80" text-anchor="middle" font-size="8.5" font-family="Inter" fill="#E8EDF230" opacity="0.5">Growth rate (mg/hr)</text>
        </svg>

      {:else if exp.svg === 'energy'}
        {@const energyItems = [
          { label: 'TNT 1g', joules: 4184, color: '#6B7280' },
          { label: 'Fission 1g', joules: 8.2e10, color: '#60A5FA' },
          { label: 'Astrophage 1g', joules: 1e15, color: '#F5A623' }
        ]}
        {@const maxLog = 15}
        <!-- Energy comparison bars -->
        <svg viewBox="0 0 480 160" class="w-full">
          <rect width="480" height="160" fill="#050A14"/>
          {#each energyItems as item, i}
            {@const barW = (Math.log10(item.joules) / maxLog) * 360}
            {@const y = 30 + i * 42}
            <text x="8" y={y + 14} font-size="9" font-family="mono" fill="#E8EDF245" text-anchor="start">{item.label}</text>
            <rect x="110" y={y} width={barW} height="20" rx="3" fill={item.color} opacity={i === 2 ? 0.8 : 0.35}/>
            <text x={110 + barW + 6} y={y + 14} font-size="8.5" font-family="mono" fill={item.color} opacity="0.8">
              {item.joules >= 1e12 ? (item.joules / 1e15).toFixed(0) + ' PJ' : item.joules >= 1e9 ? (item.joules / 1e9).toFixed(0) + ' GJ' : item.joules + ' J'}
            </text>
          {/each}
          <text x="240" y="148" text-anchor="middle" font-size="8" font-family="Inter" fill="#E8EDF220">Log scale — each step is 10×</text>
        </svg>

      {:else if exp.svg === 'predator'}
        <!-- Predator-prey -->
        <svg viewBox="0 0 480 160" class="w-full">
          <rect width="480" height="160" fill="#050A14"/>
          <!-- Astrophage (amber) colony being attacked -->
          {#each [[120,55],[140,70],[105,75],[130,90],[155,60],[110,92]] as [cx,cy]}
            <circle {cx} {cy} r="12" fill="none" stroke="#F5A623" stroke-width="1" opacity="0.5"/>
            <circle {cx} {cy} r="4" fill="#F5A623" opacity="0.25"/>
          {/each}
          <!-- Taumoeba (cyan) -->
          {#each [[200,65],[220,78],[240,62],[260,80],[280,68]] as [cx,cy]}
            <circle {cx} {cy} r="7" fill="#00D4FF" opacity="0.6"/>
            <circle {cx} {cy} r="3" fill="#00D4FF" opacity="0.4"/>
          {/each}
          <!-- Attack arrows -->
          {#each [[195,68,168,72],[215,74,148,82],[238,65,160,64]] as [x1,y1,x2,y2]}
            <line {x1} {y1} {x2} {y2} stroke="#00D4FF" stroke-width="1" stroke-dasharray="3 2" opacity="0.4"/>
            <polygon points="{x2},{y2} {x2+6*(x1>x2?-1:1)},{y2-3} {x2+6*(x1>x2?-1:1)},{y2+3}" fill="#00D4FF" opacity="0.4"/>
          {/each}
          <!-- Dead Astrophage (right) -->
          {#each [[340,60],[365,75],[345,85],[370,58]] as [cx,cy]}
            <circle {cx} {cy} r="10" fill="none" stroke="#F5A62330" stroke-width="0.8" stroke-dasharray="2 2"/>
          {/each}
          <text x="120" y="125" text-anchor="middle" font-size="9" font-family="Inter" fill="#F5A62360">Astrophage colony</text>
          <text x="245" y="115" text-anchor="middle" font-size="9" font-family="Inter" fill="#00D4FF80">Taumoeba</text>
          <text x="355" y="115" text-anchor="middle" font-size="9" font-family="Inter" fill="#E8EDF225">Dead cells</text>
          <text x="240" y="148" text-anchor="middle" font-size="8" font-family="Inter" fill="#E8EDF220">Taumoeba lysing Astrophage cells — 4 hrs post-contact</text>
        </svg>

      {:else if exp.svg === 'evolution'}
        {@const evolPts = [[0,40],[100,70],[200,100],[300,130],[400,145],[500,152]]}
        {@const evolThreshY = evolYScale(150)}
        {@const evolPathD = evolPts.map(([g,t],i) => `${i===0?'M':'L'}${evolXScale(g).toFixed(1)},${evolYScale(t).toFixed(1)}`).join(' ')}
        <!-- Temperature evolution chart -->
        <svg viewBox="0 0 480 160" class="w-full">
          <rect width="480" height="160" fill="#050A14"/>
          <!-- Grid -->
          {#each [40,80,120,152] as temp}
            {@const y = evolYScale(temp)}
            <line x1="40" y1={y} x2="440" y2={y} stroke="#E8EDF208" stroke-width="0.6"/>
            <text x="36" y={y + 3} text-anchor="end" font-size="7.5" font-family="mono" fill="#E8EDF230">{temp}°C</text>
          {/each}
          <!-- X axis labels -->
          {#each [0, 100, 200, 300, 400, 500] as gen}
            <text x={evolXScale(gen)} y="148" text-anchor="middle" font-size="7.5" font-family="mono" fill="#E8EDF230">Gen {gen}</text>
          {/each}
          <!-- Mission threshold line -->
          <line x1="40" y1={evolThreshY} x2="440" y2={evolThreshY} stroke="#F5A623" stroke-width="1" stroke-dasharray="5 3" opacity="0.4"/>
          <text x="442" y={evolThreshY + 3} font-size="8" font-family="mono" fill="#F5A62360">150°C</text>
          <!-- Evolution curve -->
          <path d={evolPathD} fill="none" stroke="#00D4FF" stroke-width="2" opacity="0.8"/>
          <!-- Data points -->
          {#each evolPts as [g,t]}
            <circle cx={evolXScale(g)} cy={evolYScale(t)} r="3.5" fill="#00D4FF" opacity="0.9"/>
          {/each}
          <text x="240" y="20" text-anchor="middle" font-size="9" font-family="Inter" fill="#E8EDF235">Taumoeba heat tolerance across 500 directed evolution generations</text>
        </svg>
      {/if}
    </div>

    <!-- Hypothesis / Method / Finding -->
    <div class="space-y-3">
      <div>
        <p class="text-[10px] font-mono text-starlight/30 uppercase tracking-wider mb-1">Hypothesis</p>
        <p class="text-sm text-starlight/65 leading-relaxed">{exp.hypothesis}</p>
      </div>
      <div>
        <p class="text-[10px] font-mono text-starlight/30 uppercase tracking-wider mb-1">Method</p>
        <p class="text-sm text-starlight/65 leading-relaxed">{exp.method}</p>
      </div>
      <div class="bg-astrophage/5 border border-astrophage/20 rounded-lg p-3">
        <p class="text-[10px] font-mono text-astrophage/60 uppercase tracking-wider mb-1">Finding</p>
        <p class="text-sm text-starlight/80 leading-relaxed font-medium">{exp.finding}</p>
      </div>
    </div>
  </div>

  <!-- Lab notebook -->
  <div class="bg-deep-space border border-white/8 rounded-xl overflow-hidden">
    <div class="px-5 py-3 border-b border-white/5 flex items-center gap-2">
      <span class="text-[10px] font-mono text-starlight/30 uppercase tracking-widest">Lab Notebook</span>
      <span class="text-[10px] font-mono text-starlight/15">— Grace's raw observations</span>
    </div>
    <div class="divide-y divide-white/4">
      {#each exp.notebook as entry}
        <div class="flex gap-4 px-5 py-3">
          <span class="text-xs font-mono text-astrophage/50 flex-shrink-0 w-28">{entry.time}</span>
          <p class="text-xs text-starlight/55 leading-relaxed">{entry.note}</p>
        </div>
      {/each}
    </div>
  </div>

  <!-- Significance -->
  <div class="bg-deep-space border border-astrophage/15 rounded-xl p-5">
    <p class="text-[10px] font-mono text-starlight/30 uppercase tracking-wider mb-2">Why It Matters</p>
    <p class="text-sm text-starlight/65 leading-relaxed">{exp.significance}</p>
  </div>

  <!-- Progress indicator -->
  <div class="flex items-center gap-2">
    {#each experiments as _, i}
      <button on:click={() => activeExp = i}
        class="h-1 rounded-full transition-all duration-300 {activeExp === i ? 'bg-astrophage w-8' : 'bg-white/15 w-4 hover:bg-white/25'}">
      </button>
    {/each}
    <span class="text-xs font-mono text-starlight/25 ml-2">{activeExp + 1} / {experiments.length}</span>
  </div>
</div>
