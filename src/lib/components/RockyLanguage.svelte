<script lang="ts">
  let stageIdx = 0;

  const stages = [
    {
      label: 'Frequency Handshake',
      from: 'Rocky',
      summary: 'A sweep of tones across hundreds of frequencies — a simple "can you hear this?"',
      detail: 'Rocky\'s first transmission was a structured frequency sweep from ~10 Hz to ~80 kHz. Grace, with human hearing capped at ~20 kHz, could only respond to a fraction of it. By noting which responses Rocky got back, both parties mapped the other\'s hearing range. Neither could speak the other\'s full language — but they found the overlap.',
      breakthrough: 'Shared hearing range identified. Both know communication is possible.',
      visual: 'spectrum'
    },
    {
      label: 'Prime Numbers',
      from: 'Rocky',
      summary: '2 clicks. 3 clicks. 5 clicks. 7 clicks. Pause. 11 clicks.',
      detail: 'Rocky sent groups of tones: two, then three, then five, then seven, then eleven. Prime numbers are universal — they\'re not a human convention, they\'re a mathematical fact. Any intelligence capable of building a spaceship recognizes them. Grace responded with 13, 17, 19. They had just confirmed to each other: we are both mathematically intelligent beings.',
      breakthrough: 'Mutual intelligence confirmed. A shared counting system now exists.',
      visual: 'primes'
    },
    {
      label: 'Arithmetic & Symbols',
      from: 'Grace',
      summary: 'Two clicks. A new sound. Two clicks. A long tone. Four clicks.',
      detail: 'Grace transmitted: "2 [symbol-A] 2 [symbol-B] 4." Rocky tried different interpretations — multiplication? Concatenation? Grace sent "3 [A] 4 [B] 7" and "5 [A] 6 [B] 11." Rocky deduced [A] = addition, [B] = equals. Then Rocky proposed symbols for subtraction and multiplication. Within hours, they had a complete arithmetic grammar.',
      breakthrough: 'Full arithmetic established. Numbers and operations are shared.',
      visual: 'math'
    },
    {
      label: 'Physical Anchors',
      from: 'Both',
      summary: 'Rocky taps the wall. Measures the echo time. Taps again. Both now own a second.',
      detail: 'To establish real units, they needed a shared physical reference. Rocky measured the speed of sound through the ship\'s shared atmosphere — they could both hear the tap and count the echo delay in clicks. That delay became their shared "second." From a shared second, you can derive meters (distance light travels), and from meters and seconds, everything else follows. The universe\'s constants are universal.',
      breakthrough: 'Shared time unit derived from physics. All SI units now derivable.',
      visual: 'physics'
    },
    {
      label: 'Chemical Identity',
      from: 'Grace',
      summary: '6 clicks. 8 clicks. 6 clicks. Rocky goes quiet for a moment, then responds.',
      detail: 'Grace transmitted atomic numbers: 6 (Carbon), 8 (Oxygen), 6 (Carbon) — CO₂. Rocky recognized the pattern. Then Grace sent: 1 click, 2 clicks, 1 click — H₂O (water). Rocky\'s reply was dramatic: 7 clicks, 1-1-1 clicks — NH₃ (ammonia). They had just told each other what they were made of. Two radically different biochemistries, meeting in the void between stars.',
      breakthrough: 'Biochemical identities exchanged. They understand they are profoundly alien to each other — and that doesn\'t matter.',
      visual: 'chemistry'
    }
  ];

  $: current = stages[stageIdx];

  // Waveform data per stage
  function getWaveData(visual: string): number[][] {
    if (visual === 'spectrum') return [];
    if (visual === 'primes') return [[2,0],[3,1],[5,2],[7,3],[11,4],[13,5],[17,6]];
    if (visual === 'math') return [[2,0],[2,0.5],[4,1],[3,2],[4,2.5],[7,3],[5,4],[6,4.5],[11,5]];
    if (visual === 'physics') return [[1,0],[1,2],[1,4],[1,6],[1,8]];
    if (visual === 'chemistry') return [[6,0],[8,1],[6,2],[1,4],[2,4.5],[1,5],[7,7],[1,7.5],[1,7.8],[1,8.1]];
    return [];
  }

  // Spectrum bands (Hz, label, human, rocky)
  const bands = [
    { hz: 10, label: '10 Hz', human: false, rocky: true },
    { hz: 20, label: '20 Hz', human: true, rocky: true },
    { hz: 100, label: '100 Hz', human: true, rocky: true },
    { hz: 1000, label: '1 kHz', human: true, rocky: true },
    { hz: 10000, label: '10 kHz', human: true, rocky: true },
    { hz: 20000, label: '20 kHz', human: true, rocky: true },
    { hz: 40000, label: '40 kHz', human: false, rocky: true },
    { hz: 80000, label: '80 kHz', human: false, rocky: true }
  ];
