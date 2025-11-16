import { SheetTitle, SheetDescription } from "@/components/ui/sheet";
import DrawerDates from "./drawer-dates";

export default function DrawerHeader({ card }: { card: any }) {
    return (
        <div className="flex flex-col gap-4">
            <SheetTitle className="text-2xl md:text-4xl lg:text-5xl font-bold text-wrap tracking-tight">{card.title ?? card.title}</SheetTitle>
            <SheetDescription className="text-lg text-wrap">
                {card.description ?? card.description}
            </SheetDescription>
            <DrawerDates createdDate={card.createdDate} updatedDate={card.updatedDate} />
        </div>
    )
}
