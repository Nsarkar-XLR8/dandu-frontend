import { FormEvent, useState } from 'react';
import { Loader2, LockKeyhole } from 'lucide-react';
import { Panel, PasswordField } from '../components/ui';
import { authApi, AuthSession } from '../lib/authApi';

export function SecurityPage({
  session,
  currentPassword,
  newPassword,
  showNewPassword,
  onCurrentPasswordChange,
  onNewPasswordChange,
  onShowNewPasswordChange,
  onSessionChange,
  onMessage,
  onError,
}: {
  session: AuthSession;
  currentPassword: string;
  newPassword: string;
  showNewPassword: boolean;
  onCurrentPasswordChange: (value: string) => void;
  onNewPasswordChange: (value: string) => void;
  onShowNewPasswordChange: (value: boolean) => void;
  onSessionChange: (session: AuthSession) => void;
  onMessage: (message: string) => void;
  onError: (error: string) => void;
}) {
  const [loading, setLoading] = useState(false);

  const changePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    onError('');
    onMessage('');
    try {
      const response = await authApi.changePassword(
        { currentPassword, newPassword },
        session.accessToken,
      );
      onSessionChange(response.data);
      onCurrentPasswordChange('');
      onNewPasswordChange('');
      onMessage('Password changed and session refreshed.');
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Password change failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Panel title="Security">
      <form className="max-w-xl space-y-3" onSubmit={changePassword}>
        <PasswordField id="current-password" label="Current password" value={currentPassword} onChange={onCurrentPasswordChange} disabled={loading} hasError={false} showPassword={false} onShowPasswordChange={() => undefined} />
        <PasswordField id="new-password" label="New password" value={newPassword} onChange={onNewPasswordChange} disabled={loading} hasError={false} showPassword={showNewPassword} onShowPasswordChange={onShowNewPasswordChange} autoComplete="new-password" />
        <button className="inline-flex h-11 items-center gap-2 rounded-xl bg-emerald-700 px-4 text-sm font-black text-white" disabled={loading} type="submit">
          {loading ? <Loader2 className="size-4 animate-spin" /> : <LockKeyhole className="size-4" />}
          Change password
        </button>
      </form>
    </Panel>
  );
}
