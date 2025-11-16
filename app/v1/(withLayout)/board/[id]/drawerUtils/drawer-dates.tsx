"use client";
import { Clock, RefreshCw } from "lucide-react";

export default function DrawerDates({ createdDate, updatedDate }: { createdDate: string; updatedDate: string }) {

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        const dateFormatted = date.toLocaleDateString('pt-BR');
        const timeFormatted = date.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        });
        return { dateFormatted, timeFormatted };
    };

    return (
        <div className="flex flex-row items-center h-fit gap-8">
            {createdDate && (
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wide">Criado em</span>
                        <span className="font-medium text-slate-700 dark:text-slate-300">
                            {formatDateTime(createdDate).dateFormatted} às {formatDateTime(createdDate).timeFormatted}
                        </span>
                    </div>
                </div>
            )}

            {updatedDate && (
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <RefreshCw className="w-4 h-4 text-amber-500" />
                    <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wide">Atualizado em</span>
                        <span className="font-medium text-slate-700 dark:text-slate-300">
                            {formatDateTime(updatedDate).dateFormatted} às {formatDateTime(updatedDate).timeFormatted}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
