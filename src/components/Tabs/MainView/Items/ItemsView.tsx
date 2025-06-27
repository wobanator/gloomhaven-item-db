import React from "react";
import { useRecoilValue } from "recoil";
import { Message } from "semantic-ui-react";
import useItems from "../../../../hooks/useItems";
import useActiveItems from "../../../../hooks/useActiveItems";
import { displayItemAsState } from "../../../../State";
import { ItemViewDisplayType } from "../../../../State/Types";
import { ItemGrid } from "./Grid";
import { ItemTable } from "./Table";
import { ItemInfoTree } from "./ItemInfoTree";

export const ItemsView = () => {
	const items = useItems();
	const activeItems = useActiveItems();
	const displayAs = useRecoilValue(displayItemAsState);
	return (
		<>
			{items.length === 0 && (
				<Message negative>
					No items found matching your filters and/or search criteria
				</Message>
			)}

			{displayAs === ItemViewDisplayType.List ? (
				<ItemTable items={items} activeItems={activeItems}/>
			) : (
				<ItemGrid items={items} activeItems={activeItems}/>
			)}
            <ItemInfoTree/>
		</>
	);
};
