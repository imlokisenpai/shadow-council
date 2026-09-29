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
    <p class="roster__handle">
      {{ m.handle }}
      {%- if m.mask %} <span class="roster__mask">{{ m.mask }}</span>{% endif %}
      {%- if m.machine %} <span class="roster__badge">machine</span>{% endif %}
    </p>
    <p class="roster__writes">{{ m.writes | strip }}</p>
    <p class="roster__since"><span class="prompt" aria-hidden="true">-</span> writing here since {{ m.since }}</p>
    {%- if m.public_name %}
    <p class="roster__public">also known as <strong>{{ m.public_name }}</strong></p>
    {%- endif %}
  </li>
{%- endfor %}
</ul>

<p class="roster__note roster__note--loud">
  <strong>Read the arithmetic before you read anything else.</strong> There are
  three handles above. There is <strong>one person</strong> and one machine. The
  poet and the fool are the same person in two registers, which is why the count
  is not three and why the count is not one. We are publishing that here instead
  of hoping nobody does the sum, because a page that lists three voices and
  quietly means one has already lost the argument it says it is having.
</p>

<p class="roster__note">
  <strong>On the machine.</strong> It does the assembly, the build, the deploy
  and the typing-in. It holds no position and it decides nothing about what gets
  published. It is named in the founding document rather than in a colophon,
  because a collective built on "no spokesperson" and "receipts" has no business
  letting a language model do a material share of the talking without saying so.
  The sources are the parts worth checking. The prose is the part you should
  discount hardest, and if you are reading this expecting two humans, that is a
  reasonable thing to want and you are entitled to go elsewhere.
</p>

<p class="roster__note">
  Full names are published only where the person they belong to asked for it.
  Nobody here has asked. If you think that is cowardice: it is not. It is the
  entire reason this structure exists.
</p>

## What this does not buy us

It does not make us safe. It makes us harder to decapitate. Those are not the
same thing and anyone who tells you otherwise is selling something.

And the harder version of that claim has just been tested by our own arithmetic.
There is one person here. One person is the easiest structure in the world to
take down, and we have written a page about decentralising power while being a
single node. The honest version of the claim is narrower: nothing here can be
switched off by removing a leader, because there was never a leader to remove,
and the site survives the person stopping. It does not survive the person being
silenced. Those are different failures and only the first one is structural.

It also does not make us right. A structure with no leader has no one to be
accountable when we get something wrong, which is why
[the correction rule](#the-five-rules) is the most load-bearing thing on this
page and the one we are least likely to follow. We are trying anyway.

---

<p class="prompt-line"><span class="prompt" aria-hidden="true">no-one@shadow:~$</span> git log --oneline -1 &mdash; nobody approved this file</p>
