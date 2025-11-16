import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { XIcon, EllipsisVertical, SaveAll } from "lucide-react";


export default function DrawerOptions({ card, updateCard }: { card: any; updateCard: any }) {
    return (
        <div className="flex flex-col gap-2 h-fit">
            <SheetClose asChild>
                <Button className="w-10 h-10" variant="outline"><XIcon /></Button>
            </SheetClose>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="w-10 h-10" variant="outline">
                        <EllipsisVertical />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Detalhes</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Tooltip>
                <TooltipTrigger asChild>
                    <SheetClose asChild>
                        <Button
                            className="w-10 h-10"
                            variant="outline"
                            onClick={() => card && updateCard(card)}
                        >
                            <SaveAll />
                        </Button>
                    </SheetClose>

                </TooltipTrigger>
                <TooltipContent>
                    <p>Salvar</p>
                </TooltipContent>
            </Tooltip>
        </div>
    );
}
