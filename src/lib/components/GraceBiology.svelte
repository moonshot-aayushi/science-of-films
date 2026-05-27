<script lang="ts">
  let podActive = true;
  let activeIdx: number | null = null;

  const systems = [
    {
      name: 'Skeletal',
      icon: '骨',
      withPod: 84,
      withoutPod: 35,
      recoveryMonths: 18,
      color: '#00D4FF',
      mechanism: 'Vibration therapy + electrostimulation',
      detail: 'Bones require mechanical load to stay dense. In microgravity, that load vanishes. ISS astronauts lose 1–2% bone density per month, a rate faster than severe osteoporosis. After 3+ years without intervention, Grace\'s bones would be fragile enough to fracture from walking. The Hail Mary\'s medical pod delivers low-frequency mechanical vibration directly to bone tissue, mimicking skeletal loading.',
      realWorld: 'ISS crew members undergo 2.5 hours of daily resistance exercise specifically to slow this effect. They still land with measurable bone loss after 6-month missions.'
    },
    {
      name: 'Muscular',
      icon: '筋',
      withPod: 70,
      withoutPod: 22,
      recoveryMonths: 9,
      color: '#F5A623',
      mechanism: 'Electrical muscle stimulation (EMS)',
      detail: 'Skeletal muscle atrophies without contraction signals. Bed-rest studies show ~0.5% muscle mass loss per day in the first weeks, tapering as the body adapts to its new (lower) equilibrium. After 3 years in a coma, voluntary muscle mass could drop to under 25% of baseline. Grace would be unable to sit up unassisted. The pod runs EMS cycles through all major muscle groups, maintaining ~70% mass.',
      realWorld: 'EMS is used clinically for patients with spinal injuries. It\'s genuinely effective at preventing atrophy, but the challenge is coverage across all 640+ muscles in the human body.'
    },
    {
      name: 'Cardiovascular',
      icon: '心',
      withPod: 85,
      withoutPod: 58,
      recoveryMonths: 5,
      color: '#FF6B35',
      mechanism: 'Centrifuge bed + cardiac compression assist',
      detail: 'The heart is a muscle. In microgravity, blood pools toward the head (astronauts get puffy faces), cardiac output drops, and the heart remodels: it literally becomes more spherical and smaller as it doesn\'t need to pump against gravity. Resting heart rate increases to compensate for reduced stroke volume. The pod applies mild centrifugal force and external cardiac compression to maintain cardiac conditioning.',
      realWorld: 'After 6 months on ISS, astronauts show measurable cardiac remodeling. NASA is researching "artificial gravity sleeper pods" for Mars missions for exactly this reason.'
    },
    {
      name: 'Neurological',
      icon: '脳',
      withPod: 86,
      withoutPod: 72,
      recoveryMonths: 24,
      color: '#C084FC',
      mechanism: 'Transcranial stimulation + memory replay',
      detail: 'Prolonged coma disrupts memory consolidation: the hippocampus requires sleep cycles to transfer short-term to long-term memory. Extended unconsciousness causes retrograde amnesia (erasing events before the coma) and anterograde deficits. Grace\'s waking with no memory of his past or his mission is medically realistic. The pod can\'t fix this without active neural stimulation, and even with it, cognitive recovery is the slowest of all systems.',
      realWorld: 'Patients emerging from years-long comas frequently report significant memory gaps. The "Hollywood" version of waking up fully sharp is not accurate.'
    },
    {
      name: 'Immune',
      icon: '免',
      withPod: 92,
      withoutPod: 48,
      recoveryMonths: 2,
      color: '#4ADE80',
      mechanism: 'Controlled antigen exposure protocol',
      detail: 'The adaptive immune system requires ongoing challenge to stay calibrated. Without exposure to pathogens or foreign antigens, T-cell populations decline and immune memory fades. Astronauts on ISS regularly show reactivation of latent viruses (herpes simplex, Epstein-Barr) as immune surveillance weakens. The pod maintains immune competence by periodically introducing controlled antigen doses, essentially a slow, sustained vaccination protocol.',
      realWorld: 'Immune dysregulation is one of the most consistently documented effects of spaceflight. NASA considers it a primary health risk for any mission beyond low Earth orbit.'
    }
  ];
</script>

