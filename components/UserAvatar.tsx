import * as Avatar from "@radix-ui/react-avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";

const classStyle = "inline-flex h-7 w-7 select-none items-center justify-center overflow-hidden rounded-full align-middle bg-slate-200";

export default function UserAvatar({
  user,
  className
}: {
  user?: { firstName: string; lastName: string; avatarUrl?: string } | null;
  className?: string;
}) {
  const initials = user
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
    : <PlusIcon className="h-4 w-4"></PlusIcon>;

  if(user == null){
    return (
        <Tooltip>
      <TooltipTrigger>
        <Avatar.Root className={cn(className, classStyle)}>
          <Avatar.Fallback
            className="flex h-full w-full items-center justify-center bg-slate-900 text-xs font-medium text-white"
            delayMs={600}
          >
            {initials}
          </Avatar.Fallback>
        </Avatar.Root>
         <TooltipContent>
            <p>Adicionar usuário</p>
            <p className="text-[8px]">Desculpe essa feature ainda não está pronta</p>
        </TooltipContent>
      </TooltipTrigger>
    </Tooltip>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger>
        <Avatar.Root className={cn(className, classStyle)}>
          <Avatar.Image
            className="h-full w-full object-cover"
            src={user?.avatarUrl}
            alt={`${user?.firstName} ${user?.lastName}`}
          />
          <Avatar.Fallback
            className="flex h-full w-full items-center justify-center bg-slate-400 text-xs font-medium text-white"
            delayMs={600}
          >
            {initials}
          </Avatar.Fallback>
        </Avatar.Root>
         <TooltipContent>
            <p>{user?.firstName} {user?.lastName}</p>
        </TooltipContent>
      </TooltipTrigger>
    </Tooltip>
  );
}
