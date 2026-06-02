import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />

            <div className="space-y-6 p-6">
                {/* Page Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Dashboard
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Welcome back! Here is your overview.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl border bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <p className="text-sm text-gray-500">Users</p>
                        <h2 className="mt-2 text-2xl font-bold">1,240</h2>
                    </div>

                    <div className="rounded-xl border bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <p className="text-sm text-gray-500">Sales</p>
                        <h2 className="mt-2 text-2xl font-bold">$12,340</h2>
                    </div>

                    <div className="rounded-xl border bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <p className="text-sm text-gray-500">Orders</p>
                        <h2 className="mt-2 text-2xl font-bold">320</h2>
                    </div>

                    <div className="rounded-xl border bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <p className="text-sm text-gray-500">Products</p>
                        <h2 className="mt-2 text-2xl font-bold">85</h2>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Left Panel */}
                    <div className="rounded-xl border bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <h3 className="mb-4 text-lg font-semibold">
                            Recent Activity
                        </h3>

                        <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                            <li>✔ New user registered</li>
                            <li>✔ Order #1024 completed</li>
                            <li>✔ Product stock updated</li>
                            <li>✔ Payment received</li>
                        </ul>
                    </div>

                    {/* Right Panel */}
                    <div className="rounded-xl border bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <h3 className="mb-4 text-lg font-semibold">
                            Quick Actions
                        </h3>

                        <div className="space-y-3">
                            <button className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                                Add New User
                            </button>

                            <button className="w-full rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700">
                                Add Product
                            </button>

                            <button className="w-full rounded-lg bg-gray-800 px-4 py-2 text-white hover:bg-gray-900">
                                View Reports
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
