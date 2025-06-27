import React from "react";
import { GloomhavenItem } from "../../../../../State/Types";
import ItemCard from "./ItemCard";
import { isItemCapable } from "../../../../../helpers";

import "./itemGrid.scss";

type Props = {
	items: GloomhavenItem[];
	activeItems: GloomhavenItem[];
};

export const ItemGrid = (props: Props) => {
	const { items, activeItems } = props;
	return (
		<div className="item-grid">
			{items.map((item) => {
				let key = `${item.id}`;
				if (item.imageSuffix) {
					key += `-${item.imageSuffix}`;
				}
				let capable = isItemCapable(item, activeItems);
				return <ItemCard key={key} item={item} capable={capable}/>;
			})}
		</div>
	);
};
