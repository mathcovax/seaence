import "../repositories";
import { CreateSearchResultPubMedMissionUsecase } from "@business/applications/usecases/missions/searchResult/pubMed/createSearchResultPubMedMission";
import { StartSearchResultMissionUsecase } from "@business/applications/usecases/missions/searchResult/startSearchResultMission";
import { CreateSendSearchResultMissionUsecase } from "@business/applications/usecases/missions/sendSearchResult/createSendSearchResultMission";
import { StartSendSearchResultMissionUsecase } from "@business/applications/usecases/missions/sendSearchResult/sendSearchResultMission";

export const startSearchResultMissionUsecase = new StartSearchResultMissionUsecase();
export const createSearchResultPubMedMissionUsecase = new CreateSearchResultPubMedMissionUsecase();

export const createSendSearchResultMissionUsecase = new CreateSendSearchResultMissionUsecase();
export const startSendSearchResultMissionUsecase = new StartSendSearchResultMissionUsecase();
