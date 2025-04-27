import "../repositories";
import { FindPubMedSearchResultMissionUsecase } from "@business/applications/usecases/missions/searchResult/pubMed/findPubMedSearchResultMission";
import { CreatePubMedSearchResultMissionUsecase } from "@business/applications/usecases/missions/searchResult/pubMed/createPubMedSearchResultMission";
import { StartSearchResultMissionUsecase } from "@business/applications/usecases/missions/searchResult/startSearchResultMission";
import { CreateSendSearchResultMissionUsecase } from "@business/applications/usecases/missions/sendSearchResult/createSendSearchResultMission";
import { StartSendSearchResultMissionUsecase } from "@business/applications/usecases/missions/sendSearchResult/startSendSearchResultMission";
import { ResumeSearchResultMissionUsecase } from "@business/applications/usecases/missions/searchResult/resumeSearchResultMission";

export const startSearchResultMissionUsecase = new StartSearchResultMissionUsecase();
export const createPubMedSearchResultMissionUsecase = new CreatePubMedSearchResultMissionUsecase();
export const findPubMedSearchResultMissionUsecase = new FindPubMedSearchResultMissionUsecase();
export const resumeSearchResultMissionUsecase = new ResumeSearchResultMissionUsecase();

export const createSendSearchResultMissionUsecase = new CreateSendSearchResultMissionUsecase();
export const startSendSearchResultMissionUsecase = new StartSendSearchResultMissionUsecase();
