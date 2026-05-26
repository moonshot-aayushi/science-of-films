<script lang="ts">
  let view: 'sphere' | 'bridge' | 'film' = 'sphere';
  function setView(v: string) {
    if (v === 'sphere' || v === 'bridge' || v === 'film') view = v;
  }

  // Stars for "other side" of wormhole
  const innerStars = Array.from({length: 40}, (_, i) => ({
    x: 160 + (Math.sin(i * 3.14159) * 0.5 + 0.5) * 130,
    y: 60  + (Math.cos(i * 2.71828) * 0.5 + 0.5) * 130,
    r: i % 4 === 0 ? 1.4 : 0.7,
    o: 0.3 + (i % 5) * 0.13,
    hue: [200, 220, 240, 180, 160][i % 5]
  }));

  // Outer stars
  const outerStars = Array.from({length: 60}, (_, i) => ({
    x: ((Math.sin(i * 2.4) + 1) / 2) * 450,
    y: ((Math.cos(i * 1.6) + 1) / 2) * 260,
    r: i % 3 === 0 ? 1.2 : 0.6,
    o: 0.2 + (i % 6) * 0.08
  })).filter(s => {
    const dx = s.x - 225, dy = s.y - 130;
    return Math.sqrt(dx*dx + dy*dy) > 85;
  });

  const panels = {
    sphere: {
      title: 'Why a Sphere, Not a Ring',
      body: "Most sci-fi depicts wormholes as flat rings or portals. Interstellar — advised by Kip Thorne — showed it correctly: a perfect sphere. A wormhole is a tunnel in three-dimensional space. Its mouth is a sphere, just as a hole in a 2D sheet appears as a circle. Looking at it, you'd see the stars of the destination galaxy distorted across its surface — like a cosmic lens ball."
    },
    bridge: {
      title: 'The Einstein-Rosen Bridge',
      body: "Einstein and Rosen's 1935 paper described a 'bridge' connecting two separate regions of spacetime. In theory, extreme mass-energy warps space enough to create a shortcut. The problem: any naturally-forming wormhole collapses almost instantly. Traversable wormholes require 'exotic matter' with negative energy density — which may not exist. Interstellar's wormhole was placed there by 'them' — fifth-dimensional beings who presumably solved this problem."
    },
    film: {
      title: "Saturn's Wormhole",
      body: "The film places the wormhole in Saturn's orbit, at the Lagrange point L2. Its location near Saturn wasn't arbitrary — by the time of the story, humanity had 48 years to mount crewed missions to study it (since Lazarus missions began decades earlier). Saturn's placement gave the Endurance a gravity-assist opportunity and provided a recognizable landmark for audiences. The sphere is ~2 km in diameter in the film."
    }
  };

  $: panel = panels[view];
</script>

