<script lang="ts">
  // Speed as % of c (1–99.5)
  let speedPct = 92;

  const distanceLY = 11.9;
  const c = 1; // normalized

  $: v = speedPct / 100;
  $: gamma = 1 / Math.sqrt(1 - v * v);
  $: earthYears = distanceLY / v;
  $: shipYears = earthYears / gamma;

  // Ship position on trajectory (0–1)
  $: shipT = 0.52; // fixed midpoint display

  // Trajectory bezier: M 148 118 C 290 68 390 68 530 118
  function bezierPoint(t: number): { x: number; y: number } {
    const p0 = { x: 148, y: 118 };
    const p1 = { x: 290, y: 68 };
    const p2 = { x: 390, y: 68 };
    const p3 = { x: 530, y: 118 };
    const mt = 1 - t;
    return {
      x: mt**3*p0.x + 3*mt**2*t*p1.x + 3*mt*t**2*p2.x + t**3*p3.x,
      y: mt**3*p0.y + 3*mt**2*t*p1.y + 3*mt*t**2*p2.y + t**3*p3.y
    };
  }
  $: shipPos = bezierPoint(0.5);

  function fmt(n: number, dec = 1): string {
    return n.toFixed(dec);
  }

  // Precomputed stars for background
  const stars = [
    {x:180,y:40},{x:250,y:90},{x:310,y:35},{x:350,y:110},{x:400,y:50},
    {x:430,y:90},{x:200,y:130},{x:280,y:55},{x:370,y:75},{x:450,y:40},
    {x:480,y:120},{x:160,y:80},{x:320,y:100},{x:500,y:65}
  ];
</script>

