<script lang="ts">
  let active = 0;

  const planets = [
    {
      id: 'miller',
      name: "Miller's Planet",
      explorer: 'Dr. Miller',
      status: 'FATAL',
      statusColor: '#EF4444',
      color: '#3B82F6',
      tagline: 'Closest to Gargantua. Most extreme. Least hospitable.',
      specs: [
        { label: 'Gravity',       value: '~1.3g',    note: '30% heavier than Earth' },
        { label: 'Surface',       value: 'Ocean',     note: 'Shallow water world' },
        { label: 'Time dilation', value: '61,320×',  note: '1 hour = 7 years' },
        { label: 'Wave height',   value: '~1.2 km',  note: 'Tidal forcing by Gargantua' }
      ],
      outcome: 'Dr. Miller died before the Endurance arrived. The crew spent 1 hour on the surface — during which 23 years passed on Earth. They found only debris. No data worth the cost.',
      science: 'Tidally locked to Gargantua. The wave pattern is stationary — a permanent bulge held by tidal forces. The crew "drove into" the wave. The planet is drenched in young-looking blue-shifted light from Gargantua.'
    },
    {
      id: 'mann',
      name: "Mann's Planet",
      explorer: 'Dr. Mann',
      status: 'DECEPTION',
      statusColor: '#F59E0B',
      color: '#6B7280',
      tagline: 'The most "promising" planet. The most dangerous lie.',
      specs: [
        { label: 'Atmosphere',  value: 'Methane',    note: 'Unbreathable surface' },
        { label: 'Surface',     value: 'Ice clouds', note: 'Ammonia crystal formations' },
        { label: 'Horizon',     value: 'Cloud deck', note: 'Looks like solid ground' },
        { label: 'Data',        value: 'Faked',      note: 'Mann falsified all readings' }
      ],
      outcome: "Dr. Mann fabricated his data to ensure rescue. He faked survivability readings to get the crew to come. He tried to kill Cooper and detached from the Endurance improperly — killing himself in the airlock explosion. The planet was never habitable.",
      science: "The 'ground' seen from orbit is actually a thick deck of frozen ammonia clouds, not a solid surface. Mann chose a planet with cloud cover that looked Earth-like from above — a deliberate deception. The actual surface below is frozen and lethal."
    },
    {
      id: 'edmunds',
      name: "Edmunds' Planet",
      explorer: 'Dr. Edmunds',
      status: 'VIABLE',
      statusColor: '#22C55E',
      color: '#10B981',
      tagline: 'Where humanity ends up. The only one that mattered.',
      specs: [
        { label: 'Gravity',    value: '~1.0g',   note: 'Earth-like' },
        { label: 'Atmosphere', value: 'Viable',  note: 'Breathable composition' },
        { label: 'Surface',    value: 'Rocky',   note: 'Solid, stable terrain' },
        { label: 'Data',       value: 'Real',    note: 'Edmunds died telling the truth' }
      ],
      outcome: "Dr. Edmunds sent accurate data and died waiting. Brand reaches the planet at the film's end and finds Edmunds' body. She begins building the first human settlement there — fulfilling Plan B (colonization using frozen embryos), alone, with CASE.",
      science: "Edmunds' planet is furthest from Gargantua — less tidal distortion, Earth-like gravity, stable orbit. Its location makes it the least dramatic and least scientifically extreme of the three worlds, which is exactly why it's the one that works."
    }
  ];

  $: p = planets[active];
</script>

