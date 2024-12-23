import type { Route } from "./+types/about";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "About" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function Home() {
    return <div>About</div>
}
