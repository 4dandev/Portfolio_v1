import { z } from "zod";
import { SourceSchema, validate } from "./types";

const Text = z.string().trim().min(1);
const ReflectionSchema = z.object({
  title: Text.optional(),
  experience: Text,
  concepts: Text,
  challenge: Text,
  takeaway: Text,
});
const AssignmentSchema = z.object({
  id: Text,
  label: Text,
  title: Text,
  topics: z.array(Text).min(1),
  parts: z.array(ReflectionSchema).min(1),
  _source: SourceSchema,
  _sourceRef: Text,
});

// New reflection prose requested by Adan on 2026-11-22. These records are
// grounded in the supplied completed work, not quotations from the originals.
// Keep this module out of retrieval/llms/MCP: the course page is unlisted.
// The original documents and screenshots are deliberately not site assets.
export const assignments = validate(z.array(AssignmentSchema).min(1), [
  {
    id: "homework-1",
    label: "Homework 1",
    title: "Networking foundations and everyday connections",
    topics: ["OSI & TCP/IP", "Encapsulation", "Connectivity tools"],
    parts: [{
      experience: "I connected the OSI and TCP/IP models to my own network by tracing how a request travels from my laptop through the gateway to a website. I also inspected a browser request and used Windows networking tools to examine connectivity and device configuration.",
      concepts: "I practiced identifying protocol layers, distinguishing IP and MAC addresses, explaining encapsulation, and interpreting ping, traceroute, and Wireshark’s three panes.",
      challenge: "I had to separate what each tool could actually prove. A successful loopback ping, for example, checks the local TCP/IP stack without proving that the Internet connection works.",
      takeaway: "I learned to troubleshoot in stages and connect a command’s output to a specific part of the network.",
    }],
    _source: "owner",
    _sourceRef: "CNT3004_Homework1.docx, supplied 2026-11-22",
  },
  {
    id: "homework-2",
    label: "Homework 2",
    title: "Network addressing, protocols, and routing",
    topics: ["Addressing & ARP", "TCP & UDP", "DNS"],
    parts: [{
      experience: "I examined my computer’s addressing, ARP table, and default route, then used Wireshark to follow HTTP, TCP, UDP, and DNS exchanges.",
      concepts: "I practiced matching requests with responses, identifying service and temporary client ports, following the TCP three-way handshake, and explaining DNS records and caching.",
      challenge: "I had to keep packets from the same connection together and distinguish a name-resolution failure from a conclusion about IPv6 connectivity. Looking at the right ports and packet fields mattered more than relying on a summary alone.",
      takeaway: "I learned how addressing, routing, and application protocols work together to deliver a request, and how packet evidence can help narrow down a problem.",
    }],
    _source: "owner",
    _sourceRef: "Homework 2 Network Addressing, Protocols & Routing.docx, supplied 2026-11-22",
  },
  {
    id: "homework-3",
    label: "Homework 3",
    title: "Network media and wireless performance",
    topics: ["Network media", "Throughput", "802.11 frames"],
    parts: [{
      experience: "I compared copper, fiber, and wireless networking, then analyzed a partial Ubuntu download and a supplied wireless capture. Measuring a real transfer helped me connect link specifications with observed performance.",
      concepts: "I practiced calculating throughput and utilization, distinguishing bandwidth from throughput, and identifying wireless management, control, and data frames.",
      challenge: "I had to distinguish downloaded file bytes from captured traffic, which also includes overhead and retransmissions. I also accounted for frames that the supplied capture did not classify normally.",
      takeaway: "I learned that a link’s advertised rate does not describe the application’s actual experience. Useful measurements need clear units, a defined scope, and an explanation of what was counted.",
    }],
    _source: "owner",
    _sourceRef: "Homework 3 (1).pdf, supplied 2026-11-22",
  },
  {
    id: "homework-4",
    label: "Homework 4",
    title: "Virtualization, subnetting, and HTTP behavior",
    topics: ["VirtualBox", "Subnets & VLANs", "HTTP analysis"],
    parts: [{
      experience: "I installed Ubuntu in VirtualBox, worked through subnetting and VLAN scenarios, and analyzed HTTP exchanges using the supplied sample traces after the live browser attempt used HTTPS.",
      concepts: "I practiced calculating network and host ranges, comparing VM networking modes, explaining inter-VLAN routing, and interpreting HTTP caching, authentication, and TCP reassembly.",
      challenge: "I had to distinguish the segment containing the start of an HTTP response from the packet where Wireshark displayed the reassembled message. The HTTPS attempt also made the limits of readable packet captures clear.",
      takeaway: "I learned to connect network configuration with application behavior and to document the source and limitations of the evidence I used.",
    }],
    _source: "owner",
    _sourceRef: "Homework 4 Completed Answer Packet.docx, supplied 2026-11-22",
  },
  {
    id: "homework-5-and-6",
    label: "Homework 5 & 6",
    title: "Security, administration, and TCP recovery",
    topics: ["Security controls", "Network administration", "TCP recovery"],
    // The source is a combined packet; it does not assign each part to an
    // individual homework number. Preserve that boundary rather than invent it.
    parts: [
      {
        title: "Part 1 · Network security and administration",
        experience: "I explored Windows administrative tools and evaluated scenarios involving phishing, permissions, firmware, firewalls, switch security, and WAN connectivity. I also researched security certifications and risk-management tools.",
        concepts: "I practiced relating threats to appropriate controls, explaining least privilege and network segmentation, and comparing redundancy, STP, MPLS, and site-to-site VPNs.",
        challenge: "I had to separate a recorded warning from evidence of an intrusion and distinguish network separation from encryption. A tool or technology’s name alone did not establish what protection it provided.",
        takeaway: "I learned to evaluate security controls by the risk they address and to interpret system information in context before drawing a conclusion.",
      },
      {
        title: "Part 2 · TCP fault recovery",
        experience: "I captured a VLC download, isolated its TCP connection, and compared its recovery behavior with a supplied lossy-network capture.",
        concepts: "I practiced using conversation statistics and filters, interpreting duplicate acknowledgments and retransmissions, and calculating rates for a whole capture and an individual stream.",
        challenge: "I had to keep the measurement scope consistent and avoid adding fast retransmissions to a general retransmission count that already included them. I also distinguished Wireshark’s analysis classifications from a direct measurement of physical packet loss.",
        takeaway: "I learned how TCP can recover an ordered byte stream while adding delay and traffic. Reliable analysis depends on understanding both the protocol and the counting method.",
      },
    ],
    _source: "owner",
    _sourceRef: "Adan_Rojas_Homework_5_and_6.docx, supplied 2026-11-22",
  },
], "cnt-3004.ts");

// General synthesis for owner review: no quiz prompts, scores, discussion posts,
// or peer feedback were supplied. Do not invent specific participation events.
export const courseReflection = validate(Text,
  "The main connection I take from the course’s quizzes and discussions is that networking concepts work together. Addressing and routing explain where traffic goes; transport protocols explain delivery; and security controls shape which communication is allowed. The topics I would emphasize are the difference between bandwidth and throughput, TCP and UDP behavior, and the relationship between segmentation and access control. Across these ideas, I learned to explain why a result occurs and what evidence supports it. That approach gives me a stronger foundation for troubleshooting and for thinking about network security.",
  "cnt-3004.ts: course reflection",
);
