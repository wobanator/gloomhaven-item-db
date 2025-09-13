import React, { useRef, useEffect } from 'react';
import { Modal, Button } from "semantic-ui-react";
import { useRecoilState } from "recoil";
import { GloomhavenItem } from "../../../../State/Types";
import { selectedItemInfoState } from "../../../../State";
import { ItemInfo, ItemInfoType } from "./ItemInfo";

type Props = {
	items: GloomhavenItem[];
};

export const ItemInfoTree = () => {
	const [selectedItemInfo, setSelectedItemInfo] = useRecoilState(selectedItemInfoState);
    const rootRef = useRef<HTMLDivElement>(null);

	const onClose = () => {
		setSelectedItemInfo(undefined);
	};

    useEffect(() => {
        if (rootRef.current) {
            const timer = setTimeout(() => {
                rootRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                });
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [selectedItemInfo]);

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
                    <ItemInfo item={selectedItemInfo} type={ItemInfoType.Root} ref={rootRef}/>
				</div>
			</Modal.Content>
			<Modal.Actions>
				<Button negative content="Close" onClick={onClose} />
			</Modal.Actions>
		</Modal>
	);
};
