"use strict";

const readline = jest.genMockFromModule("readline");

readline.createInterface = jest.fn().mockReturnValue({
  question: jest
    .fn((question, cb) => {
      cb("y");
    })
    .mockImplementationOnce((question, cb) => {
      cb("y");
    })
    .mockImplementationOnce((question, cb) => {
      cb("n");
    }),
});

module.exports = readline;