<div class="flex flex-col gap-6">
  <!-- Toggle -->
  <div class="flex items-center justify-between bg-deep-space border border-white/8 rounded-xl p-4">
    <div>
      <p class="text-sm font-semibold text-starlight">Hail Mary Medical Pod</p>
      <p class="text-xs text-starlight/40 mt-0.5">Toggle to see the pod's impact on survival</p>
    </div>
    <button on:click={() => { podActive = !podActive; activeIdx = null; }}
      class="relative w-14 h-7 rounded-full transition-all duration-300 {podActive ? 'bg-astrophage' : 'bg-white/15'}">
      <div class="absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all duration-300 {podActive ? 'left-8' : 'left-1'}"></div>
    </button>
  </div>

  <!-- Systems grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
    {#each systems as sys, i}
      {@const pct = podActive ? sys.withPod : sys.withoutPod}
      {@const status = pct >= 75 ? 'nominal' : pct >= 50 ? 'degraded' : pct >= 30 ? 'critical' : 'severe'}
      {@const statusColor = pct >= 75 ? '#4ADE80' : pct >= 50 ? '#F5A623' : pct >= 30 ? '#FF6B35' : '#EF4444'}

      <button on:click={() => activeIdx = activeIdx === i ? null : i}
        class="text-left bg-deep-space border rounded-xl p-4 transition-all duration-200
          {activeIdx === i ? 'border-astrophage/40' : 'border-white/8 hover:border-white/20'}">

        <div class="flex items-center justify-between mb-3">
          <p class="font-semibold text-starlight text-sm">{sys.name}</p>
          <span class="text-xs font-mono px-2 py-0.5 rounded-full border"
            style="color: {statusColor}; border-color: {statusColor}40; background: {statusColor}12">
            {status}
          </span>
        </div>

        <!-- Percentage -->
        <div class="flex items-end gap-2 mb-2">
          <span class="text-3xl font-bold transition-all duration-500" style="color: {statusColor}">{pct}</span>
          <span class="text-sm opacity-50 mb-1">%</span>
          <span class="text-xs text-starlight/30 mb-1 ml-auto">{podActive ? sys.mechanism.split('+')[0].trim() : 'no intervention'}</span>
        </div>

        <!-- Bar -->
        <div class="h-1.5 bg-white/8 rounded-full overflow-hidden">
          <div class="h-full rounded-full transition-all duration-700"
            style="width: {pct}%; background: {statusColor}; box-shadow: 0 0 8px {statusColor}60"></div>
        </div>

        {#if activeIdx === i}
          <div class="mt-4 pt-3 border-t border-white/8">
            <p class="text-xs font-mono text-starlight/35 uppercase tracking-wider mb-1">
              {podActive ? 'With pod: ' + sys.mechanism : 'Without any intervention'}
            </p>
            <p class="text-xs text-starlight/65 leading-relaxed mb-2">{sys.detail}</p>
            <p class="text-xs font-mono text-starlight/25 uppercase tracking-wider mb-1">Real world</p>
            <p class="text-xs text-starlight/45 leading-relaxed italic">{sys.realWorld}</p>
            <p class="text-xs text-starlight/30 mt-2">Recovery: ~{sys.recoveryMonths} months post-mission with rehab</p>
          </div>
        {/if}
      </button>
    {/each}
  </div>

  <!-- Dramatic comparison note -->
  {#if !podActive}
    <div class="bg-red-950/30 border border-red-500/30 rounded-xl p-4">
      <p class="text-xs font-mono text-red-400/80 uppercase tracking-wider mb-2">Without the medical pod</p>
      <p class="text-sm text-starlight/65 leading-relaxed">
        Grace would wake up unable to move, with bones near-brittle, severe cognitive impairment,
        and a compromised immune system. He would be dead within hours (possibly minutes) if
        he survived waking at all. The autoclave medical system isn't a convenience. It's the only
        reason there's a story.
      </p>
    </div>
  {:else}
    <div class="bg-astrophage/6 border border-astrophage/20 rounded-xl p-4">
      <p class="text-xs font-mono text-astrophage/60 uppercase tracking-wider mb-2">Medical pod active</p>
      <p class="text-sm text-starlight/65 leading-relaxed">
        Grace wakes up weak, disoriented, and with major memory gaps, but alive and functional.
        His first challenge is figuring out where he is and why he's alone. The pod kept him at
        roughly 70–90% of baseline across most systems. Recovery is possible. The mission isn't over.
      </p>
    </div>
  {/if}
</div>
