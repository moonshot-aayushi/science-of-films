<script lang="ts">
  import type { PageData } from './$types';
  import { getComponents } from '$lib/components/registry';
  import { fly } from 'svelte/transition';

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

  // Swipe / slide direction
  let dir: 1 | -1 = 1; // 1 = forward (slide left), -1 = back (slide right)

  function goTo(id: string) {
    const newIdx = allChapters.findIndex(c => c.id === id);
    dir = newIdx >= currentIdx ? 1 : -1;
    activeChapterId = id;
  }
  function goNext() { if (currentIdx < allChapters.length - 1) goTo(allChapters[currentIdx + 1].id); }
  function goPrev() { if (currentIdx > 0) goTo(allChapters[currentIdx - 1].id); }

  // Pointer-based swipe — only triggers on clearly horizontal gestures
  let pointerStartX = 0;
  let pointerStartY = 0;
  let pointerDelta = 0;
  let swiping = false;
  let swipeAxis: 'h' | 'v' | null = null; // determined after first meaningful move

  function onPointerDown(e: PointerEvent) {
    pointerStartX = e.clientX;
    pointerStartY = e.clientY;
    pointerDelta = 0;
    swiping = true;
    swipeAxis = null;
    // Don't capture the pointer here — a tap must reach child elements (SVG
    // click regions, buttons, sliders). We only capture once we're sure the
    // gesture is a horizontal swipe (see onPointerMove below).
  }
  function onPointerMove(e: PointerEvent) {
    if (!swiping) return;
    const dx = e.clientX - pointerStartX;
    const dy = e.clientY - pointerStartY;
    // Lock axis once movement passes 8px
    if (!swipeAxis && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
      swipeAxis = Math.abs(dx) > Math.abs(dy) ? 'h' : 'v';
      // Only capture for horizontal swipes — this keeps the pointer tracked
      // even if it leaves the card, without breaking child element clicks.
      if (swipeAxis === 'h') {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      }
    }
    if (swipeAxis === 'h') {
      pointerDelta = dx;
      e.preventDefault(); // prevent page scroll only when swiping horizontally
    }
  }
  function onPointerUp(e: PointerEvent) {
    if (!swiping) return;
    swiping = false;
    const dx = e.clientX - pointerStartX;
    const dy = e.clientY - pointerStartY;
    // Only navigate if the gesture was horizontal and horizontal dominates
    if (swipeAxis === 'h' && Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) goNext(); else goPrev();
    }
    pointerDelta = 0;
    swipeAxis = null;
  }

  // Keyboard nav
  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowRight') goNext();
    else if (e.key === 'ArrowLeft') goPrev();
  }

  // Svelte action: attaches pointermove as non-passive so preventDefault() blocks scroll
  function nonPassiveMove(node: HTMLElement) {
    node.addEventListener('pointermove', onPointerMove, { passive: false });
    return { destroy() { node.removeEventListener('pointermove', onPointerMove); } };
  }
</script>

