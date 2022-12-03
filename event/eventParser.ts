import { HTMLDocument, Node } from "https://deno.land/x/deno_dom@v0.1.36-alpha/deno-dom-wasm.ts";
import { CalendarEvent } from "./calendarEvent.ts";

export default class EventParser {
  parse(document: HTMLDocument) {
    const events: CalendarEvent[] = [];
    const eventNodes = document?.querySelectorAll('#CalendarModal li');

    if (eventNodes) {
      for (const eventNode of eventNodes) {
        events.push(this.toEvent(eventNode));
      }
    }

    return events;
  }

  private toEvent(eventNode: Node) {
    const name = eventNode.textContent.trim().split(/\r?\n/)[3];
    const date = new Date();
    return new CalendarEvent(name, date);
  }
}