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
    const name = this.getEventName(eventNode);
    const date = this.getEventDate(eventNode);
    const place = this.getEventPlace(eventNode);

    return new CalendarEvent(name, date, place);
  }

  private getEventName(eventNode: Node) {
    return eventNode.textContent.trim().split(/\r?\n/)[3];
  }

  private getEventDate(eventNode: Node) {
    const eventTextTokens = eventNode.textContent
      .trim()
      .split(/\r?\n/);
    const monthAbbreviation = eventTextTokens[0];
    const dayNumber = eventTextTokens[1];
    const timeAndPlaceString = eventTextTokens[4];

    const timeMatch = timeAndPlaceString.trim().match(/^(\d{1,2}(?::\d{2})?)\s*([AaPp][Mm])/);
    if (!timeMatch) {
      return new Date(NaN);
    }

    let timeNumber = timeMatch[1];
    if (timeNumber.indexOf(':') < 0) {
      timeNumber += ':00';
    }
    const timeAmOrPm = timeMatch[2].toUpperCase();
    const timeString = `${timeNumber} ${timeAmOrPm}`;

    const dateString = `${monthAbbreviation} ${dayNumber} ${new Date().getFullYear()}`;

    const date = new Date(`${dateString} ${timeString} GMT-0500`);
    return date;
  }

  private getEventPlace(eventNode: Node) {
    return eventNode.textContent
      .trim()
      .split(/\r?\n/)
      [4]
      .split(' ')
      .splice(3)
      .join(' ');
  }
}

