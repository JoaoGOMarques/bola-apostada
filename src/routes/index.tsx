import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Trash2, Plus, LogOut, Lock } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

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

const logo = (id: number) => `https://a.espncdn.com/i/teamlogos/soccer/500/${id}.png`;

const TIMES: { nome: string; escudo: string }[] = [
  { nome: "Atlético-MG", escudo: logo(7632) },
  { nome: "Bahia", escudo: logo(9967) },
  { nome: "Botafogo", escudo: logo(6086) },
  { nome: "Bragantino", escudo: logo(6079) },
  { nome: "Ceará", escudo: logo(9969) },
  { nome: "Corinthians", escudo: logo(874) },
  { nome: "Cruzeiro", escudo: logo(2022) },
  { nome: "Flamengo", escudo: logo(819) },
  { nome: "Fluminense", escudo: logo(3445) },
  { nome: "Fortaleza", escudo: logo(6272) },
  { nome: "Grêmio", escudo: logo(6273) },
  { nome: "Internacional", escudo: logo(1936) },
  { nome: "Juventude", escudo: logo(6270) },
  { nome: "Mirassol", escudo: logo(9169) },
  { nome: "Palmeiras", escudo: logo(2029) },
  { nome: "Santos", escudo: logo(2674) },
  { nome: "São Paulo", escudo: logo(2026) },
  { nome: "Sport", escudo: logo(7635) },
  { nome: "Vasco da Gama", escudo: logo(3454) },
  { nome: "Vitória", escudo: logo(3457) },
];

const ADMIN_USER = "admin";
const ADMIN_PASS = "123";

const escudoDe = (nome: string) => TIMES.find((t) => t.nome === nome)?.escudo;

