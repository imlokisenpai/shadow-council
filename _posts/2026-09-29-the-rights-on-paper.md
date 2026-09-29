---
title: "The rights on paper, and the parts that were left"
subtitle: "What the constitution guarantees, what the courts have actually said, and the machinery built on top of it"
date: 2026-09-29 11:00:00 +05:30
description: >-
  Article 19, Article 21 and Article 22 against Section 66A, the 2021 IT Rules,
  BNS 196, CERT-In's log-retention orders, preventive detention and an RTI
  statute being quietly hollowed. With sources.
tags: [law, speech, privacy, detention, rti, it-rules, bns]
categories: [law]
---

<p class="prompt-line"><span class="prompt" aria-hidden="true">no-one@shadow:~$</span> grep -n "Article 19\|Article 21\|Article 22" constitution.md</p>

India's constitution is unusually good on paper. That is the actual problem
people get wrong when they explain this country: it is not a document that
failed to promise enough, it is a document that promised a great deal and then
spent seventy years building a machine for not delivering it. And the machine is
not hidden. It is written down, numbered, cited in court, and in most cases
upheld.

Everything below is stated with its source, because the collective's first rule
is receipts. Where we are reasoning rather than reporting, we say so.

## The short version

| Right | Article | What it promises | What actually happened |
|---|---|---|---|
| Speech | 19(1)(a) | Speech and expression, restricted only on the eight grounds in 19(2) | A 2009 insertion was struck down in 2015; the machine was rebuilt by 2021 rules and 2024 criminal law |
| Life & liberty | 21 | Life and personal liberty; procedure must be fair, just and reasonable | Held to include privacy in 2017, by a bench of nine, unanimously |
| Detention | 22 | No arrest without grounds, right to be informed, right to counsel | Preventive detention continues on constitutional footing, up to 12 months, without trial |
| Information | — | The RTI Act, 2005 | The public-interest override in 8(1)(j) has been amended out of existence, on paper |
| The record | — | Courts, commissions, gazette notifications | 2019: a commission exonerates a sitting government on riots, seven years after the event |

## Speech: 66A, and what replaced it

**Article 19(1)(a)** guarantees speech and expression. **Article 19(2)** lists the
only eight grounds on which it may be restricted: sovereignty and integrity,
security of the state, friendly relations with foreign states, public order,
decency or morality, contempt of court, defamation, and incitement to an
offence. It is a closed list. This matters more than anything else on this page,
so keep it in mind.

**Section 66A of the Information Technology Act** was not in the Act as enacted
in 2000. It arrived with the 2008 amendment, in force **27 October 2009**, and
criminalised sending information that is "grossly offensive," "annoying,"
"menacing," or that causes "indecent" or "impermanent" harm to another person.

In **Shreya Singhal v. Union of India**, decided **24 March 2015**, a bench
struck it down. The reasoning is the part worth having: the Court asked whether
the thing punished was a disturbance of community life or merely an individual
being annoyed, and found that 66A punished the second. It also found no
proximate connection to public order and no incitement element — a text
expressing a viewpoint is not incitement, whatever the viewpoint is. It was
struck as violating 19(1)(a) and not saved by any of the eight grounds in 19(2).

The same judgment did something more important than remove a section. It
**read down Section 79**, so that an intermediary is obliged to take down
content only on receipt of an actual court order, or notification by the
appropriate government that conforms to Article 19(2) — and it read down Rule 3(4)
of the then-existing Intermediary Guidelines in the same way. Before that
judgment, "actual knowledge" was a phrase broad enough to swallow the 19(2)
list. After it, the takedown had to point at one of the eight grounds.

**Here is the part that gets left out of the retelling.** Striking 66A did not
loosen the position. It was removed and its function was immediately relocated:

- **IT Rules 2021** replaced the 2011 Intermediary Guidelines. Rule 3(1)(d)
  carries forward the court-order-only standard, with a **36-hour** takedown
  deadline. Rule 3(2) requires a named grievance officer, a **24-hour**
  acknowledgement, and — as originally notified — a **72-hour** resolution for
  complaints about removal. Grievance Appellate Committees hear appeals.
  *These timelines have been amended more than once since, including by
  gazette notifications in April 2023 and February 2026. Check the current
  gazette before relying on a number; we have not.*
- **Rule 4** applies additional obligations to "significant social media
  intermediaries": a **Chief Compliance Officer resident in India**, personally
  liable in proceedings for third-party content the platform failed to police; a
  **nodal contact person** for 24×7 law-enforcement coordination; a **Resident
  Grievance Officer**; and **monthly compliance reports disclosing how many
  links were removed and why**.

Read that last bullet again. A platform is now required to publish, monthly, a
count of the things it has taken down. The takedown was supposed to become rare
and judicial. Instead it became routine, and auditable only by the platform.

**BNS Section 196**, in force **1 July 2024**, is the successor to IPC
153A. It carries forward the old wording and adds **electronic communication** to
the list of means, and to the thing that is done, not just the thing said. The
sub-clause that matters is (1)(c): organising any exercise, movement or drill
intending that participants use criminal force **against any religious, racial,
language or regional group or caste or community**, where it causes or is likely
to cause fear or alarm, is an offence. It is cognizable and non-bailable, three
years, rising to five if committed in a place of worship. Sub-section (3)
narrowly protects genuine criticism of government policy, public servants and
their conduct.

That is the entire shape of the argument, and it is worth stating plainly
because the legal details obscure it: **the offence is group-directed
disorderly conduct, and the drafting is drafted such that identifying the group
is the element that makes the conduct criminal.** Naming a mob can be what
constitutes the offence.

**BNS Section 152** covers "acts endangering sovereignty, unity and integrity
of India" and is the section the government has presented as sedition returning.
We are going to be careful here, because the presentation is doing more work
than the text. **IPC Section 124A — sedition proper — was repealed in 1976.**
Section 152 is differently worded, and it is narrower in some respects and
differently framed in others. Whether it is a restoration of 124A is a question
for the courts and it has not been finally settled. Treat the "sedition is
back" framing as a claim, not a holding.

**Section 69A** of the IT Act, which allows the government to direct blocking
of content, was examined in the same 2015 judgment and upheld. Blocking orders
go through the 2009 Blocking Rules, which require procedural safeguards, and a
court order is one of the two routes.

## Privacy: the one that went the other way

**K.S. Puttaswamy (Retd.) v. Union of India**, decided **24 August 2017** by a
bench of **nine judges, unanimously**, held that privacy is a fundamental right
inhering in Part III. It overruled *M.P. Sharma* (1954) and *Kharak Singh*
(1962), which had both said no such right existed, and it overruled them
expressly rather than distinguishing them. It held privacy to be intrinsic to
Article 21, distributed across 19, 21 and other provisions, and it laid down
the test that still governs: an invasion must satisfy **legality** (there must
be a law), **legitimate state aim**, and **proportionality** (a rational nexus
between the object and the means). It also noted privacy has both negative
content — restraining the state — and positive content, obliging the state to
protect the individual from non-state actors.

This is the strongest rights judgment in the recent record and it was unanimous,
which is why it is the right place to start an argument about what the state
*can* do.

## The machinery built on top of it

**The Digital Personal Data Protection Act, 2023.** Passed in August 2023,
assented December 2023. The Digital Personal Data Protection Rules were
notified in **November 2025**, with a phased commencement. The Act's own
substantive obligations are not yet fully in force.

Its most consequential provision is not about data at all. **Section 44(3)
amends Section 8(1)(j) of the RTI Act**, cutting that provision — currently 87
words, with a public-interest override and a proviso barring denial of
information that cannot be denied to Parliament — down to six: *"information
which relates to personal information."* The override is gone. The proviso is
gone. The 8(2) public-interest backstop does not apply to 8(1), so it does not
rescue it.

