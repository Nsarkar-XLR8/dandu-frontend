import { FormEvent } from 'react';
import { ShieldCheck } from 'lucide-react';
import { AuthSwitch, BrandMark, Feedback, MiniMark, PasswordField, PrimaryButton, RememberCheckbox, TextButton, TextField } from '../ui';

function AuthHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-7 text-center">
      <BrandMark />
      <div className="mt-3 flex items-center justify-center gap-2">
        <MiniMark />
        <span className="text-sm font-semibold tracking-tight text-white/90">dandu ops</span>
      </div>
      <h1 className="mt-7 text-2xl font-semibold tracking-tight text-white">{title}</h1>
      <p className="mx-auto mt-3 max-w-[330px] text-sm leading-6 text-[#a3a3a3]">{subtitle}</p>
    </div>
  );
}

export function SignInPage(props: {
  busy: boolean; email: string; password: string; rememberSession: boolean; showPassword: boolean; message: string; error: string;
  onEmailChange: (value: string) => void; onPasswordChange: (value: string) => void; onRememberSessionChange: (value: boolean) => void; onShowPasswordChange: (value: boolean) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void; onForgot: () => void; onSignUp: () => void;
}) {
  return (
    <>
      <AuthHeader title="Sign in" subtitle="Enter your operator credentials to open the dashboard." />
      <Feedback message={props.message} error={props.error} />
      <form className="space-y-3" onSubmit={props.onSubmit}>
        <TextField id="sign-in-email" label="Work Email" value={props.email} onChange={props.onEmailChange} disabled={props.busy} hasError={Boolean(props.error)} type="email" autoComplete="email" placeholder="admin@company.com" />
        <PasswordField id="sign-in-password" label="Password" value={props.password} onChange={props.onPasswordChange} disabled={props.busy} hasError={Boolean(props.error)} showPassword={props.showPassword} onShowPasswordChange={props.onShowPasswordChange} rightAction={<TextButton label="Forgot?" onClick={props.onForgot} />} />
        <RememberCheckbox checked={props.rememberSession} disabled={props.busy} onChange={props.onRememberSessionChange} />
        <PrimaryButton busy={props.busy} icon={<ShieldCheck className="size-4" />} label="Sign In" loadingLabel="Signing in..." />
      </form>
      <AuthSwitch text="Need an operator account?" action="Sign up" onClick={props.onSignUp} />
    </>
  );
}

export { AuthHeader };
