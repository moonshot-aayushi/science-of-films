import type { Film } from '$lib/types';

const projectHailMary: Film = {
  slug: 'project-hail-mary',
  title: 'Project Hail Mary',
  year: 2025,
  author: 'Andy Weir',
  status: 'available',
  tagline: 'A lone astronaut. A dying star. An alien that might be the solution.',
  concepts: ['Astrobiology', 'Photon Physics', 'Extremophiles'],
  sections: [
    {
      label: 'Astrophage Biology',
      chapters: [
        {
          id: 'organism',
          shortLabel: 'The Organism',
          label: 'Meet the Astrophage',
          icon: '⊕',
          intro: 'A single-celled organism ~2 μm in diameter. It lives in the corona of stars, converts photons directly into stored energy, and reproduces with exponential ferocity. Click any structure in the diagram to explore its biology.',
          stats: [
            { label: 'Diameter', value: '~2 μm', sub: 'smaller than a red blood cell' },
            { label: 'Energy density', value: '1 PJ/g', sub: '10¹⁵ joules per gram' },
            { label: 'Division time', value: '~1 hr', sub: 'under ideal corona conditions' }
          ]
        },
        {
          id: 'photon',
          shortLabel: 'Photon Engine',
          label: 'The Photon Engine',
          icon: '⚡',
          intro: 'Astrophage captures 585 nm light and stores it as chemical bonds at an efficiency ~20× greater than nuclear fission. Press play to watch the full conversion cycle — from incoming photon to charged vacuole to reproduction.',
          note: {
            label: 'The 585 nm Question',
            text: 'Why 585 nm? It falls in the yellow-amber visible spectrum — near the peak output of a G-type star\'s corona. Energetically rich enough to power complex biochemistry, long-wavelength enough to pass through material that would block gamma or X-ray radiation. An elegant evolutionary solution, even if entirely fictional.'
          }
        },
        {
          id: 'parallels',
          shortLabel: 'Earth Science',
          label: 'Earth Parallels',
          icon: '🌍',
          intro: 'Astrophage is fiction — but the science it\'s built on isn\'t. Real organisms on Earth have evolved analogous strategies for surviving extreme environments and extracting unusual energy. Explore four real-world parallels.'
        },
        {
          id: 'petrova',
          shortLabel: 'Petrova Effect',
          label: 'The Petrova Effect',
          icon: '★',
          intro: 'When a colony grows large enough, it visibly dims its host star — the "Petrova line." Drag the slider to see how even a tiny coverage fraction translates into an almost incomprehensible energy drain.'
        },
        {
          id: 'taumoeba',
          shortLabel: 'Taumoeba',
          label: 'Taumoeba: The Solution',
          icon: '◑',
          intro: 'Astrophage has a predator. Native to the clouds of Tau Ceti e, Taumoeba evolved to eat the very organism threatening Earth\'s sun. Explore its discovery, attack mechanism, and how Grace bred it to survive temperatures found near our own star.',
          stats: [
            { label: 'Size', value: '~0.5 μm', sub: '4× smaller than Astrophage' },
            { label: 'Evolved tolerance', value: '152°C', sub: 'after 500 lab generations' },
            { label: 'Kill rate', value: '98%', sub: 'of Astrophage colony in 4 hrs' }
          ]
        }
      ]
    },
    {
      label: 'Rocky the Eridian',
      chapters: [
        {
          id: 'rocky-lang',
          shortLabel: 'Language',
          label: "Rocky's Language",
          icon: '◎',
          intro: 'Two intelligent species with no shared language, no common history, and completely different biochemistries — meeting in the void between stars. Step through the five stages by which Grace and Rocky bootstrapped a working language from scratch using only mathematics and physics.',
          stats: [
            { label: 'Language established', value: '~3 days', sub: 'from first contact' },
            { label: 'Initial vocabulary', value: '200+', sub: 'concepts in first week' },
            { label: 'Language vector', value: 'Tones', sub: '37 distinct frequencies' }
          ]
        },
        {
          id: 'rocky-phys',
          shortLabel: 'Physiology',
          label: "Rocky's Physiology",
          icon: '⟡',
          intro: "Rocky is not a variation on human biology — he's a fundamentally different solution to the problem of being alive. Ammonia as a solvent, 210°C as optimal temperature, five equal-function arms, sonar as primary sense. Explore how each difference maps to real xenobiology science.",
          stats: [
            { label: 'Optimal temp', value: '~210°C', sub: 'vs human 37°C' },
            { label: 'Symmetry', value: '5-fold', sub: 'pentaradial body plan' }
          ]
        }
      ]
    },
    {
      label: 'The Hail Mary Mission',
      chapters: [
        {
          id: 'mission',
          shortLabel: 'Mission Design',
          label: 'The Hail Mary Mission',
          icon: '⌖',
          intro: 'A one-way trip to a star 11.9 light-years away, piloted by a sole crew member who doesn\'t know why he\'s there. Drag the speed slider to see how relativistic time dilation makes interstellar travel survivable — and what it costs the people left behind on Earth.'
        },
        {
          id: 'tau-ceti',
          shortLabel: 'Tau Ceti',
          label: "Tau Ceti: The Destination Star",
          icon: '✦',
          intro: 'Not all stars are equal. Tau Ceti is 11.9 light-years away, slightly cooler and dimmer than our Sun, and — crucially — metal-poor in a way that may have given rise to Taumoeba. Click either star on the HR diagram to compare their properties.',
          stats: [
            { label: 'Distance', value: '11.9 ly', sub: 'from our solar system' },
            { label: 'Luminosity', value: '0.52 L☉', sub: '48% dimmer than our Sun' },
            { label: 'Metallicity', value: '0.3× Solar', sub: 'key to Taumoeba evolution' }
          ]
        }
      ]
    },
    {
      label: 'The Human Factor',
      chapters: [
        {
          id: 'grace',
          shortLabel: "Grace's Biology",
          label: 'What the Mission Did to Grace',
          icon: '♡',
          intro: 'Years in a medical coma aboard a ship traveling at relativistic speed. Toggle the medical pod off to see what would have happened without it — then back on to understand just how close to the edge Grace was living the entire voyage.'
        },
        {
          id: 'stratts-decision',
          shortLabel: "Stratt's Decisions",
          label: "Eva Stratt's Decision Log",
          icon: '⊗',
          intro: 'Eva Stratt had unlimited authority and used it. Five decisions that violated law, ethics, and consent — each justified by the same utilitarian calculus: against extinction, individual rights are not the correct unit of analysis. Examine each choice she made and what it cost.',
          note: {
            label: 'The Ethics of Extinction-Level Decisions',
            text: 'Weir does not resolve the ethical tension he creates. Stratt is portrayed as correct in outcome and monstrous in method. The novel asks whether that distinction matters — and doesn\'t answer.'
          }
        },
        {
          id: 'grace-scientist',
          shortLabel: 'Grace\'s Science',
          label: 'Ryland Grace: Five Experiments',
          icon: '⬡',
          intro: 'Grace was selected for the mission not because of what he knew, but how he thinks. Walk through the five pivotal experiments he ran aboard the Hail Mary — the discoveries that moved humanity from "we might die" to "here is a solution."',
          note: {
            label: 'Why a Teacher?',
            text: 'Stratt chose Grace over domain specialists because first-contact science — biology no one has ever seen, problems no textbook addresses — requires a generalist who can explain things simply enough to think about them clearly. Grace\'s teaching background was a feature, not an afterthought.'
          }
        }
      ]
    }
  ]
};

const interstellar: Film = {
  slug: 'interstellar',
  title: 'Interstellar',
  year: 2014,
  author: 'Christopher Nolan',
  status: 'coming-soon',
  tagline: '',
  concepts: ['General Relativity', 'Black Holes', 'Time Dilation'],
  sections: []
};

const theMartian: Film = {
  slug: 'the-martian',
  title: 'The Martian',
  year: 2015,
  author: 'Andy Weir',
  status: 'coming-soon',
  tagline: '',
  concepts: ['Botany', 'Orbital Mechanics', 'Survival Chemistry'],
  sections: []
};

const spiderMan: Film = {
  slug: 'spider-man',
  title: 'Spider-Man',
  year: 2002,
  author: 'Sam Raimi',
  status: 'coming-soon',
  tagline: 'One radioactive bite. The real science of what it would actually do.',
  concepts: ['Genetic Mutation', 'Arachnology', 'Adhesion Physics', 'Biomechanics'],
  sections: []
};

export const films: Film[] = [projectHailMary, interstellar, theMartian, spiderMan];

export function getFilm(slug: string): Film | undefined {
  return films.find(f => f.slug === slug);
}
