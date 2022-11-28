// package: 
// file: api.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class TestRequest extends jspb.Message { 
    getName(): string;
    setName(value: string): TestRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TestRequest.AsObject;
    static toObject(includeInstance: boolean, msg: TestRequest): TestRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TestRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TestRequest;
    static deserializeBinaryFromReader(message: TestRequest, reader: jspb.BinaryReader): TestRequest;
}

export namespace TestRequest {
    export type AsObject = {
        name: string,
    }
}

export class TestResponse extends jspb.Message { 
    getName(): string;
    setName(value: string): TestResponse;
    getAge(): string;
    setAge(value: string): TestResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TestResponse.AsObject;
    static toObject(includeInstance: boolean, msg: TestResponse): TestResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TestResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TestResponse;
    static deserializeBinaryFromReader(message: TestResponse, reader: jspb.BinaryReader): TestResponse;
}

export namespace TestResponse {
    export type AsObject = {
        name: string,
        age: string,
    }
}

export class MultipleChoiceQuestionRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): MultipleChoiceQuestionRequest;
    getQuestionid(): string;
    setQuestionid(value: string): MultipleChoiceQuestionRequest;
    getAnswer(): string;
    setAnswer(value: string): MultipleChoiceQuestionRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MultipleChoiceQuestionRequest.AsObject;
    static toObject(includeInstance: boolean, msg: MultipleChoiceQuestionRequest): MultipleChoiceQuestionRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MultipleChoiceQuestionRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MultipleChoiceQuestionRequest;
    static deserializeBinaryFromReader(message: MultipleChoiceQuestionRequest, reader: jspb.BinaryReader): MultipleChoiceQuestionRequest;
}

export namespace MultipleChoiceQuestionRequest {
    export type AsObject = {
        id: string,
        questionid: string,
        answer: string,
    }
}

export class MultipleChoiceQuestionResponse extends jspb.Message { 
    getId(): string;
    setId(value: string): MultipleChoiceQuestionResponse;
    getIscorrect(): string;
    setIscorrect(value: string): MultipleChoiceQuestionResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MultipleChoiceQuestionResponse.AsObject;
    static toObject(includeInstance: boolean, msg: MultipleChoiceQuestionResponse): MultipleChoiceQuestionResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MultipleChoiceQuestionResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MultipleChoiceQuestionResponse;
    static deserializeBinaryFromReader(message: MultipleChoiceQuestionResponse, reader: jspb.BinaryReader): MultipleChoiceQuestionResponse;
}

export namespace MultipleChoiceQuestionResponse {
    export type AsObject = {
        id: string,
        iscorrect: string,
    }
}

export class CodeRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): CodeRequest;
    getCodequestionid(): string;
    setCodequestionid(value: string): CodeRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CodeRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CodeRequest): CodeRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CodeRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CodeRequest;
    static deserializeBinaryFromReader(message: CodeRequest, reader: jspb.BinaryReader): CodeRequest;
}

export namespace CodeRequest {
    export type AsObject = {
        id: string,
        codequestionid: string,
    }
}

export class CodeResponse extends jspb.Message { 
    getId(): string;
    setId(value: string): CodeResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CodeResponse.AsObject;
    static toObject(includeInstance: boolean, msg: CodeResponse): CodeResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CodeResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CodeResponse;
    static deserializeBinaryFromReader(message: CodeResponse, reader: jspb.BinaryReader): CodeResponse;
}

export namespace CodeResponse {
    export type AsObject = {
        id: string,
    }
}

export class GenerateQuestionsRequest extends jspb.Message { 
    getQuestion(): string;
    setQuestion(value: string): GenerateQuestionsRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GenerateQuestionsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GenerateQuestionsRequest): GenerateQuestionsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GenerateQuestionsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GenerateQuestionsRequest;
    static deserializeBinaryFromReader(message: GenerateQuestionsRequest, reader: jspb.BinaryReader): GenerateQuestionsRequest;
}

export namespace GenerateQuestionsRequest {
    export type AsObject = {
        question: string,
    }
}

export class GenerateQuestionsResponse extends jspb.Message { 
    getId(): string;
    setId(value: string): GenerateQuestionsResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GenerateQuestionsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GenerateQuestionsResponse): GenerateQuestionsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GenerateQuestionsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GenerateQuestionsResponse;
    static deserializeBinaryFromReader(message: GenerateQuestionsResponse, reader: jspb.BinaryReader): GenerateQuestionsResponse;
}

export namespace GenerateQuestionsResponse {
    export type AsObject = {
        id: string,
    }
}
