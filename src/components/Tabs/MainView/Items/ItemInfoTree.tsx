import { Modal } from "semantic-ui-react";
import { useRecoilState } from "recoil";
import { GloomhavenItem } from "../../../../State/Types";
import { selectedItemInfoState } from "../../../../State";
import { ItemInfo, ItemInfoType } from "./ItemInfo";

type Props = {
	items: GloomhavenItem[];
};

export const ItemInfoTree = () => {
	const [selectedItemInfo, setSelectedItemInfo] = useRecoilState(selectedItemInfoState);

	const onClose = () => {
		setSelectedItemInfo(undefined);
	};

	if (!selectedItemInfo) {
		return null;
	}

	return (
		<Modal
			size="large"
			open={true}
			onClose={onClose}
			className="itemInfo-dialog"
			// style={{ width: "100%" }}
		>
			<Modal.Header>Item Info</Modal.Header>
			<Modal.Content>
				<div className="itemInfo-tree">
                    <ItemInfo item={selectedItemInfo} type={ItemInfoType.Root} />
				</div>
			</Modal.Content>
		</Modal>
	);
};
