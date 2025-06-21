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
            return (<ItemInfo item={foundItem}/>);
        } else {
            return (<div className={"itemInfo-unavailable"}>
                <Icon name="exclamation triangle" />
                Unavailable item {id}
            </div>);
        }
	};

	return (
        <div className={"itemInfo-item"}>
            <Image src={getItemPath(item)} className={"itemInfo-card"} />
                {resources && Object.entries(resources).map(([resource, value], index) => {
                    if (resource === "item") 
                        return (
                            <div className={"itemInfo-children"}>
                            {value.map( (itemId: number, itemIndex: number) => { return findItemId(itemId);})}
                            </div>)
                    })
                }
        </div>
    );
};

