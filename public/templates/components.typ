// components.typ
#import "data.typ": *

#let rule() = {
  v(3pt)
  line(length: 100%, stroke: 0.45pt + rgb("#C9CDD3"))
  v(5pt)
}

#let section(title, body) = {
  v(8pt)
  text(size: 9.5pt, weight: "bold", tracking: 0.7pt, upper(title))
  rule()
  body
}

#let contact-link(label, url) = {
  link(url)[#label]
}

#let header(profile) = {
  align(center)[
    #text(size: 20pt, weight: "bold")[#profile.name] \
    #v(1pt)
    #text(size: 10.5pt, weight: "medium")[#profile.headline] \
    #v(5pt)
    #text(size: 8.6pt)[
      #profile.location | #link("mailto:" + profile.email)[#profile.email] | #profile.phone \
      Portfolio: #link(profile.portfolio)[#profile.portfolio] | GitHub: #link(profile.github)[#profile.github] | LinkedIn: #link(profile.linkedin)[#profile.linkedin]
    ]
  ]
  v(8pt)
}

#let role(exp) = {
  v(2pt)
  grid(
    columns: (1fr, auto),
    column-gutter: 8pt,
    [#text(size: 10pt, weight: "bold")[#exp.title]],
    [#text(size: 9pt)[#exp.period]],
  )
  text(size: 9pt, style: "italic")[#exp.company]
  linebreak()
  text(size: 8.5pt)[#strong("Tech Stack: ")#exp.tech]
  linebreak()
  v(2pt)
  text(size: 8.9pt)[#exp.intro]
  v(2pt)
  list(
    marker: [•],
    indent: 10pt,
    body-indent: 4pt,
    spacing: 2pt,
    ..exp.bullets.map(b => text(size: 8.65pt)[#b])
  )
  v(3pt)
}

#let skills-block(skills) = {
  for pair in skills {
    grid(
      columns: (82pt, 1fr),
      column-gutter: 8pt,
      [#text(size: 8.7pt, weight: "bold")[#pair.at(0)]],
      [#text(size: 8.7pt)[#pair.at(1)]],
    )
    v(2pt)
  }
}
