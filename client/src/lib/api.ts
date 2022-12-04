import axios, {AxiosInstance} from "axios";
import {TestResponse} from "@/proto/api_pb";

const grpcClient: AxiosInstance = axios.create({
    headers: {
        'content-type': 'application/json',
    },
    //params: {base64_encoded: 'true', fields: 'stdout'},
});

export const api = {

    async getTest() {
        try{
            return await grpcClient.get<TestResponse>("http://localhost:8081/v1/test")
                .then(res => {
                    return res.data
                })
        }catch (err) {
            console.log("error" + err);
        }
    },

}


