import { FormEvent } from 'react';
import { RotateCcw } from 'lucide-react';
import { AuthSwitch, Feedback, PrimaryButton, TextField } from '../ui';
import { AuthHeader } from './SignInPage';

export function ForgotPasswordPage(props: { busy: boolean; email: string; message: string; error: string; onEmailChange: (value: string) => void; onSubmit: (event: FormEvent<HTMLFormElement>) => void; onBack: () => void }) {
  return (
    <>
      <AuthHeader title="Forgot password" subtitle="Send a reset OTP to the operator email on file." />
      <Feedback message={props.message} error={props.error} />
      <form className="space-y-3" onSubmit={props.onSubmit}>
        <TextField id="forgot-email" label="Work Email" value={props.email} onChange={props.onEmailChange} disabled={props.busy} hasError={Boolean(props.error)} type="email" autoComplete="email" placeholder="admin@company.com" />
        <PrimaryButton busy={props.busy} icon={<RotateCcw className="size-4" />} label="Send Reset OTP" loadingLabel="Sending..." />
      </form>
      <AuthSwitch text="Remembered it?" action="Back to sign in" onClick={props.onBack} />
    </>
  );
}