function Escudo({ nome, grande }: { nome: string; grande?: boolean }) {
  const src = escudoDe(nome);
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full border border-border bg-secondary ${
        grande ? "size-16" : "size-11"
      }`}
    >
      {src ? (
        <img
          src={src}
          alt={`Escudo do ${nome}`}
          loading="lazy"
          className={grande ? "size-12 object-contain" : "size-8 object-contain"}
        />
      ) : (
        <span className="text-[10px] font-bold text-muted-foreground">?</span>
      )}
    </div>
  );
}

type Palpite = "casa" | "empate" | "fora";
type Jogo = { id: number; mandante: string; visitante: string; palpite: Palpite | null };

let nextId = 3;
const novoJogo = (): Jogo => ({ id: nextId++, mandante: "", visitante: "", palpite: null });

const selectClass =
  "w-full appearance-none rounded-lg border border-input bg-secondary px-3 py-2.5 text-sm font-medium text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/40";

const OPCOES = [
  ["casa", "Casa"],
  ["empate", "Empate"],
  ["fora", "Fora"],
] as const;

function Index() {
  const [modo, setModo] = useState<"cliente" | "admin">("cliente");
  const [autenticado, setAutenticado] = useState(false);
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [jogos, setJogos] = useState<Jogo[]>([
    { id: 1, mandante: "Flamengo", visitante: "Palmeiras", palpite: null },
    { id: 2, mandante: "", visitante: "", palpite: null },
  ]);

  const atualizar = (id: number, patch: Partial<Jogo>) =>
    setJogos((prev) => prev.map((j) => (j.id === id ? { ...j, ...patch } : j)));

  const remover = (id: number) => setJogos((prev) => prev.filter((j) => j.id !== id));

  const irParaAdmin = () => {
    if (autenticado) setModo("admin");
    else setMostrarLogin(true);
  };

  const sair = () => {
    setAutenticado(false);
    setModo("cliente");
    toast("Sessão encerrada");
  };

  const jogosCliente = jogos.filter((j) => j.mandante && j.visitante);
  const confirmados = jogosCliente.filter((j) => j.palpite).length;

  return (
    <main className="min-h-screen bg-background">
      <Toaster />

      <nav className="sticky top-0 z-20 border-b border-border bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
          <span className="text-sm font-bold tracking-tight text-foreground">Palpites BR</span>
          <div className="flex items-center gap-2">
            <div className="flex rounded-xl border border-border bg-secondary p-1">
              <button
                type="button"
                onClick={() => setModo("cliente")}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  modo === "cliente"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Cliente
              </button>
              <button
                type="button"
                onClick={irParaAdmin}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  modo === "admin"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {!autenticado && <Lock className="size-3" />}
                Admin
              </button>
            </div>
            {autenticado && modo === "admin" && (
              <button
                type="button"
                onClick={sair}
                className="flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:border-destructive/50 hover:text-destructive"
              >
                <LogOut className="size-3.5" />
                Sair
              </button>
            )}
          </div>
        </div>
      </nav>

      <header className="border-b border-border bg-card/60">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {modo === "admin" ? "Modo administrador" : "Rodada aberta"}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Palpites Brasileirão Série A
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {modo === "admin"
              ? "Configure os confrontos da rodada escolhendo mandante e visitante."
              : "Escolha seu resultado em cada jogo: casa, empate ou fora."}
          </p>
        </div>
      </header>

      {modo === "admin" ? (
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
                  <div className="flex items-center gap-2">
                    <Escudo nome={jogo.mandante} />
                    <select
                      value={jogo.mandante}
                      onChange={(e) => atualizar(jogo.id, { mandante: e.target.value })}
                      className={selectClass}
                    >
                      <option value="">Selecione o time</option>
                      {TIMES.map((t) => (
                        <option key={t.nome} value={t.nome}>
                          {t.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <span className="self-center pt-5 text-sm font-bold text-primary sm:pt-6">VS</span>

                <div className="flex-1">
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Visitante
                  </label>
                  <div className="flex items-center gap-2">
                    <Escudo nome={jogo.visitante} />
                    <select
                      value={jogo.visitante}
                      onChange={(e) => atualizar(jogo.id, { visitante: e.target.value })}
                      className={selectClass}
                    >
                      <option value="">Selecione o time</option>
                      {TIMES.map((t) => (
                        <option key={t.nome} value={t.nome}>
                          {t.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </article>
          ))}

          {jogos.length === 0 && (
            <p className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              Nenhum jogo na lista. Adicione o primeiro jogo abaixo.
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
        </section>
      ) : (
        <section className="mx-auto max-w-3xl space-y-4 px-4 py-8">
          {jogosCliente.length === 0 && (
            <p className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              Nenhum jogo disponível ainda. Aguarde a configuração da rodada.
            </p>
          )}

          {jogosCliente.map((jogo) => (
            <article
              key={jogo.id}
              className="rounded-2xl border border-border bg-card p-5 shadow-lg shadow-black/20"
            >
              <div className="flex items-center justify-center gap-4">
                <div className="flex flex-1 flex-col items-center gap-2 text-center">
                  <Escudo nome={jogo.mandante} grande />
                  <span className="text-base font-bold leading-tight text-foreground sm:text-lg">
                    {jogo.mandante}
                  </span>
                </div>
                <span className="text-xl font-black text-primary">X</span>
                <div className="flex flex-1 flex-col items-center gap-2 text-center">
                  <Escudo nome={jogo.visitante} grande />
                  <span className="text-base font-bold leading-tight text-foreground sm:text-lg">
                    {jogo.visitante}
                  </span>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2">
                {OPCOES.map(([valor, label]) => {
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

          {jogosCliente.length > 0 && (
            <>
              <button
                type="button"
                onClick={() =>
                  toast.success("Palpites confirmados!", {
                    description: `${confirmados} de ${jogosCliente.length} jogos palpitados.`,
                  })
                }
                className="w-full rounded-2xl bg-primary px-4 py-5 text-base font-bold text-primary-foreground transition-transform hover:brightness-105 active:scale-[0.99]"
              >
                Confirmar Palpites
              </button>
              <p className="pt-1 text-center text-xs text-muted-foreground">
                {confirmados} de {jogosCliente.length} palpites completos
              </p>
            </>
          )}
        </section>
      )}

      {mostrarLogin && (
        <LoginModal
          onCancel={() => setMostrarLogin(false)}
          onSuccess={() => {
            setAutenticado(true);
            setMostrarLogin(false);
            setModo("admin");
            toast.success("Bem-vindo, admin!");
          }}
        />
      )}
    </main>
  );
}

function LoginModal({ onCancel, onSuccess }: { onCancel: () => void; onSuccess: () => void }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const entrar = (e: React.FormEvent) => {
    e.preventDefault();
    if (usuario === ADMIN_USER && senha === ADMIN_PASS) {
      onSuccess();
    } else {
      setErro("Credenciais inválidas");
      toast.error("Credenciais inválidas");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <form
        onSubmit={entrar}
        className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-2xl"
      >
        <h2 className="text-lg font-bold text-foreground">Acesso do administrador</h2>
        <p className="mt-1 text-xs text-muted-foreground">Entre para configurar os jogos.</p>

        <label className="mt-5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Usuário
        </label>
        <input
          value={usuario}
          onChange={(e) => {
            setUsuario(e.target.value);
            setErro("");
          }}
          autoFocus
          className="mt-1.5 w-full rounded-lg border border-input bg-secondary px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
        />

        <label className="mt-4 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Senha
        </label>
        <input
          type="password"
          value={senha}
          onChange={(e) => {
            setSenha(e.target.value);
            setErro("");
          }}
          className="mt-1.5 w-full rounded-lg border border-input bg-secondary px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
        />

        {erro && <p className="mt-3 text-sm font-semibold text-destructive">{erro}</p>}

        <div className="mt-6 flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-transform hover:brightness-105 active:scale-[0.99]"
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}
