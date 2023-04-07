// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var api_pb = require('./api_pb.js');
var google_api_annotations_pb = require('./google/api/annotations_pb.js');

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
