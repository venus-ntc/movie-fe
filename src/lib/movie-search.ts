export function matchesMovieTitle(movie: { title: string; originalTitle?: string }, keyword: string): boolean {
  const normalize = (value: string) => value.toLocaleLowerCase("vi").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/\s+/g, " ").trim();
  const query = normalize(keyword);
  return !query || normalize(movie.title).includes(query) || normalize(movie.originalTitle || "").includes(query);
}
