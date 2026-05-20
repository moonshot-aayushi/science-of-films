export interface Stat {
  label: string;
  value: string;
  sub: string;
}

export interface ChapterNote {
  label: string;
  text: string;
}

export interface Chapter {
  id: string;
  shortLabel: string;
  label: string;
  icon: string;
  intro: string;
  stats?: Stat[];
  note?: ChapterNote;
}

export interface Section {
  label: string;
  chapters: Chapter[];
}

export interface Film {
  slug: string;
  title: string;
  year: number;
  author: string;
  status: 'available' | 'coming-soon';
  tagline: string;
  concepts: string[];
  sections: Section[];
}
