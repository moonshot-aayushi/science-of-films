<script lang="ts">
  let radius = 45;  // metres
  let rpm    = 3.7; // rotations per minute

  $: omega   = (2 * Math.PI * rpm) / 60;          // rad/s
  $: gForce  = (omega * omega * radius) / 9.81;    // g's
  $: period  = rpm > 0 ? 60 / rpm : 999;          // seconds per rotation (for CSS animation)

  type Status = 'low' | 'coriolis' | 'good' | 'high';
  $: status = ((): Status => {
    if (gForce < 0.3)  return 'low';
    if (rpm > 3.0)     return 'coriolis';
    if (gForce > 1.4)  return 'high';
    return 'good';
  })();

  const statusInfo: Record<Status, { label: string; color: string; note: string }> = {
    low:       { label: 'Insufficient gravity',  color: '#EF4444', note: 'Below 0.3g — muscle and bone loss accelerates significantly.' },
    coriolis:  { label: 'Coriolis risk',          color: '#F59E0B', note: 'Above ~3 RPM the Coriolis effect causes nausea when moving your head. The inner ear detects rotation the ring can\'t mask.' },
    good:      { label: 'Comfortable',            color: '#22C55E', note: 'Good balance of gravity and rotation rate. Crew can work normally.' },
    high:      { label: 'Excessive g-force',      color: '#F59E0B', note: 'Above 1.4g — fatigue sets in. Heavy for continuous habitation.' }
  };

  // Reference designs
  const refs = [
    { name: 'Endurance (est.)', r: 45,   rpm: 3.7,  g: 1.0,  note: 'Interstellar film estimate' },
    { name: 'ISS',              r: 0,    rpm: 0,    g: 0,    note: 'No rotation, microgravity' },
    { name: 'Von Braun Station',r: 110,  rpm: 3.0,  g: 1.0,  note: 'NASA/Orbital Assembly concept' },
    { name: 'O\'Neill Cylinder',r: 3200, rpm: 0.95, g: 1.0,  note: 'Classic 1970s mega-colony design' },
    { name: 'Discovery One',    r: 5.5,  rpm: 5.6,  g: 0.1,  note: '2001: A Space Odyssey' }
  ];
</script>

