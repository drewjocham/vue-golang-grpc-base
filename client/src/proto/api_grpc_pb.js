// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var api_pb = require('./api_pb.js');
var google_api_annotations_pb = require('./google/api/annotations_pb.js');

function serialize_CodeRequest(arg) {
  if (!(arg instanceof api_pb.CodeRequest)) {
    throw new Error('Expected argument of type CodeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_CodeRequest(buffer_arg) {
  return api_pb.CodeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_CodeResponse(arg) {
  if (!(arg instanceof api_pb.CodeResponse)) {
    throw new Error('Expected argument of type CodeResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_CodeResponse(buffer_arg) {
  return api_pb.CodeResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_GenerateQuestionsRequest(arg) {
  if (!(arg instanceof api_pb.GenerateQuestionsRequest)) {
    throw new Error('Expected argument of type GenerateQuestionsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_GenerateQuestionsRequest(buffer_arg) {
  return api_pb.GenerateQuestionsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_GenerateQuestionsResponse(arg) {
  if (!(arg instanceof api_pb.GenerateQuestionsResponse)) {
    throw new Error('Expected argument of type GenerateQuestionsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_GenerateQuestionsResponse(buffer_arg) {
  return api_pb.GenerateQuestionsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_MultipleChoiceQuestionRequest(arg) {
  if (!(arg instanceof api_pb.MultipleChoiceQuestionRequest)) {
    throw new Error('Expected argument of type MultipleChoiceQuestionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_MultipleChoiceQuestionRequest(buffer_arg) {
  return api_pb.MultipleChoiceQuestionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_MultipleChoiceQuestionResponse(arg) {
  if (!(arg instanceof api_pb.MultipleChoiceQuestionResponse)) {
    throw new Error('Expected argument of type MultipleChoiceQuestionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_MultipleChoiceQuestionResponse(buffer_arg) {
  return api_pb.MultipleChoiceQuestionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_TestRequest(arg) {
  if (!(arg instanceof api_pb.TestRequest)) {
    throw new Error('Expected argument of type TestRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_TestRequest(buffer_arg) {
  return api_pb.TestRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_TestResponse(arg) {
  if (!(arg instanceof api_pb.TestResponse)) {
    throw new Error('Expected argument of type TestResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_TestResponse(buffer_arg) {
  return api_pb.TestResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ApiServiceService = exports.ApiServiceService = {
  generateQuestions: {
    path: '/ApiService/GenerateQuestions',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.GenerateQuestionsRequest,
    responseType: api_pb.GenerateQuestionsResponse,
    requestSerialize: serialize_GenerateQuestionsRequest,
    requestDeserialize: deserialize_GenerateQuestionsRequest,
    responseSerialize: serialize_GenerateQuestionsResponse,
    responseDeserialize: deserialize_GenerateQuestionsResponse,
  },
  submitMultipleChoiceQuestion: {
    path: '/ApiService/SubmitMultipleChoiceQuestion',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.MultipleChoiceQuestionRequest,
    responseType: api_pb.MultipleChoiceQuestionResponse,
    requestSerialize: serialize_MultipleChoiceQuestionRequest,
    requestDeserialize: deserialize_MultipleChoiceQuestionRequest,
    responseSerialize: serialize_MultipleChoiceQuestionResponse,
    responseDeserialize: deserialize_MultipleChoiceQuestionResponse,
  },
  submitCode: {
    path: '/ApiService/SubmitCode',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.CodeRequest,
    responseType: api_pb.CodeResponse,
    requestSerialize: serialize_CodeRequest,
    requestDeserialize: deserialize_CodeRequest,
    responseSerialize: serialize_CodeResponse,
    responseDeserialize: deserialize_CodeResponse,
  },
  test: {
    path: '/ApiService/Test',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.TestRequest,
    responseType: api_pb.TestResponse,
    requestSerialize: serialize_TestRequest,
    requestDeserialize: deserialize_TestRequest,
    responseSerialize: serialize_TestResponse,
    responseDeserialize: deserialize_TestResponse,
  },
};

exports.ApiServiceClient = grpc.makeGenericClientConstructor(ApiServiceService);
