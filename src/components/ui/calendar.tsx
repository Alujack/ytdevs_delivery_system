
// components/ui/calendar.tsx
import React from "react";
import Calendar from "react-calendar";

export const CalendarComponent = ({
  selected,
  onSelect,
  ...props
}: {
  selected: { from: Date; to?: Date };
  onSelect: (date: { from: Date; to?: Date }) => void;
}) => {
  return <Calendar {...props} onChange={onSelect} />;
};
export { Calendar };

