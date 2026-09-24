/** Marca provisória — substituir pela logo oficial da CES-MT quando enviada. */
export function Logo() {
  return (
    <span className="flex items-center gap-3">
      <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-primary-foreground" aria-hidden>
        <span className="relative h-6 w-6">
          <span className="absolute left-1/2 top-0 h-6 w-1.5 -translate-x-1/2 bg-cta" />
          <span className="absolute left-0 top-1.5 h-1.5 w-6 bg-cta" />
        </span>
      </span>
      <span className="leading-tight">
        <span className="block font-serif text-xl font-bold tracking-wide">CES-MT</span>
        <span className="block text-[11px] uppercase tracking-[0.18em] opacity-80">Cristo é o Salvador</span>
      </span>
    </span>
  );
}
