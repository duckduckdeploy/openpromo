"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Clapperboard, ChevronLeft, Film, FolderKanban, Images, KeyRound, Lightbulb, LogOut, Menu, Palette, Search, Settings, Shapes, X } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ApiError } from "@/lib/api";
import { signOut } from "@/lib/auth";
import { useMe, useProject } from "@/lib/hooks";
import { BalanceAlert, BalanceChip, BalancePanel } from "./balance";
import { Logo } from "./logo";
import { ThemeSwitcher } from "./theme";
import { cx, Spinner } from "./ui";

const projectNav = [
  { href: "", label: "Brand", icon: Palette },
  { href: "/ideas", label: "Ideas", icon: Lightbulb },
  { href: "/images", label: "Images", icon: Images },
  { href: "/reels", label: "Reels", icon: Clapperboard },
  { href: "/videos", label: "Videos", icon: Film },
  { href: "/library", label: "Library", icon: Shapes },
];

function NavLink({ href, label, icon: Icon, active }: { href: string; label: string; icon: typeof Search; active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cx(
        "flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[13px]",
        active ? "bg-accent-soft font-medium text-accent-text" : "text-muted hover:bg-sunken hover:text-ink",
      )}
    >
      <Icon className="size-4 shrink-0" aria-hidden />
      {label}
    </Link>
  );
}

function ProjectNav({ projectId, pathname }: { projectId: string; pathname: string }) {
  const project = useProject(projectId);
  const base = `/p/${projectId}`;
  return (
    <>
      <Link href="/projects" className="mb-2 flex items-center gap-1 px-2.5 text-xs text-muted hover:text-ink">
        <ChevronLeft className="size-3.5" aria-hidden /> All projects
      </Link>
      <div className="mb-3 px-2.5">
        <p className="truncate font-display text-sm font-semibold">{project.data?.name ?? "…"}</p>
        <p className="truncate font-mono text-xs text-muted">{project.data?.domain ?? ""}</p>
      </div>
      <nav className="space-y-0.5" aria-label="Project">
        {projectNav.map((item) => {
          const href = `${base}${item.href}`;
          const active = item.href === "" ? pathname === base : pathname.startsWith(href);
          return <NavLink key={item.href} href={href} label={item.label} icon={item.icon} active={active} />;
        })}
      </nav>
    </>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  const me = useMe();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ projectId?: string }>();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const unauthenticated = me.error instanceof ApiError && me.error.status === 401;
  useEffect(() => {
    if (unauthenticated) router.replace("/sign-in");
  }, [unauthenticated, router]);
  useEffect(() => setOpen(false), [pathname]);
  // Keep the current page's item in view when the nav list scrolls.
  useEffect(() => {
    document.querySelector('aside [aria-current="page"]')?.scrollIntoView({ block: "nearest" });
  }, [pathname]);

  if (me.isPending || unauthenticated) {
    return (
      <div className="grid min-h-dvh place-items-center">
        <Spinner />
      </div>
    );
  }
  if (me.error) {
    return (
      <div className="grid min-h-dvh place-items-center px-6 text-center">
        <div>
          <p className="font-display text-lg font-semibold">Can't reach the API</p>
          <p className="mt-1 text-sm text-muted">{me.error.message}</p>
        </div>
      </div>
    );
  }

  async function onSignOut() {
    await signOut().catch(() => {});
    queryClient.clear();
    router.replace("/sign-in");
  }

  const needsKey = !me.data.settings.hasYepapiKey;

  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[232px_1fr]">
      <header className="flex items-center justify-between border-b border-line bg-surface px-4 py-2.5 lg:hidden">
        <Link href="/projects" className="text-base">
          <Logo />
        </Link>
        <div className="flex items-center gap-2">
          <BalanceChip />
          <button type="button" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} className="rounded-md p-1.5 hover:bg-sunken">
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      <aside
        className={cx(
          "flex-col border-r border-line bg-surface p-3 lg:sticky lg:top-0 lg:flex lg:h-dvh",
          open ? "flex" : "hidden",
        )}
      >
        <Link href="/projects" className="mb-5 hidden px-2.5 pt-1 text-lg lg:block">
          <Logo />
        </Link>
        <div className="flex-1 overflow-y-auto">
          {params.projectId ? (
            <ProjectNav projectId={params.projectId} pathname={pathname} />
          ) : (
            <nav className="space-y-0.5" aria-label="Main">
              <NavLink href="/projects" label="Projects" icon={FolderKanban} active={pathname.startsWith("/projects")} />
            </nav>
          )}
        </div>
        <div className="mt-3 space-y-0.5 border-t border-line pt-3">
          <BalancePanel />
          <NavLink href="/settings" label="Settings and usage" icon={Settings} active={pathname.startsWith("/settings")} />
          <div className="px-2.5 pt-2">
            <ThemeSwitcher />
          </div>
          <div className="flex items-center gap-2 pt-1 pl-2.5">
            <p className="min-w-0 flex-1 truncate font-mono text-[11px] text-faint">{me.data.user.email}</p>
            <button type="button" onClick={onSignOut} className="inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted hover:bg-sunken hover:text-ink">
              <LogOut className="size-3.5" aria-hidden /> Sign out
            </button>
          </div>
        </div>
      </aside>

      <main className="min-w-0">
        {needsKey && !pathname.startsWith("/settings") && (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-accent bg-accent px-4 py-2 text-[13px] text-accent-fg lg:px-8">
            <KeyRound className="size-4" aria-hidden />
            <span>Add your YepAPI key to read websites and make media. For a limited time, new YepAPI accounts get $5 in free credit.</span>
            <Link href="/settings" className="font-semibold underline underline-offset-2">
              Add key
            </Link>
          </div>
        )}
        {!needsKey && <BalanceAlert />}
        {/* Project views use the full width: grids of media and the editor need it. */}
        <div className={cx("mx-auto px-4 py-6 lg:px-8 lg:py-8", pathname.startsWith("/p/") ? "max-w-none" : "max-w-6xl")}>{children}</div>
      </main>
    </div>
  );
}
