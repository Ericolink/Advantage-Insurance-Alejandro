import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { normalizeUsPhone, readLeadForm, validateLead } from "../src/lib/lead-validation.ts";

const rules = { topics: ["medicaid", "general", "notSure"], allowWhatsapp: false };

function form(fields: Record<string, string>) {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

const valid = { name: "Maria Lopez", method: "phone", phone: "(305) 555-0123", language: "es", topic: "general", time: "morning", consent: "on" };

describe("contact form validation", () => {
  it("accepts a complete phone request and normalizes the number", () => {
    const { errors, lead } = validateLead(readLeadForm(form(valid)), rules);
    assert.deepEqual(errors, {});
    assert.equal(lead?.phone, "+13055550123");
    assert.equal(lead?.email, null);
  });

  it("requires consent, a name, a topic and a time", () => {
    const { errors, lead } = validateLead(readLeadForm(form({ ...valid, name: "", consent: "", topic: "", time: "" })), rules);
    assert.equal(lead, null);
    assert.deepEqual(Object.keys(errors).sort(), ["consent", "name", "time", "topic"]);
  });

  it("requires the field that matches the chosen method", () => {
    assert.ok(validateLead(readLeadForm(form({ ...valid, phone: "123" })), rules).errors.phone);
    const email = validateLead(readLeadForm(form({ ...valid, method: "email", phone: "", email: "not-an-email" })), rules);
    assert.ok(email.errors.email);
    assert.equal(email.errors.phone, undefined);
    const good = validateLead(readLeadForm(form({ ...valid, method: "email", phone: "305 555 0123", email: "maria@mail.com" })), rules);
    assert.equal(good.lead?.phone, null, "phone is discarded when the visitor chose email");
  });

  it("rejects WhatsApp when it is not enabled, and unknown topics", () => {
    assert.ok(validateLead(readLeadForm(form({ ...valid, method: "whatsapp" })), rules).errors.method);
    assert.deepEqual(validateLead(readLeadForm(form({ ...valid, method: "whatsapp" })), { ...rules, allowWhatsapp: true }).errors, {});
    assert.ok(validateLead(readLeadForm(form({ ...valid, topic: "medicare-advantage" })), rules).errors.topic);
  });

  it("ignores any extra (sensitive) field that might be posted", () => {
    const input = readLeadForm(form({ ...valid, ssn: "123-45-6789", medicareNumber: "1EG4-TE5-MK73", dob: "01/01/1960" }));
    assert.deepEqual(Object.keys(input).sort(), ["consent", "email", "language", "method", "name", "phone", "time", "topic", "trap"]);
  });

  it("normalizes U.S. phone numbers", () => {
    assert.equal(normalizeUsPhone("+1 (305) 555-0123"), "+13055550123");
    assert.equal(normalizeUsPhone("1-305-555-0123"), "+13055550123");
    assert.equal(normalizeUsPhone("055-555-0123"), null);
    assert.equal(normalizeUsPhone("555-0123"), null);
  });
});
