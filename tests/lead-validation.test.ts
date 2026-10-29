import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { MESSAGE_MAX, normalizeUsPhone, readLeadForm, validateLead } from "../src/lib/lead-validation.ts";

const rules = { topics: ["medicaid", "general", "notSure"] };

function form(fields: Record<string, string>) {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

const valid = { name: "Maria Lopez", phone: "(305) 555-0123", email: "", time: "morning", topic: "general", message: "", consent: "on" };

describe("contact form validation", () => {
  it("accepts name + phone + consent and normalizes the number; email and message are optional", () => {
    const { errors, lead } = validateLead(readLeadForm(form(valid)), rules);
    assert.deepEqual(errors, {});
    assert.equal(lead?.phone, "+13055550123");
    assert.equal(lead?.email, null);
    assert.equal(lead?.message, null);
  });

  it("requires a name, a valid phone and consent", () => {
    const { errors, lead } = validateLead(readLeadForm(form({ ...valid, name: "", phone: "123", consent: "" })), rules);
    assert.equal(lead, null);
    assert.deepEqual(Object.keys(errors).sort(), ["consent", "name", "phone"]);
  });

  it("validates the email only when one is given", () => {
    assert.ok(validateLead(readLeadForm(form({ ...valid, email: "maria.gomez@" })), rules).errors.email);
    assert.equal(validateLead(readLeadForm(form({ ...valid, email: "maria@mail.com" })), rules).lead?.email, "maria@mail.com");
  });

  it("rejects unknown topics and time slots", () => {
    assert.ok(validateLead(readLeadForm(form({ ...valid, topic: "medicare-advantage" })), rules).errors.topic);
    assert.ok(validateLead(readLeadForm(form({ ...valid, time: "midnight" })), rules).errors.time);
  });

  it("limits the short message to 500 characters", () => {
    assert.deepEqual(validateLead(readLeadForm(form({ ...valid, message: "a".repeat(MESSAGE_MAX) })), rules).errors, {});
    assert.ok(validateLead(readLeadForm(form({ ...valid, message: "a".repeat(MESSAGE_MAX + 1) })), rules).errors.message);
  });

  it("ignores any extra (sensitive) field that might be posted", () => {
    const input = readLeadForm(form({ ...valid, ssn: "123-45-6789", medicareNumber: "1EG4-TE5-MK73", dob: "01/01/1960" }));
    assert.deepEqual(Object.keys(input).sort(), ["consent", "email", "message", "name", "phone", "time", "topic", "trap"]);
  });

  it("normalizes U.S. phone numbers", () => {
    assert.equal(normalizeUsPhone("+1 (305) 555-0123"), "+13055550123");
    assert.equal(normalizeUsPhone("1-305-555-0123"), "+13055550123");
    assert.equal(normalizeUsPhone("055-555-0123"), null);
    assert.equal(normalizeUsPhone("555-0123"), null);
  });
});
