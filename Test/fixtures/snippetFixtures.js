export const validSnippet = {
  title: "Responsive Navbar",
  description: "A responsive navbar built with HTML, CSS, and JavaScript.",
  language: "html",
  category: "navbar",
  publicity: "public",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmNkZDc0MjJkMTIwN2U3YjM1ZTY4YzAiLCJpYXQiOjE3MjQ3NjYyMjksImV4cCI6MTcyNTM3MTAyOX0.1BPTMM39_vvLxuqtzEg09Kdnr_iwdwDbHXD_ptEgyXQ",
};

export const invalidSnippetFixtures = [
  {
    name: "missing title",
    data: {
      description: "A responsive navbar built with HTML, CSS, and JavaScript.",
      language: "html",
      category: "navbar",
      publicity: "public",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmQ3ZWQ0Njc5OWE0OTlhMzAyM2I0NmMiLCJpYXQiOjE3MjU0MjcwMjQsImV4cCI6MTcyNjAzMTgyNH0.XDB6K0wl9uEJxyWt4-0YCBdaYu_TYqby0hVL6gqQazo",
    },
    expectedStatus: 400,
    expectedError: "Title is required.",
  },
  {
    name: "missing description",
    data: {
      title: "Responsive Navbar",
      language: "html",
      category: "navbar",
      publicity: "public",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmQ3ZWQ0Njc5OWE0OTlhMzAyM2I0NmMiLCJpYXQiOjE3MjU0MjcwMjQsImV4cCI6MTcyNjAzMTgyNH0.XDB6K0wl9uEJxyWt4-0YCBdaYu_TYqby0hVL6gqQazo",
    },
    expectedStatus: 400,
    expectedError: "Description is required.",
  },
  {
    name: "missing token",
    data: {
      title: "Responsive Navbar",
      description: "A responsive navbar built with HTML, CSS, and JavaScript.",
      language: "html",
      category: "navbar",
      publicity: "public",
    },
    expectedStatus: 401,
    expectedError: "Access denied, no token provided.",
  },
  // {
  //   name: "invalid token",
  //   data: {
  //     title: "Responsive Navbar",
  //     description: "A responsive navbar built with HTML, CSS, and JavaScript.",
  //     language: "html",
  //     category: "navbar",
  //     publicity: "public",
  //     token: "invalid.token.here",
  //   },
  //   expectedStatus: 400,
  //   expectedError: "Invalid token.",
  // },
  {
    name: "invalid language value",
    data: {
      title: "Responsive Navbar",
      description: "A responsive navbar built with HTML, CSS, and JavaScript.",
      language: "invalid-language",
      category: "navbar",
      publicity: "public",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmQ3ZWQ0Njc5OWE0OTlhMzAyM2I0NmMiLCJpYXQiOjE3MjU0MjcwMjQsImV4cCI6MTcyNjAzMTgyNH0.XDB6K0wl9uEJxyWt4-0YCBdaYu_TYqby0hVL6gqQazo",
    },
    expectedStatus: 400,
    expectedError: "Invalid language value.",
  },
  {
    name: "invalid publicity value",
    data: {
      title: "Responsive Navbar",
      description: "A responsive navbar built with HTML, CSS, and JavaScript.",
      language: "html",
      category: "navbar",
      publicity: "invalid-publicity",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmQ3ZWQ0Njc5OWE0OTlhMzAyM2I0NmMiLCJpYXQiOjE3MjU0MjcwMjQsImV4cCI6MTcyNjAzMTgyNH0.XDB6K0wl9uEJxyWt4-0YCBdaYu_TYqby0hVL6gqQazo",
    },
    expectedStatus: 400,
    expectedError: "Invalid publicity value.",
  },
];

export const positiveFilters = [
  {
    name: "filter by title",
    query: { title: "Button" },
    expectedCount: 12, // 3 snippets contain "Button" in their title
  },
  {
    name: "filter by minimum views of 100",
    query: { minViews: 100 },
    expectedCount: 10, // 10 snippets have views >= 100
  },
  {
    name: "filter by minimum likes of 2",
    query: { minLikes: 2 },
    expectedCount: 4, // 4 snippets have 2 or more likes
  },
  {
    name: "filter by category navbar",
    query: { category: "navbar" },
    expectedCount: 2, // 3 snippets are categorized under 'navbar'
  },
  {
    name: "filter by language react",
    query: { language: "react" },
    expectedCount: 4, // 5 snippets use the 'react' language
  },
];

export const negativeFilters = [
  {
    name: "invalid minViews type",
    query: { minViews: "abc" },
    expectedError: "Invalid type for minViews, expected a number.",
  },
  {
    name: "invalid minLikes type",
    query: { minLikes: "xyz" },
    expectedError: "Invalid type for minLikes, expected a number.",
  },
  {
    name: "nonexistent category",
    query: { category: "nonexistent" },
    expectedError:
      "Invalid category. Valid options are: menubar, navbar, button, card, sidebar.",
  },
];
