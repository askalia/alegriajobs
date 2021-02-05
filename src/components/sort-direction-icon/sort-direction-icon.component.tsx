import { FC, useState } from "react";
import { Job } from "shared/models";

export type SortDirection = "asc" | "desc";

type ISortDirectionIconProps = {
  sortBy: keyof Job["fields"];
  currentSortBy: keyof Job["fields"];
  onChangeDirection: (
    sortBy: keyof Job["fields"],
    direction: SortDirection
  ) => void;
};

export const SortDirectionIcon: FC<ISortDirectionIconProps> = ({
  sortBy,
  currentSortBy,
  onChangeDirection,
}) => {
  const [direction, setDirection] = useState<SortDirection | null>(null);

  //const setDirection = () => (direction = direction === "asc" ? "desc" : "asc");

  const getIconDirection = () => {
    switch (direction) {
      case "asc":
        return "down";
      case "desc":
        return "up";
      default:
        return "down";
    }
  };

  return (
    <>
      &#160;
      <i
        className={`ni ni-bold-${getIconDirection()} ${
          currentSortBy === sortBy ? "text-red" : ""
        }`}
        onClick={(e) => {
          setDirection(
            direction === "asc" || direction === null ? "desc" : "asc"
          );
          onChangeDirection(sortBy, direction as SortDirection);
        }}
      ></i>
    </>
  );
};
