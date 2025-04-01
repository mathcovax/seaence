import { CreateSearchResultPubMedMissionUsecase } from "@business/applications/usecases/missions/searchResult/pubMed/createSearchResultPubMedMission";
import { StartSearchResultMissionUsecase } from "@business/applications/usecases/missions/searchResult/startSearchResultMission";
import "../repositories";

export const startSearchResultMissionUsecase = new StartSearchResultMissionUsecase();
export const createSearchResultPubMedMissionUsecase = new CreateSearchResultPubMedMissionUsecase();
