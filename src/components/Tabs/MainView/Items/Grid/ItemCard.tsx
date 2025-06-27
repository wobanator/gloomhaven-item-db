import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { GloomhavenItem } from "../../../../../State/Types";
import { selectedItemInfoState } from "../../../../../State";
import { Label } from "semantic-ui-react";
import { getItemPath } from "../../../../../games/GameData";
import { GHIcon } from "../../../../Utils";
import { getItemIdString } from "../../../../../helpers";
import { ItemManagementContainer } from "../ItemManagement/ItemManagementContainer";
import { NoItemManagement } from "../ItemManagement/NoItemManagement";

import "./itemCard.scss";

type Props = {
	item: GloomhavenItem;
	capable: boolean;
};

const ItemId = (props: Props) => {
	const { item } = props;
	const id = getItemIdString(item);
	return <div className="item-card-id"> {id} </div>;
};

const ItemCard = (props: Props) => {
	const { item, capable } = props;

	const setSelectedItemInfo = useSetRecoilState(selectedItemInfoState);
	const [draw, setDraw] = useState(false);
	const [showBackside, setShowBackside] = useState(false);

	return (
		<div className="item-card-container">
			{draw && (
				<div className={"item-card-container-header" + (!capable ? "-incapable" : "")}>
					<ItemId item={item} capable={capable}/>
					{item.backDesc && (
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
			)}
            <img
                src={getItemPath(item, showBackside)}
                alt={item.name}
                onLoad={() => setDraw(true)}
                onClick={() => setSelectedItemInfo(item)}
                className={"item-card"}
            />
			{draw && (
				<div className={"item-card-container-footer" + (!capable ? "-incapable" : "")}>
					<ItemManagementContainer item={item} />
				</div>
			)}
		</div>
	);
};

export default ItemCard;
