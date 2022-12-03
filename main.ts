import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.36-alpha/deno-dom-wasm.ts";
import EventParser from "./event/eventParser.ts";

const url = 'https://www.villageofbabylonny.gov/'
const res = await fetch(url);

const html = await res.text();
const document = new DOMParser().parseFromString(html, 'text/html')!;

const eventParser = new EventParser();
const events = eventParser.parse(document);

await Deno.writeTextFile(Deno.args[0], JSON.stringify(events, null, 2));