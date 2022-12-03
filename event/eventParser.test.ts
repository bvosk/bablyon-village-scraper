import { assert, assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { beforeAll, describe, it } from "https://deno.land/std@0.167.0/testing/bdd.ts";
import { Document, DOMParser } from "https://deno.land/x/deno_dom@v0.1.36-alpha/deno-dom-wasm.ts";
import EventParser from "./eventParser.ts";

describe('eventParser', () => {
  let document: Document;
  let eventParser: EventParser;

  beforeAll(async () => {
    const html = await Deno.readTextFile('test/test.html');
    document = new DOMParser().parseFromString(html, 'text/html')!;
    
    eventParser = new EventParser();
  })

  it('parses the correct # of events', () => {
    const events = eventParser.parse(document!);
    assert(events);
    assertEquals(events.length, 10);
  });
})