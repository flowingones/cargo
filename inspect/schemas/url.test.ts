import { assertEquals } from "std/testing/asserts.ts";
import { URLSchema } from "inspect/schemas/url.ts";

const notDefinedMessage = '"url" is required';
const notURLMessage = '"url" is not a valid "URL"';
const notSSHMessage = '"url" is not of protocol type "ssh:"';
const notHttpsMessage = '"url" is not of protocol type "https:"';
const notHttpMessage = '"url" is not of protocol type "http:" or "https:"';

const url1 = "cargo";
const url2 = "ftp://cargo.wtf";
const url3 = "ssh://cargo.wtf";
const url4 = "http://cargo.wtf";
const url5 = "https://cargo.wtf";

Deno.test("URL Schema Validation: 'isUrl'", async (t) => {
  await t.step("should validate URLs", () => {
    const UrlSchema = new URLSchema();
    assertEquals(UrlSchema.validate(undefined).errors, [
      { message: notDefinedMessage },
      { message: notURLMessage },
    ]);
    assertEquals(UrlSchema.validate(url1).errors, [
      { message: notURLMessage },
    ]);
    assertEquals(UrlSchema.validate(url4).errors, []);
    // assertEquals(UrlSchema.validate(url4).errors, []);
  });

  await t.step("should allow undefined", () => {
    const UrlSchema = new URLSchema().optional();
    assertEquals(UrlSchema.validate(undefined).errors, []);
    assertEquals(UrlSchema.validate(url1).errors, [{
      message: notURLMessage,
    }]);
    assertEquals(UrlSchema.validate(url2).errors, []);
    assertEquals(UrlSchema.validate(url3).errors, []);
    assertEquals(UrlSchema.validate(url4).errors, []);
    assertEquals(UrlSchema.validate(url5).errors, []);
  });
});

Deno.test("URL Schema Validation: 'isHttp'", async (t) => {
  await t.step("should validate protocol(https)", () => {
    const UrlSchema = new URLSchema().http();
    assertEquals(UrlSchema.validate(undefined).errors, [
      { message: notDefinedMessage },
      { message: notURLMessage },
      { message: notHttpsMessage },
    ]);
    assertEquals(UrlSchema.validate(url1).errors, [
      {
        message: notURLMessage,
      },
      {
        message: notHttpsMessage,
      },
    ]);
    assertEquals(UrlSchema.validate(url2).errors, [
      {
        message: notHttpsMessage,
      },
    ]);
    assertEquals(UrlSchema.validate(url3).errors, [{
      message: notHttpsMessage,
    }]);
    assertEquals(UrlSchema.validate(url4).errors, [
      {
        message: notHttpsMessage,
      },
    ]);
    assertEquals(UrlSchema.validate(url5).errors, []);
  });
});

Deno.test("URL Schema Validation: 'isHttp'", async (t) => {
  await t.step("should validate http protocol(http/https)", () => {
    const UrlSchema = new URLSchema().http(false);
    assertEquals(UrlSchema.validate(undefined).errors, [
      { message: notDefinedMessage },
      { message: notURLMessage },
      { message: notHttpMessage },
    ]);
    assertEquals(UrlSchema.validate(url1).errors, [
      {
        message: notURLMessage,
      },
      {
        message: notHttpMessage,
      },
    ]);
    assertEquals(UrlSchema.validate(url2).errors, [
      {
        message: notHttpMessage,
      },
    ]);
    assertEquals(UrlSchema.validate(url3).errors, [{
      message: notHttpMessage,
    }]);
    assertEquals(UrlSchema.validate(url4).errors, []);
    assertEquals(UrlSchema.validate(url5).errors, []);
  });
});

Deno.test("URL Schema Validation: 'isProtocol'", async (t) => {
  await t.step("should validate protocol", () => {
    const UrlSchema = new URLSchema().protocol("ssh:");
    assertEquals(UrlSchema.validate(undefined).errors, [
      { message: notDefinedMessage },
      { message: notURLMessage },
      { message: notSSHMessage },
    ]);
    assertEquals(UrlSchema.validate(url1).errors, [
      {
        message: notURLMessage,
      },
      {
        message: notSSHMessage,
      },
    ]);
    assertEquals(UrlSchema.validate(url2).errors, [
      {
        message: notSSHMessage,
      },
    ]);
    assertEquals(UrlSchema.validate(url3).errors, []);
    assertEquals(UrlSchema.validate(url4).errors, [
      {
        message: notSSHMessage,
      },
    ]);
    assertEquals(UrlSchema.validate(url5).errors, [
      {
        message: notSSHMessage,
      },
    ]);
  });
});
