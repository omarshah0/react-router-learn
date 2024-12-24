import type { Route } from "./+types/SearchUser";

// React Router
import { useRouteError, isRouteErrorResponse, data, Form, useNavigation } from "react-router";

// UI
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
// Icons
import { Loader2 } from "lucide-react";
import { useEffect } from "react";


// Meta
export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Search Users" },
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

export async function loader({ request }: Route.LoaderArgs) {
    try {
        let url = new URL(request.url)
        let q = url.searchParams.get('q')

        if (!q) {
            q = "1"
        }

        const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${q}`
        )

        if (!response.ok) {
            throw new Response('Failed to fetch post', {
                status: response.status,
                statusText: response.statusText,
            })
        }

        const post = (await response.json()) as {
            id: number
            userId: number
            title: string
            body: string
        }
        return { post, q }
    } catch (error) {
        if (error instanceof Response) throw error

        throw new Response('An unexpected error occurred', {
            status: 500,
            statusText: 'Internal Server Error',
        })
    }
}


// Component
export default function Search({ loaderData }: Route.ComponentProps) {
    const { post, q } = loaderData
    const navigation = useNavigation()
    const searching = navigation.location && new URLSearchParams(navigation.location.search).has("q")

    useEffect(() => {
        const searchField = document.getElementById("q")
        if (searchField instanceof HTMLInputElement) {
            searchField.value = q || "1"
        }
    }, [q])

    return (
        <div>
            <h1>Search Users</h1>
            {loaderData && <p>First Post Title is : <b>{post.id}</b> | {post.title}</p>}
            <Form className="flex flex-col gap-4" role="form">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="q">Post ID</Label>
                    <Input type="text" id="q" name="q" defaultValue={q || ""} placeholder="Enter post ID" />
                </div>
                {searching && (
                    <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <p className="text-sm text-muted-foreground">Fetching post...</p>
                    </div>
                )}
                <Button type="submit" className="w-full max-w-sm">
                    Search
                </Button>
            </Form>
        </div>
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