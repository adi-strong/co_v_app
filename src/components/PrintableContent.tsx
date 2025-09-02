import type {PropsWithChildren, ReactNode} from "react";
import {forwardRef} from "react";

type PrintableContentProps = PropsWithChildren<{ children: ReactNode, className?: string }>

const PrintableContent = forwardRef<HTMLDivElement, PrintableContentProps>(
  ({ children, className }, ref = null) => {
    return (
      <div ref={ref} className={className ? className : ''}>
        {children}
      </div>
    ) as ReactNode;
  }
);

export default PrintableContent;
