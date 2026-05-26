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
  status: 'available',
  tagline: 'A black hole built with Nobel-Prize physics. Time dilation you can calculate. Science Nolan built with Kip Thorne.',
  concepts: ['General Relativity', 'Black Holes', 'Gravitational Lensing', 'Wormholes'],
  sections: [
    {
      label: 'Gargantua',
      chapters: [
        {
          id: 'black-hole',
          shortLabel: 'Black Hole',
          label: 'Gargantua: The Black Hole',
          icon: '◉',
          intro: 'Gargantua is 100 million solar masses, spinning at near-maximum rate. Physicist Kip Thorne derived the correct equations for its visual appearance — and the rendering was accurate enough to produce two unexpected scientific papers. Click each element of the black hole to explore the physics behind it.',
          stats: [
            { label: 'Mass',            value: '100M M☉',      sub: 'solar masses' },
            { label: 'Spin',            value: '~0.99998',      sub: 'near-maximal Kerr' },
            { label: 'Schwarzschild r', value: '~2 AU',         sub: "wider than Earth's orbit" }
          ]
        },
        {
          id: 'time-dilation',
          shortLabel: 'Time Dilation',
          label: "Miller's Planet: Time Dilation",
          icon: '⧖',
          intro: "Every hour on Miller's planet, seven years pass on Earth. This isn't dramatic licence — it's a direct consequence of Einstein's general relativity. Drag the proximity slider to watch the clock disparity explode as you approach Gargantua's event horizon.",
          stats: [
            { label: 'Dilation factor',  value: '61,320×',     sub: "on Miller's planet" },
            { label: 'Mission duration', value: '23 yrs',       sub: 'Earth time for 1 hr visit' },
            { label: 'Formula',          value: '1/√(1−rₛ/r)', sub: 'Schwarzschild metric' }
          ]
        },
        {
          id: 'tidal-forces',
          shortLabel: 'Tidal Forces',
          label: 'The Waves: Tidal Forces',
          icon: '〰',
          intro: "Miller's planet has kilometre-tall waves — not from storms but from tidal forces. Gargantua's gravity pulls harder on the near side of the planet than the far side, creating permanent stationary bulges. The crew drove through them. Explore how tidal forces scale with distance.",
          stats: [
            { label: 'Wave height',   value: '~1.2 km',  sub: "Kip Thorne's calculation" },
            { label: 'Force law',     value: 'F ∝ 1/r³', sub: 'steeper than gravity' },
            { label: 'Largest Earth', value: '524 m',    sub: 'Lituya Bay, 1958' }
          ]
        }
      ]
    },
    {
      label: 'Space-Time',
      chapters: [
        {
          id: 'wormhole',
          shortLabel: 'Wormhole',
          label: 'The Wormhole Near Saturn',
          icon: '⊙',
          intro: "The wormhole in Interstellar is a sphere, not a ring — the first scientifically accurate depiction in cinema. A wormhole is a tunnel in three-dimensional space, and its mouth is necessarily spherical. Looking through it, you'd see distorted stars from the other side. Explore the physics of Einstein-Rosen bridges.",
          note: {
            label: 'Why a Sphere?',
            text: "A 2D wormhole (a tunnel in a flat plane) would have a circular mouth. Extending to 3D space, the mouth must be spherical. Every previous sci-fi film got this wrong. Thorne insisted Nolan get it right."
          }
        },
        {
          id: 'tesseract',
          shortLabel: 'Tesseract',
          label: 'The Tesseract & Higher Dimensions',
          icon: '⬡',
          intro: "The film's climax places Cooper inside a five-dimensional structure where time is a spatial dimension he can physically traverse. Explore how dimensions build on each other — from a line to a plane to 3D space to Einstein's 4D spacetime to the fifth dimension the bulk beings inhabit.",
          note: {
            label: 'The Block Universe',
            text: "Einstein's relativity implies that past, present, and future all coexist in a four-dimensional block. The 'bulk beings' exist in five dimensions — they can step through time the way we step across a room."
          }
        }
      ]
    },
    {
      label: 'The Target Worlds',
      chapters: [
        {
          id: 'planets',
          shortLabel: 'Three Planets',
          label: "Miller, Mann & Edmunds' Worlds",
          icon: '◌',
          intro: "The Lazarus missions surveyed twelve worlds beyond the wormhole. Three sent back promising signals. Each is a case study in how physics, orbital mechanics, and proximity to a supermassive black hole create entirely alien environments — and entirely different fates.",
          stats: [
            { label: "Miller — viable?",  value: 'No',  sub: 'Tidal waves, extreme dilation' },
            { label: "Mann — viable?",    value: 'No',  sub: 'Data was faked' },
            { label: "Edmunds — viable?", value: 'Yes', sub: "Brand's destination" }
          ]
        }
      ]
    },
    {
      label: 'The Endurance',
      chapters: [
        {
          id: 'centrifuge',
          shortLabel: 'Centrifuge',
          label: 'Artificial Gravity: The Rotating Ring',
          icon: '⊛',
          intro: "The Endurance uses a rotating habitat ring to simulate gravity through centrifugal force. Spin fast enough and the floor pushes up — indistinguishable from real gravity. But spin too fast and the Coriolis effect makes simply turning your head cause vertigo. Dial in radius and RPM to find the sweet spot.",
          stats: [
            { label: 'Endurance radius', value: '~45 m',   sub: 'estimated from film' },
            { label: 'Target RPM',       value: '~3.7',    sub: 'to achieve 1g at 45m' },
            { label: 'Comfort limit',    value: '≤3 RPM',  sub: 'above this: Coriolis sickness' }
          ]
        }
      ]
    }
  ]
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
