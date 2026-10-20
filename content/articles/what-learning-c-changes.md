---
title: 'what learning c changes'
slug: 'what-learning-c-changes'
publishedAt: '2026-10-20'
description: 'learning c changes what you notice in the software you use and write.'
language: 'en'
tags: ['c', 'computer science', 'systems']
draft: false
---

i recently came across a discussion about why universities still teach c. i kept thinking about it afterwards, because i don't use c for work and still think it was worth learning.

my interest in it goes back to my computer science education. these days i spend time with it occasionally, usually while reading about programming languages or compilers. i start with a question about c and find myself thinking about how data ends up in a file, what a compiler did to a program, or why another language has a rule that seems rather particular.

## the extra three bytes

if i'm saving a few counts for another program to read later, we need to agree on a file format. ours uses a one-byte tag followed by a four-byte count for each record. `A`, `42` is one record.

in my program, i put the two values in a small struct:

```c
struct record {
    char kind;
    int count;
};
```

i checked this on an arm64 mac with clang:

```text
kind:       1 byte
count:      4 bytes
record:     8 bytes
```

on this target, an `int` has four-byte alignment, so `count` starts at byte four rather than immediately after `kind`. the three bytes in between are _padding_. we can read the fields, change them, print them out, and never have much reason to think about the gap.

for our `A`, `42` record, the two arrangements look like this:

```text
reader expects: [ A: 1 byte ][ 42: 4 bytes ]
our struct:     [ A: 1 byte ][ padding: 3 bytes ][ 42: 4 bytes ]
```

if i write all eight bytes straight to the file, the other program reads `A` correctly. then it takes the next four bytes as the count: three bytes of padding and one byte of `count`. **all the values in the program can be right while the bytes we write are wrong for the format.**

i need to write the tag and the count in the format we agreed on. the other program has never seen my struct.

## still the same program

the compiler is following the target's layout conventions here. c allows space between these fields, but it doesn't say that an `int` must have four-byte alignment on every machine. knowing the declaration alone wouldn't have told us where those three bytes came from.

we can look at the declaration in a c class and study alignment in computer architecture, but i want to be able to explain these eight bytes without treating that as a change of subject. otherwise, it is quite possible to know the answer to both exam questions and still get the file wrong.

and we can keep playing with this without much setup. i can change the declaration, look at the layout again, and try to work out which choices belong to this target and which things [the language actually guarantees](https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf).

in another small program, i might go looking for an addition in the generated assembly and find there isn't one. for a signed `int x`, the compiler can turn [`x + 1 > x` into `true`](https://blog.llvm.org/2011/05/what-every-c-programmer-should-know.html). there doesn't have to be an addition or a comparison in the generated code.

the case that seems to spoil this is when `x` is already the largest value an `int` can hold. i might picture a machine instruction adding one and wrapping around. but c leaves signed integer overflow undefined, so that case gives the compiler no result it has to preserve. for the cases where the expression has defined behavior, the answer is true.

## keeping the result

if i'm using a library to read a directory, i want to collect the names and use them afterwards. the documentation for [`readdir`](https://man7.org/linux/man-pages/man3/readdir.3.html), the function used to read directory entries, has this warning:

> The data returned by readdir() may be overwritten by subsequent calls to readdir() for the same directory stream.

if i save the pointer to an entry and then ask for the next one, i still have the pointer i saved. except the library may have put the next entry in the very same place, so when i go back to read what i thought was my first entry, i may be looking at the second one instead.

if i want the first entry to survive the next call, i'll need to copy what i need from it before asking for another one. i could collect copies of the names and work through them later. or i could do what i need with each entry before moving on to the next, without keeping it around.

with an ordinary shared reference in rust, the [borrowing rules](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html) can make us settle this sort of thing before the program runs. imagine an api that lends us a reference into its buffer. if we're going to read through that reference again, the compiler can stop us from asking the api to change the buffer in the meantime.

when another library says it returns a view of some data, i want to know what else can change that data while i'm using it. do i need to keep a copy, or will i be finished with it before anything can change it?

## what i took from it

i like it when a tool i've been using for years starts to look like something i could understand. i open the documentation to look up one detail and end up wanting to read the source.

i'd happily spend time learning c again.
