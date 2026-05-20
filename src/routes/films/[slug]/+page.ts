import type { PageLoad } from './$types';
import { getFilm } from '$lib/data/films';
import { error } from '@sveltejs/kit';

export const load: PageLoad = ({ params }) => {
  const film = getFilm(params.slug);
  if (!film || film.status !== 'available') {
    throw error(404, `Film "${params.slug}" not found`);
  }
  return { film };
};
