<script lang="ts">
  import AstrophageDiagram from '$lib/components/AstrophageDiagram.svelte';
  import PhotonEngine from '$lib/components/PhotonEngine.svelte';
  import EarthParallels from '$lib/components/EarthParallels.svelte';
  import PetrovaEffect from '$lib/components/PetrovaEffect.svelte';
  import RockyLanguage from '$lib/components/RockyLanguage.svelte';
  import RockyPhysiology from '$lib/components/RockyPhysiology.svelte';
  import MissionDesign from '$lib/components/MissionDesign.svelte';
  import GraceBiology from '$lib/components/GraceBiology.svelte';

  type Chapter = { id: string; shortLabel: string; label: string; icon: string; intro: string };
  type Section = { label: string; chapters: Chapter[] };

  const sections: Section[] = [
    {
      label: 'Astrophage Biology',
      chapters: [
        {
          id: 'organism', shortLabel: 'The Organism', icon: '⊕', label: 'Meet the Astrophage',
          intro: 'A single-celled organism ~2 μm in diameter. It lives in the corona of stars, converts photons directly into stored energy, and reproduces with exponential ferocity. Click any structure in the diagram to explore its biology.'
        },
        {
          id: 'photon', shortLabel: 'Photon Engine', icon: '⚡', label: 'The Photon Engine',
          intro: 'Astrophage captures 585 nm light and stores it as chemical bonds at an efficiency ~20× greater than nuclear fission. Press play to watch the full conversion cycle — from incoming photon to charged vacuole to reproduction.'
        },
        {
          id: 'parallels', shortLabel: 'Earth Science', icon: '🌍', label: 'Earth Parallels',
          intro: 'Astrophage is fiction — but the science it\'s built on isn\'t. Real organisms on Earth have evolved analogous strategies for surviving extreme environments and extracting unusual energy. Explore four real-world parallels.'
        },
        {
          id: 'petrova', shortLabel: 'Petrova Effect', icon: '★', label: 'The Petrova Effect',
          intro: 'When a colony grows large enough, it visibly dims its host star — the "Petrova line." Drag the slider to see how even a tiny coverage fraction translates into an almost incomprehensible energy drain.'
        }
      ]
    },
    {
      label: 'Rocky the Eridian',
      chapters: [
        {
          id: 'rocky-lang', shortLabel: 'Language', icon: '◎', label: 'Rocky\'s Language',
          intro: 'Two intelligent species with no shared language, no common history, and completely different biochemistries — meeting in the void between stars. Step through the five stages by which Grace and Rocky bootstrapped a working language from scratch using only mathematics and physics.'
        },
        {
          id: 'rocky-phys', shortLabel: 'Physiology', icon: '⟡', label: 'Rocky\'s Physiology',
          intro: 'Rocky is not a variation on human biology — he\'s a fundamentally different solution to the problem of being alive. Ammonia as a solvent, 210°C as optimal temperature, five equal-function arms, sonar as primary sense. Explore how each difference maps to real xenobiology science.'
        }
      ]
    },
    {
      label: 'The Hail Mary Mission',
      chapters: [
        {
          id: 'mission', shortLabel: 'Mission Design', icon: '⌖', label: 'The Hail Mary Mission',
          intro: 'A one-way trip to a star 11.9 light-years away, piloted by a sole crew member who doesn\'t know why he\'s there. Drag the speed slider to see how relativistic time dilation makes interstellar travel survivable — and what it costs the people left behind on Earth.'
        }
      ]
    },
    {
      label: 'The Human Factor',
      chapters: [
        {
          id: 'grace', shortLabel: 'Grace\'s Biology', icon: '♡', label: 'What the Mission Did to Grace',
          intro: 'Years in a medical coma aboard a ship traveling at relativistic speed. Toggle the medical pod off to see what would have happened without it — then back on to understand just how close to the edge Grace was living the entire voyage.'
        }
      ]
    }
  ];

  $: allChapters = sections.flatMap(s => s.chapters);
  $: activeChapter = allChapters[0].id;
  $: currentChapter = allChapters.find(c => c.id === activeChapter) ?? allChapters[0];
  $: currentIdx = allChapters.findIndex(c => c.id === activeChapter);

  // Suppress unused warning from $page
  // (slug page works for any film but content is PHM-specific for now)
</script>

<svelte:head>
  <title>Project Hail Mary — Science Explorer | Reel Science</title>
</svelte:head>

