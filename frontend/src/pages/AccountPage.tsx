import { useAuth } from '@/context/AuthContext';
import ProfileSection from '@/components/account/ProfileSection';
import MyBookingsTable from '@/components/account/MyBookingsTable';
import MembershipStatus from '@/components/account/MembershipStatus';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AccountPage() {
  const { user } = useAuth();

  return (
    <section className="py-16 px-4 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-8 text-center" data-testid="account-page-title">
          Welcome, {user?.username || 'Member'}!
        </h1>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:w-3/4 lg:w-1/2 mx-auto mb-8 bg-white shadow-sm">
            <TabsTrigger value="profile" data-testid="account-tab-profile">Profile</TabsTrigger>
            <TabsTrigger value="bookings" data-testid="account-tab-bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="membership" data-testid="account-tab-membership">Membership</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <ProfileSection />
          </TabsContent>

          <TabsContent value="bookings" className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <MyBookingsTable />
          </TabsContent>

          <TabsContent value="membership" className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <MembershipStatus />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}