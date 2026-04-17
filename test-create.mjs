import { runTicketCreate } from "./scripts/cli-ticket-commands.mjs";
await runTicketCreate({ topic: "isolate", cwd: process.cwd() });
