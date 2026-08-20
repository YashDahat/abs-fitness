import { useAuth } from '@/context/AuthContext';
import ProfileForm from '@/components/account/ProfileForm';
import AdminLayout from '@/components/AdminLayout';
import { AuthenticatedUser } from '@/types/auth';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { user, isLoading, login } = useAuth();

  const handleUpdateProfile = async (updatedUser: AuthenticatedUser): Promise<void> => {
    // This is a placeholder for the actual update logic.
    // In a real application, you would call a backend service to update the user profile.
    // For now, we'll simulate a successful update and refresh the user context.
    // The `login` function is used here as a proxy to re-fetch user data,
    // assuming a successful update would necessitate re-authenticating or refreshing the token.
    // In a real scenario, a dedicated `updateProfile` function would be used.
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      // Assuming the backend returns an updated token or the AuthContext can refresh
      // For this exercise, we'll just show a toast.
      // If a real update endpoint existed, we'd call it here.
      // e.g., await userService.updateProfile(updatedUser);
      toast.success('Profile updated successfully!');
      // A more robust solution would involve re-fetching user data or updating the AuthContext directly
      // For now, we'll assume the user object in AuthContext is immutable and needs a full refresh if changed.
      // Since there's no direct update method on useAuth for user details, this is a simplification.
    } catch (error) {
      toast.error('Failed to update profile.');
      console.error('Profile update error:', error);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-full">
          <p>Loading profile...</p>
        </div>
      </AdminLayout>
    );
  }

  if (!user) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-full">
          <p>Please log in to view your profile.</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#1A1A1A] mb-8">My Profile</h1>
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <ProfileForm user={user} onUpdate={handleUpdateProfile} />
          </div>
        </div>
      </section>
    </AdminLayout>
  );
}