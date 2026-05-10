import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img src="/favicon.svg" alt="" width={44} height={44} className="w-11 h-11 rounded-full bg-primary-foreground/5 p-1" />
            <div className="font-display text-3xl">Daima Coffee Estate</div>
          </div>
          <p className="mt-4 text-primary-foreground/70 max-w-md leading-relaxed">
            A working highland farm crafting single-origin coffee with patience, care, and a deep respect for the land.
          </p>
        </div>
        <div>
          <div className="eyebrow text-primary-foreground/60">Explore</div>
          <ul className="mt-4 space-y-2 text-primary-foreground/80">
            <li><Link to="/about" className="hover:text-primary-foreground">About</Link></li>
            <li><Link to="/produce" className="hover:text-primary-foreground">Produce</Link></li>
            <li><Link to="/logistics" className="hover:text-primary-foreground">Logistics</Link></li>
            <li><Link to="/contact" className="hover:text-primary-foreground">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="eyebrow text-primary-foreground/60">Estate</div>
          <ul className="mt-4 space-y-2 text-primary-foreground/80 text-sm">
            <li>Central Highlands</li>
            <li>hello@daimacoffee.com</li>
            <li>+254 700 000 000</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex justify-between text-xs text-primary-foreground/60">
          <span>© {new Date().getFullYear()} Daima Coffee Estate</span>
          <span>Grown with care.</span>
        </div>
      </div>
    </footer>
  );
}
