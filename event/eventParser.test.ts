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
    const currentYear = new Date().getFullYear();
    assertEquals(events[0].Date, new Date(`DEC 4 ${currentYear} 16:00:00 GMT-0500`));
    assertEquals(events[1].Date, new Date(`DEC 13 ${currentYear} 20:00:00 GMT-0500`));
    assertEquals(events[2].Date, new Date(`DEC 15 ${currentYear} 19:30:00 GMT-0500`));
  });

  it('parses the event place correctly', () => {
    assertEquals(events[0].Place, 'Argyle Park');
    assertEquals(events[1].Place, 'Village Hall');
    assertEquals(events[2].Place, 'Village Hall');
  });

  it('parses times without space before am/pm', () => {
    const html = `
      <ul id="CalendarModal">
        <li class="list-group-item">
          <div class="calendar-list">
            <span class="month bg-cyan-p">JUL</span>
            <span class="day">18</span>
          </div>
          Concert<br />
          8pm Friday Gazebo
        </li>
      </ul>`;
    const doc = new DOMParser().parseFromString(html, 'text/html')!;
    const result = new EventParser().parse(doc);
    const currentYear = new Date().getFullYear();
    assertEquals(result[0].Date, new Date(`JUL 18 ${currentYear} 20:00:00 GMT-0500`));
  });
})

