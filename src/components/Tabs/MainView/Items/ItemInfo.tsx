import { Image, Icon } from "semantic-ui-react";
import { useRecoilValue } from "recoil";
import { useCallback, useEffect, useState } from "react";
import { GloomhavenItem } from "../../../../State/Types";
import { getItemPath } from "../../../../games/GameData";
import useActiveItems from "../../../../hooks/useActiveItems";

export enum ItemInfoType
{
    Parent,
    Root,
    Child
};

type Props = {
    item: GloomhavenItem,
    type: ItemInfoType
};

export const ItemInfo = (props: Props) => {
  const { item, type } = props;
  const { resources } = item;
  const activeItems = useActiveItems();

  const findItemId = (id: number, type: ItemInfoType) => {
    let foundItem = activeItems.find(i => i.id === id);
    if (foundItem) {
      return (<ItemInfo key={id} item={foundItem} type={type}/>);
    } else {
      return (<div key={id} className={"itemInfo-unavailable"}>
              <Icon name="exclamation triangle" />
              Unavailable item {id}
              </div>);
    }
  };

  const findItemsUsingId = (id: number) => {
    return activeItems.filter(i => i.resources && i.resources.item && i.resources.item.length > 0 && i.resources.item.includes(id));
  };

  const isRoot = type == ItemInfoType.Root;
  const parentItems = type != ItemInfoType.Child ? findItemsUsingId(item.id) : null;
  const hasParentItems = parentItems && parentItems.length > 0;
  const hasChildItems = type != ItemInfoType.Parent && resources && resources.item && resources.item.length > 0;


  const parentCode = hasParentItems && (
      <div className={"itemInfo-parents"}>
        {parentItems.map((item) => findItemId(item.id, ItemInfoType.Parent))}
      </div>
  );
  const childrenCode = hasChildItems && (
      <div className={"itemInfo-children"}>
        {resources.item && resources.item.map((itemId) => findItemId(itemId, ItemInfoType.Child))}
      </div>
  );

  return (
  <>
    {!isRoot && (
      <div className={"itemInfo-item"}>
        {parentCode}
        <Image src={getItemPath(item)} className={"itemInfo-card"} />
        {childrenCode}
      </div>
    )}
    {isRoot && (
      <>
      {parentCode}
      <div className={"itemInfo-root"}>
        <Image src={getItemPath(item)} className={"itemInfo-card"} />
      </div>
      {childrenCode}
      </>
    )}
  </>
);
};

