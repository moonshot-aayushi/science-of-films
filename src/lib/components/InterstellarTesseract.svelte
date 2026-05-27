<script lang="ts">
  let step = 0; // 0=1D, 1=2D, 2=3D, 3=4D(time), 4=bookshelf

  const steps = [
    {
      label: '1D · Line',
      shortLabel: '1D',
      title: 'One Dimension: Position',
      body: "A single dimension lets you describe position along a line. You can move forward or backward. There is no up, no left, only one axis. All of classical physics begins here: distance = speed × time.",
      color: '#00D4FF'
    },
    {
      label: '2D · Plane',
      shortLabel: '2D',
      title: 'Two Dimensions: A Surface',
      body: "Add a second axis perpendicular to the first and you get a plane. A 2D being could move anywhere on a sheet but could not step off it. They would have no concept of 'above' or 'below.' A flat circle drawn on a 2D plane is a complete barrier: no way through without leaving the plane.",
      color: '#60C0FF'
    },
    {
      label: '3D · Space',
      shortLabel: '3D',
      title: 'Three Dimensions: Our World',
      body: "The three spatial dimensions define physical reality as we experience it. A cube is the natural extension of a square into 3D. A sphere is the 3D extension of a circle. Our universe has three spatial dimensions, and also one more: time.",
      color: '#A0D0FF'
    },
    {
      label: '4D · Time',
      shortLabel: '4D',
      title: 'Four Dimensions: Adding Time',
      body: "Einstein's insight: time is a fourth dimension, mathematically equivalent to space. Every event in the universe is located at four coordinates: x, y, z, and t. The universe isn't a snapshot. It's a four-dimensional block called the spacetime manifold, where past, present, and future all exist simultaneously.",
      color: '#F5A623'
    },
    {
      label: '5D · The Bulk',
      shortLabel: '5D',
      title: 'Five Dimensions: The Tesseract',
      body: "Interstellar posits that advanced beings exist in five dimensions: three of space, one of time, and one more. From the fifth dimension, time becomes spatial and you can move through it the way we move through space. The 'Tesseract' is a 3D projection of this 5D structure, arranged so Cooper can reach any point in Murph's timeline by moving through shelves. The books falling from shelves encode Morse code messages, communicating through gravity across time.",
      color: '#FFD080'
    }
  ];

  $: current = steps[step];
</script>

