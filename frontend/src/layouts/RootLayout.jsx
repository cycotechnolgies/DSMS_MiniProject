import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import DashbordHeader from "../components/DashbordHeader";

const RootLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className='flex md:flex-row flex-col h-screen'>
            {/* Sidebar */}
            <Sidebar
                open={isSidebarOpen}
                setOpen={setIsSidebarOpen}
            />

            {/* Main Section */}
            <main className='flex-1 flex flex-col overflow-y-auto'>
                {/* Header */}
                <DashbordHeader setSidebarOpen={setIsSidebarOpen} />

                {/* Main Content */}
                <div className='flex-1 mt-4 mx-4 overflow-y-auto'>{children}</div>
            </main>
        </div>
    );
};

export default RootLayout;