<div class="flex flex-col gap-5">
  <!-- Planet tabs -->
  <div class="grid grid-cols-3 gap-2">
    {#each planets as planet, i}
      <button on:click={() => active = i}
        class="py-2 px-2 rounded-xl text-xs font-medium border transition-all"
        style={active === i
          ? `background: ${planet.color}14; color: ${planet.color}; border-color: ${planet.color}40`
          : 'color: #E8EDF240; border-color: #E8EDF210'}>
        <span class="block font-semibold text-sm mb-0.5">{planet.name.split("'")[0]}'s</span>
        <span class="text-[10px] font-mono opacity-70">{planet.explorer}</span>
      </button>
    {/each}
  </div>

  <!-- Planet visual + header -->
  <div class="bg-deep-space border border-white/8 rounded-xl overflow-hidden">
    <svg viewBox="0 0 480 130" class="w-full" style="max-height:130px">
      <rect width="480" height="130" fill="#050A14"/>

      <!-- Stars -->
      {#each Array.from({length: 40}, (_,i) => i) as i}
        {@const x = ((Math.sin(i * 2.4) + 1) / 2) * 480}
        {@const y = ((Math.cos(i * 1.7) + 1) / 2) * 130}
        <circle cx={x} cy={y} r={i % 4 === 0 ? 1 : 0.5} fill="white" opacity={0.15 + (i%5)*0.06}/>
      {/each}

      {#if active === 0}
        <!-- Miller: ocean world with waves -->
        <defs>
          <radialGradient id="millerGrad" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stop-color="#60B0FF" stop-opacity="0.9"/>
            <stop offset="100%" stop-color="#0030A0" stop-opacity="0.6"/>
          </radialGradient>
        </defs>
        <circle cx="240" cy="65" r="52" fill="url(#millerGrad)"/>
        <circle cx="240" cy="65" r="52" fill="none" stroke="#3B82F6" stroke-width="1" opacity="0.6"/>
        <!-- Waves -->
        <path d="M 195,52 Q 215,38 235,52 Q 255,66 275,52 Q 295,38 305,50" fill="none" stroke="#A0D4FF" stroke-width="2.5" opacity="0.7"/>
        <path d="M 188,68 Q 208,56 228,68 Q 248,80 268,68 Q 288,56 308,68" fill="none" stroke="#80BCFF" stroke-width="2" opacity="0.5"/>
        <!-- Gargantua glow -->
        <ellipse cx="60" cy="65" rx="38" ry="32" fill="#F5A623" opacity="0.12"/>
        <circle cx="60" cy="65" r="22" fill="#030810" stroke="#F5A623" stroke-width="1" opacity="0.6"/>
        <text x="60" y="70" text-anchor="middle" font-size="7.5" font-family="mono" fill="#F5A62360">Gargantua</text>
        <text x="240" y="120" text-anchor="middle" font-size="9" font-family="Inter" fill="#E8EDF235">Shallow ocean, tidal waves, extreme time dilation</text>

      {:else if active === 1}
        <!-- Mann: icy, deceptive cloud deck -->
        <defs>
          <radialGradient id="mannGrad" cx="45%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#D0D8E0" stop-opacity="0.85"/>
            <stop offset="60%" stop-color="#8090A0" stop-opacity="0.7"/>
            <stop offset="100%" stop-color="#303840" stop-opacity="0.5"/>
          </radialGradient>
        </defs>
        <circle cx="240" cy="65" r="52" fill="url(#mannGrad)"/>
        <circle cx="240" cy="65" r="52" fill="none" stroke="#9CA3AF" stroke-width="1" opacity="0.5"/>
        <!-- Cloud bands -->
        <ellipse cx="240" cy="58" rx="48" ry="10" fill="white" opacity="0.07"/>
        <ellipse cx="240" cy="72" rx="48" ry="8"  fill="white" opacity="0.05"/>
        <!-- Fake horizon illusion line -->
        <line x1="192" y1="65" x2="288" y2="65" stroke="#F59E0B" stroke-width="1" stroke-dasharray="4 3" opacity="0.5"/>
        <text x="340" y="67" font-size="7.5" font-family="mono" fill="#F59E0B60">fake horizon</text>
        <text x="240" y="120" text-anchor="middle" font-size="9" font-family="Inter" fill="#E8EDF235">Cloud deck mistaken for solid ground — Dr. Mann's lie</text>

      {:else}
        <!-- Edmunds: rocky, Earth-like -->
        <defs>
          <radialGradient id="edmGrad" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stop-color="#60D080" stop-opacity="0.85"/>
            <stop offset="55%" stop-color="#204040" stop-opacity="0.7"/>
            <stop offset="100%" stop-color="#102020" stop-opacity="0.5"/>
          </radialGradient>
        </defs>
        <circle cx="240" cy="65" r="52" fill="url(#edmGrad)"/>
        <circle cx="240" cy="65" r="52" fill="none" stroke="#10B981" stroke-width="1" opacity="0.6"/>
        <!-- Landmasses -->
        <ellipse cx="225" cy="60" rx="22" ry="14" fill="#10B981" opacity="0.22"/>
        <ellipse cx="260" cy="72" rx="16" ry="10" fill="#10B981" opacity="0.18"/>
        <!-- Thin atmosphere ring -->
        <circle cx="240" cy="65" r="54" fill="none" stroke="#10B981" stroke-width="2" opacity="0.2"/>
        <text x="240" y="120" text-anchor="middle" font-size="9" font-family="Inter" fill="#E8EDF235">Rocky, stable, breathable — Brand's new home</text>
      {/if}
    </svg>
  </div>

  <!-- Planet details -->
  <div class="bg-deep-space border border-white/8 rounded-xl p-5">
    <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
      <h3 class="font-bold text-starlight text-lg">{p.name}</h3>
      <span class="text-[10px] font-mono px-2 py-0.5 rounded border"
        style="color:{p.statusColor}; border-color:{p.statusColor}30">{p.status}</span>
    </div>
    <p class="text-sm text-starlight/50 mb-4 italic">{p.tagline}</p>

    <!-- Specs grid -->
    <div class="grid grid-cols-2 gap-2 mb-4">
      {#each p.specs as spec}
        <div class="bg-black/20 rounded-lg p-2.5">
          <p class="text-[10px] font-mono uppercase tracking-wider mb-0.5" style="color:{p.color}; opacity:0.6">{spec.label}</p>
          <p class="text-sm font-semibold text-starlight">{spec.value}</p>
          <p class="text-[10px] text-starlight/35">{spec.note}</p>
        </div>
      {/each}
    </div>

    <!-- Outcome -->
    <div class="space-y-3">
      <div>
        <p class="text-[10px] font-mono text-starlight/30 uppercase tracking-wider mb-1">What Happened</p>
        <p class="text-xs text-starlight/55 leading-relaxed">{p.outcome}</p>
      </div>
      <div>
        <p class="text-[10px] font-mono text-starlight/30 uppercase tracking-wider mb-1">The Science</p>
        <p class="text-xs text-starlight/55 leading-relaxed">{p.science}</p>
      </div>
    </div>
  </div>
</div>
