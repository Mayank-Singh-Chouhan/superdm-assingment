"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import OpenTemplate from "./open-template";
import InProgressTemplate from "./inprogress-template";
import CloseTemplate from "./close-template";

const WorkspaceTemplate = () => {
    const [activeIndex, setActiveIndex] = useState(1);

    const TAB_DATA = [
        {
            value: "OPEN",
            label: "Open",
            panel: <OpenTemplate/>
        },
        {
            value: "IN_PROGRESS",
            label: "In Progress",
            panel: <InProgressTemplate/>
        },
        {
            value: "CLOSED",
            label: "Closed",
            panel: <CloseTemplate />
        }
    ]


    return (
        <div className="h-[90vh] w-[90vw] backdrop-blur-[19px] rounded-xl border border-fs-border bg-fs-background backdrop-saturate-[180%] flex flex-col p-4" >
            <nav className="flex shrink-0">
                <div className="px-3 pt-2 pb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M160-240h640v-320H520v-160H160v480Zm0 80q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80v-480 480Z" /></svg>
                </div>
                {TAB_DATA.map((tab, idx) => {
                    const isActive = idx === activeIndex;
                    return (
                        <button onClick={() => setActiveIndex(idx)} key={tab.value} className={cn("text-white px-6 pt-2 font-semibold pb-1", isActive && "bg-fs-background rounded-t-lg")}>
                            {tab.label}
                        </button>
                    )
                })}
            </nav>
            <main className={"flex-1 p-3 rounded-xl flex flex-col overflow-auto bg-fs-background"}>
                {TAB_DATA[activeIndex].panel}
            </main>
        </div>
    )
}

export default WorkspaceTemplate