<div class="flex flex-col gap-5">
  <!-- Step tabs -->
  <div class="flex gap-1.5">
    {#each steps as s, i}
      <button on:click={() => step = i}
        class="flex-1 py-1.5 rounded-lg text-xs font-mono transition-all border
          {step === i
            ? 'border-opacity-40 text-opacity-100'
            : 'text-starlight/35 border-white/8 hover:border-white/18'}"
        style={step === i ? `background: ${s.color}14; color: ${s.color}; border-color: ${s.color}40` : ''}>
        {s.shortLabel}
      </button>
    {/each}
  </div>

  <!-- SVG visualization -->
  <div class="bg-deep-space border border-white/8 rounded-xl overflow-hidden">
    <svg viewBox="0 0 480 200" class="w-full" style="max-height:200px">
      <rect width="480" height="200" fill="#050A14"/>

      {#if step === 0}
        <!-- 1D: Line -->
        <line x1="80" y1="100" x2="400" y2="100" stroke="#00D4FF" stroke-width="2.5" opacity="0.8"/>
        <circle cx="80" cy="100" r="4" fill="#00D4FF" opacity="0.6"/>
        <circle cx="400" cy="100" r="4" fill="#00D4FF" opacity="0.6"/>
        <circle cx="240" cy="100" r="6" fill="#00D4FF"/>
        <!-- arrows -->
        <polygon points="400,100 390,95 390,105" fill="#00D4FF" opacity="0.6"/>
        <polygon points="80,100 90,95 90,105" fill="#00D4FF" opacity="0.6"/>
        <text x="240" y="130" text-anchor="middle" font-size="9" font-family="mono" fill="#00D4FF60">← position →</text>

      {:else if step === 1}
        <!-- 2D: Grid + square -->
        {#each [60,120,180,240,300,360,420] as x}
          <line x1={x} y1="20" x2={x} y2="180" stroke="#60C0FF" stroke-width="0.4" opacity="0.12"/>
        {/each}
        {#each [40,80,120,160] as y}
          <line x1="40" y1={y} x2="440" y2={y} stroke="#60C0FF" stroke-width="0.4" opacity="0.12"/>
        {/each}
        <rect x="160" y="60" width="160" height="100" fill="#60C0FF" fill-opacity="0.12" stroke="#60C0FF" stroke-width="1.5" stroke-opacity="0.7"/>
        <circle cx="240" cy="110" r="5" fill="#60C0FF"/>
        <text x="240" y="175" text-anchor="middle" font-size="9" font-family="mono" fill="#60C0FF60">x and y axes</text>

      {:else if step === 2}
        <!-- 3D: Isometric cube -->
        {@const cx = 240} {@const cy = 100} {@const s = 52}
        <!-- Bottom face -->
        <polygon points="{cx},{cy+s*0.6} {cx+s},{cy+s*0.1} {cx},{cy-s*0.4} {cx-s},{cy+s*0.1}"
          fill="#A0D0FF" fill-opacity="0.08" stroke="#A0D0FF" stroke-width="1" stroke-opacity="0.5"/>
        <!-- Back-right face -->
        <polygon points="{cx+s},{cy+s*0.1} {cx+s},{cy-s*0.9} {cx},{cy-s*1.4} {cx},{cy-s*0.4}"
          fill="#A0D0FF" fill-opacity="0.04" stroke="#A0D0FF" stroke-width="0.8" stroke-opacity="0.4"/>
        <!-- Back-left face -->
        <polygon points="{cx-s},{cy+s*0.1} {cx-s},{cy-s*0.9} {cx},{cy-s*1.4} {cx},{cy-s*0.4}"
          fill="#A0D0FF" fill-opacity="0.07" stroke="#A0D0FF" stroke-width="0.8" stroke-opacity="0.4"/>
        <!-- Top face -->
        <polygon points="{cx},{cy-s*1.4} {cx+s},{cy-s*0.9} {cx},{cy-s*0.4} {cx-s},{cy-s*0.9}"
          fill="#A0D0FF" fill-opacity="0.12" stroke="#A0D0FF" stroke-width="1" stroke-opacity="0.6"/>
        <text x="240" y="175" text-anchor="middle" font-size="9" font-family="mono" fill="#A0D0FF60">x, y, and z</text>

      {:else if step === 3}
        <!-- 4D: cube + time axis -->
        {@const cx = 200} {@const cy = 110} {@const s = 44}
        <!-- Cube (dim) -->
        <polygon points="{cx},{cy+s*0.55} {cx+s},{cy+s*0.05} {cx},{cy-s*0.45} {cx-s},{cy+s*0.05}"
          fill="none" stroke="#A0D0FF" stroke-width="0.8" opacity="0.35"/>
        <polygon points="{cx+s},{cy+s*0.05} {cx+s},{cy-s*0.95} {cx},{cy-s*1.45} {cx},{cy-s*0.45}"
          fill="none" stroke="#A0D0FF" stroke-width="0.8" opacity="0.35"/>
        <polygon points="{cx-s},{cy+s*0.05} {cx-s},{cy-s*0.95} {cx},{cy-s*1.45} {cx},{cy-s*0.45}"
          fill="none" stroke="#A0D0FF" stroke-width="0.8" opacity="0.35"/>
        <polygon points="{cx},{cy-s*1.45} {cx+s},{cy-s*0.95} {cx},{cy-s*0.45} {cx-s},{cy-s*0.95}"
          fill="none" stroke="#A0D0FF" stroke-width="0.8" opacity="0.35"/>
        <!-- Time axis (horizontal, amber) -->
        <line x1="210" y1="115" x2="400" y2="115" stroke="#F5A623" stroke-width="2" opacity="0.8"/>
        <polygon points="400,115 390,110 390,120" fill="#F5A623" opacity="0.8"/>
        <!-- Time ticks -->
        {#each [240, 280, 320, 360] as tx}
          <line x1={tx} y1="111" x2={tx} y2="119" stroke="#F5A623" stroke-width="1" opacity="0.5"/>
        {/each}
        <text x="305" y="135" text-anchor="middle" font-size="9" font-family="mono" fill="#F5A62370">time →</text>
        <text x="200" y="175" text-anchor="middle" font-size="9" font-family="mono" fill="#A0D0FF50">3D space</text>
        <text x="305" y="90" text-anchor="middle" font-size="9" font-family="mono" fill="#F5A62360">4th dimension</text>

      {:else}
        <!-- 5D bookshelf / tesseract -->
        <!-- Multiple shelves representing time slices -->
        {#each [40, 80, 120, 160] as y, i}
          <rect x="60" y={y} width="360" height="28" rx="2"
            fill="#0D1525" stroke="#E8EDF2" stroke-width={i === 1 ? 1.2 : 0.5}
            opacity={i === 1 ? 0.35 : 0.12}/>
          <!-- Books on shelf -->
          {#each Array.from({length: 12}, (_, j) => j) as j}
            {@const bx = 65 + j * 29}
            <rect x={bx} y={y+2} width={17+j%3*3} height={20+j%4*2} rx="1"
              fill="hsl({j * 30}, 40%, {i === 1 ? 35 : 20}%)"
              opacity={i === 1 ? 0.7 : 0.3}/>
          {/each}
          <text x="430" y={y+17} font-size="8" font-family="mono"
            fill={i === 1 ? '#F5A623' : '#E8EDF220'}>
            {i === 0 ? 't−2' : i === 1 ? 'now' : i === 2 ? 't+2' : 't+4'}
          </text>
        {/each}
        <!-- Gravity message indicator -->
        <line x1="200" y1="92" x2="200" y2="78" stroke="#F5A623" stroke-width="1.5" opacity="0.7" stroke-dasharray="3 2"/>
        <circle cx="200" cy="92" r="3" fill="#F5A623" opacity="0.8"/>
        <text x="210" y="74" font-size="8" font-family="mono" fill="#F5A62370">gravity signal</text>
        <text x="240" y="185" text-anchor="middle" font-size="9" font-family="Inter" fill="#E8EDF225">
          Time as a spatial dimension, accessible from the 5th
        </text>
      {/if}
    </svg>
  </div>

  <!-- Explanation panel -->
  <div class="bg-deep-space border border-white/8 rounded-xl p-5" style="border-color: {current.color}18">
    <p class="text-sm font-semibold mb-2" style="color: {current.color}">{current.title}</p>
    <p class="text-sm text-starlight/65 leading-relaxed">{current.body}</p>
  </div>

  <!-- Step nav -->
  <div class="flex items-center gap-2 justify-center">
    {#each steps as _, i}
      <button on:click={() => step = i}
        class="rounded-full transition-all duration-200
          {i === step ? 'w-5 h-2' : 'w-2 h-2 bg-white/20 hover:bg-white/35'}"
        style={i === step ? `background: ${current.color}; width: 20px; height: 8px` : ''}>
      </button>
    {/each}
  </div>
</div>
