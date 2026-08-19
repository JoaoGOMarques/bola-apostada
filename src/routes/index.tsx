import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Trash2, Plus } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Palpites Brasileirão Série A | Monte seus jogos" },
      {
        name: "description",
        content:
          "Monte sua lista de palpites do Brasileirão Série A: escolha mandante, visitante e aposte em Casa, Empate ou Fora.",
      },
      { property: "og:title", content: "Palpites Brasileirão Série A" },
      {
        property: "og:description",
        content:
          "Monte sua lista de palpites do Brasileirão Série A: escolha mandante, visitante e aposte em Casa, Empate ou Fora.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const TIMES = [
  "Atlético-MG",
  "Bahia",
  "Botafogo",
  "Bragantino",
  "Ceará",
  "Corinthians",
  "Cruzeiro",
  "Flamengo",
  "Fluminense",
  "Fortaleza",
  "Grêmio",
  "Internacional",
  "Juventude",
  "Mirassol",
  "Palmeiras",
  "Santos",
  "São Paulo",
  "Sport",
  "Vasco da Gama",
  "Vitória",
];

type Palpite = "casa" | "empate" | "fora";
type Jogo = { id: number; mandante: string; visitante: string; palpite: Palpite | null };

let nextId = 3;
const novoJogo = (): Jogo => ({ id: nextId++, mandante: "", visitante: "", palpite: null });

const selectClass =
  "w-full appearance-none rounded-lg border border-input bg-secondary px-3 py-2.5 text-sm font-medium text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/40";

function Index() {
  const [jogos, setJogos] = useState<Jogo[]>([
    { id: 1, mandante: "Flamengo", visitante: "Palmeiras", palpite: null },
    { id: 2, mandante: "", visitante: "", palpite: null },
  ]);

  const atualizar = (id: number, patch: Partial<Jogo>) =>
    setJogos((prev) => prev.map((j) => (j.id === id ? { ...j, ...patch } : j)));

  const remover = (id: number) => setJogos((prev) => prev.filter((j) => j.id !== id));

  const preenchidos = jogos.filter((j) => j.mandante && j.visitante && j.palpite).length;

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/60">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Rodada aberta
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Palpites Brasileirão Série A
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Escolha os confrontos e marque seu resultado: casa, empate ou fora.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-3xl space-y-4 px-4 py-8">
        {jogos.map((jogo, i) => (
          <article
            key={jogo.id}
            className="relative rounded-2xl border border-border bg-card p-5 shadow-lg shadow-black/20"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground">
                Jogo {i + 1}
              </span>
              <button
                type="button"
                onClick={() => remover(jogo.id)}
                aria-label={`Remover jogo ${i + 1}`}
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-destructive/15 hover:text-destructive"
              >
                <Trash2 className="size-4" />
              </button>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex-1">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Mandante
                </label>
                <select
                  value={jogo.mandante}
                  onChange={(e) => atualizar(jogo.id, { mandante: e.target.value })}
                  className={selectClass}
                >
                  <option value="">Selecione o time</option>
                  {TIMES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <span className="self-center pt-5 text-sm font-bold text-primary sm:pt-6">VS</span>

              <div className="flex-1">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Visitante
                </label>
                <select
                  value={jogo.visitante}
                  onChange={(e) => atualizar(jogo.id, { visitante: e.target.value })}
                  className={selectClass}
                >
                  <option value="">Selecione o time</option>
                  {TIMES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2">
              {(
                [
                  ["casa", "Casa"],
                  ["empate", "Empate"],
                  ["fora", "Fora"],
                ] as const
              ).map(([valor, label]) => {
                const ativo = jogo.palpite === valor;
                return (
                  <label
                    key={valor}
                    className={`cursor-pointer rounded-xl border px-3 py-2.5 text-center text-sm font-semibold transition-all ${
                      ativo
                        ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
                        : "border-border bg-secondary text-muted-foreground hover:border-primary/50 hover:text-foreground"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`palpite-${jogo.id}`}
                      value={valor}
                      checked={ativo}
                      onChange={() => atualizar(jogo.id, { palpite: valor })}
                      className="sr-only"
                    />
                    {label}
                  </label>
                );
              })}
            </div>
          </article>
        ))}

        {jogos.length === 0 && (
          <p className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            Nenhum jogo na lista. Adicione o primeiro palpite abaixo.
          </p>
        )}

        <button
          type="button"
          onClick={() => setJogos((prev) => [...prev, novoJogo()])}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-4 text-sm font-bold text-primary-foreground transition-transform hover:brightness-105 active:scale-[0.99]"
        >
          <Plus className="size-4" />
          Adicionar novo jogo
        </button>

        <p className="pt-2 text-center text-xs text-muted-foreground">
          {preenchidos} de {jogos.length} palpites completos
        </p>
      </section>
    </main>
  );
}
