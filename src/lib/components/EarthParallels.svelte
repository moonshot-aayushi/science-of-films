<script lang="ts">
  let expanded: number | null = null;

  const organisms = [
    {
      name: 'Chloroplasts',
      emoji: '🌿',
      habitat: 'Plant cells',
      energySource: 'Sunlight (400–700 nm)',
      survivalRange: '−5°C to 45°C',
      efficiency: '~3–6% solar conversion',
      connection: 'Astrophage\'s photoreceptor lattice is a direct analogue of the thylakoid membrane in chloroplasts — both convert photons into stored chemical energy. Astrophage appears to do this at roughly 1,000× greater efficiency, however.',
      keydiff: 'Chloroplasts require liquid water. Astrophage thrives in near-vacuum stellar corona at millions of degrees.'
    },
    {
      name: 'Tardigrades',
      emoji: '🐾',
      habitat: 'Everywhere (moss, oceans, glaciers)',
      energySource: 'Organic matter',
      survivalRange: '−272°C to +150°C',
      efficiency: 'N/A — metabolic suspension',
      connection: 'Tardigrades enter cryptobiosis and survive conditions that should be lethal — near-absolute-zero, hard vacuum, intense radiation. Astrophage similarly operates in an environment that should be incompatible with any life we know.',
      keydiff: 'Tardigrades survive extremes by suspending life; Astrophage thrives actively within them.'
    },
    {
      name: 'D. radiodurans',
      emoji: '⚡',
      habitat: 'Radioactive waste sites, deserts',
      energySource: 'Organic compounds',
      survivalRange: 'Can survive 1.5 million rad of radiation',
      efficiency: 'Repairs own DNA within hours',
      connection: 'Called "Conan the Bacterium," D. radiodurans can survive radiation doses 3,000× the lethal dose for humans by rapidly repairing shattered DNA. Astrophage\'s membrane similarly appears to handle the extreme radiation of a stellar corona.',
      keydiff: 'D. radiodurans repairs damage reactively. Astrophage\'s membrane proactively blocks harmful wavelengths.'
    },
    {
      name: 'Chemolithotrophs',
      emoji: '🌋',
      habitat: 'Deep-sea hydrothermal vents',
      energySource: 'Inorganic chemicals (H₂S, Fe²⁺)',
      survivalRange: 'Up to 121°C (Strain 121)',
      efficiency: '~40% chemical conversion',
      connection: 'Chemolithotrophs live in total darkness, deriving energy from inorganic chemistry rather than sunlight. They demonstrate that photosynthesis is not the only viable energy strategy for life — Astrophage independently evolved an even more exotic one.',
      keydiff: 'Vent organisms use chemical gradients; Astrophage uses stellar photon flux — both exploit extreme environmental energy sources.'
    }
  ];
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
  {#each organisms as org, i}
    <button
      on:click={() => expanded = expanded === i ? null : i}
      class="text-left bg-deep-space border rounded-xl overflow-hidden transition-all duration-300
        {expanded === i ? 'border-astrophage/50 glow-amber-sm' : 'border-white/8 hover:border-astrophage/25'}">

      <div class="p-5">
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center gap-3">
            <span class="text-2xl">{org.emoji}</span>
            <div>
              <h4 class="font-semibold text-starlight">{org.name}</h4>
              <p class="text-xs text-starlight/40 font-mono">{org.habitat}</p>
            </div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            class="text-astrophage/50 mt-1 transition-transform duration-300 flex-shrink-0
              {expanded === i ? 'rotate-180' : ''}">
            <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>

        <div class="grid grid-cols-2 gap-2 text-xs">
          <div>
            <p class="text-starlight/35 font-mono uppercase tracking-wider mb-0.5">Energy</p>
            <p class="text-starlight/65">{org.energySource}</p>
          </div>
          <div>
            <p class="text-starlight/35 font-mono uppercase tracking-wider mb-0.5">Survival</p>
            <p class="text-starlight/65">{org.survivalRange}</p>
          </div>
        </div>

        {#if expanded === i}
          <div class="mt-4 pt-4 border-t border-white/8">
            <p class="text-sm text-starlight/75 leading-relaxed mb-3">{org.connection}</p>
            <div class="bg-astrophage/6 border border-astrophage/20 rounded-lg p-3">
              <p class="text-xs font-mono text-astrophage/70 uppercase tracking-wider mb-1">Key Difference</p>
              <p class="text-xs text-starlight/60 leading-relaxed">{org.keydiff}</p>
            </div>
          </div>
        {/if}
      </div>
    </button>
  {/each}
</div>

<p class="text-starlight/35 text-xs font-mono mt-5 text-center">
  Click any organism to see its connection to Astrophage biology
</p>
