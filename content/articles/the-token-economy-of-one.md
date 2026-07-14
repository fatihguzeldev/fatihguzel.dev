---
title: 'the token economy of one'
slug: 'the-token-economy-of-one'
publishedAt: '2026-07-14'
description: 'token usage is a terrible measure of productivity across people, yet a surprisingly useful signal when i compare my own days.'
language: 'en'
tags: ['llms', 'productivity']
draft: false
---

## the idea i almost dismissed

there is a number i have started checking at the end of my workday. i would never put it on a performance dashboard, and i would distrust anyone who tried. still, it has become one of the clearest signals of whether i actually moved work forward: **the number of tokens i consumed**.

i know how this sounds. counting tokens has all the ingredients of a terrible productivity system, and until recently i would have dismissed the thought for exactly that reason.

i have been actively using language models since before chatgpt made them part of everyday conversation. by the time chatgpt arrived in late 2022, we had already been experimenting with openai's playground at work for a few months.

some of my earliest academic exposure to the subject came through theory of computation. that course was not secretly teaching me how modern llms work, of course. but formal languages were probably my first encounter with language as something a machine could represent and operate on.

so i have been close to this shift for a while. close enough to see what these systems can do, but also close enough to remain skeptical of the claims surrounding them. that skepticism has always felt necessary. understanding how to use a model also means understanding where it fails, what it obscures, and when it creates more work than it removes.

a few months ago, whenever the phrase _token economy_ appeared in my head, my immediate reaction would have been something like:

> don't be stupid fatih. you are not seriously going to measure your productivity in tokens, are you?

but that reaction has become harder to sustain. not because i suddenly stopped being skeptical, but because the models changed. they became capable of taking on larger and less neatly bounded parts of my work. token consumption stopped feeling like a technical billing detail and started looking like a trace of how much work i was moving through the system. that did not make it a measure of productivity. it merely made the idea interesting enough that i stopped dismissing it immediately.

so i let it sit for a while.

the idea survived, but only under one condition: i could observe the number, but i could never allow myself to optimize it.

## when a signal becomes a target

before explaining why token usage has become useful to me, i need to explain why it should never become a goal. the version of goodhart's law most people know is usually phrased like this:

> when a measure becomes a target, it ceases to be a good measure.

a number can remain useful while it quietly records our behavior. once we attach evaluation, status, or reward to it, our behavior begins to reorganize itself around the number. eventually, the metric stops representing the thing we cared about and starts representing how well we have learned to optimize the number itself.

lines of code is an almost perfect example.

as a descriptive statistic, it may tell us something about the size of a codebase or the surface area of a change. as a measure of individual productivity, it becomes absurd. an engineer who deletes two thousand unnecessary lines may create more value than one who adds five thousand.

once producing more lines becomes the target, simpler solutions are actively punished. token usage is vulnerable to exactly the same failure.

## tokens as personal telemetry

that vulnerability does not make the number useless. it only limits the claims i can make about it.

token usage does not directly measure output, value, or even complexity. a poorly defined task can consume an enormous amount of context while going nowhere. a difficult problem in a familiar domain can be solved with surprisingly few iterations. sometimes a high token count means that the work was demanding. sometimes it means that i gave the model the wrong context and spent an hour walking in circles.

the number mixes several things together: the size of the problem, the amount of context required to understand it, the uncertainty involved, the number of approaches explored, and the inefficiency of the workflow itself. so tokens are not a unit of work in the way hours are a unit of time. they are closer to telemetry from the system through which the work is now passing.

for years, i paid more attention to focused time. it was a reasonable signal, but the relationship between time and output was never particularly stable. two days with the same amount of uninterrupted work could end very differently. on one of them, i might spend hours trying to understand the shape of a problem without producing anything visible. on another, i might make several decisions and ship the result before lunch. time told me how long i stayed engaged. it did not tell me how much work moved forward.

token usage has been more consistent, at least in my current workflow. when i am actively investigating a system, comparing approaches, implementing something, debugging it, challenging an assumption, or verifying the result, that activity usually leaves a computational trace.

the relationship is not magical. i simply use language models during a large enough portion of my work that consuming tokens and moving work forward have started to happen at roughly the same time. that is why the number can be meaningful without being a measurement of productivity itself. it does not tell me whether the work was valuable. it tells me that a certain amount of work passed through the human-machine system i currently use to produce value.

> the distinction matters.

a thermometer can tell you that something is getting hotter without telling you whether it is cooking dinner or burning the house down. token usage can tell me that the system was active. judging what that activity produced is still my responsibility.

## an economy with one participant