<svelte:window on:keydown={onKeydown}/>

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
        {#if film.slug === 'interstellar'}
          <!-- Gargantua black hole hero -->
          <div class="absolute inset-0 rounded-full bg-amber-400/10 blur-2xl animate-pulse-slow"></div>
          <svg width="112" height="112" viewBox="0 0 128 128" class="relative animate-float">
            <defs>
              <radialGradient id="heroBHHalo" cx="50%" cy="50%" r="50%">
                <stop offset="55%"  stop-color="#000000"  stop-opacity="0"/>
                <stop offset="85%"  stop-color="#F5A623"  stop-opacity="0.12"/>
                <stop offset="100%" stop-color="#FFD080"  stop-opacity="0.30"/>
              </radialGradient>
              <radialGradient id="heroBHDisk" cx="22%" cy="50%" r="78%">
                <stop offset="0%"   stop-color="#FFFFFF"  stop-opacity="0.95"/>
                <stop offset="35%"  stop-color="#FFD080"  stop-opacity="0.85"/>
                <stop offset="100%" stop-color="#C07C0A"  stop-opacity="0.05"/>
              </radialGradient>
              <filter id="heroBHGlow">
                <feGaussianBlur stdDeviation="2.5" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <clipPath id="heroDiskFront">
                <rect x="0" y="64" width="128" height="64"/>
              </clipPath>
              <clipPath id="heroDiskBack">
                <rect x="0" y="0" width="128" height="64"/>
              </clipPath>
            </defs>
            <!-- Stars -->
            {#each Array.from({length: 22}, (_, i) => i) as i}
              <circle
                cx={((Math.sin(i * 2.399) + 1) / 2) * 128}
                cy={((Math.cos(i * 1.701) + 1) / 2) * 128}
                r={i % 5 === 0 ? 1.4 : 0.7}
                fill="white" opacity={0.12 + (i % 6) * 0.06}/>
            {/each}
            <!-- Ambient halo -->
            <circle cx="64" cy="64" r="56" fill="url(#heroBHHalo)"/>
            <!-- Lensing ring hint -->
            <circle cx="64" cy="64" r="35" fill="none" stroke="#F5A623" stroke-width="0.6" opacity="0.2"/>
            <!-- Disk — back half (dim) -->
            <g clip-path="url(#heroDiskBack)">
              <ellipse cx="64" cy="64" rx="46" ry="11"
                fill="url(#heroBHDisk)" fill-opacity="0.22"
                stroke="#F5A623" stroke-width="1.8" stroke-opacity="0.28"/>
            </g>
            <!-- Event horizon -->
            <circle cx="64" cy="64" r="23" fill="#000000"/>
            <!-- Disk — front half (bright) -->
            <g clip-path="url(#heroDiskFront)">
              <ellipse cx="64" cy="64" rx="46" ry="11"
                fill="url(#heroBHDisk)" fill-opacity="0.72"
                stroke="#FFD080" stroke-width="3" stroke-opacity="0.9"
                filter="url(#heroBHGlow)"/>
            </g>
            <!-- Photon ring -->
            <circle cx="64" cy="64" r="25" fill="none"
              stroke="#FFD080" stroke-width="1.2" stroke-opacity="0.8"
              filter="url(#heroBHGlow)"/>
          </svg>

        {:else}
          <!-- Astrophage star hero (Project Hail Mary + default) -->
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
        {/if}
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

    <!-- Sidebar — desktop only -->
    <nav class="hidden lg:block lg:w-52 flex-shrink-0">
      <div class="space-y-6">
        {#each film.sections as section}
          <div>
            <p class="text-[10px] font-mono uppercase tracking-widest text-starlight/20 px-3 mb-1.5">
              {section.label}
            </p>
            {#each section.chapters as ch}
              <button on:click={() => goTo(ch.id)}
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

    <!-- Swipeable card area -->
    <div class="flex-1 min-w-0">

      <!-- Section label + chapter counter (mobile) -->
      <div class="lg:hidden flex items-center justify-between mb-4">
        <p class="text-[10px] font-mono text-starlight/30 uppercase tracking-widest">
          {film.sections.find(s => s.chapters.some(c => c.id === activeChapterId))?.label ?? ''}
        </p>
        <span class="text-xs font-mono text-starlight/25">{currentIdx + 1} / {allChapters.length}</span>
      </div>

      <!-- Card with swipe -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="relative overflow-hidden rounded-2xl"
        use:nonPassiveMove
        on:pointerdown={onPointerDown}
        on:pointerup={onPointerUp}
        on:pointercancel={onPointerUp}
        style="touch-action: pan-y; cursor: {swiping && swipeAxis === 'h' ? 'grabbing' : 'default'}">

        {#key activeChapterId}
          <div
            in:fly={{ x: dir * 80, duration: 240, opacity: 0 }}
            out:fly|local={{ x: dir * -80, duration: 240, opacity: 0 }}
            class="bg-deep-space border border-white/8 rounded-2xl p-6 sm:p-8"
            style="transform: translateX({swiping ? pointerDelta * 0.3 : 0}px)">

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
                    <div class="bg-black/20 border border-white/6 rounded-xl p-4 text-center">
                      <p class="text-xs font-mono text-starlight/30 uppercase tracking-wider mb-1">{stat.label}</p>
                      <p class="text-xl font-bold text-astrophage mb-0.5">{stat.value}</p>
                      <p class="text-xs text-starlight/35">{stat.sub}</p>
                    </div>
                  {/each}
                </div>
              {/if}

              <!-- Optional context note -->
              {#if activeChapter.note}
                <div class="mt-7 bg-black/20 border border-white/6 rounded-xl p-5">
                  <p class="text-xs font-mono text-starlight/35 uppercase tracking-wider mb-2">
                    {activeChapter.note.label}
                  </p>
                  <p class="text-sm text-starlight/65 leading-relaxed">{activeChapter.note.text}</p>
                </div>
              {/if}
            {/if}

          </div>
        {/key}

        <!-- Left arrow (desktop hover) -->
        {#if currentIdx > 0}
          <button on:click|stopPropagation={goPrev}
            class="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2
              w-10 h-10 rounded-full bg-deep-space border border-white/12 items-center justify-center
              text-starlight/40 hover:text-astrophage hover:border-astrophage/40 transition-all shadow-lg z-10">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        {/if}
        {#if currentIdx < allChapters.length - 1}
          <button on:click|stopPropagation={goNext}
            class="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2
              w-10 h-10 rounded-full bg-deep-space border border-white/12 items-center justify-center
              text-starlight/40 hover:text-astrophage hover:border-astrophage/40 transition-all shadow-lg z-10">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        {/if}
      </div>

      <!-- Navigation row: prev / dots / next -->
      <div class="flex items-center justify-between mt-5 px-1">
        <!-- Prev -->
        <button on:click={goPrev} disabled={currentIdx === 0}
          class="flex items-center gap-1.5 text-sm transition-colors
            {currentIdx === 0 ? 'text-starlight/15 pointer-events-none' : 'text-starlight/45 hover:text-astrophage'}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <span class="hidden sm:inline text-xs font-mono">{currentIdx > 0 ? allChapters[currentIdx - 1].shortLabel : ''}</span>
        </button>

        <!-- Dot indicators -->
        <div class="flex items-center gap-1.5">
          {#each allChapters as ch, i}
            <button on:click={() => goTo(ch.id)}
              title={ch.shortLabel}
              class="rounded-full transition-all duration-200
                {i === currentIdx
                  ? 'w-5 h-2 bg-astrophage'
                  : 'w-2 h-2 bg-white/20 hover:bg-white/35'}">
            </button>
          {/each}
        </div>

        <!-- Next -->
        <button on:click={goNext} disabled={currentIdx === allChapters.length - 1}
          class="flex items-center gap-1.5 text-sm transition-colors
            {currentIdx === allChapters.length - 1 ? 'text-starlight/15 pointer-events-none' : 'text-starlight/45 hover:text-astrophage'}">
          <span class="hidden sm:inline text-xs font-mono">{currentIdx < allChapters.length - 1 ? allChapters[currentIdx + 1].shortLabel : ''}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <!-- Mobile chapter list (bottom scroll strip) -->
      <div class="lg:hidden mt-6 pt-5 border-t border-white/5">
        <p class="text-[10px] font-mono text-starlight/20 uppercase tracking-widest mb-3">All Chapters</p>
        <div class="flex gap-1.5 overflow-x-auto pb-1">
          {#each allChapters as ch}
            <button on:click={() => goTo(ch.id)}
              class="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all border
                {activeChapterId === ch.id
                  ? 'bg-astrophage/15 text-astrophage border-astrophage/40'
                  : 'text-starlight/35 border-white/8 hover:border-white/20'}">
              <span>{ch.icon}</span>
              <span>{ch.shortLabel}</span>
            </button>
          {/each}
        </div>
      </div>

    </div>
  </div>
</div>
