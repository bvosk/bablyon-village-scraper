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
    
    const monthAbbreviation = eventNode.textContent
      .trim()
      .split(/\r?\n/)[0];
      const dayNumber = eventNode.textContent
      .trim()
      .split(/\r?\n/)[1];
    const timeAndPlaceString = eventNode.textContent
      .trim()
      .split(/\r?\n/)[4];
    let timeNumber = timeAndPlaceString.split(' ')[0];
    const timeAmOrPm = timeAndPlaceString.split(' ')[1];

    if (timeNumber.indexOf(':') < 0) {
      timeNumber += ':00';
    }

    const timeString = `${timeNumber} ${timeAmOrPm}`;

    const dateString = `${monthAbbreviation} ${dayNumber} ${new Date().getFullYear()}`;

    const date = new Date(`${dateString} ${timeString}`);

    return new CalendarEvent(name, date);
  }
}