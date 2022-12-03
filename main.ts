import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.36-alpha/deno-dom-wasm.ts";
import EventParser from "./event/eventParser.ts";

const url = 'https://www.villageofbabylonny.gov/'
const res = await fetch(url);

console.info(`Fetching content from ${url}`);

const t1 = performance.now();
const html = await res.text();
const document = new DOMParser().parseFromString(html, 'text/html')!;
const t2 = performance.now();

console.info(`Fetched content in ${t2 - t1} milliseconds`);

const eventParser = new EventParser();
const events = eventParser.parse(document);

console.info(`Parsed ${events.length} events`);

const outputFilepath = Deno.args[0];

await Deno.writeTextFile(outputFilepath, JSON.stringify(events, null, 2));

console.info(`Wrote events to ${outputFilepath}`);