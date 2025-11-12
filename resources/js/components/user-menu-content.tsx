import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { type User } from '@/types';
import { Link } from '@inertiajs/react';
import { LogOut, Settings, User as UserIcon } from 'lucide-react';

interface UserMenuContentProps {
    user: User;
}

export function UserMenuContent({ user }: UserMenuContentProps) {
    const cleanup = useMobileNavigation();

    return (
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700">
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-3 py-3 text-left text-sm bg-transparent">
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-neutral-200 dark:bg-neutral-700 mx-2" />
            <DropdownMenuGroup className="p-2">
                <DropdownMenuItem asChild className="cursor-pointer rounded-md mb-1 focus:bg-neutral-100 dark:focus:bg-neutral-700">
                    <Link 
                        className="flex w-full items-center px-2 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-md transition-colors" 
                        href={route('profile.edit')} 
                        onClick={cleanup}
                    >
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer rounded-md focus:bg-neutral-100 dark:focus:bg-neutral-700">
                    <Link 
                        className="flex w-full items-center px-2 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-md transition-colors" 
                        href="#" 
                        onClick={cleanup}
                    >
                        <UserIcon className="mr-2 h-4 w-4" />
                        Profile
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-neutral-200 dark:bg-neutral-700 mx-2" />
            <div className="p-2">
                <DropdownMenuItem asChild className="cursor-pointer rounded-md focus:bg-red-50 dark:focus:bg-red-900/20">
                    <Link 
                        className="flex w-full items-center px-2 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors" 
                        method="post" 
                        href={route('logout')} 
                        onClick={cleanup}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                    </Link>
                </DropdownMenuItem>
            </div>
        </div>
    );
}