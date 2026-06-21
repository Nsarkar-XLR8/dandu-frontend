import { ReactNode } from 'react';
import { AmbientBackground } from '../ui';

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#101010] px-4 py-8 text-white antialiased">
      <AmbientBackground />
      <section className="relative z-10 w-full max-w-[390px]">
        <div className="rounded-[28px] border border-white/[0.07] bg-[#151515]/80 p-6 shadow-[0_32px_120px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:p-7">
          {children}
        </div>
        <footer className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-[#777]">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-40" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
          </span>
          <span>API Gateway Online · Secure auth events logged for audit.</span>
        </footer>
      </section>
    </main>
  );
}
