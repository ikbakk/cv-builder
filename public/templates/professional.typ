// professional.typ
// Optional second template. Same data, slightly stronger visual hierarchy.
// Compile with: typst compile professional.typ resume.pdf

#import "data.typ": *
#import "components.typ": *

#set document(
  title: "Resume",
  author: "",
  keywords: (),
)

#set page(
  paper: "a4",
  margin: (x: 0.68in, y: 0.62in),
)

#set text(
  font: ("Inter", "Arial", "Helvetica"),
  size: 9.2pt,
  fill: rgb("#111827"),
  lang: "en",
)

#set par(
  leading: 0.58em,
  justify: false,
)

#align(center)[
  #text(size: 22pt, weight: "bold", fill: rgb("#0F172A"))[#profile.name] \
  #v(1pt)
  #text(size: 11pt, weight: "medium", fill: rgb("#334155"))[#profile.headline] \
  #v(6pt)
  #text(size: 8.8pt)[
    #profile.location | #link("mailto:" + profile.email)[#profile.email] | #profile.phone \
    #link(profile.portfolio)[Portfolio] | #link(profile.github)[GitHub] | #link(profile.linkedin)[LinkedIn]
  ]
]

#v(8pt)
#rule()

#section("Professional Summary")[
  #text(size: 9pt)[#summary]
]

#section("Professional Experience")[
  #for exp in experiences [
    #role(exp)
  ]
]

#section("Technical Skills")[
  #skills-block(skills)
]

#section("Education")[
  #grid(
    columns: (1fr, auto),
    column-gutter: 8pt,
    [#text(size: 9.2pt, weight: "bold")[#education.degree]],
    [#text(size: 8.8pt)[#education.period]],
  )
  #text(size: 8.8pt)[#education.institution, #education.location]
]

#section("Additional Information")[
  #list(
    marker: [•],
    indent: 10pt,
    body-indent: 4pt,
    spacing: 2pt,
    ..additional.map(item => text(size: 8.7pt)[#item])
  )
]
