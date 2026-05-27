<script lang="ts">
  let stageIdx = 0;

  const stages = [
    {
      label: 'Discovery',
      icon: '🔭',
      summary: 'A cloud sample from Tau Ceti e contains something that shouldn\'t be there.',
      detail: 'Grace sends a probe into the upper atmosphere of Tau Ceti e, the most Astrophage-dense planet in the system. The sample cultures he runs show a surprising result: Astrophage colonies are dying. Not starving, not reproducing slowly. Actively dying, being consumed. Something in the sample is eating them. That something is Taumoeba.',
      breakthrough: 'Natural predator of Astrophage identified. The Tau Ceti system has achieved ecological balance: Astrophage and Taumoeba co-exist as prey and predator.',
      visual: 'discovery'
    },
    {
      label: 'The Mechanism',
      icon: '⚗',
      summary: 'Taumoeba secretes a compound that disrupts Astrophage\'s energy bonds.',
      detail: 'Taumoeba attaches to the outer membrane of an Astrophage cell and releases an enzyme that degrades the molecular structure of the energy vacuole. The stored petajoules discharge as heat. Essentially, Taumoeba causes Astrophage to "explode" its own stored energy. This releases more than enough energy for Taumoeba to reproduce. The relationship is pure predation: Astrophage is food, and Taumoeba evolved exclusively to eat it.',
      breakthrough: 'Mechanism understood. Taumoeba cannot survive without Astrophage: it won\'t consume other organisms, won\'t become a broader ecological threat if introduced to our solar system.',
      visual: 'mechanism'
    },
    {
      label: 'The Temperature Problem',
      icon: '🌡',
      summary: 'Taumoeba thrives at 40°C. Sol\'s corona needs it at 150°C+.',
      detail: 'Tau Ceti is cooler than our Sun. Taumoeba evolved at its conditions: comfortable to about 40°C, dying above 96°C. But to survive in Sol\'s Astrophage-dense zone, it needs to tolerate much higher temperatures. Grace and Rocky design a multi-generation evolution program: breed Taumoeba in controlled cultures, raise temperature 2°C per generation, select survivors. After ~500 generations, they produce a strain tolerant to ~150°C.',
      breakthrough: 'Temperature-hardened Taumoeba strain created. The solution exists. Now it needs to get home.',
      visual: 'temperature'
    },
    {
      label: 'Xenonite & Delivery',
      icon: '⬡',
      summary: 'Rocky synthesizes xenonite (a material only Eridians can make) to contain the solution.',
      detail: 'The delivery problem: you need a container that can hold live Taumoeba and Astrophage together without them escaping into space, without killing the organisms, and that can survive re-entry near Earth. Rocky\'s species can synthesize xenonite, an exotic material with extraordinary properties: impermeable to both organisms, thermally stable, transparent to Astrophage\'s 585 nm light (keeping Astrophage alive and reproducing inside), and structurally robust. Grace cannot synthesize it. Rocky makes thousands of xenonite pellets. Each one is a self-contained Astrophage/Taumoeba ecosystem.',
      breakthrough: 'Delivery vector created. Grace scatters the pellets into Sol\'s Astrophage-dense zone. Each pellet is a seed: Taumoeba will do the rest.',
      visual: 'xenonite'
    }
  ];

  $: current = stages[stageIdx];

  // Temperature evolution data (generation → max temp tolerance °C)
  const tempData = [
    [0, 40], [50, 55], [100, 68], [150, 80], [200, 92],
    [250, 103], [300, 114], [350, 124], [400, 134], [450, 143], [500, 152]
  ];
</script>

