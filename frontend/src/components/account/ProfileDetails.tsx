import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function ProfileDetails() {
  const { user } = useAuth();

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Profile Details</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" value={user?.username ?? 'N/A'} readOnly />
        </div>
        {/* Add more profile details here if available from a backend API */}
        {/* For now, using username as a placeholder */}
      </CardContent>
    </Card>
  );
}