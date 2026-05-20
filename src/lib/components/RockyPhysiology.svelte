<script lang="ts">
  let expandedRow: number | null = null;

  const rows = [
    {
      feature: 'Biochemical Solvent',
      human: 'Water (H₂O)',
      rocky: 'Liquid ammonia (NH₃)',
      detail: 'Water is the universal solvent for life on Earth — it dissolves polar molecules, participates in metabolic reactions, and maintains cell structure. Ammonia shares many of these properties and can remain liquid at much higher temperatures under pressure. At Rocky\'s operating temperature (~210°C), water would be vapor; ammonia at high pressure stays liquid. Virtually all of Rocky\'s biochemical reactions run in ammonia the way ours run in water.',
      humanColor: '#00D4FF', rockyColor: '#F5A623'
    },
    {
      feature: 'Optimal Temperature',
      human: '37°C (98.6°F)',
      rocky: '~210°C (~410°F)',
      detail: 'Human enzymes denature above ~45°C — proteins literally unfold and stop working. Rocky\'s biochemistry operates at temperatures that would kill a human in seconds. His proteins are built on different molecular principles, stable at temperatures where our chemistry simply breaks down. This is the same principle as extremophile bacteria that thrive in hydrothermal vents — just taken far further.',
      humanColor: '#00D4FF', rockyColor: '#FF6B35'
    },
    {
      feature: 'Body Symmetry',
      human: 'Bilateral (2-fold)',
      rocky: 'Pentaradial (5-fold)',
      detail: 'Nearly all complex animals on Earth have bilateral symmetry — a left and right side, evolved for directional movement. Pentaradial symmetry (five equal arms) exists on Earth in echinoderms: starfish, sea urchins. Rocky has no "front" — any of his five arms can be a leading limb. This suggests he evolved in an environment without strong directional pressure (possibly a gas-giant atmosphere where you move in 3D).',
      humanColor: '#00D4FF', rockyColor: '#F5A623'
    },
    {
      feature: 'Primary Sense',
      human: 'Vision (300–700 nm light)',
      rocky: 'Sonar (pressure waves)',
      detail: 'Rocky has no eyes. He perceives the world through high-frequency sonar — he emits pressure waves and interprets the reflections. This makes him exceptionally good at spatial reasoning and material identification by sound. It also explains why he could so quickly use a musical-tone language with Grace: sound isn\'t just communication for him, it\'s perception. He literally "sees" in frequencies.',
      humanColor: '#00D4FF', rockyColor: '#F5A623'
    },
    {
      feature: 'Limbs',
      human: '4 (2 arms, 2 legs)',
      rocky: '5 equal-function arms',
      detail: 'Rocky has five manipulator arms, each with multiple finger-like protrusions. All five are equal — there is no distinction between "legs" and "arms." He can walk on any combination of arms and use the rest to manipulate objects. For tool use and engineering, this gives him significant advantages: he can hold a component, tighten a bolt, brace against a surface, and still have free limbs — all simultaneously.',
      humanColor: '#00D4FF', rockyColor: '#F5A623'
    },
    {
      feature: 'Atmosphere',
      human: 'O₂/N₂ (21% oxygen)',
      rocky: 'NH₃-rich (toxic to humans)',
      detail: 'Rocky\'s native atmosphere is rich in ammonia — immediately lethal to humans at his concentrations. The Hail Mary\'s shared workspace had a dividing wall where each side maintained its own atmosphere. Rocky\'s side was so hot and toxic that Grace could only enter in a suit. From Rocky\'s perspective, the oxygen-rich, ice-cold conditions on Grace\'s side were equally alien.',
      humanColor: '#00D4FF', rockyColor: '#F5A623'
    }
  ];
</script>

