import { ReactNode } from 'react';
import { FileUp, Home, LogOut, PackageSearch, RefreshCw, Settings, User, X } from 'lucide-react';
import { MiniMark, ToolbarButton, Feedback } from '../ui';
import { AuthSession, CurrentUserProfile } from '../../lib/authApi';

export type AppPage = 'dashboard' | 'sku' | 'import' | 'profile' | 'security';

export function AppShell({
  page,
  session,
  profile,
  busy,
  message,
  error,
  onPageChange,
  onRefresh,
  onLogout,
  onLogoutAll,
  children,
}: {
  page: AppPage;
  session: AuthSession;
  profile: CurrentUserProfile | null;
  busy: boolean;
  message: string;
  error: string;
  onPageChange: (page: AppPage) => void;
  onRefresh: () => void;
  onLogout: () => void;
  onLogoutAll: () => void;
  children: ReactNode;
}) {
  const navItems: Array<{ page: AppPage; label: string; icon: ReactNode }> = [
    { page: 'dashboard', label: 'Dashboard', icon: <Home className="size-4" /> },
    { page: 'sku', label: 'SKU Search', icon: <PackageSearch className="size-4" /> },
    { page: 'import', label: 'Import', icon: <FileUp className="size-4" /> },
    { page: 'profile', label: 'Profile', icon: <User className="size-4" /> },
    { page: 'security', label: 'Security', icon: <Settings className="size-4" /> },
  ];

  return (
    <main className="min-h-screen bg-[#f4f7f5] text-[#111]">
      <div className="mx-auto grid min-h-screen max-w-[1440px] lg:grid-cols-[248px_1fr]">
        <aside className="border-r border-slate-200 bg-white p-4">
          <div className="mb-8 flex items-center gap-3">
            <MiniMark dark />
            <div>
              <div className="text-sm font-black">dandu ops</div>
              <div className="text-xs text-slate-500">Internal console</div>
            </div>
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                className={`flex h-10 w-full items-center gap-2 rounded-xl px-3 text-left text-sm font-bold transition ${
                  page === item.page ? 'bg-emerald-700 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                }`}
                key={item.page}
                type="button"
                onClick={() => onPageChange(item.page)}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </aside>
        <section className="min-w-0 p-4 lg:p-6">
          <header className="mb-4 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-xs font-black uppercase text-emerald-700">Operations Engine</div>
              <h1 className="text-2xl font-black tracking-tight">Welcome, {profile?.username ?? session.user.username}</h1>
              <p className="text-sm text-slate-500">{session.user.email} · {session.user.role}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <ToolbarButton icon={<RefreshCw className="size-4" />} label="Refresh token" onClick={onRefresh} disabled={busy} />
              <ToolbarButton icon={<LogOut className="size-4" />} label="Logout" onClick={onLogout} disabled={busy} />
              <ToolbarButton icon={<X className="size-4" />} label="Logout all" onClick={onLogoutAll} disabled={busy} danger />
            </div>
          </header>
          <Feedback message={message} error={error} light />
          {children}
        </section>
      </div>
    </main>
  );
}
