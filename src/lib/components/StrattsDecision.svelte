<script lang="ts">
  let expanded: number | null = null;

  const decisions = [
    {
      number: '01',
      title: 'One-Way Mission',
      status: 'IMPLEMENTED',
      summary: 'The Hail Mary will carry no return fuel.',
      reasoning: 'Carrying fuel for a round trip would require a vehicle of impossible mass. Astrophage propulsion makes one-way travel to Tau Ceti feasible. A round trip does not pass basic mass-ratio calculations under any propulsion system we can build.',
      ethicalCost: 'The crew cannot come home. Every person selected is assigned near-certain death. There is no rescue option, no abort trajectory, no waiting for them.',
      alternativeRejected: 'Two-way mission: mass equations made this physically impossible, not politically undesirable.',
      verdict: 'Utilitarian necessity'
    },
    {
      number: '02',
      title: 'No Informed Consent',
      status: 'CLASSIFIED',
      summary: 'Crew selected and sedated without their knowledge.',
      reasoning: 'Any candidate given full information would weigh their individual survival probability against the mission\'s odds of success. The expected utility calculation requires participants who cannot rationally refuse. Psychological profiling showed no candidate would knowingly accept near-certain death on a 5% probability mission.',
      ethicalCost: 'Fundamental violation of bodily autonomy and informed consent, the bedrock of medical ethics since the Nuremberg Code. The crew never chose this.',
      alternativeRejected: 'Public voluntary enrollment: modeled outcomes showed zero qualified candidates would enroll with full disclosure.',
      verdict: 'Necessary violation'
    },
    {
      number: '03',
      title: 'Solo Survivor Design',
      status: 'IMPLEMENTED',
      summary: 'Mission success requires only one crew member to remain functional.',
      reasoning: 'Each additional crew member consumes oxygen, food, water, and mass: resources that could otherwise extend the lone survivor\'s mission window. The marginal survival benefit of a larger crew does not justify the resource cost. One person with the right knowledge is sufficient.',
      ethicalCost: 'Human lives reduced to resource consumption variables. The deaths of the other crew members are not failures: they are planned outcomes built into the mission architecture.',
      alternativeRejected: 'Larger redundant crew: mass projections ruled this out; additional crew also introduces social failure modes (conflict, psychological dependence) that a solo mission avoids.',
      verdict: 'Cold arithmetic'
    },
    {
      number: '04',
      title: 'Selecting Grace',
      status: 'IMPLEMENTED',
      summary: 'A junior biologist and schoolteacher chosen over domain specialists.',
      reasoning: 'Grace\'s unusual combination of broad scientific knowledge, practical problem-solving, and teaching ability (explaining complex ideas simply and clearly) was optimal for first-contact scenarios that no specialist training anticipates. He had the profile of someone who would figure things out, not a specialist who would be helpless outside their domain.',
      ethicalCost: 'An ordinary man with no particular ambition for heroism is selected for an extraordinary death. He was chosen for skills he didn\'t know he had, to solve a problem he didn\'t know existed.',
      alternativeRejected: 'Full specialist crew: deep expertise in known domains is less valuable than adaptive cross-domain reasoning when the problem space is entirely unknown.',
      verdict: 'Coldly correct'
    },
    {
      number: '05',
      title: 'Memory Erasure',
      status: 'CLASSIFIED',
      summary: 'Crew memories of the mission briefing chemically erased before transit.',
      reasoning: 'A person who knows they are likely dying alone, billions of miles from home, with no possibility of rescue, over a 4-year coma transit, will psychologically decompensate. Grace needs to be functional when he wakes up. Discovering the truth incrementally (when it\'s too late to change the outcome) preserves his ability to complete the mission.',
      ethicalCost: 'Denying a person their memories, their understanding of their own situation, and their ability to make meaning of their sacrifice. Grace couldn\'t grieve, couldn\'t say goodbye, couldn\'t consent to his own story.',
      alternativeRejected: 'Full pre-departure disclosure: psychological models predicted crew would become non-functional or suicidal within months, in transit, alone.',
      verdict: 'Merciful or monstrous'
    }
  ];

  const totalLivesAtRisk = 8_000_000_000;
  const missionSuccessProb = 0.05; // 5%
  const expectedSaved = Math.round(totalLivesAtRisk * missionSuccessProb / 1e8) * 1e8;
</script>

