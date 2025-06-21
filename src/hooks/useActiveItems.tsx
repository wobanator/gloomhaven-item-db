import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { gameDataState } from "../State";
import { GloomhavenItem } from "../State/Types";
import { useIsItemActive } from "./useIsItemActive";

const useActiveItems = (): Array<GloomhavenItem> => {
  const { items } = useRecoilValue(gameDataState);
  const { resources } = item;
  const isItemActive = useIsItemActive();
  const [activeItems, setActiveItems] = useState<GloomhavenItem[]>([]);

  useEffect(() => {
    if (!items) {
      return;
    }
    const itemsCopy = Object.assign([], items);
    setActiveItems(itemsCopy.filter(isItemActive));
  }, [items, isItemActive]);

  return activeItems;
};

export default useActiveItems;
