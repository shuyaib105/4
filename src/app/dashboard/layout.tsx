'use client';

import { ReactNode, useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { getAuth, signOut } from 'firebase/auth';
import {
  LayoutGrid,
  CalendarCheck,
  Users,
  FileText,
  BarChart3,
  User as UserIcon,
  LogOut,
  Menu,
} from 'lucide-react';

import { useUser, useFirebaseApp, useFirestore, useDoc } from '@/firebase';
import { Button } from '@/components/ui/button';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { doc } from 'firebase/firestore';

const navItems = [
  { href: '/dashboard', icon: LayoutGrid, text: 'ড্যাশবোর্ড' },
  { href: '#', icon: CalendarCheck, text: 'টাস্ক' },
  { href: '#', icon: Users, text: 'সকল ব্যাচ' },
  { href: '#', icon: FileText, text: 'পরীক্ষাসমূহ' },
  { href: '#', icon: BarChart3, text: 'ফলাফল' },
  { href: '/dashboard/profile', icon: UserIcon, text: 'প্রোফাইল' },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, isLoading: isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const app = useFirebaseApp();
  const auth = getAuth(app);
  const firestore = useFirestore();

  const userDocRef = useMemo(() => {
    if (!user) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);

  const { data: userData, isLoading: isDataLoading } = useDoc(userDocRef);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  if (isUserLoading || isDataLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <Link href="/">
            <Image
              src="https://raw.githubusercontent.com/shuyaib105/syllabuserbaire/refs/heads/main/ei_1766508088751-removebg-preview.png"
              alt="Logo"
              width={100}
              height={100}
              quality={100}
              className="mx-auto"
            />
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    tooltip={item.text}
                  >
                    <item.icon />
                    <span>{item.text}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
             <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout} tooltip="Logout">
                  <LogOut />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center justify-between gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
           <SidebarTrigger className="md:hidden"/>
           <div className="flex-1">
             {/* Can add a search bar here in the future */}
           </div>
          <div className="flex items-center gap-3">
             <span className="font-semibold text-gray-700 hidden sm:inline">
               Welcome, {userData?.displayName || user.displayName || user.email}
             </span>
             <Avatar>
               <AvatarImage src={userData?.photoURL || user.photoURL || undefined} alt={userData?.displayName || ''} />
               <AvatarFallback>{getInitials(userData?.displayName)}</AvatarFallback>
             </Avatar>
           </div>
        </header>
        <main className="flex-1 bg-[#FFFDF5] p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
