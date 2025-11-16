import { GripVertical } from "lucide-react";

export default function DrawerTrigger({ id, title, description } : { id: string; title: string; description?: string }) {
    return (
        <div
            key={id}
            className="bg-slate-50 border p-3 rounded-md shadow-sm hover:bg-slate-200 cursor-pointer flex flex-row items-stretch"
        >
            <div className="mr-2 flex flex-col justify-center">
                <GripVertical className="text-slate-300 w-4 cursor-grab" />
            </div>

            {/* Card content */}
            <div className="flex flex-col text-left justify-center">
                <h3 className="text-sm font-medium text-slate-900 leading-tight max-w-[220px] truncate">
                    {title}
                </h3>
                <p className="text-xs text-slate-600 truncate">{description}</p>
            </div>


        </div>
    )
}