The reason to call this out rather than leave it in a data-protection section is
the **definition of "Data Principal"** in the DPDP Act, which reaches beyond
natural persons to a Hindu undivided family, a firm, a company, an association
of individuals — **and the State**. A provision that shields "personal
information" from RTI, where "personal" can mean the government, is not a
privacy protection. It is a reclassification.

**Two earlier hits, for context.** *Girish Ramchandra Deshpande v. Central
Information Commission* (2012) held that an officer's memos, show-cause notices
and censure orders are "personal information" under 8(1)(j), reasoning that
performance at work is a matter between employer and employee. It did not engage
the proviso. Authorities have used it as a general refusal. And *Association for
Democratic Reforms* is the corrective: information that cannot be denied to
Parliament cannot be denied to a citizen either — the proviso, and the acid test
it was written as.

**CERT-In's directions of 28 April 2022**, issued under s.70B(6) of the IT Act:
cyber incidents must be reported **within 6 hours**; ICT logs must be enabled and
retained for a **rolling 180 days** inside India; and data centres, VPS, cloud
and **VPN service providers** must register and retain validated subscriber
identity and contact details for **5 years or longer**. The subscriber-validation
requirements and the MSMEs' timelines were deferred to **25 September 2022**;
everything else took effect 60 days after issuance. Individual citizens are not
covered by these directions — the obligations fall on service providers. CERT-In's
own FAQ confirms logs may be stored outside India provided they can be produced
to the agency in a reasonable time.

**Preventive detention.** Article 22 sits outside Part III's other protections
and allows detention without trial. The **National Security Act, 1980** permitted
detention without charge for up to **12 months** on grounds of public order or
national security; MISA (1971) predates it. The NSA was repealed in 2004. The
article survives, and so does the practice, through state laws and through
ordinary criminal procedure.

## What to do with this

The honest answer is that the appellate route is real, slow, and has a good
record on the big questions — *Puttaswamy* was unanimous and it won. The
practical route is the boring one:

**Use the RTI Act.** More applications, faster, with a specific and narrow
question. Section 7 requires a reply within **30 days**; **48 hours** for
information about life and liberty; **35 days** where a third party is involved.
Section 8(2) lets a public authority disclose despite a listed exemption where
public interest outweighs the harm — say so explicitly in the application, every
time, because most officers do not consider it unless asked. The First Appellate
Officer must be approached within 30 days. *Girish Deshpande* is a real obstacle
and it is worth appealing rather than folding.

The other lever is the boring one: **the takedown report.** Significant social
media intermediaries must publish monthly compliance reports. The number of
links removed, the reasons given, and the trend over time are public, and
nobody aggregates them. Doing so is not a campaign. It is a spreadsheet, and it
is the closest thing to a working audit of speech enforcement that exists
without a court order.

## Where we are unsure

- The current takedown timelines in the 2021 Rules as amended. The 36-hour court
  -order window and the 24-hour acknowledgement are stable and sourced. The
  user-complaint windows have been revised; we have not verified the current
  text.
- Whether s.44(3) DPDP has commenced. The Act's provisions come into force on
  dates set by notification and the rollout is staged. **Treat the RTI
  amendment as pending until the gazette says otherwise** — and if it has
  commenced, that is the single most important fact on this page.
- The relationship between BNS s.152 and the repealed IPC 124A. Genuinely
  unsettled. See above.
- Whether the 2019 commission findings in Gujarat and the mass-grave records in
  Kashmir can be reconciled into a single account. They largely cannot, and
  [we have tried]({{ '/2026/09/29/fanatism-is-not-the-crowd/' | relative_url }}).

---

<p class="prompt-line"><span class="prompt" aria-hidden="true">no-one@shadow:~$</span> echo $? &mdash; 0, but read the last section</p>