the number becomes useful only when the comparison remains narrow. i am not comparing my token usage with another engineer's, and i am not claiming that a hundred thousand tokens correspond to some fixed amount of work. i am comparing my own days against a baseline created by my own working habits.

many of the relevant variables remain stable enough: the person doing the work, the domains, the tools, the prompting habits, and the standard expected from the final result. that does not make the number objective. it only makes it locally interpretable.

between two people, there is no stable exchange rate.

one person may load an entire codebase into the context, while another retrieves only the files needed for each step. one may be exploring an unfamiliar domain, while another is working inside a system they have known for years. the same number of tokens may represent implementation, research, writing, debugging, verification, or several hours spent following a bad assumption. put those numbers next to each other on a leaderboard and they would look comparable. they are not.

at best, the comparison would measure differences in how people use models. at worst, it would quietly turn those differences into claims about effort, competence, or productivity. eventually, people would adapt their workflows to whatever behavior made the number look better, and we would arrive exactly where goodhart's law warned us we would.

> inside my own history, however, the number can prompt useful questions.

when i consume far more tokens than usual but make little visible progress, something probably deserves attention. perhaps task was poorly defined, by me. or perhaps, i supplied the wrong context, chose the wrong approach, or allowed an agent to repeat the same failed approach.

when i consume fewer tokens and still move a large amount of work forward, that may mean the problem was familiar, the decisions were clear, or the workflow required less assistance than usual.

the number does not provide the diagnosis. it tells me where to look.

even this personal baseline is temporary. changing models, tools, domains, or agentic workflows can alter the meaning of the number. when the system changes significantly, the comparison has to begin again. so there is no universal unit here, no leaderboard, and no meaningful exchange rate between my tokens and anybody else's. there is only a private record of where i allocated computation and what appeared to come out of it.

this is what i mean by the _token economy of one_.

## the invisible ledger

language models did not necessarily move engineering work from typing to thinking. the difficult part was already elsewhere: understanding the system, finding the actual problem, choosing the right abstraction, rejecting plausible but incorrect explanations, and deciding whether the result was trustworthy enough to ship. writing the code was part of the work, but it was never a complete record of it. and i'm tired of saying this multiple times.

a small diff may be the result of hours spent tracing an unexpected behavior through several systems. a large implementation may follow almost mechanically once the right decisions have been made. the final artifact preserves the answer, but usually hides the path that led to it.

much of that path used to leave no common numerical trace. some of it happened in my head, some through documentation and experiments, and some in conversations with other engineers. even when the work produced logs, notes, or abandoned branches, those fragments did not add up to a meaningful picture of the day. language models did not create this work. they introduced an interface through which more of it now passes.

when i use a model to inspect an unfamiliar system, challenge an assumption, compare possible approaches, investigate a failure, or verify an implementation, each step leaves an entry in an otherwise _invisible ledger_. the token count does not contain the reasoning, but it records that the interaction happened. this is probably why the token usage follows my productive days more closely than focused time ever did. it is not measuring the work directly. it is recording a growing portion of the process through which i do the work.

the ledger is still incomplete.

a decision made while walking leaves no entry. neither does a useful conversation with another engineer, time spent reading without a model, or the judgment required to decide that something should not be built at all. some of the most valuable work may consume no tokens whatsoever. the number only sees the part of my work that passes through a language model.

in my current workflow, that part has become large enough for the trace to be useful. not complete, not objective, and certainly not universal. just useful.

## a number kept at arm's length

i do not begin the day with a token budget, and i do not end it by grading myself against one. the number only becomes interesting after the work is done, and only when read beside the day rather than in place of it.

what did i finish? what became clearer? where did i spend effort without reducing uncertainty? the token count means very little without the answers to those questions. an unusually high count with little progress may give me a reason to look back. perhaps the task was underspecified, the context was poor, or i allowed an agent to continue long after it had stopped discovering anything useful.

a low count with substantial progress is not a problem to correct. it is simply a good day.

that asymmetry matters. i may investigate unexpectedly high usage, but i have no reason to manufacture more of it when the work is already moving. there is no quota to reach and no ideal number to chase.

this is why i keep it at arm's length: close enough to notice patterns, but far enough that i never start working for it.

lines of code count the surface area of the artifact. focused time counts attention. token usage counts the model-mediated activity around the work. none of them is productivity. still, a signal does not need to be universal to be useful. it only needs to tell me something true often enough, within boundaries i understand.

that is the _token economy of one_:

no exchange rate, no leaderboard, and no target. just a private signal that remains useful precisely because it stays secondary.

if you have noticed something similar in your own workflow, i would love to hear about it. you can reach me at [hello@fatihguzel.dev](mailto:hello@fatihguzel.dev).
