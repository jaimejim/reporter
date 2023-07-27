# IETF 117 - Agenda for Constrained RESTful Environments (CoRE) WG

Chairs (core-chairs@ietf.org):

* Marco Tiloca (marco dot tiloca at ri dot se)
* Jaime Jiménez (jaime at iki dot fi)
* Carsten Bormann (cabo at tzi dot org)

Please note:

Date and time: Tuesday, 2023-07-25, 16:30-18:30 UTC

Meeting material: https://datatracker.ietf.org/meeting/117/session/core

Notes: https://notes.ietf.org/notes-ietf-117-core

Meetecho video stream: https://meetings.conf.meetecho.com/ietf117/?session=30622

Meetecho for onsite participants: https://meetings.conf.meetecho.com/onsite117/?session=30622

Audio stream: https://mp3.conf.meetecho.com/ietf117/30622.m3u

Zulip: https://zulip.ietf.org/#narrow/stream/21-core

---

# Tuesday, July 25, 2023

16:30-18:30 UTC

Minute takers: Christian Amsüss, Rikard Höglund, Jaime Jiménez (helping)

Numbers in parentheses are minutes of time allocated.

## Intro, agenda, status (Chairs) (15)

MT doing introductions.
MT (p7+):
* core-target-attr in last call.
* core-oscore-groupcomm-19 in post-WGLC processing (shepherd review addressed)
* oscore-edhoc waiting for shepherd review
* -sid (moved back to WG anticipating WGLC), -comi (new WG last call) and yang-library (waiting for shepherd write-up) 
* groupcomm-bis waiting for some expected comments
* conditional-attributes-06 complated WGLC; some more changes expected based on comments.

CB: There was activity from IESG looking at IPR issue: It was split, and the IPR stuck with one side, but in the data tracker it's on the other side.
MT: Thanks

* core-href-13 completed WG last call; waiting for chair go-ahead. TF and MT provided input, CA will still send comments.

MT: Can you confirm you'll give comments Christian?
CA: Yes

* Other documents:
* key-limits-01: not in the agenda, new version was submitted
* core-coap-pm-00: recently adopted
* core-groupcom-proxy-08: pending WG adoption
MT (p12):
* Recently updated individual submissions:
* oscore-capable-proxies
* cacheable-oscore-07
* coap-over-gatt-04
* core-corr-clar-01

MT (p13):
Informal side meeting will take place on Friday 09:30 (San Francisco time) in Golden Gate 4 + Meetecho. Main topics are non-traditonal responses, corr-clar, and locally significant URIs.

MT (p14): Interims will resume 2023-08-30 in the same cadence as the last years.

## YANG Schema Item iDentifier (YANG SID) and COMI (Carsten Bormann) (15)

* https://datatracker.ietf.org/doc/draft-ietf-core-sid/
* https://datatracker.ietf.org/doc/draft-ietf-core-comi/

Presented slides: https://datatracker.ietf.org/meeting/117/materials/slides-117-core-href-coreconf-00.pdf

CB (p3): Set of documents; one RFC, core-sid came back from IESG. Remaining task is to extract identifiers from YANG document based on enhanced understanding of YANG.
CB (p4): -sid: We'll have to make sure all data node identifiers that the document contians are listed. LT is around and has experience with PYANG; hoped to do that together, but didn't happen during hackathon. EV predicted that Francesca probably will be back before this gets done. LT, hope you can help me this week.
LT: thumbs-up.
CB: -comi: Received YANG fixes. Most focus will be on YANG issues (because we could address the constrained-related ones). The document was missing an RPC example -- YANG has RPC (object independent) and action (linked to object, like method) -- An RPC example has now been added (initially thought it needs identifiers, eventually turned out to be redundant).
CB: RESTconf does send these redundant identifiers (nested in the RPC action), COMI now says "don't send them", so COMI work can proceed w/o the identifiers.
CB: We got unexpected IANA early review: Registering a module through IANA means not only a ... but also a ... (urn?).
CB: Next step for core-side, add further lines regarding the identifiers and then ready for WGLC