<div class="flex flex-col gap-5">
  <!-- SVG wormhole visualization -->
  <div class="bg-black rounded-xl overflow-hidden border border-white/6">
    <svg viewBox="0 0 450 260" class="w-full" style="max-height:260px">
      <defs>
        <radialGradient id="wormSurface" cx="40%" cy="38%" r="65%">
          <stop offset="0%"   stop-color="#B0D8FF" stop-opacity="0.9"/>
          <stop offset="30%"  stop-color="#60A8E0" stop-opacity="0.7"/>
          <stop offset="65%"  stop-color="#1040A0" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="#080820" stop-opacity="0.15"/>
        </radialGradient>
        <radialGradient id="wormEdge" cx="50%" cy="50%" r="50%">
          <stop offset="60%"  stop-color="#000000" stop-opacity="0"/>
          <stop offset="85%"  stop-color="#4090D0" stop-opacity="0.15"/>
          <stop offset="100%" stop-color="#60B0FF" stop-opacity="0.45"/>
        </radialGradient>
        <filter id="wglow">
          <feGaussianBlur stdDeviation="4" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <clipPath id="wormClip">
          <circle cx="225" cy="130" r="72"/>
        </clipPath>
      </defs>

      <!-- Black background -->
      <rect width="450" height="260" fill="#020408"/>

      <!-- Outer stars (our side) -->
      {#each outerStars as s}
        <circle cx={s.x} cy={s.y} r={s.r} fill="white" opacity={s.o}/>
      {/each}

      <!-- Gravitational lensing ring (stars bent around wormhole) -->
      <circle cx="225" cy="130" r="95" fill="none" stroke="#4080C0" stroke-width="0.6" opacity="0.25"/>
      <circle cx="225" cy="130" r="88" fill="none" stroke="#6090D0" stroke-width="0.5" opacity="0.18"/>

      <!-- Wormhole sphere surface: distorted stars from the other side -->
      <circle cx="225" cy="130" r="73" fill="url(#wormSurface)"/>

      <!-- Inner stars (other side of wormhole) — clipped to sphere -->
      <g clip-path="url(#wormClip)">
        {#each innerStars as s}
          <circle cx={s.x} cy={s.y} r={s.r}
            fill="hsl({s.hue}, 80%, 85%)" opacity={s.o}/>
        {/each}
        <!-- Distant galaxy glow on far side -->
        <ellipse cx="200" cy="110" rx="30" ry="18" fill="#A0C8FF" opacity="0.12"/>
        <ellipse cx="255" cy="155" rx="18" ry="12" fill="#C0D8FF" opacity="0.08"/>
      </g>

      <!-- Edge glow -->
      <circle cx="225" cy="130" r="73" fill="url(#wormEdge)"/>
      <circle cx="225" cy="130" r="74" fill="none" stroke="#60A8FF" stroke-width="2.5" opacity="0.55" filter="url(#wglow)"/>

      <!-- Label -->
      <text x="225" y="222" text-anchor="middle" font-size="9" font-family="Inter" fill="#E8EDF235">
        Looking through the wormhole: stars of the destination
      </text>

      <!-- Annotation: sphere shape -->
      <line x1="295" y1="105" x2="320" y2="88" stroke="#60A8FF" stroke-width="0.8" opacity="0.4"/>
      <text x="322" y="86" font-size="8" font-family="mono" fill="#60A8FF60">spherical mouth</text>
    </svg>
  </div>

  <!-- Tabs -->
  <div class="flex gap-1.5">
    {#each [['sphere', 'Sphere, Not Ring'], ['bridge', 'Einstein-Rosen Bridge'], ['film', 'In the Film']] as [id, label]}
      <button on:click={() => setView(id)}
        class="flex-1 py-1.5 rounded-lg text-xs font-mono transition-all border
          {view === id
            ? 'bg-sci-cyan/12 text-sci-cyan border-sci-cyan/35'
            : 'text-starlight/40 border-white/8 hover:border-white/18'}">
        {label}
      </button>
    {/each}
  </div>

  <!-- Panel content -->
  <div class="bg-deep-space border border-white/8 rounded-xl p-5">
    <p class="text-[10px] font-mono text-starlight/30 uppercase tracking-wider mb-2">{panel.title}</p>
    <p class="text-sm text-starlight/65 leading-relaxed">{panel.body}</p>
  </div>

  <!-- Comparison: wrong vs right -->
  <div class="grid grid-cols-2 gap-3">
    <div class="bg-deep-space border border-red-500/15 rounded-xl p-4">
      <p class="text-[10px] font-mono text-red-400/50 uppercase tracking-wider mb-2">Common Sci-Fi Trope</p>
      <div class="flex justify-center mb-3">
        <svg viewBox="0 0 80 60" width="80" height="60">
          <rect width="80" height="60" fill="#050A14"/>
          <ellipse cx="40" cy="30" rx="30" ry="10" fill="none" stroke="#6060A0" stroke-width="1.5" opacity="0.6"/>
          <ellipse cx="40" cy="30" rx="30" ry="10" fill="#2030A0" opacity="0.2"/>
          <line x1="10" y1="30" x2="70" y2="30" stroke="#A0A0FF" stroke-width="0.8" opacity="0.4"/>
        </svg>
      </div>
      <p class="text-xs text-starlight/40 text-center">Flat ring or portal</p>
    </div>
    <div class="bg-deep-space border border-sci-cyan/15 rounded-xl p-4">
      <p class="text-[10px] font-mono text-sci-cyan/50 uppercase tracking-wider mb-2">Physically Correct</p>
      <div class="flex justify-center mb-3">
        <svg viewBox="0 0 80 60" width="80" height="60">
          <rect width="80" height="60" fill="#050A14"/>
          <circle cx="40" cy="30" r="22" fill="#102040" opacity="0.8"/>
          <circle cx="40" cy="30" r="22" fill="none" stroke="#4090C0" stroke-width="1.5" opacity="0.7"/>
          <circle cx="40" cy="30" r="22" fill="#2060A0" opacity="0.15"/>
          <!-- Stars inside -->
          {#each [35,48,38,42,52,30] as cx, i}
            <circle {cx} cy={22 + i * 3} r="0.8" fill="#A0C8FF" opacity="0.6"/>
          {/each}
        </svg>
      </div>
      <p class="text-xs text-starlight/40 text-center">Three-dimensional sphere</p>
    </div>
  </div>
</div>
