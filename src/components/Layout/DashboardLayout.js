import { MenuBoard } from "iconsax-react";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

function DashboardLayout({ children, activeSection }) {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    useEffect(() => {

        if (sidebarOpen) {
        document.body.style.overflow = "hidden";
        } 

        else {
        document.body.style.overflow = "";
        }

        return () => {
        document.body.style.overflow = "";
        };

    }, [sidebarOpen]);

    
    useEffect(() => {

        const handleEscape = (event) => {

        if (event.key === "Escape") {

            setSidebarOpen(false);

        }

        };

        window.addEventListener("keydown", handleEscape);

        return () => {

        window.removeEventListener("keydown", handleEscape);

        };

    }, []);

    useEffect(() => {

        const handleResize = () => {

            if (window.innerWidth >= 992) {

                setSidebarOpen(false);

            }

        };

        window.addEventListener("resize", handleResize);

        return () => {

            window.removeEventListener("resize", handleResize);

        };

    }, []);

    return (

        <>

            {sidebarOpen && (<div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} /> )}

            {!sidebarOpen && (
                <button
                    className="sidebar-toggle"
                    onClick={() => setSidebarOpen(true)}
                    aria-label="Open Sidebar"
                >
                    <MenuBoard
                        size={24}
                        variant="Bold"
                        color="currentColor"
                    />
                </button>
            )}

            <Sidebar 
                isOpen={sidebarOpen} 
                isCollapsed={sidebarCollapsed}
                onCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
                activeSection={activeSection}
                onClose={() => setSidebarOpen(false)} 
            />

            <main className="dashboard-container">

                <section
                    className={`dashboard-main ${
                        sidebarCollapsed ? "collapsed" : ""
                    }`}
                >
                    {children}
                </section>

            </main>
        
        </>    

    )

}    

export default DashboardLayout;