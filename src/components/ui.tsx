import {
  AlertTriangle,
  Check,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  ShieldCheck,
} from 'lucide-react';
import { ReactNode } from 'react';

export function InlineError({ text }: { text: string }) {
  return <div className="my-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{text}</div>;
}

export function ToolbarButton({ icon, label, onClick, disabled, danger = false }: { icon: ReactNode; label: string; onClick: () => void; disabled: boolean; danger?: boolean }) {
  return (
    <button className={`inline-flex h-9 items-center gap-2 rounded-xl px-3 text-xs font-black ${danger ? 'bg-red-50 text-red-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`} disabled={disabled} type="button" onClick={onClick}>
      {icon}
      {label}
    </button>
  );
}

export function FormInput({ label, value, onChange, className = '' }: { label: string; value: string; onChange: (value: string) => void; className?: string }) {
  return (
    <label className={className}>
      <span className="mb-1 block text-xs font-black uppercase text-slate-500">{label}</span>
      <input className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:ring-2 focus:ring-emerald-600" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

export function TextField(props: { id: string; label: string; value: string; onChange: (value: string) => void; disabled: boolean; hasError: boolean; type?: string; autoComplete?: string; placeholder?: string; inputMode?: 'numeric' }) {
  return (
    <label className="block" htmlFor={props.id}>
      <span className="mb-2 block text-sm font-medium text-neutral-200">{props.label}</span>
      <input id={props.id} className={`h-11 w-full rounded-xl bg-[#2b2b2b] px-3 text-sm text-white outline-none ring-1 transition duration-200 placeholder:text-[#747474] focus:ring-2 ${props.hasError ? 'ring-red-400/60 focus:ring-red-400' : 'ring-white/[0.06] focus:ring-emerald-400'}`} value={props.value} onChange={(event) => props.onChange(event.target.value)} type={props.type ?? 'text'} autoComplete={props.autoComplete} aria-label={props.label} aria-invalid={props.hasError} placeholder={props.placeholder} disabled={props.disabled} inputMode={props.inputMode} />
    </label>
  );
}

export function PasswordField(props: { id: string; label: string; value: string; onChange: (value: string) => void; disabled: boolean; hasError: boolean; showPassword: boolean; onShowPasswordChange: (value: boolean) => void; autoComplete?: string; rightAction?: ReactNode }) {
  return (
    <label className="block" htmlFor={props.id}>
      <span className="mb-2 flex items-center justify-between gap-3 text-sm font-medium text-neutral-200">
        <span>{props.label}</span>
        {props.rightAction}
      </span>
      <span className="relative block">
        <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#777]" />
        <input id={props.id} className={`h-11 w-full rounded-xl bg-[#2b2b2b] pl-9 pr-11 text-sm text-white outline-none ring-1 transition duration-200 placeholder:text-[#747474] focus:ring-2 ${props.hasError ? 'ring-red-400/60 focus:ring-red-400' : 'ring-white/[0.06] focus:ring-emerald-400'}`} value={props.value} onChange={(event) => props.onChange(event.target.value)} type={props.showPassword ? 'text' : 'password'} autoComplete={props.autoComplete ?? 'current-password'} aria-label={props.label} aria-invalid={props.hasError} placeholder={props.autoComplete === 'new-password' ? 'Minimum 8 characters' : 'Enter password'} disabled={props.disabled} />
        <button className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-[#8a8a8a] transition hover:bg-white/5 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-400" type="button" onClick={() => props.onShowPasswordChange(!props.showPassword)} aria-label={props.showPassword ? 'Hide password' : 'Show password'} disabled={props.disabled}>
          {props.showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </span>
    </label>
  );
}

export function RememberCheckbox({ checked, disabled, onChange }: { checked: boolean; disabled: boolean; onChange: (value: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-xl py-1.5 text-sm text-[#b8b8b8]">
      <input className="sr-only" type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} aria-label="Keep me securely logged in for 7 days" disabled={disabled} />
      <span className={`flex size-5 items-center justify-center rounded-md border transition ${checked ? 'border-emerald-400 bg-emerald-400 text-[#08130d]' : 'border-[#3a3a3a] bg-[#242424] text-transparent'}`} aria-hidden="true">
        <Check className="size-3.5" />
      </span>
      <span>Keep me securely logged in for 7 days</span>
    </label>
  );
}

export function PrimaryButton({ busy, icon, label, loadingLabel }: { busy: boolean; icon: ReactNode; label: string; loadingLabel: string }) {
  return (
    <button className="group flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-[#171717] transition duration-200 hover:brightness-95 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-80" type="submit" disabled={busy} aria-busy={busy}>
      {busy ? <Loader2 className="size-4 animate-spin" /> : icon}
      {busy ? loadingLabel : label}
    </button>
  );
}

export function SecondaryButton({ busy, icon, label, onClick }: { busy: boolean; icon: ReactNode; label: string; onClick: () => void }) {
  return (
    <button className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#2b2b2b] px-4 text-sm font-semibold text-white transition hover:bg-[#333] disabled:opacity-60" type="button" disabled={busy} onClick={onClick}>
      {icon}
      {label}
    </button>
  );
}

export function TextButton({ label, onClick }: { label: string; onClick: () => void }) {
  return <button className="text-xs font-semibold text-emerald-400 hover:text-emerald-300" type="button" onClick={onClick}>{label}</button>;
}

export function AuthSwitch({ text, action, onClick }: { text: string; action: string; onClick: () => void }) {
  return <p className="mt-5 text-center text-sm text-[#8f8f8f]">{text} <button className="font-semibold text-emerald-400 hover:text-emerald-300" type="button" onClick={onClick}>{action}</button></p>;
}

export function Feedback({ message, error, light = false }: { message: string; error: string; light?: boolean }) {
  if (!message && !error) return null;
  return (
    <div className={`mb-4 flex items-start gap-3 rounded-2xl border px-3 py-3 text-sm ${error ? 'border-red-400/20 bg-red-500/10 text-red-100' : light ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-emerald-400/20 bg-emerald-400/10 text-emerald-100'}`} role={error ? 'alert' : 'status'}>
      {error ? <AlertTriangle className="mt-0.5 size-4 shrink-0 text-red-300" /> : <ShieldCheck className="mt-0.5 size-4 shrink-0" />}
      <p className="font-medium">{error || message}</p>
    </div>
  );
}

export function BrandMark() {
  return (
    <div className="mx-auto grid h-16 w-20 grid-cols-3 grid-rows-2 items-center justify-items-center gap-1" aria-hidden="true">
      <span className="col-start-1 row-start-2 size-5 rounded-full bg-white" />
      <span className="col-start-2 row-start-1 h-12 w-5 rounded-full bg-white" />
      <span className="col-start-2 row-start-2 size-5 rounded-full bg-white" />
      <span className="col-start-3 row-start-1 h-12 w-5 rounded-full bg-white" />
      <span className="col-start-3 row-start-2 size-5 rounded-full bg-white" />
    </div>
  );
}

export function MiniMark({ dark = false }: { dark?: boolean }) {
  const color = dark ? 'bg-slate-950' : 'bg-white';
  return (
    <span className="grid size-6 grid-cols-3 grid-rows-2 items-center justify-items-center gap-0.5" aria-hidden="true">
      <span className={`col-start-1 row-start-2 size-1.5 rounded-full ${color}`} />
      <span className={`col-start-2 row-start-1 h-4 w-1.5 rounded-full ${color}`} />
      <span className={`col-start-2 row-start-2 size-1.5 rounded-full ${color}`} />
      <span className={`col-start-3 row-start-1 h-4 w-1.5 rounded-full ${color}`} />
      <span className={`col-start-3 row-start-2 size-1.5 rounded-full ${color}`} />
    </span>
  );
}

export function AmbientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.055),transparent_24%),radial-gradient(circle_at_50%_76%,rgba(16,185,129,0.10),transparent_28%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:52px_52px] opacity-40 [mask-image:radial-gradient(circle_at_center,black,transparent_68%)]" />
    </div>
  );
}

export function Panel({ title, children, className = '' }: { title: string; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-sm ${className}`}>
      <h2 className="mb-4 text-lg font-black tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

export function Kpi({ icon, label, value, detail }: { icon: ReactNode; label: string; value: string; detail: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">{icon}</div>
      <div className="text-xs font-black uppercase text-slate-500">{label}</div>
      <div className="mt-1 text-2xl font-black">{value}</div>
      <div className="mt-1 text-sm text-slate-500">{detail}</div>
    </div>
  );
}

export function RoadmapStep({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <div className="font-black">{title}</div>
      <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}

export function DataPreview({ data }: { data: unknown }) {
  return <pre className="mt-4 max-h-96 overflow-auto rounded-xl bg-slate-950 p-4 text-xs text-emerald-100">{JSON.stringify(data, null, 2)}</pre>;
}

export function Empty({ text }: { text: string }) {
  return <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">{text}</div>;
}