<div class="flex flex-col gap-5">
  <!-- The Math -->
  <div class="bg-deep-space border border-astrophage/25 rounded-xl p-5">
    <p class="text-xs font-mono text-astrophage/60 uppercase tracking-widest mb-3">Stratt's Utilitarian Calculus</p>
    <div class="grid grid-cols-3 gap-3 mb-4">
      <div class="bg-black/20 rounded-lg p-3 text-center">
        <p class="text-xs font-mono text-starlight/30 mb-1">Lives at risk</p>
        <p class="text-lg font-bold text-starlight">8 billion</p>
      </div>
      <div class="bg-black/20 rounded-lg p-3 text-center">
        <p class="text-xs font-mono text-starlight/30 mb-1">Mission success P</p>
        <p class="text-lg font-bold text-starlight">~5%</p>
      </div>
      <div class="bg-black/20 rounded-lg p-3 text-center border border-astrophage/20">
        <p class="text-xs font-mono text-starlight/30 mb-1">Expected saved</p>
        <p class="text-lg font-bold text-astrophage">~400M</p>
      </div>
    </div>
    <p class="text-sm text-starlight/60 leading-relaxed">
      Against 400 million expected lives saved: the ethical cost is 3 crew members' autonomy
      and near-certain deaths. Stratt never wavered. In her calculus, the math is not cruel —
      inaction is.
    </p>
  </div>

  <!-- Decision log -->
  <div class="space-y-2">
    {#each decisions as d, i}
      <button on:click={() => expanded = expanded === i ? null : i}
        class="w-full text-left bg-deep-space border rounded-xl overflow-hidden transition-all duration-200
          {expanded === i ? 'border-astrophage/40' : 'border-white/8 hover:border-white/15'}">

        <div class="flex items-center gap-4 px-5 py-4">
          <span class="text-xs font-mono text-starlight/20 w-6 flex-shrink-0">{d.number}</span>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="font-semibold text-starlight text-sm">{d.title}</span>
              <span class="text-[10px] font-mono px-1.5 py-0.5 rounded border
                {d.status === 'CLASSIFIED'
                  ? 'border-red-500/30 text-red-400/70 bg-red-500/8'
                  : 'border-green-500/30 text-green-400/70 bg-green-500/8'}">
                {d.status}
              </span>
            </div>
            <p class="text-xs text-starlight/40 mt-0.5">{d.summary}</p>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" class="flex-shrink-0 text-starlight/25 transition-transform duration-200 {expanded === i ? 'rotate-180' : ''}">
            <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>

        {#if expanded === i}
          <div class="px-5 pb-5 pt-1 border-t border-white/6 space-y-4">
            <div>
              <p class="text-[10px] font-mono text-starlight/30 uppercase tracking-wider mb-1.5">Reasoning</p>
              <p class="text-sm text-starlight/70 leading-relaxed">{d.reasoning}</p>
            </div>
            <div class="bg-red-950/20 border border-red-500/15 rounded-lg p-3">
              <p class="text-[10px] font-mono text-red-400/60 uppercase tracking-wider mb-1">Ethical Cost</p>
              <p class="text-sm text-starlight/65 leading-relaxed">{d.ethicalCost}</p>
            </div>
            <div class="flex items-start gap-3">
              <div class="flex-1">
                <p class="text-[10px] font-mono text-starlight/25 uppercase tracking-wider mb-1">Alternative Rejected</p>
                <p class="text-xs text-starlight/50 leading-relaxed">{d.alternativeRejected}</p>
              </div>
              <div class="flex-shrink-0 text-right">
                <p class="text-[10px] font-mono text-starlight/25 uppercase tracking-wider mb-1">Verdict</p>
                <p class="text-xs font-mono text-astrophage/70 italic">{d.verdict}</p>
              </div>
            </div>
          </div>
        {/if}
      </button>
    {/each}
  </div>

  <div class="bg-deep-space border border-white/8 rounded-xl p-5">
    <p class="text-xs font-mono text-starlight/30 uppercase tracking-wider mb-2">A note on Stratt</p>
    <p class="text-sm text-starlight/60 leading-relaxed">
      Eva Stratt is not a villain. She is given unlimited authority precisely because she
      will make the decisions that democratic institutions cannot: not because they are wrong,
      but because they are unspeakable. The novel asks: in a genuine extinction-level emergency,
      what is the <em>right</em> ethical framework? It doesn't fully answer.
    </p>
  </div>
</div>
