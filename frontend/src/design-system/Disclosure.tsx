import { useId, useState, type ReactNode } from "react";
import { Button } from "./Button";
export function Disclosure({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  return (
    <div className="disclosure">
      <Button
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
      >
        {label}
        <span aria-hidden="true">{open ? "−" : "+"}</span>
      </Button>
      <div id={id} hidden={!open} className="disclosure__content">
        {children}
      </div>
    </div>
  );
}
