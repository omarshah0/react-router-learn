import type { Route } from "./+types/User";

export async function loader({
    params,
}: Route.ClientLoaderArgs) {
    // Fetch single post from jsonplaceholder via params.id
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
    const post = await response.json()
    // Convert post to user
    const user = {
        id: post.id,
        name: post.title,
        email: post.body,
    }
    return { user }
}


export default function Users({
    loaderData,
}: Route.ComponentProps) {
    const { user } = loaderData

    return (
        <div className="grid lg:grid-cols-12 gap-6">
            {/* Users List */}
            <div className="col-span-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
                    User Details
                </h2>
                <div className="space-y-4">
                    <h2 className="text-sm text-gray-500 dark:text-gray-400">
                        ID: {user.id}
                    </h2>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                        {user.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        {user.email}
                    </p>
                </div>
            </div>
        </div>
    );
}