No questions.

## Constrained Resource Identifiers (Carsten Bormann) (15)

* https://datatracker.ietf.org/doc/draft-ietf-core-href/

Presented slides: https://datatracker.ietf.org/meeting/117/materials/slides-117-core-href-coreconf-00.pdf

CB (p1): Reminder: "href" is the old document name from before "CRI" name was decided on.
CB (p1): Build on CoAP where we send URI in parsed form (raw information). This is for sending parsed URIs in applications.
CB: Tried extracting a data model of URIs, which is an interesting undertaking. As with URIs, we have CRIs like URIs and CRI references like URI references.
CB: Numerical identifiers for URI-schemas are now under control. Decided to add numbers for all of them (full coverage). WG last call finished yesterday.
CB (p2): Processing review from MT. Marco had comments on CRI vs. CRI references, editorial nits, and empty path representation in CRIs.
CB (p2): Empty path is focus now. Draft has some text how a CRI refernce in transfer form gets ingested, but no such section for CRIs. CRIs benefit from leaving out parts of defined structure when null. Shall we stick with natural representation, or translate this into null? So far discussions has shown preferences for null, but needs to be settled.

LT: Interesting issue, have same with SCHC -- signing a rule needs difference between empty array or null.
CB: Okay, point us to the document please?
LT: No document yet.
CB: No document, but?
LT: Sometimes tables are empty, we'll align on your choice.
CA: No strong opinion, normalized CoAP URI would have slash at end regardless (CoAP doesn't make that difference), in CRIs that are normalized, the elision wouldn't happen on a normalized URI.
MT: Preference for NULL in interest of elision.
CB: Christian is not against but says there are limited benefits. We can still save the byte by sending the URIs in non-normalized form. I'll take this as a definite "maybe"; being in the shave-bytes camp, I'll implement this by (not) sending null, and will look at how to process that editorially.

CB: Plan is to submit -14 after the Marco's review comments have been addressed. Late review comments will be taken into account too.

## DNS over CoAP (DoC) (Martine Lenders) (15)

* https://datatracker.ietf.org/doc/draft-ietf-core-dns-over-coap/

Presented slides: https://datatracker.ietf.org/meeting/117/materials/slides-117-core-dns-over-coap-doc-01.pdf

ML presenting.

ML (p2): Want encrypted name resolution for IoT. Using DNS over CoAP. Sharing system resources with CoAP, and benefiting from its fragmentation mechanism and others.
ML (p3): Evaluation has been done and will be published soon. Most interesting is that using OSCORE a lot of memory can be saved, especially in the ROM. Will be published in ACM CoNEXT (preprint on Arxiv).
ML (p4): Related to DNS CBOR: This provides content format for the application/dns-message (and dns-cbor provides a CBOR based format, see presentation in CBOR yesterday). application/dns-message is fallback for when application doesn't know the CBOR format, or CBOR format is larger.
ML (p5): Since IETF 116 recommendations for root path "/" has been added, TTL rewriting has been explained (caching advantage), and and implementation status section has been added. 
* Clarified there is no DoC-DoH proxying (can still be combined, but at DNS level)
* Updated requested content-format number
* Added recommendation to NOT use unencrypted
ML (p6): Discussion ongoing around SVCB records. See Github issue [#22](https://github.com/core-wg/draft-dns-over-coap/issues/22) for one point regarding this.
ML (p7): Waiting to conclude SVCB discussion. And taking any other feedback.

BS: Thanks for processing the feedback carefully. Noticed discussion of application/dns-cbor -- never heard of it; surprised, b/c it was not on DNSOP. There has been history of alternative representations, should happen in DNSOP, especially when the representations subset the format.
ML: As shown in the slide, this is not mean to replace the wire-format, but a concise alternative. Wire-format can still be used.
BS: That'll be very interesting on DNSOP. Bring it there, get feedback early.
ML: I made an implementation during the Hackathon and realized the draft omits a lot of works. Will keep DNSOP in the loop.

BS: As for SVCB interaction, happy to help providing more assistance (but lack context of normal CoAP use)
ML: OK

CB: From getting-it-done PoV, it's good thing to first do DNS-in-CBOR in CBOR (first find out what we get -- avoid additional programming by using CBOR and -packed). Need to complete that, then go into DNSOP.
BS: This isn't DNSOP or CBOR ... but esp. concerning compactness, DNS is usually the big wedge in the pie chart. Shaving bytes is not likely to save >1% of total bytes.
ML: DNS is involved alot in bootstrapping so for low-power networks, with long latencies, true it's a small part of the pie chart but significant for the communication part. Especially when there is much sleep.
BS: If there is an example system deployment or a measurement of an overall system, DNSOP would love to see that.
ML: It's not a big part of the pie chart, but can have significant impact
BS: Are you saying due to the syncrhonization effect?
ML: Consider a sleeping node on a LoRA network that needs to boostrap every time it wakes up. Need long wait for name resolution if it exceeds the frame size.
BS: So it's about wake time?
CB: Latency
BS: So fragmentation introduces significant effects?
CB: The CoRE WG has worked a lot to be able to run our systems without DNS. But it's still meaningful to enable applications that use DNS. So this is an obvious thing to do. Constrained systems have very different requirements to large DNS-servers that may be discussed in DNSOP.
BS: That's interesting set of use cases, would be great to bridge that gap and help DNS community understand the category of use cases.

CB: Regarding the recommendation about using an empty path. Is this recommendation done in a BCP190 compatible way? Good to verify this.
ML: It's just a recommendation. 
CB: What is the strength of this recommendation?
ML: In DoH it has ossified.
BS: About 80% of deployed servers have chosen a path mentioned in an example from the RFC. A temptation exists to start pinning that path, but we have avoided that so far.
ML: .... we could remove it again
CA: We'll have another look at the wording. The approach can be having value as examples as we did in RD (just there *is* a reason to use a particular path), and mention that using these values can be a good idea.
CB: We can put one example that uses a different path. We should have language making it clear that it's the server's decision.

## Attacks on the Constrained Application Protocol (CoAP) 

(Christian Amsüss) (10)

* https://datatracker.ietf.org/doc/draft-ietf-core-attacks-on-coap/

Presented slides: https://datatracker.ietf.org/meeting/117/materials/slides-117-core-attacks-on-coap-01.pdf

CA (p2): Going over document history. Used to have coap-actuators and XXX. 
(p3) Was decided to split into 2 documents: Attacks and solutions. The solutions becaome 9175.
(p4) Even when CoAP is used with state of the art security methods, and assuming non-broken encryption, various pitfalls still exist. 
(p5-6) "Request Fragment Rearrangement"-attack. Still relevant and needs to be solved. Going over details of the attack. In a specific scenario, even when currently mandate behaviour is followed, this attack is still possible.
(p7) One solution is to mandate use of Request-Tag in even more situations.
(p8) The impact on OSCORE is negigable, but for DTLS basically every request would need a Request-Tag
(p9) Another solution is allowing servers to declare Request-Tag for client use
(p10) Third option is to add constraints on Tighten restrictions on....
(p11) Plan is to take current examples and turn them into minimal examples covering the problem area. Then the proposed solution can be checked aginst the examples. No need to rush this through without a solution, so need to settle this before proceeding.

CB: We're transitioning away from GATT, ... towards FETCH that has a request payload. CBOR can be used to frame the data, but will probably be smaller than the URI parameters would have been. If we trigger
CA: If block-wise had been done differently things would have been easier. Eventually that would be shorter than the work-arounds we're adding.
CB: Can we fix this in block-wise?
CA: Maybe, we can change behaviour of block1 and block2. But it's a breaking change on Options already around and in-use.

CB: Assume we do an elective option that client uses for new of block2. One byte. Server can ACK in one byte. Would this be breaking change?
CA: No, but would be using up one of the cheap option .....?
CB: We may want to try to decide a fix, in additon to the work-around, and see what solution is best.
CA: We've never done extensive interops on RFC7959. Not clear how much we'd actually break. I got it wrong, and nobody spotted the mistake doing 9175, so maybe we wouldn't even break too much
CB: Problem is that 7959 was before we did FETCH. The kind of applications changed.
CA: Combining block1 and block2 back then were SOAP style requests requests. They ended up beaing treated as 2nd class.

MT: This would update 9175, but why also 9177?
CA: It's a maybe. Need to check the precise statements.

## Key Update for OSCORE (KUDOS) (Rikard Höglund) (15)

* https://datatracker.ietf.org/doc/draft-ietf-core-oscore-key-update/

Presented slides: https://datatracker.ietf.org/meeting/117/materials/slides-117-core-draft-ietf-core-oscore-key-update-05-00.pdf

RH presenting.

RH(p2): Original parts, of which (2) has been moved out. (1) is losely inspired by OSCORE B.2. (2) is based on CFRG results. (3) allows peers to get new IDs.

RH (p3): KUDOS procedure overview. Nonces are exchanged.
RH (p4): Updates since IETF116.
RH (p5): More updates: SCHC affects necessity of rekeying (smaller parital IV space requires more frequent rekeying), more detailed explanation of ID update.

RH (p6): Recipient-ID could be used for other purposes, so not limiting length in option definition. Practical limit is OSCORE dependent anyway.
RH (p7): Split out ID update? Benefit is that document would be focused.

CA: ID updates, when done consecutively, needs to keep the list of past IDs -- until KUDOS is done. So there is some link, and in practice, ID update will depend on KUDOS.
RH: That link exists. There are other ways, like EDHOC would also give fresh master secrets for later ID updates.

MT: more opinions on the split?
GS: Split makes sense. It's confined functionality. You need to keep track of identifiers in either case. That doesn't mean they can't be split.
RH: If we do split we'll mention that you need to keep the list until you do an action that does something like KUDOS.
MT: Opinions from cochairs?
CB: Haven't made up mind. Important to find homes, but splitting is usually something I like to do when the people are different. So, not sure (doesn't hurt either). Again, not made up mind.
JJ: Didn't follow this draft, no recommendations, taking action to do that.

RH (p8): x-byte. It's a place for size of nonce, and flags.

CA: I'm currently in charge of OSCORE option bits: Not much benefit in extending here as well. Leave them at reserved, and if it turns out we need those precisely, a later document can just UPDATES this one.
CB: Are they must-be-zero or ignored?
RH: Will check.

RH (p9): Target a specific resource?
GS: See mail. Depends on direction (forward or reverse).
CA (on chat): Will follow up there, would exceed time available here.

RH (p10): Notification number changes.

RH (p11): Processing openissues.

## OSCORE-capable Proxies (Rikard Höglund) (15)

* https://datatracker.ietf.org/doc/draft-tiloca-core-oscore-capable-proxies/

Presented slides: https://datatracker.ietf.org/meeting/117/materials/slides-117-core-draft-tiloca-core-oscore-capable-proxies-07-00.pdf

RH presenting

RH (p2-3): What and Why.
RH (p4): Use cases.
RH (p5): Stable mechanism, no need for extra signaling. Enables authorization at the proxy.
RH (p6): Can go through this twice (eg. as a server behind a reverse proxy)

RH (p7): Recent updates.
RH (p8): More updates. Point out that EDHOC can be run through secured proxy connections.

RH (p9-11): More updates.
RH (p12): Summary. Stable, and encrypts as much as possible. WGA?

Matt Gilmore: Chairing ?. You mentioned use case in 2.4 LwM2M as proxy towards external end devices.
RH (p4): Got this as feedback from there, am not LwM2M expert.
MT: Input came from David Navarro. When using CoAP, LwM2M is a CoAP reverse proxy.
RH: Thanks, will try to make it more understandable.

CB (chair hat off): Think this is necessary work that fills gap. In favor of adopting.
CB (via chat, on p6): We tend to model different layers separately; adding the nesting ("recursion") to the model of one layer can be confusing

GS: On LwM2M scenario, there was requirements phase in device management services enablement group, where application server talks to LwM2M management server talking to an LwM2M client. Question was, how do we enable E2E security application-server-to-client. AFAIR, that created that use case.
RH: Can revisit with DN.
Matt Gilmore: The whole point is E2E with OSCORE. When LwM2M is reverse gateway, what does that mean?
RH: Will come back.

CA (chat): Supporting adoption.

MT: It's on CB and JJ to think of follow-up.
CB: To get sense of room for adoption call. Who read it?
(4 showing in chat)
CB: Objections to WGA?
(none)
CB: Polling for WGA: 6 raise-hand, 0 not-raise.

## CoAP over GATT (Christian Amsüss) (10)

* https://datatracker.ietf.org/doc/draft-amsuess-core-coap-over-gatt/

Presented slides: https://datatracker.ietf.org/meeting/117/materials/slides-117-core-coap-over-gatt-01

(There are some audio problems from CA to meetecho.)

CA (p2): One issue to address was discovery. 
CA (p3): Mail update is separating characteristics for inbound and outbound traffic. The semantics of the service data field in advertisement field has been defined.
CA (p4): Why use .arpa? Already have 2 natural identifiers: BLE MACs and self-described names. Using a DNS-style authority component would be ... I'd rule out.
CA (p5): Further exploration
CA (p6): Adoption was raised previously. I'd like to bring that up in a future meeting. Will continue on the URI-schema question (main open point).

CB: This was the reason I put this on the agenda for Friday's side meeting. We have other options available also.
CA: If we go the custom-route (which seems best), we can take that all the way and fully customize

MG: Is this not a layer violation? Using a MAC address as part of an URN or URL?
CA: That has been defined and is in use AFAIK. As far as URLs it makes sense in some situations. I'd treat it as using an IP-address as part of a URL.
CA: CoAP-over-GATT is not IP-based, but intended for devices cannot do proper IP-communication, but rather uses BLE. Similar to CoAP over WebSocket, there the constraint comes from the environment (web browser). Only MAC-address is usable in this context.
CA: When using BLE: I recommend using IP over BLE. But this can require having a full IP-stack in the browser (JavaScript), or having a different transport for CoAP.

CB (in chat): We can pick up this subject (locally valid URIs) on Friday as well. (During the side-meeting).

MT: Reminder: A side-meeting is planned for Friday. Check the chair slides and side-meeting wiki for details.

## Flextime (0)

Σ 120

---

*[MT]: Marco Tiloca
*[JJ]: Jaime Jiménez
*[FP]: Francesca Palombini
*[JPM]: John Preuß Mattsson
*[CB]: Carsten Bormann
*[CA]: Christian Amsüss
*[KH]: Klaus Hartke
*[RH]: Rikard Höglund
*[TF]: Thomas Fossati
*[MG]: Matthew Gillmore
*[DN]: David Navarro
*[GS]: Göran Selander
*[BS]: Bilhanan Silverajan
*[AS]: Alan Soloway
*[MCR]: Michael Richardson
*[AK]: Ari Keränen
*[MJK]: Michael Koster
*[NW]: Niklas Widell
*[ED]: Esko Dijk
*[HB]: Henk Birkholz
*[ST]: Sean Turner (here)
*[ML]: Martine Lenders
*[MW]: Matthias Wählisch
*[KZ]: Koen Zandberg
*[GF]: Giuseppe Fioccola
*[MN]: Massimo Nilo
*[LT]: Laurent Toutain
*[AB]: Andy Bierman
*[JT]: Jernej Tuljak
*[KZ]: Koen Zandberg
*[RML]: Rafael Marin-Lopez
*[AF]: Alex Fernandez
*[MK]: Matthias Kovatsch
*[RW]: Rob Wilton
*[IP]: Ivaylo Petrov
