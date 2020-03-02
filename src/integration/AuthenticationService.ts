import {Service} from "typedi";
import {IRestResponse, RestClient} from "typed-rest-client/RestClient";
import {HttpError} from "routing-controllers";
import TokenCreateResponseDTO from "../dto/TokenCreateResponseDTO";
import {format} from "util";

@Service()
export default class AuthenticationService {

    private client: RestClient;

    constructor() {
        const clientId = 'authentication-client';
        const url = format("http://%s:8081", process.env.AUTHENTICATION_API_HOST || 'localhost');
        this.client = new RestClient(clientId, url);
        console.info(format('Created rest client %s with url %s.', clientId, url));
    }

    /**
     * Performs a token creation based on an e-mail.
     * @param email The email used as based.
     * @return The created token response.
     */
    public async createJwtToken(email: string): Promise<TokenCreateResponseDTO> {
        try {
            const response: IRestResponse<TokenCreateResponseDTO> = await this.client.create<TokenCreateResponseDTO>('/token', {
                email: email
            });
            return response.result;
        } catch (error) {
            throw new HttpError(408, 'Error while communicating to Authentication API. ' + error.message);
        }
    }

    /**
     * Verifies whether a token is valid or not.
     * @param token The token to be validated.
     * @return <i>true:</i> The token is valid. </br>
     *         <i>false:</i> The token is not valid.
     */
    public async isJwtTokenNotValid(token: string): Promise<boolean> {
        try {
            const response: IRestResponse<any> = await this.client.create<any>('/token/check', {
                token: token
            });
            return response.statusCode !== 200;
        } catch (error) {
            throw new HttpError(408, 'Error while communication to Authentication API. ' + error.message);
        }
    }
}
