import type { Route } from "./+types/Users";
import { NavLink, Outlet, data, useNavigation } from "react-router";

// Headers
export function headers({ loaderHeaders }: Route.HeadersArgs) {
    return {
        "Content-Security-Policy": "default-src 'self'",
        "X-Frame-Options": "DENY",
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "max-age=3600, s-maxage=86400",
        "X-Omar-Shah": loaderHeaders.get("X-Omar-Shah") || "No Omar Shah",
        "X-Powered-By": loaderHeaders.get("X-Powered-By") || "No Powered By",
        "Server-Timing": loaderHeaders.get("Server-Timing") || "No Server Timing",
    };
}

// Loader
export async function loader() {
    // Fetch posts from jsonplaceholder and return them as a list of users
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    const posts = await response.json()
    // Convert posts to users
    const users = posts.map((post: any) => ({
        id: post.id,
        name: post.title,
        email: post.body,
    }))
    const ms = 5
    return data({ users }, {
        statusText: 'Users fetched successfully',
        status: 200,
        headers: {
            "Server-Timing": `page;dur=${ms};desc="Page query"`,
            'X-Powered-By': 'React Router',
            'X-Omar-Shah': 'YoYo',
        }
    })
}

// Component
export default function Users({ loaderData }: Route.ComponentProps) {
    const { users } = loaderData
    const navigation = useNavigation();
    const isNavigating = Boolean(navigation.location);

    return (
        <div className="grid lg:grid-cols-12 gap-6">
            {/* Users List */}
            <div className="col-span-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
                    Users List
                </h2>
                <div className="space-y-4">
                    {users.map((user: any) => (
                        <NavLink
                            key={user.id}
                            to={`/omar/users/${user.id}`}
                            className="block rounded-lg border border-gray-200 bg-white p-4 hover:border-blue-500 transition-colors dark:border-gray-700 dark:bg-gray-800"
                        >
                            <h2 className="text-sm text-gray-500 dark:text-gray-400">
                                ID: {user.id}
                            </h2>
                            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                                {user.name}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                {user.email}
                            </p>
                        </NavLink>
                    ))}
                </div>
            </div>

            {/* User Details */}
            <div className="col-span-8">
                {isNavigating ? (
                    <h1 className="text-center text-2xl font-bold">Loading...</h1>
                ) : (
                    <Outlet />
                )}
            </div>
        </div>
    );
}