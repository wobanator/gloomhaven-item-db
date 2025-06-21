import { GloomhavenItem } from "../State/Types";
import { useRecoilValue } from "recoil";
import {
  itemState,
  allState,
  specialUnlocksState,
  prosperityState,
  soloClassState,
  scenarioCompletedState,
  includeGameState,
  resourcesState,
  buildingLevelState,
} from "../State";
import { useCallback } from "react";

export const useIsItemActive = (): ((item: GloomhavenItem) => boolean) => {
  const item = useRecoilValue(itemState);
  const all = useRecoilValue(allState);
  const specialUnlocks = useRecoilValue(specialUnlocksState);
  const prosperity = useRecoilValue(prosperityState);
  const soloClass = useRecoilValue(soloClassState);
  const scenarioCompleted = useRecoilValue(scenarioCompletedState);
  const includeGames = useRecoilValue(includeGameState);
  const buildingLevels = useRecoilValue(buildingLevelState);
  const craftsmanLevel = buildingLevels["cm"];
  const jewelerLevel = buildingLevels["jw"];
  const tradingPostLevel = buildingLevels["tp"];
  const enhancerLevel = buildingLevels["en"];

  const isItemShown = useCallback(
    ({
      id,
      soloItem,
      unlockProsperity,
      unlockScenario,
      gameType,
      slot,
      name,
      desc,
      count,
      specialUnlock,
      alwaysShown = false,
      unlockCrafstmanLevel,
      unlockTradingPostLevel,
      unlockJewelerLevel,
      unlockEnhancerLevel,
      importedItem,
    }: GloomhavenItem) => {
      if (!includeGames.includes(gameType)) {
        return false;
      }

      if (specialUnlock && !specialUnlocks.includes(specialUnlock)) {
        return false;
      }

      if (!all && importedItem) {
        if (
          unlockTradingPostLevel !== undefined &&
          unlockTradingPostLevel !== Number.MAX_VALUE &&
          tradingPostLevel < unlockTradingPostLevel
        ) {
          return false;
        }
        if (
          unlockScenario !== undefined &&
          unlockScenario !== Number.MAX_VALUE &&
          !scenarioCompleted.includes(unlockScenario)
        ) {
          return false;
        }
        if (
          unlockEnhancerLevel !== undefined &&
          unlockEnhancerLevel !== Number.MAX_VALUE &&
          enhancerLevel < unlockEnhancerLevel
        ) {
          return false;
        }
        if (!item.includes(id)) {
          return false;
        }
      }
      let show =
        all ||
        prosperity >= unlockProsperity ||
        scenarioCompleted.includes(unlockScenario) ||
        (soloItem && soloClass.includes(soloItem)) ||
        item.includes(id) ||
        craftsmanLevel >= unlockCrafstmanLevel ||
        tradingPostLevel >= unlockTradingPostLevel ||
        jewelerLevel >= unlockJewelerLevel ||
        enhancerLevel >= unlockEnhancerLevel ||
        alwaysShown;

      return show;
    },
    [
      all,
      includeGames,
      item,
      prosperity,
      scenarioCompleted,
      soloClass,
      specialUnlocks,
      craftsmanLevel,
      jewelerLevel,
      tradingPostLevel,
      enhancerLevel,
    ]
  );

  return isItemShown;
};