<div class="flex flex-col gap-6">
  <!-- Trajectory SVG -->
  <div class="bg-deep-space border border-white/8 rounded-xl overflow-hidden">
    <svg viewBox="0 0 680 200" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <defs>
        <radialGradient id="solGrad" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stop-color="#FFFDE0" stop-opacity="1"/>
          <stop offset="50%" stop-color="#FFE066" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#FF6B35" stop-opacity="0.2"/>
        </radialGradient>
        <radialGradient id="tauGrad" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stop-color="#FFE0B2" stop-opacity="1"/>
          <stop offset="50%" stop-color="#F5A623" stop-opacity="0.7"/>
          <stop offset="100%" stop-color="#C07C0A" stop-opacity="0.2"/>
        </radialGradient>
        <filter id="starGlow2">
          <feGaussianBlur stdDeviation="6" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="shipGlow">
          <feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <marker id="trajArrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6 Z" fill="#F5A623" opacity="0.6"/>
        </marker>
      </defs>

      <rect width="680" height="200" fill="#050A14"/>

      <!-- Background stars -->
      {#each stars as s}
        <circle cx={s.x} cy={s.y} r="1" fill="white" opacity="0.2"/>
      {/each}

      <!-- Sol system (left) -->
      <!-- Solar corona glow -->
      <circle cx="80" cy="118" r="38" fill="url(#solGrad)" opacity="0.25" filter="url(#starGlow2)"/>
      <!-- Orbit rings -->
      <ellipse cx="80" cy="118" rx="28" ry="7" fill="none" stroke="#FFE066" stroke-width="0.5" opacity="0.2"/>
      <ellipse cx="80" cy="118" rx="44" ry="11" fill="none" stroke="#FFE066" stroke-width="0.5" opacity="0.15"/>
      <ellipse cx="80" cy="118" rx="60" ry="15" fill="none" stroke="#00D4FF" stroke-width="0.8" opacity="0.2"/>
      <!-- Earth dot -->
      <circle cx="140" cy="118" r="3" fill="#00D4FF" opacity="0.7"/>
      <!-- Sun -->
      <circle cx="80" cy="118" r="18" fill="url(#solGrad)" filter="url(#starGlow2)"/>
      <circle cx="80" cy="118" r="12" fill="#FFFDE0"/>
      <!-- Label -->
      <text x="80" y="158" text-anchor="middle" font-size="10" font-family="Inter" fill="#E8EDF2" opacity="0.4">Sol</text>

      <!-- Trajectory (dashed bezier) -->
      <path d="M 148 118 C 290 68 390 68 522 118"
        fill="none" stroke="#F5A623" stroke-width="1.5"
        stroke-dasharray="6 4" opacity="0.5"
        marker-end="url(#trajArrow)"/>

      <!-- Distance label -->
      <text x="340" y="60" text-anchor="middle" font-size="10" font-family="Inter" fill="#F5A623" opacity="0.5">11.9 light-years</text>
      <line x1="168" y1="65" x2="310" y2="65" stroke="#F5A623" stroke-width="0.5" opacity="0.2"/>
      <line x1="370" y1="65" x2="512" y2="65" stroke="#F5A623" stroke-width="0.5" opacity="0.2"/>

      <!-- Ship icon at midpoint -->
      <g transform="translate({shipPos.x},{shipPos.y}) rotate(-15)" filter="url(#shipGlow)">
        <!-- Hail Mary ship (simplified) -->
        <path d="M 0 -10 L 4 5 L 0 3 L -4 5 Z" fill="#E8EDF2" opacity="0.85"/>
        <!-- Engine glow -->
        <ellipse cx="0" cy="7" rx="3" ry="5" fill="#F5A623" opacity="0.6"/>
      </g>

      <!-- Tau Ceti system (right) -->
      <circle cx="600" cy="118" r="30" fill="url(#tauGrad)" opacity="0.2" filter="url(#starGlow2)"/>
      <ellipse cx="600" cy="118" rx="26" ry="6.5" fill="none" stroke="#F5A623" stroke-width="0.5" opacity="0.2"/>
      <ellipse cx="600" cy="118" rx="42" ry="10" fill="none" stroke="#F5A623" stroke-width="0.5" opacity="0.15"/>
      <circle cx="600" cy="118" r="15" fill="url(#tauGrad)" filter="url(#starGlow2)"/>
      <circle cx="600" cy="118" r="10" fill="#FFE0B2"/>
      <!-- Tau Ceti e (the relevant planet) -->
      <circle cx="558" cy="118" r="2.5" fill="#F5A623" opacity="0.6"/>
      <text x="600" y="158" text-anchor="middle" font-size="10" font-family="Inter" fill="#E8EDF2" opacity="0.4">Tau Ceti</text>

      <!-- Speed display -->
      <text x="340" y="185" text-anchor="middle" font-size="11" font-family="mono" fill="#F5A623" opacity="0.7">
        {speedPct}% c
      </text>
    </svg>
  </div>

  <!-- Speed slider -->
  <div>
    <div class="flex justify-between text-xs font-mono text-starlight/30 mb-2">
      <span>10% c — modest</span>
      <span>Hail Mary estimated ≈ 90–95% c</span>
      <span>99.5% c — theoretical max</span>
    </div>
    <input type="range" min="10" max="99.5" step="0.5" bind:value={speedPct} class="w-full"/>
  </div>

  <!-- Time dilation display -->
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <div class="bg-deep-space border border-white/8 rounded-xl p-5 text-center">
      <p class="text-xs font-mono text-starlight/35 uppercase tracking-wider mb-2">Travel Speed</p>
      <p class="text-3xl font-bold text-astrophage">{speedPct}<span class="text-lg font-normal opacity-50">% c</span></p>
      <p class="text-xs text-starlight/35 mt-1">{(speedPct * 299792.458).toLocaleString(undefined,{maximumFractionDigits:0})} km/s</p>
    </div>

    <div class="bg-deep-space border border-white/8 rounded-xl p-5 text-center">
      <p class="text-xs font-mono text-starlight/35 uppercase tracking-wider mb-2">Earth Time Elapsed</p>
      <p class="text-3xl font-bold text-starlight">{fmt(earthYears)}<span class="text-lg font-normal opacity-50"> yr</span></p>
      <p class="text-xs text-starlight/35 mt-1">Earth ages {fmt(earthYears)} years</p>
    </div>

    <div class="bg-deep-space border {speedPct > 70 ? 'border-astrophage/40' : 'border-white/8'} rounded-xl p-5 text-center transition-colors">
      <p class="text-xs font-mono text-starlight/35 uppercase tracking-wider mb-2">Ship Time (Ryland Grace)</p>
      <p class="text-3xl font-bold {speedPct > 70 ? 'text-astrophage' : 'text-starlight'}">{fmt(shipYears)}<span class="text-lg font-normal opacity-50"> yr</span></p>
      <p class="text-xs {speedPct > 70 ? 'text-astrophage/50' : 'text-starlight/35'} mt-1">γ = {fmt(gamma, 2)} — {fmt((1 - shipYears/earthYears)*100, 0)}% time savings</p>
    </div>
  </div>

  <!-- Context note -->
  <div class="bg-deep-space border border-white/8 rounded-xl p-5">
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
      {#each [
        { label: 'Destination', value: 'Tau Ceti e' },
        { label: 'Distance', value: '11.9 ly' },
        { label: 'Propulsion', value: 'Astrophage drives' },
        { label: 'Crew (at launch)', value: '3 (1 survived)' }
      ] as spec}
        <div>
          <p class="text-xs font-mono text-starlight/30 uppercase tracking-wider mb-1">{spec.label}</p>
          <p class="text-sm font-semibold text-starlight/80">{spec.value}</p>
        </div>
      {/each}
    </div>
    <div class="border-t border-white/6 pt-4">
      <p class="text-xs font-mono text-astrophage/60 uppercase tracking-wider mb-2">Why so fast?</p>
      <p class="text-sm text-starlight/60 leading-relaxed">
        Astrophage's 1 PJ/gram energy density gives the Hail Mary a specific impulse far beyond any
        rocket ever built. At ~90% c, relativistic time dilation becomes significant — Grace experiences
        only {fmt(shipYears)} years while Earth ages {fmt(earthYears)}. Without this effect, the mission
        would be a multi-generational voyage.
      </p>
    </div>
  </div>
</div>
