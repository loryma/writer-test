"use strict";

const path = require("path");

const fs = jest.genMockFromModule("fs");

fs.appendFileSync = jest.fn();

module.exports = fs;
