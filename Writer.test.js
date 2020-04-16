jest.mock("fs");
jest.mock("readline");

const fs = require("fs");
const readline = require("readline");
const Writer = require("./Writer");

//confirm method from Writer module have to be move into separate file to be able to mock it
//and test seprately, these tests are for a usecase when Writer module has to be tested as is

const flushPromises = () =>
  new Promise((resolve, reject) => setTimeout(resolve, 0));

test("Writer is a Writer!", () => {
  const writer = new Writer("foo/bar");

  expect(writer).toBeInstanceOf(Writer);
});

describe("check write method", () => {
  afterEach(() => {
    fs.appendFileSync.mockClear();
  });

  test("write method calls fs.appendFileSync only when user cofirms", async () => {
    const writer = new Writer("test.txt");
    writer.write("data");

    await flushPromises();

    expect(fs.appendFileSync).toHaveBeenCalledWith("test.txt", "data");

    writer.write("data");

    await flushPromises();

    expect(fs.appendFileSync.mock.calls.length).toBe(1);
  });

  test("write method calls fs.appendFileSync with arguments", async () => {
    const writer = new Writer("test.txt");
    writer.write("data");

    await flushPromises();

    expect(fs.appendFileSync).toHaveBeenCalledWith("test.txt", "data");
  });

  test("inside write method question method is passed an argument", async () => {
    const writer = new Writer("test.txt");
    writer.write("data");

    await flushPromises();

    expect(readline.createInterface().question.mock.calls[0][0]).toBe(
      "\nAre you sure?"
    );
  });
});
