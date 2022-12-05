import axios, {AxiosInstance} from "axios";
import {TestResponse} from "@/proto/api_pb";
import {EnvironmentHelper} from "@/lib/EnvironmentHelper";


const grpcClient: AxiosInstance = axios.create({
    headers: {
        'content-type': 'application/json',
    },
    //params: {base64_encoded: 'true', fields: 'stdout'},
});

const url = new EnvironmentHelper()

export const api = {

    async getTest() {
        try{
            return await grpcClient.get<TestResponse>( "v1/test")
                .then(res => {
                    console.log(url.baseUrl)
                    return res.data
                })
        }catch (err) {
            console.log("error" + err);
        }
    },

}


