"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

interface ReusableModalProps {
  triggerText: string;
  title: string;
  description?: string;
  body: React.ReactNode;
  actionText?: string;
  onSubmit?: () => void;
}
const ReusableModal = (props: ReusableModalProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button variant="outline">{props.triggerText}</Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-scroll max-h-screen">
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          {props.description && (
            <DialogDescription>{props.description}</DialogDescription>
          )}
        </DialogHeader>

        {props.body}
        {props.actionText && (
          <DialogFooter>
            <Button type="submit">{props.actionText}</Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReusableModal;
