// package: 
// file: api.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as api_pb from "./api_pb";

interface IApiServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    generateQuestions: IApiServiceService_IGenerateQuestions;
    submitMultipleChoiceQuestion: IApiServiceService_ISubmitMultipleChoiceQuestion;
    submitCode: IApiServiceService_ISubmitCode;
    test: IApiServiceService_ITest;
}

interface IApiServiceService_IGenerateQuestions extends grpc.MethodDefinition<api_pb.GenerateQuestionsRequest, api_pb.GenerateQuestionsResponse> {
    path: "/ApiService/GenerateQuestions";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<api_pb.GenerateQuestionsRequest>;
    requestDeserialize: grpc.deserialize<api_pb.GenerateQuestionsRequest>;
    responseSerialize: grpc.serialize<api_pb.GenerateQuestionsResponse>;
    responseDeserialize: grpc.deserialize<api_pb.GenerateQuestionsResponse>;
}
interface IApiServiceService_ISubmitMultipleChoiceQuestion extends grpc.MethodDefinition<api_pb.MultipleChoiceQuestionRequest, api_pb.MultipleChoiceQuestionResponse> {
    path: "/ApiService/SubmitMultipleChoiceQuestion";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<api_pb.MultipleChoiceQuestionRequest>;
    requestDeserialize: grpc.deserialize<api_pb.MultipleChoiceQuestionRequest>;
    responseSerialize: grpc.serialize<api_pb.MultipleChoiceQuestionResponse>;
    responseDeserialize: grpc.deserialize<api_pb.MultipleChoiceQuestionResponse>;
}
interface IApiServiceService_ISubmitCode extends grpc.MethodDefinition<api_pb.CodeRequest, api_pb.CodeResponse> {
    path: "/ApiService/SubmitCode";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<api_pb.CodeRequest>;
    requestDeserialize: grpc.deserialize<api_pb.CodeRequest>;
    responseSerialize: grpc.serialize<api_pb.CodeResponse>;
    responseDeserialize: grpc.deserialize<api_pb.CodeResponse>;
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
    generateQuestions: grpc.handleUnaryCall<api_pb.GenerateQuestionsRequest, api_pb.GenerateQuestionsResponse>;
    submitMultipleChoiceQuestion: grpc.handleUnaryCall<api_pb.MultipleChoiceQuestionRequest, api_pb.MultipleChoiceQuestionResponse>;
    submitCode: grpc.handleUnaryCall<api_pb.CodeRequest, api_pb.CodeResponse>;
    test: grpc.handleUnaryCall<api_pb.TestRequest, api_pb.TestResponse>;
}

export interface IApiServiceClient {
    generateQuestions(request: api_pb.GenerateQuestionsRequest, callback: (error: grpc.ServiceError | null, response: api_pb.GenerateQuestionsResponse) => void): grpc.ClientUnaryCall;
    generateQuestions(request: api_pb.GenerateQuestionsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.GenerateQuestionsResponse) => void): grpc.ClientUnaryCall;
    generateQuestions(request: api_pb.GenerateQuestionsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.GenerateQuestionsResponse) => void): grpc.ClientUnaryCall;
    submitMultipleChoiceQuestion(request: api_pb.MultipleChoiceQuestionRequest, callback: (error: grpc.ServiceError | null, response: api_pb.MultipleChoiceQuestionResponse) => void): grpc.ClientUnaryCall;
    submitMultipleChoiceQuestion(request: api_pb.MultipleChoiceQuestionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.MultipleChoiceQuestionResponse) => void): grpc.ClientUnaryCall;
    submitMultipleChoiceQuestion(request: api_pb.MultipleChoiceQuestionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.MultipleChoiceQuestionResponse) => void): grpc.ClientUnaryCall;
    submitCode(request: api_pb.CodeRequest, callback: (error: grpc.ServiceError | null, response: api_pb.CodeResponse) => void): grpc.ClientUnaryCall;
    submitCode(request: api_pb.CodeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.CodeResponse) => void): grpc.ClientUnaryCall;
    submitCode(request: api_pb.CodeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.CodeResponse) => void): grpc.ClientUnaryCall;
    test(request: api_pb.TestRequest, callback: (error: grpc.ServiceError | null, response: api_pb.TestResponse) => void): grpc.ClientUnaryCall;
    test(request: api_pb.TestRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.TestResponse) => void): grpc.ClientUnaryCall;
    test(request: api_pb.TestRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.TestResponse) => void): grpc.ClientUnaryCall;
}

export class ApiServiceClient extends grpc.Client implements IApiServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public generateQuestions(request: api_pb.GenerateQuestionsRequest, callback: (error: grpc.ServiceError | null, response: api_pb.GenerateQuestionsResponse) => void): grpc.ClientUnaryCall;
    public generateQuestions(request: api_pb.GenerateQuestionsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.GenerateQuestionsResponse) => void): grpc.ClientUnaryCall;
    public generateQuestions(request: api_pb.GenerateQuestionsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.GenerateQuestionsResponse) => void): grpc.ClientUnaryCall;
    public submitMultipleChoiceQuestion(request: api_pb.MultipleChoiceQuestionRequest, callback: (error: grpc.ServiceError | null, response: api_pb.MultipleChoiceQuestionResponse) => void): grpc.ClientUnaryCall;
    public submitMultipleChoiceQuestion(request: api_pb.MultipleChoiceQuestionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.MultipleChoiceQuestionResponse) => void): grpc.ClientUnaryCall;
    public submitMultipleChoiceQuestion(request: api_pb.MultipleChoiceQuestionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.MultipleChoiceQuestionResponse) => void): grpc.ClientUnaryCall;
    public submitCode(request: api_pb.CodeRequest, callback: (error: grpc.ServiceError | null, response: api_pb.CodeResponse) => void): grpc.ClientUnaryCall;
    public submitCode(request: api_pb.CodeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.CodeResponse) => void): grpc.ClientUnaryCall;
    public submitCode(request: api_pb.CodeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.CodeResponse) => void): grpc.ClientUnaryCall;
    public test(request: api_pb.TestRequest, callback: (error: grpc.ServiceError | null, response: api_pb.TestResponse) => void): grpc.ClientUnaryCall;
    public test(request: api_pb.TestRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.TestResponse) => void): grpc.ClientUnaryCall;
    public test(request: api_pb.TestRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.TestResponse) => void): grpc.ClientUnaryCall;
}
