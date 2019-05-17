import assert from "assert";
import './imports/api/users.test.js';
import './imports/api/notes.test.js';
import './imports/ui/PrivateHeader.test.js';
import './imports/ui/Login.test.js';
import './imports/ui/Editor.test.js';
//import './imports/ui/NoteListEmptyItem.test.js';

describe("Notes App", function () {

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




