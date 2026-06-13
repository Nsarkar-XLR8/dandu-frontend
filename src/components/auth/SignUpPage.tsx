import { FormEvent } from 'react';
import { UserPlus } from 'lucide-react';
import { AuthSwitch, Feedback, PasswordField, PrimaryButton, TextField } from '../ui';
import { AuthHeader } from './SignInPage';

export function SignUpPage(props: {
  busy: boolean; email: string; username: string; password: string; showPassword: boolean; message: string; error: string;
  onEmailChange: (value: string) => void; onUsernameChange: (value: string) => void; onPasswordChange: (value: string) => void; onShowPasswordChange: (value: boolean) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void; onSignIn: () => void;
}) {
  return (
    <>
      <AuthHeader title="Sign up" subtitle="Create an internal operator account, then verify it with OTP." />
      <Feedback message={props.message} error={props.error} />
      <form className="space-y-3" onSubmit={props.onSubmit}>
        <TextField id="sign-up-username" label="Username" value={props.username} onChange={props.onUsernameChange} disabled={props.busy} hasError={Boolean(props.error)} autoComplete="username" placeholder="ops-admin" />
        <TextField id="sign-up-email" label="Work Email" value={props.email} onChange={props.onEmailChange} disabled={props.busy} hasError={Boolean(props.error)} type="email" autoComplete="email" placeholder="admin@company.com" />
        <PasswordField id="sign-up-password" label="Password" value={props.password} onChange={props.onPasswordChange} disabled={props.busy} hasError={Boolean(props.error)} showPassword={props.showPassword} onShowPasswordChange={props.onShowPasswordChange} autoComplete="new-password" />
        <PrimaryButton busy={props.busy} icon={<UserPlus className="size-4" />} label="Create Account" loadingLabel="Creating..." />
      </form>
      <AuthSwitch text="Already have access?" action="Sign in" onClick={props.onSignIn} />
    </>
  );
}
