import { FormEvent, useEffect, useState } from 'react';
import { Camera, Check, Loader2, Mail, ShieldCheck, User } from 'lucide-react';
import { FormInput, Panel } from '../components/ui';
import { authApi, AuthSession, CurrentUserProfile } from '../lib/authApi';

export function ProfilePage({
  session,
  profile,
  onProfileChange,
  onMessage,
  onError,
}: {
  session: AuthSession;
  profile: CurrentUserProfile | null;
  onProfileChange: (profile: CurrentUserProfile | null) => void;
  onMessage: (message: string) => void;
  onError: (error: string) => void;
}) {
  const [firstName, setFirstName] = useState(profile?.userProfile?.firstName ?? '');
  const [lastName, setLastName] = useState(profile?.userProfile?.lastName ?? '');
  const [bio, setBio] = useState(profile?.userProfile?.bio ?? '');
  const [avatarUrl, setAvatarUrl] = useState(profile?.userProfile?.avatarUrl ?? '');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setFirstName(profile?.userProfile?.firstName ?? '');
    setLastName(profile?.userProfile?.lastName ?? '');
    setBio(profile?.userProfile?.bio ?? '');
    setAvatarUrl(profile?.userProfile?.avatarUrl ?? '');
  }, [profile]);

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    onError('');
    onMessage('');
    try {
      await authApi.updateProfile(session.accessToken, { firstName, lastName, bio, avatarUrl });
      const refreshed = await authApi.me(session.accessToken);
      onProfileChange(refreshed.data);
      onMessage('Profile updated.');
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Profile update failed');
    } finally {
      setLoading(false);
    }
  };

  const displayName = [firstName, lastName].filter(Boolean).join(' ') || session.user.username;
  const initials = displayName
    .split(' ')
    .map((w) => w[0]?.toUpperCase())
    .slice(0, 2)
    .join('');

  return (
    <div className="space-y-4">
      {/* Profile Hero Card */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {/* Banner */}
        <div className="h-28 bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-500" />

        <div className="px-6 pb-6">
          {/* Avatar */}
          <div className="relative -mt-12 mb-4 flex items-end justify-between">
            <div className="relative shrink-0">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="size-24 rounded-2xl border-4 border-white object-cover shadow-md bg-slate-100"
                />
              ) : (
                <div className="size-24 rounded-2xl border-4 border-white bg-emerald-700 flex items-center justify-center shadow-md">
                  <span className="text-2xl font-black text-white">{initials}</span>
                </div>
              )}
              <span className="absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm">
                <Camera className="size-3.5 text-slate-500" />
              </span>
            </div>

            {/* Status badges */}
            <div className="flex gap-2 pb-1">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                <ShieldCheck className="size-3.5" />
                {session.user.verified ? 'Verified' : 'Unverified'}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-600 uppercase">
                {session.user.role}
              </span>
            </div>
          </div>

          {/* Name + Email */}
          <div className="mb-1 text-2xl font-black tracking-tight text-slate-900">{displayName}</div>
          <div className="flex items-center gap-1.5 text-sm text-slate-500">
            <Mail className="size-4" />
            {session.user.email}
          </div>
          {bio && <p className="mt-3 text-sm text-slate-600 leading-relaxed max-w-xl">{bio}</p>}
        </div>
      </div>

      {/* Edit Form */}
      <Panel title="Edit Profile">
        <form className="grid gap-4 md:grid-cols-2" onSubmit={save}>
          <FormInput label="First name" value={firstName} onChange={setFirstName} />
          <FormInput label="Last name" value={lastName} onChange={setLastName} />
          <FormInput label="Avatar URL" value={avatarUrl} onChange={setAvatarUrl} className="md:col-span-2" />
          <label className="md:col-span-2">
            <span className="mb-1 block text-xs font-black uppercase text-slate-500">Bio</span>
            <textarea
              className="min-h-28 w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:ring-2 focus:ring-emerald-600 resize-none"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="A short description about yourself..."
            />
          </label>
          <div className="md:col-span-2 flex justify-end">
            <button
              className={`inline-flex h-11 items-center gap-2 rounded-xl px-6 text-sm font-black text-white transition-all ${
                saved
                  ? 'bg-emerald-500'
                  : 'bg-emerald-700 hover:bg-emerald-800'
              }`}
              disabled={loading}
              type="submit"
            >
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : saved ? (
                <Check className="size-4" />
              ) : (
                <User className="size-4" />
              )}
              {saved ? 'Saved!' : 'Save profile'}
            </button>
          </div>
        </form>
      </Panel>

      {/* Account Info */}
      <Panel title="Account Details">
        <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: 'Username', value: session.user.username },
            { label: 'Email', value: session.user.email },
            { label: 'Role', value: session.user.role },
            { label: 'Status', value: profile?.status ?? 'ACTIVE' },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
              <dt className="text-[11px] font-black uppercase tracking-wide text-slate-400">{item.label}</dt>
              <dd className="mt-1 text-sm font-semibold text-slate-900 break-all">{item.value}</dd>
            </div>
          ))}
        </dl>
      </Panel>
    </div>
  );
}
