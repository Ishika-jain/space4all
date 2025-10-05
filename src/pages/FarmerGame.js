import { TractorGame } from "../components/tractor-game"

export default function FarmerGame() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center gap-6 px-4 py-10">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-pretty">Tractor in the Corn Field</h1>
        <p className="mt-2 text-sm opacity-80">Tap / click / press Space to drive the tractor through the corn rows.</p>
      </header>

      <section aria-label="Game area" className="w-full max-w-[720px]">
        <TractorGame />
      </section>
    </main>
  )
}
