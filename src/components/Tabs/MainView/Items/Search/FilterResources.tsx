import React, { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Form } from "semantic-ui-react";
import { gameDataState, resourcesState } from "../../../../../State";
import { ResourceTypes, GoldType, ResourceOrGoldType } from "../../../../../State/Types";
import { GHIcon } from "../../../../Utils";

export const FilterResorces = () => {
	const [resourcesOrGold, setResourcesState] = useRecoilState(resourcesState);
	const { resources: gameResource } = useRecoilValue(gameDataState);

	const setFilterResource = useCallback(
		(resourceOrGold?: ResourceOrGoldType) => {
			if (!resourceOrGold) {
				setResourcesState([]);
				return;
			}
			const value = Object.assign([], resourcesOrGold);
			const index = value.indexOf(resourceOrGold);
			if (index !== -1) {
				value.splice(index, 1);
			} else {
				value.push(resourceOrGold);
			}
			setResourcesState(value);
		},
		[resourcesOrGold, setResourcesState]
	);

	if (!gameResource || gameResource.length === 0) {
		return null;
	}
	return (
		<Form.Group inline>
			<label>Resource:</label>
			<Form.Radio
				label={"all"}
				checked={resourcesOrGold.length === 0}
				onChange={() => setFilterResource(undefined)}
			/>
			{gameResource &&
				gameResource.map((resource) => (
					<Form.Checkbox
						key={resource}
						label={
							<GHIcon
								name={`${resource}.png`}
								folder="resources"
							/>
						}
						checked={resourcesOrGold.includes(resource as ResourceTypes)}
						onChange={() =>
							setFilterResource(resource as ResourceTypes)
						}
						alt={resource}
					/>
				))}
            <Form.Checkbox
                key={"gold"}
                label={
                    <GHIcon
                        name={"gold.png"}
                        folder="resources"
                    />
                }
                checked={resourcesOrGold.includes(GoldType.Gold)}
                onChange={() =>
                    setFilterResource(GoldType.Gold)
                }
                alt={"gold"}
            />
		</Form.Group>
	);
};
