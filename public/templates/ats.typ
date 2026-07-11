// ats.typ
#import "data.typ": *
#import "components.typ": *

#set document(
  title: "Muhammad Iqbal Firdaus ATS Resume",
  author: "Muhammad Iqbal Firdaus",
  keywords: ("Frontend Engineer", "Mobile Engineer", "React", "Next.js", "Astro", "Flutter", "TypeScript", "Technical SEO", "REST API", "BFF", "MQTT"),
)

#set page(
  paper: "a4",
  margin: (x: 0.62in, y: 0.55in),
)

#set text(
  font: ("Inter", "Arial", "Helvetica"),
  size: 9pt,
  fill: rgb("#111827"),
  lang: "en",
)

#set par(
  leading: 0.53em,
  justify: false,
)

#header(profile)

#section("Professional Summary")[
  #text(size: 8.9pt)[#summary]
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
    [#text(size: 9pt, weight: "bold")[#education.degree]],
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
    ..additional.map(item => text(size: 8.65pt)[#item])
  )
]
