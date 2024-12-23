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
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                Welcome to Omar&apos;s Section YoYo
            </h2>
            <Button>Bitch</Button>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
                Select a section from the sidebar to get started.
            </p>
        </div>
    );
} 