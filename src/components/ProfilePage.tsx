import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/supabase';
import { Camera, LogOut, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const { user, userProfile, signOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Load profile data on mount
  useEffect(() => {
    if (userProfile) {
      setUsername(userProfile.username || '');
      setFullName(userProfile.full_name || '');
      setBio(userProfile.bio || '');
      setAvatarUrl(userProfile.avatar_url || '');
      setPreviewUrl(userProfile.avatar_url || '');
    }
  }, [userProfile]);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Validate username
      if (!username.trim()) {
        throw new Error('Username is required');
      }

      if (username.length < 3) {
        throw new Error('Username must be at least 3 characters');
      }

      const updates: any = {
        username: username.trim(),
        full_name: fullName.trim(),
        bio: bio.trim(),
      };

      // Handle avatar upload
      if (avatarFile) {
        // Convert image to base64 and store in database
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

      // Save all updates to database
      await db.updateUserProfile(user!.id, updates);
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
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

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Profile Settings</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Success Alert */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
            {success}
          </div>
        )}

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Avatar Upload Section */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img
                  src={previewUrl || 'https://via.placeholder.com/150'}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-200"
                />
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full cursor-pointer transition-colors shadow-lg"
                >
                  <Camera size={20} />
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-sm text-gray-500">Click camera to upload photo</p>
            </div>

            {/* Email Display (Read-only) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
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
                placeholder="Choose a username (3+ characters)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Min 3 characters, letters and numbers only
              </p>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself (optional)"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                {bio.length}/500 characters
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={18} />
              {loading ? 'Saving...' : 'Save Profile'}
            </button>
          </form>

          {/* Profile Info Card */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Profile</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Username</p>
                <p className="text-lg font-semibold text-gray-900">
                  {username || 'Not set'}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="text-lg font-semibold text-gray-900">
                  {fullName || 'Not set'}
                </p>
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
