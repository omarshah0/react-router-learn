import type { Route } from "./+types/about";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "About" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export async function loader({ }: Route.LoaderArgs) {
    // Fetch data from json placeholder
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    return { data };
}

export default function Home({ loaderData }: Route.ComponentProps) {
    const { data } = loaderData
    return <div>
        {data.map((post: any) => (
            <div key={post.id}>{post.title}</div>
        ))}
    </div>
}
