import { assert, assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.36-alpha/deno-dom-wasm.ts";
import EventParser from "./eventParser.ts";

Deno.test('parses the correct # of events', async () => {
  const html = await Deno.readTextFile('test/test.html');
  const document = new DOMParser().parseFromString(html, 'text/html');
  
  const eventParser = new EventParser();
  const events = Array.from(eventParser.parse(document!));
  assert(events);
  assertEquals(events.length, 10);
});