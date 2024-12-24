import type { Route } from "./+types/Users";
import { NavLink, Outlet, data, useRouteError, isRouteErrorResponse } from "react-router";

// Prisma
import { prisma } from "~/db.server";

// Meta
export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Omar's Users" },
        { name: "description", content: "Welcome to Omar's Users!" },
    ];
}

// Headers
export function headers({ loaderHeaders }: Route.HeadersArgs) {
    return {
        "X-Omar-Shah": loaderHeaders.get("X-Omar-Shah") || "No Omar Shah",
        "X-Powered-By": loaderHeaders.get("X-Powered-By") || "No Powered By",
        "Server-Timing": loaderHeaders.get("Server-Timing") || "No Server Timing",
    };
}

// Loader
export async function loader() {
    const ms = 5
    try {
        const users = await prisma.user.findMany()
        return data({ users }, {
            statusText: 'Users fetched successfully',
            status: 200,
            headers: {
                "Server-Timing": `page;dur=${ms};desc="Page query"`,
                'X-Powered-By': 'React Router',
                'X-Omar-Shah': 'YoYo',
            }
        })
    } catch (error: any) {
        throw new Response(error.message, { status: 500 })
    }
}

// Component
export default function Users({ loaderData }: Route.ComponentProps) {
    const { users } = loaderData

    return (
        <>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                Users List
            </h2>

            <div className="flex flex-col lg:flex-row gap-2">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {users.map((user: any) => (
                        <NavLink
                            prefetch="viewport"
                            key={user.id}
                            to={`/omar/users/${user.id}`}
                            className={({ isActive }) =>
                                `block rounded-lg border bg-card p-4 text-card-foreground transition-all ${isActive ? "border-primary" : "hover:border-primary"
                                }`
                            }
                        >
                            <h2 className="text-sm text-muted-foreground">
                                ID: {user.id}
                            </h2>
                            <h3 className="text-lg font-medium">
                                {user.name}
                            </h3>
                            <p className="text-foreground/80">
                                {user.email}
                            </p>
                        </NavLink>
                    ))}
                </div>

                <div className="rounded-lg border bg-card p-4">
                    <Outlet />
                </div>
            </div>
        </>
    );
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
            <h1 className="text-2xl font-bold text-red-600">Oops! Something went wrong</h1>
            <p className="text-gray-600 dark:text-gray-300">
                {error instanceof Error ? error.message : "Unknown error occurred"}
            </p>
        </div>
    );
}