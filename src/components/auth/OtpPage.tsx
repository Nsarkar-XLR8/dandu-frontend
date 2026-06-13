import { FormEvent } from 'react';
import { RotateCcw, ShieldCheck } from 'lucide-react';
import { AuthSwitch, Feedback, PrimaryButton, SecondaryButton, TextField } from '../ui';
import { AuthHeader } from './SignInPage';

export function OtpPage(props: { title: string; subtitle: string; busy: boolean; otp: string; message: string; error: string; onOtpChange: (value: string) => void; onSubmit: (event: FormEvent<HTMLFormElement>) => void; onBack: () => void; onResend: () => void }) {
  return (
    <>
      <AuthHeader title={props.title} subtitle={props.subtitle} />
      <Feedback message={props.message} error={props.error} />
      <form className="space-y-3" onSubmit={props.onSubmit}>
        <TextField id="otp-code" label="OTP Code" value={props.otp} onChange={props.onOtpChange} disabled={props.busy} hasError={Boolean(props.error)} inputMode="numeric" placeholder="6-digit code" />
        <PrimaryButton busy={props.busy} icon={<ShieldCheck className="size-4" />} label="Verify OTP" loadingLabel="Verifying..." />
        <SecondaryButton busy={props.busy} icon={<RotateCcw className="size-4" />} label="Resend OTP" onClick={props.onResend} />
      </form>
      <AuthSwitch text="Need to change details?" action="Go back" onClick={props.onBack} />
    </>
  );
}
