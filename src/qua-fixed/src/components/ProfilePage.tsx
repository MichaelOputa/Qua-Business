import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/supabase';
import { Camera, Save, ArrowLeft, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AVATAR_FALLBACK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 150 150'%3E%3Crect width='150' height='150' fill='%23e5e7eb'/%3E%3Ccircle cx='75' cy='60' r='28' fill='%239ca3af'/%3E%3Cellipse cx='75' cy='130' rx='45' ry='35' fill='%239ca3af'/%3E%3C/svg%3E";

export default function ProfilePage() {
  const { user, userProfile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [, setAvatarUrl] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (userProfile) {
      setUsername(userProfile.username || '');
      setFullName(userProfile.full_name || '');
      setBio(userProfile.bio || '');
      setAvatarUrl(userProfile.avatar_url || '');
      setPreviewUrl(userProfile.avatar_url || '');
    }
  }, [userProfile]);

  useEffect(() => {
    if (!user) navigate('/');
  }, [user, navigate]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be smaller than 5 MB');
      return;
    }
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!username.trim()) return setError('Username is required');
    if (username.trim().length < 3) return setError('Username must be at least 3 characters');
    if (!/^[a-zA-Z0-9_]+$/.test(username.trim()))
      return setError('Username may only contain letters, numbers, and underscores');
    if (bio.length > 500) return setError('Bio must be 500 characters or fewer');

    setLoading(true);
    try {
      const updates: Record<string, string> = {
        username: username.trim(),
        full_name: fullName.trim(),
        bio: bio.trim(),
      };

      if (avatarFile) {
        await new Promise<void>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => { updates.avatar_url = reader.result as string; resolve(); };
          reader.onerror = () => reject(new Error('Failed to read image'));
          reader.readAsDataURL(avatarFile);
        });
      }

      await db.updateUserProfile(user!.id, updates);
      await refreshProfile();
      setSuccess('Profile updated successfully!');
      setAvatarFile(null);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      if (err?.code === '23505') {
        setError('That username is already taken. Please choose another.');
      } else {
        setError(err instanceof Error ? err.message : 'Failed to update profile');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Profile Settings</h1>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Home
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">{error}</div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">{success}</div>
        )}

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-200"
                    onError={() => setPreviewUrl('')}
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full border-4 border-blue-200 bg-gray-100 flex items-center justify-center">
                    <User size={48} className="text-gray-400" />
                  </div>
                )}
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full cursor-pointer transition-colors shadow-lg"
                >
                  <Camera size={20} />
                  <input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                </label>
              </div>
              <p className="text-sm text-gray-500">Click camera to upload photo (max 5 MB)</p>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={user.email || ''}
                disabled
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. john_doe"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Min 3 characters — letters, numbers, and underscores only</p>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself (optional)"
                rows={4}
                maxLength={500}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              />
              <p className={`text-xs mt-1 ${bio.length >= 480 ? 'text-orange-500' : 'text-gray-500'}`}>
                {bio.length}/500 characters
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={18} />
              {loading ? 'Saving…' : 'Save Profile'}
            </button>
          </form>

          {/* Info card */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Profile</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Username</p>
                <p className="text-lg font-semibold text-gray-900">{username || 'Not set'}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="text-lg font-semibold text-gray-900">{fullName || 'Not set'}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg col-span-2">
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-lg font-semibold text-gray-900">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
