<script lang="ts">
  import type { PageData } from './$types';
  import { getComponents } from '$lib/components/registry';

  export let data: PageData;

  $: film = data.film;
  $: allChapters = film.sections.flatMap(s => s.chapters);
  $: components = getComponents(film.slug);

  let activeChapterId = '';
  $: if (!activeChapterId && allChapters.length) activeChapterId = allChapters[0].id;

  $: activeChapter = allChapters.find(c => c.id === activeChapterId) ?? allChapters[0];
  $: currentIdx = allChapters.findIndex(c => c.id === activeChapterId);
  $: activeComponent = components[activeChapterId] ?? null;

  $: statCols = activeChapter?.stats?.length === 2 ? 'grid-cols-2' : 'grid-cols-3';
</script>

<svelte:head>
  <title>{film.title} — Science Explorer | Reel Science</title>
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
          <span class="text-xs font-mono text-astrophage/70 border border-astrophage/25 rounded-full px-3 py-1">
            {film.author} · {film.year}
          </span>
          {#each film.sections as section}
            <span class="text-xs font-mono text-starlight/30">{section.label}</span>
          {/each}
        </div>
        <h1 class="text-4xl sm:text-5xl font-bold text-starlight mb-3 leading-tight">{film.title}</h1>
        <p class="text-starlight/55 text-lg max-w-xl leading-relaxed">{film.tagline}</p>

        <div class="flex flex-wrap gap-2 mt-4">
          {#each film.concepts as concept}
            <span class="text-xs font-mono px-3 py-1 rounded-full border border-astrophage/25 text-astrophage/80 bg-astrophage/5">
              {concept}
            </span>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Explorer -->
<div class="max-w-6xl mx-auto px-4 sm:px-6 py-10">
  <div class="flex flex-col lg:flex-row gap-8">

    <!-- Sidebar -->
    <nav class="lg:w-52 flex-shrink-0">
      <!-- Mobile: horizontal pill row -->
      <div class="lg:hidden flex gap-1.5 overflow-x-auto pb-2 flex-wrap">
        {#each allChapters as ch}
          <button on:click={() => activeChapterId = ch.id}
            class="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-mono transition-all
              {activeChapterId === ch.id
                ? 'bg-astrophage/15 text-astrophage border border-astrophage/40'
                : 'text-starlight/40 border border-white/10 hover:border-white/20'}">
            {ch.shortLabel}
          </button>
        {/each}
      </div>

      <!-- Desktop: grouped sidebar -->
      <div class="hidden lg:block space-y-6">
        {#each film.sections as section}
          <div>
            <p class="text-[10px] font-mono uppercase tracking-widest text-starlight/20 px-3 mb-1.5">
              {section.label}
            </p>
            {#each section.chapters as ch}
              <button on:click={() => activeChapterId = ch.id}
                class="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
                  border-l-2 transition-all duration-150
                  {activeChapterId === ch.id
                    ? 'border-astrophage bg-astrophage/8 text-astrophage'
                    : 'border-transparent text-starlight/45 hover:text-starlight/75 hover:bg-white/4'}">
                <span class="opacity-70">{ch.icon}</span>
                <span>{ch.shortLabel}</span>
              </button>
            {/each}
          </div>
        {/each}

        <div class="pt-4 border-t border-white/5 px-3">
          <p class="text-[10px] font-mono text-starlight/20 leading-relaxed">
            Science grounded in {film.author}'s research and peer literature.
          </p>
        </div>
      </div>
    </nav>

    <!-- Chapter content -->
    <div class="flex-1 min-w-0">
      {#if activeChapter}
        <!-- Chapter header -->
        <div class="mb-7">
          <div class="flex items-center gap-3 mb-2.5">
            <span class="text-xl opacity-70">{activeChapter.icon}</span>
            <h2 class="text-2xl font-bold text-starlight">{activeChapter.label}</h2>
          </div>
          <p class="text-starlight/55 leading-relaxed max-w-2xl text-[0.95rem]">{activeChapter.intro}</p>
        </div>

        <!-- Interactive component -->
        {#if activeComponent}
          <svelte:component this={activeComponent}/>
        {/if}

        <!-- Optional stats row -->
        {#if activeChapter.stats?.length}
          <div class="mt-7 grid {statCols} gap-4">
            {#each activeChapter.stats as stat}
              <div class="bg-deep-space border border-white/8 rounded-xl p-4 text-center">
                <p class="text-xs font-mono text-starlight/30 uppercase tracking-wider mb-1">{stat.label}</p>
                <p class="text-xl font-bold text-astrophage mb-0.5">{stat.value}</p>
                <p class="text-xs text-starlight/35">{stat.sub}</p>
              </div>
            {/each}
          </div>
        {/if}

        <!-- Optional context note -->
        {#if activeChapter.note}
          <div class="mt-7 bg-deep-space border border-white/8 rounded-xl p-5">
            <p class="text-xs font-mono text-starlight/35 uppercase tracking-wider mb-2">
              {activeChapter.note.label}
            </p>
            <p class="text-sm text-starlight/65 leading-relaxed">{activeChapter.note.text}</p>
          </div>
        {/if}
      {/if}

      <!-- Prev / next -->
      <div class="flex justify-between items-center mt-10 pt-6 border-t border-white/5">
        {#if currentIdx > 0}
          <button on:click={() => activeChapterId = allChapters[currentIdx - 1].id}
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
          <button on:click={() => activeChapterId = allChapters[currentIdx + 1].id}
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
