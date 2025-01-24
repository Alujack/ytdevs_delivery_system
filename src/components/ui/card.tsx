// components/ui/card.tsx
import React from "react";
import classNames from "classnames";

export const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={classNames("bg-white p-4 rounded shadow", className)}>{children}</div>
);

export const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="border-b pb-2">{children}</div>
);

export const CardContent = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;

export const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-bold text-lg">{children}</h2>
);
