import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function ProfileSection() {
  const { user } = useAuth();

  return (
    <Card className="shadow-md border border-gray-100 p-6">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Profile Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="username" className="text-sm font-medium text-gray-700">Username</Label>
          <Input
            id="username"
            type="text"
            value={user?.username || ''}
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF5722] focus:ring focus:ring-[#FF5722] focus:ring-opacity-50"
            data-testid="profile-username"
          />
        </div>
        <div>
          <Label htmlFor="role" className="text-sm font-medium text-gray-700">Role</Label>
          <Input
            id="role"
            type="text"
            value={user?.role || ''}
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF5722] focus:ring focus:ring-[#FF5722] focus:ring-opacity-50"
            data-testid="profile-role"
          />
        </div>
        {/* Placeholder for future profile editing functionality */}
        <p className="text-sm text-gray-500 italic">
          Profile editing functionality will be available soon.
        </p>
      </CardContent>
    </Card>
  );
}