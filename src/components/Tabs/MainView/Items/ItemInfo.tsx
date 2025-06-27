import { Image, Icon } from "semantic-ui-react";
import { useRecoilValue } from "recoil";
import { useCallback, useEffect, useState } from "react";
import { gameDataState } from "../../../../State";
import { GloomhavenItem } from "../../../../State/Types";
import { getItemPath } from "../../../../games/GameData";
import useActiveItems from "../../../../hooks/useActiveItems";

type Props = {
    item: GloomhavenItem
};

export const ItemInfo = (props: Props) => {
  const { item } = props;
  const { items } = useRecoilValue(gameDataState);
  const { resources } = item;
  const activeItems = useActiveItems();

  const findItemId = (id: number) => {
    let foundItem = activeItems.find(i => i.id === id);
    if (foundItem) {
      return (<ItemInfo key={id} item={foundItem}/>);
    } else {
      return (<div key={id} className={"itemInfo-unavailable"}>
              <Icon name="exclamation triangle" />
              Unavailable item {id}
              </div>);
    }
  };

  const hasChildItems = resources && resources.item && resources.item.length > 0;

  return (
    <div className={"itemInfo-item"}>
      <Image src={getItemPath(item)} className={"itemInfo-card"} />
      {hasChildItems && (
        <div className={"itemInfo-children"}>
          {resources.item && resources.item.map((itemId) => { return findItemId(itemId); })}
        </div>
      )}
    </div>
  );
};