<style>
  .ring-group {
    animation: spin linear infinite;
    transform-origin: 240px 150px;
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
</style>

<div class="flex flex-col gap-5">

  <!-- Rotating ring visualisation -->
  <div class="bg-black rounded-xl overflow-hidden border border-white/6">
    <svg viewBox="0 0 480 300" class="w-full" style="max-height:300px">
      <defs>
        <radialGradient id="ringGlow" cx="50%" cy="50%" r="50%">
          <stop offset="60%"  stop-color="#000000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#00D4FF"  stop-opacity="0.12"/>
        </radialGradient>
        <filter id="cglow">
          <feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      <!-- Background -->
      <rect width="480" height="300" fill="#020408"/>

      <!-- Starfield -->
      {#each Array.from({length: 55}, (_, i) => i) as i}
        {@const sx = ((Math.sin(i * 2.4) + 1) / 2) * 480}
        {@const sy = ((Math.cos(i * 1.7) + 1) / 2) * 300}
        <circle cx={sx} cy={sy} r={i % 5 === 0 ? 1.2 : 0.6} fill="white" opacity={0.15 + (i%6)*0.07}/>
      {/each}

      <!-- Glow behind ring -->
      <circle cx="240" cy="150" r="90" fill="url(#ringGlow)"/>

      <!-- Rotating group: ring + spokes + cabins -->
      <g class="ring-group" style="animation-duration: {period}s">

        <!-- 4 spokes -->
        {#each [0, 90, 180, 270] as angle}
          <line
            x1="240" y1="150"
            x2={240 + 75 * Math.cos((angle * Math.PI) / 180)}
            y2={150 + 75 * Math.sin((angle * Math.PI) / 180)}
            stroke="#00D4FF" stroke-width="1.2" opacity="0.35"/>
        {/each}

        <!-- Habitat ring -->
        <circle cx="240" cy="150" r="75" fill="none" stroke="#00D4FF" stroke-width="5" opacity="0.55"/>
        <circle cx="240" cy="150" r="75" fill="none" stroke="#80E8FF" stroke-width="1" opacity="0.4"/>

        <!-- Cabin modules on ring (at 4 points) -->
        {#each [0, 90, 180, 270] as angle}
          {@const mx = 240 + 75 * Math.cos((angle * Math.PI) / 180)}
          {@const my = 150 + 75 * Math.sin((angle * Math.PI) / 180)}
          <rect
            x={mx - 8} y={my - 5}
            width="16" height="10" rx="2"
            fill="#0A2030" stroke="#00D4FF" stroke-width="1" opacity="0.85"/>
        {/each}

        <!-- Gravity arrows (pointing outward on ring, 8 of them) -->
        {#each Array.from({length: 8}, (_, i) => i) as i}
          {@const a = (i / 8) * Math.PI * 2}
          {@const ax = 240 + 75 * Math.cos(a)}
          {@const ay = 150 + 75 * Math.sin(a)}
          {@const arrowLen = Math.min(gForce * 12, 22)}
          <line
            x1={ax} y1={ay}
            x2={ax + arrowLen * Math.cos(a)}
            y2={ay + arrowLen * Math.sin(a)}
            stroke="#F5A623" stroke-width="1.2"
            opacity={Math.min(gForce * 0.7, 0.7)}/>
          <polygon
            points="{ax + arrowLen * Math.cos(a)},{ay + arrowLen * Math.sin(a)}
                    {ax + (arrowLen-5) * Math.cos(a) + 3*Math.sin(a)},{ay + (arrowLen-5)*Math.sin(a) - 3*Math.cos(a)}
                    {ax + (arrowLen-5) * Math.cos(a) - 3*Math.sin(a)},{ay + (arrowLen-5)*Math.sin(a) + 3*Math.cos(a)}"
            fill="#F5A623"
            opacity={Math.min(gForce * 0.7, 0.7)}/>
        {/each}
      </g>

      <!-- Central hub (doesn't rotate — counter-rotates in reality) -->
      <circle cx="240" cy="150" r="16" fill="#0A1828" stroke="#00D4FF" stroke-width="1.5" opacity="0.8"/>
      <circle cx="240" cy="150" r="7"  fill="#00D4FF" opacity="0.25"/>
      <circle cx="240" cy="150" r="3"  fill="#00D4FF" opacity="0.6"/>

      <!-- G-force readout overlay -->
      <rect x="10" y="10" width="110" height="44" rx="6" fill="#0D1525" opacity="0.85"/>
      <text x="20" y="28" font-size="9" font-family="mono" fill="#E8EDF240" letter-spacing="1">G-FORCE</text>
      <text x="20" y="47" font-size="20" font-family="mono" font-weight="bold"
        fill={status === 'good' ? '#22C55E' : status === 'low' ? '#EF4444' : '#F59E0B'}>
        {gForce.toFixed(2)}g
      </text>

      <!-- RPM readout -->
      <rect x="370" y="10" width="100" height="44" rx="6" fill="#0D1525" opacity="0.85"/>
      <text x="380" y="28" font-size="9" font-family="mono" fill="#E8EDF240" letter-spacing="1">ROTATION</text>
      <text x="380" y="47" font-size="17" font-family="mono" font-weight="bold" fill="#00D4FF">
        {rpm.toFixed(1)} rpm
      </text>

      <!-- Direction label -->
      <text x="240" y="292" text-anchor="middle" font-size="8.5" font-family="Inter" fill="#E8EDF220">
        Centrifugal force pushes crew outward → feels like gravity on ring floor
      </text>
    </svg>
  </div>

  <!-- Status banner -->
  <div class="rounded-xl px-4 py-3 border flex items-center gap-3"
    style="background: {statusInfo[status].color}10; border-color: {statusInfo[status].color}30">
    <div class="w-2.5 h-2.5 rounded-full flex-shrink-0" style="background:{statusInfo[status].color}"></div>
    <div>
      <span class="text-sm font-semibold" style="color:{statusInfo[status].color}">{statusInfo[status].label}</span>
      <span class="text-sm text-starlight/50 ml-2">{statusInfo[status].note}</span>
    </div>
  </div>

  <!-- Sliders -->
  <div class="bg-deep-space border border-white/8 rounded-xl p-5 space-y-5">
    <!-- Radius slider -->
    <div>
      <div class="flex justify-between items-center mb-2">
        <p class="text-xs font-mono text-starlight/40">Ring Radius</p>
        <span class="text-sm font-mono font-bold text-sci-cyan">{radius} m</span>
      </div>
      <input type="range" min="10" max="400" step="1" bind:value={radius}
        class="w-full accent-sci-cyan"/>
      <div class="flex justify-between text-[10px] font-mono text-starlight/20 mt-1">
        <span>10 m (tiny)</span>
        <span>400 m (large)</span>
      </div>
    </div>

    <!-- RPM slider -->
    <div>
      <div class="flex justify-between items-center mb-2">
        <p class="text-xs font-mono text-starlight/40">Rotation Rate</p>
        <div class="flex items-center gap-2">
          {#if rpm > 3}
            <span class="text-[10px] font-mono text-amber-400/70 border border-amber-400/30 rounded px-1.5 py-0.5">Coriolis risk</span>
          {/if}
          <span class="text-sm font-mono font-bold text-astrophage">{rpm.toFixed(1)} RPM</span>
        </div>
      </div>
      <input type="range" min="0.2" max="6" step="0.1" bind:value={rpm}
        class="w-full accent-astrophage"/>
      <div class="flex justify-between text-[10px] font-mono text-starlight/20 mt-1">
        <span>0.2 RPM</span>
        <span class="text-amber-400/40">3 RPM limit ↑</span>
        <span>6 RPM</span>
      </div>
    </div>

    <!-- Derived values -->
    <div class="grid grid-cols-3 gap-2 pt-2 border-t border-white/5">
      <div class="text-center">
        <p class="text-[10px] font-mono text-starlight/30 mb-0.5">ω (rad/s)</p>
        <p class="text-sm font-mono font-bold text-starlight/70">{omega.toFixed(3)}</p>
      </div>
      <div class="text-center">
        <p class="text-[10px] font-mono text-starlight/30 mb-0.5">Period</p>
        <p class="text-sm font-mono font-bold text-starlight/70">{period.toFixed(1)} s</p>
      </div>
      <div class="text-center">
        <p class="text-[10px] font-mono text-starlight/30 mb-0.5">Floor speed</p>
        <p class="text-sm font-mono font-bold text-starlight/70">{(omega * radius).toFixed(1)} m/s</p>
      </div>
    </div>
  </div>

  <!-- Reference designs -->
  <div class="bg-deep-space border border-white/8 rounded-xl overflow-hidden">
    <div class="px-5 py-3 border-b border-white/5">
      <p class="text-[10px] font-mono text-starlight/30 uppercase tracking-widest">Reference Designs — click to load</p>
    </div>
    {#each refs as ref}
      <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
      <div class="flex items-center gap-4 px-5 py-3 border-b border-white/4 last:border-0 cursor-pointer hover:bg-white/3 transition-colors"
        on:click={() => { radius = ref.r || 45; rpm = ref.rpm || 0.1; }}>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-starlight/80">{ref.name}</p>
          <p class="text-[10px] text-starlight/30 mt-0.5">{ref.note}</p>
        </div>
        <div class="flex gap-4 text-right flex-shrink-0">
          <div>
            <p class="text-[10px] font-mono text-starlight/25">r</p>
            <p class="text-xs font-mono text-starlight/60">{ref.r}m</p>
          </div>
          <div>
            <p class="text-[10px] font-mono text-starlight/25">RPM</p>
            <p class="text-xs font-mono text-starlight/60">{ref.rpm}</p>
          </div>
          <div>
            <p class="text-[10px] font-mono text-starlight/25">g</p>
            <p class="text-xs font-mono text-sci-cyan">{ref.g}</p>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <!-- Physics note -->
  <div class="bg-deep-space border border-white/8 rounded-xl p-5">
    <p class="text-[10px] font-mono text-starlight/30 uppercase tracking-wider mb-2">The Coriolis Problem</p>
    <p class="text-sm text-starlight/60 leading-relaxed">
      Spinning fast enough creates gravity, but the inner ear notices the rotation. Above ~2–3 RPM, simply turning your head triggers vertigo — the semicircular canals detect angular motion the visual system can't explain. The only solution is a bigger ring: double the radius, halve the RPM needed for the same g-force. Real centrifuge proposals — Von Braun Station, Nautilus-X — all aim for a ≥100m radius to keep RPM below the nausea threshold. The Endurance sits right at the edge.
    </p>
  </div>
</div>
