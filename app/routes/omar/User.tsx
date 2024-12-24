import type { Route } from "./+types/User";
import type { User } from "@prisma/client";
// Prisma
import { prisma } from "~/db.server";

// React
import { Suspense, use, useEffect } from "react";
import { useRouteError, isRouteErrorResponse } from "react-router";

// Loader
export async function loader({
    params,
}: Route.ClientLoaderArgs) {
    // Intentionally returning an unresolved promise for use with Suspense
    // This allows React to handle the loading state while the data is being fetched
    async function fetchUser(id: string) {
        try {
            const user = await prisma.user.findUnique({
                where: { id }
            });

            if (!user) {
                throw new Error("User not found");
            }
            return user;
        } catch (error) {
            throw error instanceof Error ? error : new Error("Failed to fetch user");
        }
    }

    return { user: fetchUser(params.id), userId: params.id }
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

const UserDetails = ({ p }: { p: Promise<User> }) => {
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

export function ErrorBoundary() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return (
            <div className="space-y-4 p-4 text-center border border-red-500 max-w-2xl mx-auto rounded">
                <h1 className="text-2xl font-bold text-red-600">
                    {error.status} {error.statusText}
                </h1>
                <p className="text-gray-600 dark:text-gray-300">{error.data}</p>
            </div>
        );
    }

    return (
        <div className="space-y-4 p-4 text-center border border-red-500 max-w-2xl mx-auto rounded">
            <h1 className="text-2xl font-bold text-red-600">Oops! Something went wrong mamu</h1>
            <p className="text-gray-600 dark:text-gray-300">
                {error instanceof Error ? error.message : "Unknown error occurred"}
            </p>
        </div>
    );
}