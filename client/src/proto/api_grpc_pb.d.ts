// package: 
// file: api.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as api_pb from "./api_pb";

interface IApiServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    test: IApiServiceService_ITest;
}

interface IApiServiceService_ITest extends grpc.MethodDefinition<api_pb.TestRequest, api_pb.TestResponse> {
    path: "/ApiService/Test";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<api_pb.TestRequest>;
    requestDeserialize: grpc.deserialize<api_pb.TestRequest>;
    responseSerialize: grpc.serialize<api_pb.TestResponse>;
    responseDeserialize: grpc.deserialize<api_pb.TestResponse>;
}

export const ApiServiceService: IApiServiceService;

export interface IApiServiceServer extends grpc.UntypedServiceImplementation {
    test: grpc.handleUnaryCall<api_pb.TestRequest, api_pb.TestResponse>;
}

export interface IApiServiceClient {
    test(request: api_pb.TestRequest, callback: (error: grpc.ServiceError | null, response: api_pb.TestResponse) => void): grpc.ClientUnaryCall;
    test(request: api_pb.TestRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.TestResponse) => void): grpc.ClientUnaryCall;
    test(request: api_pb.TestRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.TestResponse) => void): grpc.ClientUnaryCall;
}

export class ApiServiceClient extends grpc.Client implements IApiServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public test(request: api_pb.TestRequest, callback: (error: grpc.ServiceError | null, response: api_pb.TestResponse) => void): grpc.ClientUnaryCall;
    public test(request: api_pb.TestRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.TestResponse) => void): grpc.ClientUnaryCall;
    public test(request: api_pb.TestRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.TestResponse) => void): grpc.ClientUnaryCall;
}