<!-- Film hero -->
<section class="relative overflow-hidden starfield border-b border-white/5">
  <div class="absolute inset-0 bg-gradient-to-b from-void/60 via-void/80 to-void pointer-events-none"></div>
  <div class="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-astrophage/5 blur-3xl pointer-events-none"></div>

  <div class="relative z-10 max-w-6xl mx-auto px-6 py-16 sm:py-20">
    <a href="/" class="inline-flex items-center gap-2 text-starlight/40 text-sm hover:text-astrophage transition-colors mb-8">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
      All Films
    </a>

    <div class="flex flex-col sm:flex-row gap-8 items-start">
      <div class="flex-shrink-0 relative">
        <div class="absolute inset-0 rounded-full bg-astrophage/20 blur-2xl animate-pulse-slow"></div>
        <svg width="112" height="112" viewBox="0 0 128 128" class="relative animate-float">
          <defs>
            <radialGradient id="heroOrb" cx="42%" cy="38%" r="60%">
              <stop offset="0%" stop-color="#FFD080" stop-opacity="0.9"/>
              <stop offset="55%" stop-color="#F5A623" stop-opacity="0.7"/>
              <stop offset="100%" stop-color="#C07C0A" stop-opacity="0.2"/>
            </radialGradient>
            <filter id="heroGlow">
              <feGaussianBlur stdDeviation="5" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <ellipse cx="64" cy="64" rx="46" ry="39" fill="url(#heroOrb)" filter="url(#heroGlow)"/>
          <ellipse cx="64" cy="64" rx="46" ry="39" fill="none" stroke="#F5A623" stroke-width="1.5" opacity="0.7"/>
          {#each Array.from({length: 16}, (_, i) => i) as i}
            <circle cx={64 + 45 * Math.cos((i/16)*Math.PI*2)} cy={64 + 38 * Math.sin((i/16)*Math.PI*2)} r="3" fill="#F5A623" opacity="0.75"/>
          {/each}
          <circle cx="64" cy="64" r="13" fill="#C07C0A" opacity="0.7"/>
          <circle cx="64" cy="64" r="6" fill="#FFD080" filter="url(#heroGlow)"/>
        </svg>
      </div>

      <div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <span class="text-xs font-mono text-astrophage/70 border border-astrophage/25 rounded-full px-3 py-1">Andy Weir · 2025</span>
          <span class="text-xs font-mono text-starlight/30">·</span>
          {#each sections as section}
            <span class="text-xs font-mono text-starlight/35">{section.label}</span>
          {/each}
        </div>
        <h1 class="text-4xl sm:text-5xl font-bold text-starlight mb-3 leading-tight">Project Hail Mary</h1>
        <p class="text-starlight/55 text-lg max-w-xl leading-relaxed">
          A lone astronaut. A dying star. An alien that might be the solution.
          Eight chapters of interactive science.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Explorer -->
<div class="max-w-6xl mx-auto px-4 sm:px-6 py-10">
  <div class="flex flex-col lg:flex-row gap-8">

    <!-- Sidebar -->
    <nav class="lg:w-52 flex-shrink-0">
      <!-- Mobile: horizontal scrollable -->
      <div class="lg:hidden flex gap-1 overflow-x-auto pb-2">
        {#each allChapters as ch}
          <button on:click={() => activeChapter = ch.id}
            class="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-mono transition-all
              {activeChapter === ch.id ? 'bg-astrophage/15 text-astrophage border border-astrophage/40' : 'text-starlight/40 border border-white/10'}">
            {ch.shortLabel}
          </button>
        {/each}
      </div>

      <!-- Desktop: grouped sidebar -->
      <div class="hidden lg:block space-y-6">
        {#each sections as section}
          <div>
            <p class="text-[10px] font-mono uppercase tracking-widest text-starlight/20 px-3 mb-1.5">{section.label}</p>
            {#each section.chapters as ch}
              <button on:click={() => activeChapter = ch.id}
                class="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150
                  border-l-2
                  {activeChapter === ch.id
                    ? 'border-astrophage bg-astrophage/8 text-astrophage'
                    : 'border-transparent text-starlight/45 hover:text-starlight/75 hover:bg-white/4'}">
                <span class="text-sm leading-none opacity-70">{ch.icon}</span>
                <span>{ch.shortLabel}</span>
              </button>
            {/each}
          </div>
        {/each}

        <div class="pt-4 border-t border-white/5 px-3">
          <p class="text-[10px] font-mono text-starlight/20 leading-relaxed">
            Science grounded in Andy Weir's research and peer literature.
          </p>
        </div>
      </div>
    </nav>

    <!-- Chapter content -->
    <div class="flex-1 min-w-0">
      <!-- Chapter header -->
      <div class="mb-7">
        <div class="flex items-center gap-3 mb-2.5">
          <span class="text-xl opacity-70">{currentChapter.icon}</span>
          <h2 class="text-2xl font-bold text-starlight">{currentChapter.label}</h2>
        </div>
        <p class="text-starlight/55 leading-relaxed max-w-2xl text-[0.95rem]">{currentChapter.intro}</p>
      </div>

      <!-- Components -->
      {#if activeChapter === 'organism'}
        <AstrophageDiagram/>
        <div class="mt-7 grid grid-cols-3 gap-4">
          {#each [
            { label: 'Diameter', value: '~2 μm', sub: 'smaller than a red blood cell' },
            { label: 'Energy density', value: '1 PJ/g', sub: '10¹⁵ joules per gram' },
            { label: 'Division time', value: '~1 hr', sub: 'under ideal corona conditions' }
          ] as stat}
            <div class="bg-deep-space border border-white/8 rounded-xl p-4 text-center">
              <p class="text-xs font-mono text-starlight/30 uppercase tracking-wider mb-1">{stat.label}</p>
              <p class="text-xl font-bold text-astrophage mb-0.5">{stat.value}</p>
              <p class="text-xs text-starlight/35">{stat.sub}</p>
            </div>
          {/each}
        </div>

      {:else if activeChapter === 'photon'}
        <PhotonEngine/>
        <div class="mt-7 bg-deep-space border border-white/8 rounded-xl p-5">
          <p class="text-xs font-mono text-starlight/35 uppercase tracking-wider mb-2">The 585 nm Question</p>
          <p class="text-sm text-starlight/65 leading-relaxed">
            Why 585 nm? It falls in the yellow-amber visible spectrum — near the peak output of a G-type star's corona.
            Energetically rich enough to power complex biochemistry, long-wavelength enough to pass through material
            that would block gamma or X-ray radiation. An elegant evolutionary solution, even if entirely fictional.
          </p>
        </div>

      {:else if activeChapter === 'parallels'}
        <EarthParallels/>

      {:else if activeChapter === 'petrova'}
        <PetrovaEffect/>

      {:else if activeChapter === 'rocky-lang'}
        <RockyLanguage/>
        <div class="mt-7 grid grid-cols-3 gap-4">
          {#each [
            { label: 'Language established', value: '~3 days', sub: 'from first contact' },
            { label: 'Initial vocabulary', value: '200+', sub: 'concepts in first week' },
            { label: 'Language vector', value: 'Tones', sub: '37 distinct frequencies' }
          ] as stat}
            <div class="bg-deep-space border border-white/8 rounded-xl p-4 text-center">
              <p class="text-xs font-mono text-starlight/30 uppercase tracking-wider mb-1">{stat.label}</p>
              <p class="text-xl font-bold text-astrophage mb-0.5">{stat.value}</p>
              <p class="text-xs text-starlight/35">{stat.sub}</p>
            </div>
          {/each}
        </div>

      {:else if activeChapter === 'rocky-phys'}
        <RockyPhysiology/>
        <div class="mt-7 grid grid-cols-2 gap-4">
          {#each [
            { label: 'Optimal temp', value: '~210°C', sub: 'vs human 37°C', color: '#F5A623' },
            { label: 'Symmetry', value: '5-fold', sub: 'pentaradial body plan', color: '#F5A623' }
          ] as stat}
            <div class="bg-deep-space border border-white/8 rounded-xl p-4 text-center">
              <p class="text-xs font-mono text-starlight/30 uppercase tracking-wider mb-1">{stat.label}</p>
              <p class="text-xl font-bold mb-0.5" style="color:{stat.color}">{stat.value}</p>
              <p class="text-xs text-starlight/35">{stat.sub}</p>
            </div>
          {/each}
        </div>

      {:else if activeChapter === 'mission'}
        <MissionDesign/>

      {:else if activeChapter === 'grace'}
        <GraceBiology/>
      {/if}

      <!-- Prev / next -->
      <div class="flex justify-between items-center mt-10 pt-6 border-t border-white/5">
        {#if currentIdx > 0}
          <button on:click={() => activeChapter = allChapters[currentIdx - 1].id}
            class="flex items-center gap-2 text-sm text-starlight/45 hover:text-astrophage transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            {allChapters[currentIdx - 1].shortLabel}
          </button>
        {:else}
          <div></div>
        {/if}
        <span class="text-xs font-mono text-starlight/20">{currentIdx + 1} / {allChapters.length}</span>
        {#if currentIdx < allChapters.length - 1}
          <button on:click={() => activeChapter = allChapters[currentIdx + 1].id}
            class="flex items-center gap-2 text-sm text-starlight/45 hover:text-astrophage transition-colors">
            {allChapters[currentIdx + 1].shortLabel}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        {:else}
          <div></div>
        {/if}
      </div>
    </div>
  </div>
</div>
