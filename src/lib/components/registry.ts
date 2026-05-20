// Maps film slug → chapter id → Svelte component constructor.
// Kept separate from film data so Svelte components are never imported
// in server-side load functions.
import type { ComponentType, SvelteComponent } from 'svelte';

import AstrophageDiagram from './AstrophageDiagram.svelte';
import PhotonEngine from './PhotonEngine.svelte';
import EarthParallels from './EarthParallels.svelte';
import PetrovaEffect from './PetrovaEffect.svelte';
import RockyLanguage from './RockyLanguage.svelte';
import RockyPhysiology from './RockyPhysiology.svelte';
import MissionDesign from './MissionDesign.svelte';
import GraceBiology from './GraceBiology.svelte';

type AnyComponent = ComponentType<SvelteComponent>;

const registry: Record<string, Record<string, AnyComponent>> = {
  'project-hail-mary': {
    organism:    AstrophageDiagram as AnyComponent,
    photon:      PhotonEngine      as AnyComponent,
    parallels:   EarthParallels    as AnyComponent,
    petrova:     PetrovaEffect     as AnyComponent,
    'rocky-lang': RockyLanguage    as AnyComponent,
    'rocky-phys': RockyPhysiology  as AnyComponent,
    mission:     MissionDesign     as AnyComponent,
    grace:       GraceBiology      as AnyComponent
  }
};

export function getComponents(slug: string): Record<string, AnyComponent> {
  return registry[slug] ?? {};
}
