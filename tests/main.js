import assert from "assert";
import './imports/api/users.test.js';
import './imports/api/notes.test.js';

describe("short-lnk", function () {

  if (Meteor.isClient) {
    it("client is not server", function () {
      assert.strictEqual(Meteor.isServer, false);
    });
  }

  if (Meteor.isServer) {
    it("server is not client", function () {
      assert.strictEqual(Meteor.isClient, false);
    });
  }
});