<div class="flex flex-col gap-6">
  <!-- Illustrations -->
  <div class="grid grid-cols-2 gap-4">
    <!-- Human -->
    <div class="bg-deep-space border border-sci-cyan/20 rounded-xl p-4 flex flex-col items-center">
      <p class="text-xs font-mono text-sci-cyan/60 uppercase tracking-widest mb-3">Human (Grace)</p>
      <svg viewBox="0 0 120 180" class="w-28 h-auto">
        <defs>
          <radialGradient id="humanGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#00D4FF" stop-opacity="0.4"/>
            <stop offset="100%" stop-color="#00D4FF" stop-opacity="0.1"/>
          </radialGradient>
        </defs>
        <!-- Head -->
        <circle cx="60" cy="22" r="16" fill="url(#humanGrad)" stroke="#00D4FF" stroke-width="1.5" opacity="0.8"/>
        <!-- Neck -->
        <line x1="60" y1="38" x2="60" y2="50" stroke="#00D4FF" stroke-width="4" stroke-linecap="round" opacity="0.6"/>
        <!-- Torso -->
        <rect x="38" y="50" width="44" height="52" rx="8" fill="url(#humanGrad)" stroke="#00D4FF" stroke-width="1.5" opacity="0.8"/>
        <!-- Left arm -->
        <path d="M 38 58 L 18 90 L 20 108" fill="none" stroke="#00D4FF" stroke-width="4" stroke-linecap="round" opacity="0.7"/>
        <!-- Right arm -->
        <path d="M 82 58 L 102 90 L 100 108" fill="none" stroke="#00D4FF" stroke-width="4" stroke-linecap="round" opacity="0.7"/>
        <!-- Left leg -->
        <path d="M 50 102 L 42 140 L 38 170" fill="none" stroke="#00D4FF" stroke-width="4" stroke-linecap="round" opacity="0.7"/>
        <!-- Right leg -->
        <path d="M 70 102 L 78 140 L 82 170" fill="none" stroke="#00D4FF" stroke-width="4" stroke-linecap="round" opacity="0.7"/>
        <!-- Eyes -->
        <circle cx="54" cy="21" r="2.5" fill="#00D4FF" opacity="0.9"/>
        <circle cx="66" cy="21" r="2.5" fill="#00D4FF" opacity="0.9"/>
        <!-- Symmetry axis -->
        <line x1="60" y1="5" x2="60" y2="175" stroke="#00D4FF" stroke-width="0.5" stroke-dasharray="3 4" opacity="0.2"/>
        <text x="60" y="178" text-anchor="middle" font-size="8" font-family="mono" fill="#00D4FF" opacity="0.4">bilateral</text>
      </svg>
    </div>

    <!-- Rocky -->
    <div class="bg-deep-space border border-astrophage/20 rounded-xl p-4 flex flex-col items-center">
      <p class="text-xs font-mono text-astrophage/60 uppercase tracking-widest mb-3">Eridian (Rocky)</p>
      <svg viewBox="0 0 180 180" class="w-32 h-auto">
        <defs>
          <radialGradient id="rockyGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#F5A623" stop-opacity="0.5"/>
            <stop offset="100%" stop-color="#C07C0A" stop-opacity="0.15"/>
          </radialGradient>
          <filter id="rockyGlow">
            <feGaussianBlur stdDeviation="3" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <!-- 5 arms at 72° intervals (top-down view) -->
        <!-- Arm angles: -90°, -90+72=-18°, -18+72=54°, 54+72=126°, 126+72=198° -->
        {#each [0,1,2,3,4] as i}
          {@const angle = (i * 72 - 90) * Math.PI / 180}
          {@const ax = 90 + 62 * Math.cos(angle)}
          {@const ay = 90 + 62 * Math.sin(angle)}
          {@const mx = 90 + 38 * Math.cos(angle)}
          {@const my = 90 + 38 * Math.sin(angle)}
          <!-- Arm body -->
          <path d="M 90 90 L {ax} {ay}"
            stroke="#F5A623" stroke-width="14" stroke-linecap="round" opacity="0.55"/>
          <path d="M 90 90 L {ax} {ay}"
            stroke="#FFD080" stroke-width="5" stroke-linecap="round" opacity="0.35"
            filter="url(#rockyGlow)"/>
          <!-- Claw tips -->
          {#each [-0.28, 0, 0.28] as da}
            {@const ta = angle + da}
            <line
              x1={ax} y1={ay}
              x2={ax + 14 * Math.cos(ta)} y2={ay + 14 * Math.sin(ta)}
              stroke="#F5A623" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
          {/each}
        {/each}
        <!-- Central body -->
        <circle cx="90" cy="90" r="30" fill="url(#rockyGrad)" stroke="#F5A623" stroke-width="1.5" opacity="0.9"/>
        <!-- Shell texture (hexagonal dots) -->
        {#each [
          [90,90],[78,82],[102,82],[78,98],[102,98],[90,76],[90,104]
        ] as [dx,dy]}
          <circle cx={dx} cy={dy} r="3" fill="#050A14" opacity="0.5"/>
        {/each}
        <!-- Sonar emitter (center) -->
        <circle cx="90" cy="90" r="8" fill="#FFD080" opacity="0.7" filter="url(#rockyGlow)"/>
        <circle cx="90" cy="90" r="4" fill="#FFFDE0" opacity="0.9"/>
        <!-- Symmetry lines -->
        {#each [0,1,2,3,4] as i}
          {@const a = (i*72-90) * Math.PI / 180}
          <line x1="90" y1="90" x2={90+72*Math.cos(a)} y2={90+72*Math.sin(a)}
            stroke="#F5A623" stroke-width="0.4" stroke-dasharray="2 3" opacity="0.15"/>
        {/each}
        <text x="90" y="175" text-anchor="middle" font-size="8" font-family="mono" fill="#F5A623" opacity="0.4">pentaradial</text>
      </svg>
    </div>
  </div>

  <!-- Comparison rows -->
  <div class="space-y-2">
    {#each rows as row, i}
      <button on:click={() => expandedRow = expandedRow === i ? null : i}
        class="w-full text-left bg-deep-space border rounded-xl overflow-hidden transition-all duration-200
          {expandedRow === i ? 'border-astrophage/40' : 'border-white/8 hover:border-white/15'}">
        <div class="grid grid-cols-3 gap-2 px-4 py-3 items-center">
          <div class="text-xs font-mono text-starlight/40 uppercase tracking-wide">{row.feature}</div>
          <div class="text-sm text-sci-cyan/80">{row.human}</div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-astrophage/90">{row.rocky}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" class="flex-shrink-0 ml-2 text-starlight/30 transition-transform duration-200 {expandedRow === i ? 'rotate-180' : ''}">
              <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
        {#if expandedRow === i}
          <div class="px-4 pb-4 pt-1 border-t border-white/6">
            <p class="text-sm text-starlight/70 leading-relaxed">{row.detail}</p>
          </div>
        {/if}
      </button>
    {/each}
  </div>

  <!-- Column headers -->
  <div class="grid grid-cols-3 gap-2 px-4 text-xs font-mono opacity-40 -mb-4 order-first">
    <span class="text-starlight/40">Feature</span>
    <span class="text-sci-cyan">Human</span>
    <span class="text-astrophage">Eridian</span>
  </div>
</div>
