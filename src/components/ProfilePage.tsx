import { useEffect, useMemo, useState } from 'react';
import { Camera, LogOut, Save, UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/supabase';

export default function ProfilePage() {
  const { user, userProfile, signOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (userProfile) {
      setUsername(userProfile.username || '');
      setFullName(userProfile.full_name || '');
      setBio(userProfile.bio || '');
      setPreviewUrl(userProfile.avatar_url || '');
    }
  }, [userProfile]);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const profileBadge = useMemo(() => {
    const displayName = fullName.trim() || username.trim() || user?.email?.split('@')[0] || 'User';
    return displayName;
  }, [fullName, username, user]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!username.trim()) throw new Error('Username is required');
      if (username.trim().length < 3) throw new Error('Username must be at least 3 characters');

      const updates: Record<string, string> = {
        username: username.trim(),
        full_name: fullName.trim(),
        bio: bio.trim(),
      };

      if (avatarFile) {
        const reader = new FileReader();
        await new Promise<void>((resolve, reject) => {
          reader.onloadend = () => {
            updates.avatar_url = reader.result as string;
            resolve();
          };
          reader.onerror = reject;
          reader.readAsDataURL(avatarFile);
        });
      }

      if (!user?.id) throw new Error('You need to be signed in to update your profile');
      await db.updateUserProfile(user.id, updates);
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
      setAvatarFile(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8">
        <section className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Your account</p>
              <h1 className="text-3xl font-bold text-slate-900">Profile settings</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-full transition-colors shadow-sm"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
          )}
          {success && (
            <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div>
          )}

          <div className="mb-6 flex flex-wrap gap-2">
            {[
              { label: 'Home', section: 'home' },
              { label: 'Services', section: 'services' },
              { label: 'About', section: 'about' },
              { label: 'Pricing', section: 'pricing' },
              { label: 'Contact', section: 'contact' },
            ].map(({ label, section }) => (
              <button
                key={section}
                type="button"
                onClick={() => navigate('/', { state: { section } })}
                className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:border-blue-400 hover:text-blue-600"
              >
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="relative mx-auto md:mx-0">
                <img
                  src={previewUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80'}
                  alt="Profile preview"
                  className="h-28 w-28 rounded-full object-cover border-4 border-blue-200 shadow-md"
                />
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-1 right-1 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg cursor-pointer hover:bg-blue-700"
                >
                  <Camera size={18} />
                  <input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                </label>
              </div>
              <div className="text-center md:text-left">
                <p className="text-sm text-slate-500">Personalize your public profile</p>
                <h2 className="text-xl font-semibold text-slate-900">{profileBadge}</h2>
                <p className="text-sm text-slate-500">{user.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Choose your username"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Full name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none"
                placeholder="Tell people a little about yourself"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 px-5 py-3 font-semibold text-white shadow-lg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={18} />
              {loading ? 'Saving...' : 'Save profile'}
            </button>
          </form>
        </section>

        <aside className="rounded-3xl bg-slate-900 p-8 text-white shadow-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
              <UserRound size={22} />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">Preview</p>
              <h2 className="text-xl font-semibold">{profileBadge}</h2>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/10 p-5">
            <img
              src={previewUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80'}
              alt="Profile preview"
              className="h-32 w-32 rounded-full object-cover border-4 border-white/20"
            />
            <div className="mt-5 space-y-3">
              <div>
                <p className="text-sm text-slate-300">Username</p>
                <p className="font-semibold">{username || 'Not set yet'}</p>
              </div>
              <div>
                <p className="text-sm text-slate-300">Full name</p>
                <p className="font-semibold">{fullName || 'Add your name'}</p>
              </div>
              <div>
                <p className="text-sm text-slate-300">Bio</p>
                <p className="text-sm leading-6 text-slate-300">{bio || 'A short bio helps people recognize you.'}</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
