import axios, {AxiosInstance} from "axios";
import { EnvironmentHelper } from "./EnvironmentHelper";
import { TestResponse } from "../proto/api_pb";

const url = new EnvironmentHelper()

const grpcClient: AxiosInstance = axios.create({
    baseURL: url.baseUrl,
    headers: {
        'content-type': 'application/json',
    },
    //params: {base64_encoded: 'true', fields: 'stdout'},
});

export const api = {

    async getTest() {
        try{
            return await grpcClient.get<TestResponse>("/v1/test")
                .then(res => {
                    console.log(res);
                    return res.data
                })
        }catch (err) {
            console.log("error" + err);
        }
    },

}