</script>

<div class="flex flex-col gap-6">

  <!-- Stage timeline -->
  <div class="flex gap-2 overflow-x-auto pb-1">
    {#each stages as s, i}
      <button on:click={() => stageIdx = i}
        class="flex-shrink-0 flex flex-col items-center gap-1.5 group">
        <div class="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-200
          {stageIdx === i ? 'border-astrophage bg-astrophage/20 text-astrophage' :
           stageIdx > i ? 'border-astrophage/50 bg-astrophage/10 text-astrophage/60' :
           'border-white/20 text-starlight/30'}">
          {i + 1}
        </div>
        <span class="text-[10px] font-mono text-center leading-tight w-16
          {stageIdx === i ? 'text-astrophage' : 'text-starlight/30'}">
          {s.label.split(' ')[0]}
        </span>
      </button>
      {#if i < stages.length - 1}
        <div class="flex-1 h-0.5 mt-4 self-start
          {stageIdx > i ? 'bg-astrophage/40' : 'bg-white/10'}"></div>
      {/if}
    {/each}
  </div>

  <!-- Terminal display -->
  <div class="bg-[#050A14] border border-astrophage/25 rounded-xl overflow-hidden">
    <!-- Terminal header -->
    <div class="flex items-center gap-2 px-4 py-2.5 border-b border-astrophage/15 bg-deep-space">
      <div class="w-2.5 h-2.5 rounded-full bg-red-500/60"></div>
      <div class="w-2.5 h-2.5 rounded-full bg-yellow-500/60"></div>
      <div class="w-2.5 h-2.5 rounded-full bg-green-500/60"></div>
      <span class="ml-2 text-xs font-mono text-starlight/30">COMM LOG — Stage {stageIdx + 1} of 5</span>
      <span class="ml-auto text-xs font-mono text-astrophage/60">Source: {current.from}</span>
    </div>

    <!-- Waveform / spectrum visualization -->
    <div class="px-4 pt-4 pb-2">
      {#if current.visual === 'spectrum'}
        <!-- Frequency spectrum -->
        <svg viewBox="0 0 560 80" class="w-full">
          <rect width="560" height="80" fill="#050A14"/>
          <!-- Rocky range (full) -->
          <rect x="10" y="20" width="540" height="20" fill="#F5A623" opacity="0.18" rx="2"/>
          <text x="10" y="16" font-size="9" font-family="mono" fill="#F5A623" opacity="0.7">Rocky (10 Hz – 80 kHz)</text>
          <!-- Human range -->
          <rect x="75" y="40" width="400" height="20" fill="#00D4FF" opacity="0.25" rx="2"/>
          <text x="75" y="74" font-size="9" font-family="mono" fill="#00D4FF" opacity="0.7">Human (20 Hz – 20 kHz)</text>
          <!-- Overlap -->
          <rect x="75" y="20" width="400" height="40" fill="#FFD080" opacity="0.12" rx="2"/>
          <text x="240" y="44" font-size="9" font-family="mono" fill="#FFD080" opacity="0.8" text-anchor="middle">overlap zone</text>
          <!-- Frequency labels -->
          {#each [10, 75, 285, 475] as x, i}
            <line x1={x} y1="60" x2={x} y2="65" stroke="#E8EDF230" stroke-width="0.8"/>
          {/each}
        </svg>

      {:else if current.visual === 'primes'}
        <!-- Prime click groups -->
        <svg viewBox="0 0 560 70" class="w-full">
          <rect width="560" height="70" fill="#050A14"/>
          {#each [[2,0],[3,1],[5,2],[7,3],[11,4]] as [count, grp]}
            {#each Array.from({length: count}, (_, k) => k) as k}
              <rect
                x={grp * 88 + k * 12 + 20}
                y={15}
                width="8" height="35"
                fill="#F5A623" opacity="0.85" rx="2"/>
            {/each}
            <text x={grp * 88 + (count * 12)/2 + 20} y="62" text-anchor="middle" font-size="10" font-family="mono" fill="#F5A623" opacity="0.5">{count}</text>
          {/each}
          <text x="20" y="8" font-size="9" font-family="mono" fill="#E8EDF2" opacity="0.3">Rocky transmits →</text>
          <!-- Grace response -->
          {#each [[13,5.1],[17,6.1]] as [count, grp]}
            {#each Array.from({length: count > 13 ? 10 : count}, (_, k) => k) as k}
              <rect
                x={grp * 88 + k * 7 + 20}
                y={15} width="5" height="35"
                fill="#00D4FF" opacity="0.7" rx="2"/>
            {/each}
          {/each}
        </svg>

      {:else if current.visual === 'math'}
        <!-- Math equation visualization -->
        <svg viewBox="0 0 560 70" class="w-full">
          <rect width="560" height="70" fill="#050A14"/>
          {#each [
            {label:'2', x:20},  {label:'+', x:55, sym:true},  {label:'2', x:90},
            {label:'=', x:130, sym:true},  {label:'4', x:165},
            {label:'·', x:220, dim:true},
            {label:'3', x:260},  {label:'+', x:295, sym:true},  {label:'4', x:330},
            {label:'=', x:370, sym:true},  {label:'7', x:405},
          ] as item}
            <text x={item.x} y="42" font-size={item.sym ? 22 : 28} font-family="mono"
              fill={item.sym ? '#00D4FF' : '#F5A623'}
              opacity={item.dim ? 0.2 : item.sym ? 0.8 : 0.9}>{item.label}</text>
          {/each}
          <text x="20" y="65" font-size="9" font-family="mono" fill="#E8EDF2" opacity="0.3">arithmetic grammar — shared in ~2 hours</text>
        </svg>

      {:else if current.visual === 'physics'}
        <!-- Echo timing -->
        <svg viewBox="0 0 560 70" class="w-full">
          <rect width="560" height="70" fill="#050A14"/>
          <!-- Wall tap -->
          <rect x="20" y="15" width="10" height="40" fill="#F5A623" opacity="0.9" rx="2"/>
          <text x="25" y="10" font-size="9" font-family="mono" fill="#F5A623" opacity="0.6" text-anchor="middle">tap</text>
          <!-- Sound wave travels -->
          {#each [1,2,3,4,5] as i}
            <ellipse cx={20 + i*90} cy="35" rx={i*4} ry={15} fill="none" stroke="#F5A623" stroke-width="0.8" opacity={0.6/i}/>
          {/each}
          <!-- Echo returns -->
          <rect x="538" y="15" width="10" height="40" fill="#00D4FF" opacity="0.7" rx="2"/>
          <text x="543" y="10" font-size="9" font-family="mono" fill="#00D4FF" opacity="0.6" text-anchor="middle">echo</text>
          <!-- Time label -->
          <line x1="20" y1="62" x2="548" y2="62" stroke="#E8EDF2" stroke-width="0.5" opacity="0.2"/>
          <text x="284" y="72" text-anchor="middle" font-size="9" font-family="mono" fill="#E8EDF2" opacity="0.4">Δt = 1 shared second</text>
        </svg>

      {:else if current.visual === 'chemistry'}
        <!-- Atomic number sequences -->
        <svg viewBox="0 0 560 70" class="w-full">
          <rect width="560" height="70" fill="#050A14"/>
          <!-- H2O -->
          <text x="20" y="12" font-size="9" font-family="mono" fill="#00D4FF" opacity="0.5">Grace sends H₂O:</text>
          {#each [
            {n:1,label:'H',x:20},{n:2,label:'×2',x:50},{n:8,label:'O',x:85},{n:1,label:'×1',x:115}
          ] as a}
            <rect x={a.x} y="18" width="26" height="28" rx="4" fill="#00D4FF" opacity="0.15" stroke="#00D4FF" stroke-width="0.8" stroke-opacity="0.4"/>
            <text x={a.x+13} y="33" text-anchor="middle" font-size="13" font-family="mono" fill="#00D4FF" opacity="0.85">{a.n}</text>
            <text x={a.x+13} y="43" text-anchor="middle" font-size="7" font-family="mono" fill="#00D4FF" opacity="0.5">{a.label}</text>
          {/each}
          <!-- NH3 -->
          <text x="200" y="12" font-size="9" font-family="mono" fill="#F5A623" opacity="0.5">Rocky replies NH₃:</text>
          {#each [
            {n:7,label:'N',x:200},{n:1,label:'H',x:230},{n:3,label:'×3',x:260}
          ] as a}
            <rect x={a.x} y="18" width="26" height="28" rx="4" fill="#F5A623" opacity="0.15" stroke="#F5A623" stroke-width="0.8" stroke-opacity="0.4"/>
            <text x={a.x+13} y="33" text-anchor="middle" font-size="13" font-family="mono" fill="#F5A623" opacity="0.85">{a.n}</text>
            <text x={a.x+13} y="43" text-anchor="middle" font-size="7" font-family="mono" fill="#F5A623" opacity="0.5">{a.label}</text>
          {/each}
          <text x="310" y="35" font-size="20" fill="#E8EDF2" opacity="0.15">→</text>
          <text x="340" y="40" font-size="11" font-family="Inter" fill="#E8EDF2" opacity="0.5">radically different biochemistries</text>
        </svg>
      {/if}
    </div>

    <!-- Message content -->
    <div class="px-4 pb-4 pt-2">
      <div class="flex gap-2 mb-2">
        <span class="text-xs font-mono px-2 py-0.5 rounded-full border
          {current.from === 'Rocky' ? 'border-astrophage/40 text-astrophage/80 bg-astrophage/8' :
           current.from === 'Both' ? 'border-white/20 text-starlight/60 bg-white/5' :
           'border-sci-cyan/40 text-sci-cyan/80 bg-sci-cyan/8'}">
          {current.from}
        </span>
        <span class="text-xs font-mono text-starlight/25">Stage {stageIdx + 1}</span>
      </div>
      <p class="text-starlight/50 text-sm font-mono mb-3 italic">"{current.summary}"</p>
      <p class="text-starlight/75 text-sm leading-relaxed mb-4">{current.detail}</p>

      <div class="bg-astrophage/8 border border-astrophage/25 rounded-lg p-3">
        <p class="text-xs font-mono text-astrophage/60 uppercase tracking-wider mb-1">Breakthrough</p>
        <p class="text-sm text-starlight/75">{current.breakthrough}</p>
      </div>
    </div>
  </div>

  <!-- Navigation -->
  <div class="flex justify-between">
    <button on:click={() => stageIdx = Math.max(0, stageIdx - 1)}
      disabled={stageIdx === 0}
      class="flex items-center gap-2 text-sm text-starlight/40 hover:text-astrophage transition-colors disabled:opacity-20 disabled:cursor-not-allowed">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
      Previous
    </button>
    <span class="text-xs font-mono text-starlight/25">{stageIdx + 1} / {stages.length}</span>
    <button on:click={() => stageIdx = Math.min(stages.length - 1, stageIdx + 1)}
      disabled={stageIdx === stages.length - 1}
      class="flex items-center gap-2 text-sm text-starlight/40 hover:text-astrophage transition-colors disabled:opacity-20 disabled:cursor-not-allowed">
      Next
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
  </div>
</div>
