import type { Route } from "./+types/index";
import { Button } from "~/components/ui/button";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Omar's Dashboard" },
        { name: "description", content: "Welcome to Omar's Dashboard!" },
    ];
}

export default function OmarIndex() {
    return (
        <div className="rounded-lg border bg-card p-6 text-card-foreground">
            <h2 className="text-xl font-semibold">
                Welcome to Omar&apos;s Section YoYo
            </h2>
            <Button>Bitch</Button>
            <p className="mt-4 text-muted-foreground">
                Select a section from the sidebar to get started.
            </p>
        </div>
    );
} 