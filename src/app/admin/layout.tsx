'use client';

import { ReactNode, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getAuth, signOut } from 'firebase/auth';
import {
  LayoutGrid,
  LogOut,
  User as UserIcon,
  Shield,
} from 'lucide-react';

import { useUser, useFirebaseApp, useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, isLoading: isUserLoading } = useUser();
  const router = useRouter();
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

  useEffect(() => {
    if (!isUserLoading && (!user || userData?.displayName !== 'Shuyaib Islam')) {
      router.push('/login');
    }
  }, [isUserLoading, user, userData, router]);


  if (isUserLoading || isDataLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#FFFDF5]">
        <p>Loading...</p>
      </div>
    );
  }
  
  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };
  
  const isAdmin = userData?.displayName === 'Shuyaib Islam';

  return (
    <div className="min-h-screen bg-[#FFFDF5]">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 sm:px-6">
        <Link href="/">
          <Image
            src="https://raw.githubusercontent.com/shuyaib105/syllabuserbaire/refs/heads/main/ei_1766508088751-removebg-preview.png"
            alt="Logo"
            width={60}
            height={60}
            quality={100}
            className="h-14 w-auto"
          />
        </Link>
        
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={userData?.photoURL || user.photoURL || undefined} alt={userData?.displayName || ''} />
                  <AvatarFallback>{getInitials(userData?.displayName || user.displayName)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userData?.displayName || user.displayName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                <LayoutGrid className="mr-2 h-4 w-4" />
                <span>ড্যাশবোর্ড</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>
                <UserIcon className="mr-2 h-4 w-4" />
                <span>প্রোফাইল</span>
              </DropdownMenuItem>
              {isAdmin && (
                <DropdownMenuItem onClick={() => router.push('/admin')}>
                  <Shield className="mr-2 h-4 w-4" />
                  <span>Admin</span>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>লগআউট</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
