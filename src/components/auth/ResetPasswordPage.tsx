import { FormEvent } from 'react';
import { LockKeyhole } from 'lucide-react';
import { AuthSwitch, Feedback, PasswordField, PrimaryButton } from '../ui';
import { AuthHeader } from './SignInPage';

export function ResetPasswordPage(props: { busy: boolean; newPassword: string; showNewPassword: boolean; message: string; error: string; onNewPasswordChange: (value: string) => void; onShowNewPasswordChange: (value: boolean) => void; onSubmit: (event: FormEvent<HTMLFormElement>) => void; onBack: () => void }) {
  return (
    <>
      <AuthHeader title="Reset password" subtitle="Create a new password with the verified reset grant." />
      <Feedback message={props.message} error={props.error} />
      <form className="space-y-3" onSubmit={props.onSubmit}>
        <PasswordField id="reset-new-password" label="New Password" value={props.newPassword} onChange={props.onNewPasswordChange} disabled={props.busy} hasError={Boolean(props.error)} showPassword={props.showNewPassword} onShowPasswordChange={props.onShowNewPasswordChange} autoComplete="new-password" />
        <PrimaryButton busy={props.busy} icon={<LockKeyhole className="size-4" />} label="Set New Password" loadingLabel="Updating..." />
      </form>
      <AuthSwitch text="Wrong code?" action="Back to OTP" onClick={props.onBack} />
    </>
  );
}
