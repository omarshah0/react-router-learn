import {
    Outlet,
} from "react-router";


export default function OmarLayout() {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="w-64 border-r border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                    Omar&apos;s Dashboard
                </h2>
                <nav className="mt-6 space-y-2">
                    <a
                        href="/omar"
                        className="block rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        Home
                    </a>
                    <a
                        href="/omar/users"
                        className="block rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        Users
                    </a>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                <Outlet />
            </div>
        </div>
    );
} 