<div class="flex flex-col gap-6">
  <!-- Stage tabs -->
  <div class="flex gap-2 overflow-x-auto pb-1">
    {#each stages as s, i}
      <button on:click={() => stageIdx = i}
        class="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200
          {stageIdx === i
            ? 'bg-astrophage/12 text-astrophage border border-astrophage/35'
            : 'text-starlight/40 border border-white/8 hover:border-white/20'}">
        <span>{s.icon}</span>
        <span class="font-medium">{s.label}</span>
      </button>
    {/each}
  </div>

  <!-- Content panel -->
  <div class="bg-deep-space border border-white/8 rounded-xl overflow-hidden">

    <!-- Visual -->
    <div class="border-b border-white/6">
      {#if current.visual === 'discovery'}
        <svg viewBox="0 0 560 130" class="w-full">
          <rect width="560" height="130" fill="#050A14"/>
          <!-- Astrophage cells (dying) -->
          {#each [[100,65],[155,45],[135,85],[80,40],[175,80]] as [cx,cy], i}
            <ellipse cx={cx} cy={cy} rx="18" ry="15" fill="#F5A623" opacity={0.6 - i*0.08}
              stroke="#F5A623" stroke-width="1"/>
            {#if i > 1}
              <!-- X marks on dying astrophage -->
              <line x1={cx-6} y1={cy-6} x2={cx+6} y2={cy+6} stroke="#EF4444" stroke-width="1.5" opacity="0.7"/>
              <line x1={cx+6} y1={cy-6} x2={cx-6} y2={cy+6} stroke="#EF4444" stroke-width="1.5" opacity="0.7"/>
            {/if}
          {/each}
          <!-- Taumoeba cells -->
          {#each [[260,65],[310,50],[290,90],[350,70],[340,40],[270,100]] as [cx,cy]}
            <circle cx={cx} cy={cy} r="8" fill="#4ADE80" opacity="0.7" stroke="#4ADE80" stroke-width="1"/>
            <!-- Cilia (flagella) -->
            {#each [0,60,120,180,240,300] as angle}
              <line
                x1={cx + 8 * Math.cos(angle*Math.PI/180)}
                y1={cy + 8 * Math.sin(angle*Math.PI/180)}
                x2={cx + 14 * Math.cos(angle*Math.PI/180)}
                y2={cy + 14 * Math.sin(angle*Math.PI/180)}
                stroke="#4ADE80" stroke-width="0.8" opacity="0.5"/>
            {/each}
          {/each}
          <!-- Labels -->
          <text x="130" y="118" text-anchor="middle" font-size="9" font-family="mono" fill="#F5A623" opacity="0.6">Astrophage (dying)</text>
          <text x="310" y="118" text-anchor="middle" font-size="9" font-family="mono" fill="#4ADE80" opacity="0.6">Taumoeba (thriving)</text>
          <!-- Sample boundary -->
          <rect x="30" y="12" width="480" height="100" rx="6" fill="none" stroke="#E8EDF2" stroke-width="0.6" stroke-dasharray="4 4" opacity="0.15"/>
          <text x="40" y="24" font-size="8" font-family="mono" fill="#E8EDF2" opacity="0.25">Tau Ceti e cloud sample · culture plate</text>
        </svg>

      {:else if current.visual === 'mechanism'}
        <svg viewBox="0 0 560 130" class="w-full">
          <rect width="560" height="130" fill="#050A14"/>
          <!-- Astrophage (charged) -->
          <ellipse cx="145" cy="65" rx="40" ry="34" fill="#F5A623" opacity="0.35" stroke="#F5A623" stroke-width="1.5"/>
          <ellipse cx="145" cy="65" rx="28" ry="23" fill="#F5A623" opacity="0.55"/>
          <circle cx="145" cy="65" r="9" fill="#FFD080" opacity="0.9"/>
          <text x="145" y="113" text-anchor="middle" font-size="9" font-family="mono" fill="#F5A623" opacity="0.6">Astrophage (full)</text>

          <!-- Arrow (attack) -->
          <path d="M 220 65 L 270 65" stroke="#4ADE80" stroke-width="1.5" marker-end="url(#arrow2)" opacity="0.7"/>
          <text x="245" y="58" text-anchor="middle" font-size="8" font-family="mono" fill="#4ADE80" opacity="0.5">enzyme</text>

          <!-- Taumoeba approaching -->
          <circle cx="248" cy="65" r="12" fill="#4ADE80" opacity="0.75" stroke="#4ADE80" stroke-width="1"/>
          {#each [0,60,120,180,240,300] as angle}
            <line
              x1={248 + 12*Math.cos(angle*Math.PI/180)} y1={65 + 12*Math.sin(angle*Math.PI/180)}
              x2={248 + 20*Math.cos(angle*Math.PI/180)} y2={65 + 20*Math.sin(angle*Math.PI/180)}
              stroke="#4ADE80" stroke-width="1" opacity="0.5"/>
          {/each}

          <!-- Discharge symbol -->
          <text x="370" y="40" font-size="28" fill="#FF6B35" opacity="0.8">⚡</text>
          <ellipse cx="390" cy="65" rx="35" ry="30" fill="#FF6B35" opacity="0.1" stroke="#FF6B35" stroke-width="1" stroke-dasharray="3 3"/>
          <text x="390" y="69" text-anchor="middle" font-size="11" font-family="mono" fill="#FF6B35" opacity="0.7">DISCHARGE</text>
          <text x="390" y="113" text-anchor="middle" font-size="9" font-family="mono" fill="#FF6B35" opacity="0.5">energy released as heat</text>

          <!-- Taumoeba (fed) reproducing -->
          <circle cx="490" cy="55" r="10" fill="#4ADE80" opacity="0.8"/>
          <circle cx="510" cy="75" r="9" fill="#4ADE80" opacity="0.75"/>
          <line x1="496" y1="62" x2="504" y2="70" stroke="#4ADE80" stroke-width="1" stroke-dasharray="2 2" opacity="0.4"/>
          <text x="500" y="113" text-anchor="middle" font-size="9" font-family="mono" fill="#4ADE80" opacity="0.6">Taumoeba reproduces</text>

          <defs>
            <marker id="arrow2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 Z" fill="#4ADE80" opacity="0.7"/>
            </marker>
          </defs>
        </svg>

      {:else if current.visual === 'temperature'}
        {@const chartL=60} {@const chartT=15} {@const chartW=460} {@const chartH=90}
        {@const maxGen=500} {@const maxTemp=170} {@const minTemp=30}
        {@const targetY = chartT + (1 - (120 - minTemp)/(maxTemp - minTemp)) * chartH}
        {@const targetY2 = chartT + (1 - (155 - minTemp)/(maxTemp - minTemp)) * chartH}
        {@const baseY = chartT + (1 - (40 - minTemp)/(maxTemp - minTemp)) * chartH}
        {@const tempPts = tempData.map(([g,t]) => ({
          x: chartL + (g/maxGen)*chartW,
          y: chartT + (1 - (t-minTemp)/(maxTemp-minTemp))*chartH
        }))}
        <!-- Temperature evolution line chart -->
        <svg viewBox="0 0 560 130" class="w-full">
          <rect width="560" height="130" fill="#050A14"/>

          <!-- Axes -->
          <line x1={chartL} y1={chartT} x2={chartL} y2={chartT+chartH} stroke="#E8EDF220" stroke-width="0.8"/>
          <line x1={chartL} y1={chartT+chartH} x2={chartL+chartW} y2={chartT+chartH} stroke="#E8EDF220" stroke-width="0.8"/>

          <!-- Target zone (Sol requires ~120-150°C) -->
          <rect x={chartL} y={targetY2} width={chartW} height={targetY-targetY2} fill="#4ADE80" opacity="0.06"/>
          <line x1={chartL} y1={targetY} x2={chartL+chartW} y2={targetY} stroke="#4ADE80" stroke-width="0.8" stroke-dasharray="4 3" opacity="0.4"/>
          <text x={chartL+chartW-2} y={targetY-3} text-anchor="end" font-size="7.5" font-family="mono" fill="#4ADE80" opacity="0.5">target zone</text>

          <!-- Baseline (Tau Ceti conditions) -->
          <line x1={chartL} y1={baseY} x2={chartL+chartW} y2={baseY} stroke="#F5A623" stroke-width="0.6" stroke-dasharray="3 4" opacity="0.25"/>
          <text x={chartL+4} y={baseY-3} font-size="7.5" font-family="mono" fill="#F5A623" opacity="0.4">baseline (40°C)</text>

          <!-- Evolution curve -->
          <polyline
            points={tempPts.map(p => `${p.x},${p.y}`).join(' ')}
            fill="none" stroke="#F5A623" stroke-width="2" opacity="0.85"/>

          <!-- Dots at each data point -->
          {#each tempPts as p, i}
            <circle cx={p.x} cy={p.y} r="2.5" fill="#F5A623" opacity="0.7"/>
          {/each}

          <!-- Axis labels -->
          {#each [0,100,200,300,400,500] as g}
            <text x={chartL+(g/maxGen)*chartW} y={chartT+chartH+10} text-anchor="middle" font-size="7.5" font-family="mono" fill="#E8EDF230">{g}</text>
          {/each}
          <text x={chartL+chartW/2} y={chartT+chartH+21} text-anchor="middle" font-size="7.5" font-family="Inter" fill="#E8EDF220">Generations</text>
          {#each [40,80,120,160] as t}
            {@const ty = chartT + (1-(t-minTemp)/(maxTemp-minTemp))*chartH}
            <text x={chartL-4} y={ty+3} text-anchor="end" font-size="7.5" font-family="mono" fill="#E8EDF230">{t}°</text>
          {/each}
        </svg>

      {:else if current.visual === 'xenonite'}
        <svg viewBox="0 0 560 130" class="w-full">
          <rect width="560" height="130" fill="#050A14"/>
          <!-- Xenonite pellet cross-section -->
          {#each [-120, 0, 120] as offset}
            {@const cx = 280 + offset}
            <!-- Outer shell (xenonite) -->
            <circle cx={cx} cy={65} r="42" fill="none" stroke="#C084FC" stroke-width="3" opacity="0.6"/>
            <circle cx={cx} cy={65} r="42" fill="#C084FC" opacity="0.04"/>
            <text x={cx} y={cx===280?-5:65-52} text-anchor="middle" font-size="7.5" font-family="mono" fill="#C084FC" opacity="0.5">xenonite</text>

            <!-- Astrophage inside -->
            {#each [[cx-12,58],[cx+8,55],[cx-5,72],[cx+15,70]] as [ax,ay]}
              <ellipse cx={ax} cy={ay} rx="8" ry="7" fill="#F5A623" opacity="0.5"/>
            {/each}

            <!-- Taumoeba inside -->
            {#each [[cx-15,72],[cx+12,60],[cx,65]] as [tx,ty]}
              <circle cx={tx} cy={ty} r="5" fill="#4ADE80" opacity="0.6"/>
            {/each}

            <!-- 585nm light entering -->
            {#each [-15, 0, 15] as dy}
              <line x1={cx-60} y1={65+dy} x2={cx-42} y2={65+dy}
                stroke="#FFE066" stroke-width="1" opacity="0.35"/>
            {/each}
          {/each}

          <!-- Legend -->
          <circle cx="80" cy="118" r="4" fill="#F5A623" opacity="0.7"/>
          <text x="88" y="121" font-size="8" font-family="mono" fill="#F5A623" opacity="0.5">Astrophage</text>
          <circle cx="170" cy="118" r="4" fill="#4ADE80" opacity="0.7"/>
          <text x="178" y="121" font-size="8" font-family="mono" fill="#4ADE80" opacity="0.5">Taumoeba</text>
          <circle cx="265" cy="118" r="4" fill="none" stroke="#C084FC" stroke-width="1.5" opacity="0.7"/>
          <text x="273" y="121" font-size="8" font-family="mono" fill="#C084FC" opacity="0.5">Xenonite shell</text>
          <line x1="360" y1="118" x2="378" y2="118" stroke="#FFE066" stroke-width="1.5" opacity="0.5"/>
          <text x="382" y="121" font-size="8" font-family="mono" fill="#FFE066" opacity="0.5">585nm feed light</text>
        </svg>
      {/if}
    </div>

    <!-- Text content -->
    <div class="p-5">
      <div class="flex items-center gap-2 mb-3">
        <span class="text-lg">{current.icon}</span>
        <h3 class="font-semibold text-starlight">{current.label}</h3>
        <span class="text-xs font-mono text-starlight/30 ml-auto">{stageIdx + 1} / {stages.length}</span>
      </div>
      <p class="text-astrophage/70 text-sm font-mono italic mb-3">"{current.summary}"</p>
      <p class="text-sm text-starlight/72 leading-relaxed mb-4">{current.detail}</p>
      <div class="bg-astrophage/7 border border-astrophage/22 rounded-lg p-3">
        <p class="text-xs font-mono text-astrophage/55 uppercase tracking-wider mb-1">Breakthrough</p>
        <p class="text-sm text-starlight/72">{current.breakthrough}</p>
      </div>
    </div>
  </div>

  <!-- Navigation -->
  <div class="flex justify-between">
    <button on:click={() => stageIdx = Math.max(0, stageIdx - 1)}
      disabled={stageIdx === 0}
      class="flex items-center gap-2 text-sm text-starlight/40 hover:text-astrophage transition-colors disabled:opacity-20 disabled:cursor-not-allowed">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      Previous
    </button>
    <button on:click={() => stageIdx = Math.min(stages.length - 1, stageIdx + 1)}
      disabled={stageIdx === stages.length - 1}
      class="flex items-center gap-2 text-sm text-starlight/40 hover:text-astrophage transition-colors disabled:opacity-20 disabled:cursor-not-allowed">
      Next
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
    </button>
  </div>
</div>
