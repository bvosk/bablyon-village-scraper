import { assert, assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { beforeAll, describe, it } from "https://deno.land/std@0.167.0/testing/bdd.ts";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.36-alpha/deno-dom-wasm.ts";
import { CalendarEvent } from "./calendarEvent.ts";
import EventParser from "./eventParser.ts";

describe('eventParser.parse', () => {
  let events: CalendarEvent[];

  beforeAll(async () => {
    const html = await Deno.readTextFile('test/test.html');
    const document = new DOMParser().parseFromString(html, 'text/html')!;
    const eventParser = new EventParser();
    events = eventParser.parse(document!);
  })

  it('parses the correct # of events', () => {
    assert(events);
    assertEquals(events.length, 10);
  });

  it('parses the event name correctly', () => {
    assertEquals(events[0].Name, 'Tree Lighting');
    assertEquals(events[1].Name, 'Board of Trustees Meeting');
    assertEquals(events[2].Name, 'Planning Board Meeting');
  });

  it('parses the event date correctly', () => {
    assertEquals(events[0].Date, new Date('2022-12-04 16:00:00 GMT-0500'));
    assertEquals(events[1].Date, new Date('2022-12-13 20:00:00 GMT-0500'));
    assertEquals(events[2].Date, new Date('2022-12-15 19:30:00 GMT-0500'));
  });

  it('parses the event place correctly', () => {
    assertEquals(events[0].Place, 'Argyle Park');
    assertEquals(events[1].Place, 'Village Hall');
    assertEquals(events[2].Place, 'Village Hall');
  });
})