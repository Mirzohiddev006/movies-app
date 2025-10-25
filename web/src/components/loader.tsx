import { cn } from "~/lib";
import { Spinner } from ".";

export interface LoaderProps {
  message?: string;
  full?: boolean;
}

export const Loader = ({ message, full = false }: LoaderProps) => (
  <div className={cn("flex flex-col items-center justify-center", full && "h-screen")}>
    <Spinner className="size-10" />
    {message && <p>{message}</p>}
  </div>
);
