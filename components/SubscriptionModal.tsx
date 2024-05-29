import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { IModal } from "@/utils/types";

export default function DialogDemo({ triggerText, children }: IModal) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="btn-primary">{triggerText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">{children}</DialogContent>
    </Dialog>
  );
}
