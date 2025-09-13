import { Image, Icon } from "semantic-ui-react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedItemInfoState } from "../../../../State";
import React, { useCallback, useEffect, useState, forwardRef, Ref } from "react";
import { GloomhavenItem } from "../../../../State/Types";
import { getItemPath } from "../../../../games/GameData";
import useActiveItems from "../../../../hooks/useActiveItems";
import { GHIcon } from "../../../Utils";

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

export const ItemInfo = forwardRef<HTMLDivElement, Props>(({ item, type }, ref) => {
  const { resources } = item;
  const activeItems = useActiveItems();
  const setSelectedItemInfo = useSetRecoilState(selectedItemInfoState);
  const [draw, setDraw] = useState(false);
  const [showBackside, setShowBackside] = useState(false);

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
  const imageCode = (
    <div className={"itemInfo-card-container"}>
        <Image src={getItemPath(item, item.backDesc ? showBackside : false)}
               className={"itemInfo-card"}
               onLoad={() => setDraw(true)}
               onClick={isRoot ? null : () => setSelectedItemInfo(item)} />
        {draw && item.backDesc && (
            <GHIcon
                className="flip"
                name={
                    showBackside
                        ? "flip_white.png"
                        : "flip_back_white.png"
                }
                onClick={() =>
                    setShowBackside((current) => !current)
                }
            />
        )}
    </div>
  );

  return (
  <>
    {!isRoot && (
      <div className={"itemInfo-item"}>
        {parentCode}
        {imageCode}
        {childrenCode}
      </div>
    )}
    {isRoot && (
      <>
      {parentCode}
      <div className={"itemInfo-root"} ref={ref}>
        {imageCode}
      </div>
      {childrenCode}
      </>
    )}
  </>);
});

