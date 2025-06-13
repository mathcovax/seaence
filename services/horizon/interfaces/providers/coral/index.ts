import { type FindHttpClientRoute, HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import { envs } from "@interfaces/envs";
import { type CodegenRoutes } from "@vendors/clients-type/coral/duplojsTypesCodegen";

export type CoralClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

type InputFindManyFavoritEquationName = FindHttpClientRoute<
	CoralClientRoute,
	"POST",
	"/find-many-favorite-equation-name"
>["body"];

type InputFindManyFavoritEquationDetails = FindHttpClientRoute<
	CoralClientRoute,
	"POST",
	"/find-many-favorite-equation-details"
>["body"];

type InputFindOneFavoritEquation = FindHttpClientRoute<
	CoralClientRoute,
	"POST",
	"/find-one-favorite-equation"
>["body"];

type InputUpsertFavoritEquation = FindHttpClientRoute<
	CoralClientRoute,
	"POST",
	"/upsert-favorite-equation"
>["body"];

export class CoralAPI {
	private static httpClient: HttpClient<CoralClientRoute>;

	public static findManyFavoriteEquationName(
		body: InputFindManyFavoritEquationName,
	) {
		return this.httpClient
			.post(
				"/find-many-favorite-equation-name",
				{
					body,
				},
			)
			.iWantInformation("favoriteEquation.name.findMany");
	}

	public static findManyFavoriteEquationDetails(
		body: InputFindManyFavoritEquationDetails,
	) {
		return this.httpClient
			.post(
				"/find-many-favorite-equation-details",
				{
					body,
				},
			)
			.iWantInformation("favoriEquation.findMany.details");
	}

	public static findOneFavoriteEquation(
		body: InputFindOneFavoritEquation,
	) {
		return this.httpClient
			.post(
				"/find-one-favorite-equation",
				{
					body,
				},
			)
			.iWantExpectedResponse();
	}

	public static upsertFavoriteEquation(
		body: InputUpsertFavoritEquation,
	) {
		return this.httpClient
			.post(
				"/upsert-favorite-equation",
				{
					body,
				},
			)
			.iWantInformation("favoriteEquation.upsert");
	}

	static {
		this.httpClient = new HttpClient({
			baseUrl: envs.CORAL_BASE_URL,
		});
	}
}
