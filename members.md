---
layout: page
permalink: /members/
title: names
subtitle: there is no leader, so there is nothing to knock off
description: The roster of the collective, and the five rules that keep it leaderless.
---

{%- assign members = site.data.roster.members -%}
{%- assign principles = site.data.roster.principles -%}

<p class="prompt-line"><span class="prompt" aria-hidden="true">no-one@shadow:~/members$</span> cat _data/roster.yml</p>

A collective that names a leader has given itself an off switch. The police
know it, the courts know it, the party funding the next campaign knows it, and
so does the person at the top, who by then has more to lose than the rest of us
put together. So there isn't one.

What follows is the whole of the structure. It is deliberately short enough to
be checkable.

## The five rules

<ol class="rules">
{%- for p in principles %}
  <li class="rules__item">
    <p class="rules__text">{{ p.text }}</p>
    <p class="rules__key"><span class="prompt" aria-hidden="true">#</span>{{ p.key }}</p>
  </li>
{%- endfor %}
</ol>

## Who writes here

<p class="prompt-line"><span class="prompt" aria-hidden="true">no-one@shadow:~/members$</span> grep -c 'handle:' _data/roster.yml</p>

<ul class="roster">
{%- for m in members %}
  <li class="roster__item">
    <p class="roster__handle">{{ m.handle }}</p>
    <p class="roster__writes">{{ m.writes | strip }}</p>
    <p class="roster__since"><span class="prompt" aria-hidden="true">-</span> writing here since {{ m.since }}</p>
    {%- if m.public_name %}
    <p class="roster__public">also known as <strong>{{ m.public_name }}</strong></p>
    {%- endif %}
  </li>
{%- endfor %}
</ul>

<p class="roster__note">
  The handles above are the people. Full names are published only where the
  person they belong to asked for it, which is currently nobody's decision to
  make but their own. If you are reading this and you think that is cowardice:
  it is not. It is the entire reason this structure exists.
</p>

## What this does not buy us

It does not make us safe. It makes us harder to decapitate. Those are not the
same thing and anyone who tells you otherwise is selling something.

It also does not make us right. A structure with no leader has no one to be
accountable when we get something wrong, which is why
[the correction rule](#the-five-rules) is the most load-bearing thing on this
page and the one we are least likely to follow. We are trying anyway.

---

<p class="prompt-line"><span class="prompt" aria-hidden="true">no-one@shadow:~$</span> git log --oneline -1 &mdash; nobody approved this file</p>
