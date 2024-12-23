import type { Route } from "./+types/User";

import { Suspense, use, useEffect } from "react";

// Loader
export async function loader({
    params,
}: Route.ClientLoaderArgs) {
    async function fetchUser(id: number) {
        const user = {
            id: id,
            name: `User ${id}`,
            email: `user${id}@example.com`,
        }
        return user
    }


    return { user: fetchUser(Number(params.id)), userId: Number(params.id) }
}

// Component
export default function Users({ loaderData, }: Route.ComponentProps) {
    const { user, userId } = loaderData

    return (
        <div className="grid lg:grid-cols-12 gap-6">
            {/* Users List */}
            <div className="col-span-4">
                <h2 className="scroll-m-20 text-xl font-semibold tracking-tight mb-6">
                    User Details
                </h2>
                {/* // Suspense has some issues, it sometimes stuck on loading */}
                <Suspense fallback={<div>Loading...</div>} key={userId}>
                    <UserDetails p={user} />
                </Suspense>
            </div>
        </div>
    );
}

const UserDetails = ({ p }: { p: Promise<{ id: number; name: string; email: string; }> }) => {
    const user = use(p)

    // Set the title of the page
    useEffect(() => {
        document.title = `User Details - ${user.name}`;
    }, [user]);

    return <div className="space-y-4">
        <h2 className="text-sm text-muted-foreground break-words">
            ID: {user.id}
        </h2>
        <h3 className="text-lg font-medium text-card-foreground break-words">
            {user.name}
        </h3>
        <p className="text-foreground/80 break-words">
            {user.email}
        </p>
    </div>
}