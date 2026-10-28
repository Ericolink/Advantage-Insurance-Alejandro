// npm run check:launch — lists what is still missing before the site can be published.
import { getPendingItems } from "../src/config/readiness.ts";
import { site } from "../src/config/site.ts";

const items = getPendingItems(site);
const blocking = items.filter((item) => item.blocking);
const review = items.filter((item) => !item.blocking);

const print = (title: string, list: typeof items) => {
  if (list.length === 0) return;
  console.log(`\n${title}`);
  for (const item of list) console.log(`  - [${item.key}] ${item.message}`);
};

print(`BLOCKING (${blocking.length}) — must be resolved before launch:`, blocking);
print(`TO REVIEW (${review.length}) — confirm or decide:`, review);

if (blocking.length === 0) {
  console.log("\nNo blocking items. The site can be built with REQUIRE_LAUNCH_READY=1.");
} else {
  console.log("\nSee PENDING_CLIENT_INFO.md for the information to request from the client.");
  process.exitCode = 1;
}
