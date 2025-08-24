import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, ChevronRight, Moon, Sun, Send, Download, Copy, Check, ExternalLink, ListFilter, FileText, BarChart3, Filter, Table, Table2, Layers, Sigma, Hash, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// ==========================
// Data: eBook Chapters
// ==========================

const chapters = [
  {
    id: "intro",
    title: "Introduction to Excel",
    icon: <BookOpen className="w-5 h-5" />,
    sections: [
      {
        heading: "Why this eBook?",
        body: (
          <>
            <p className="mb-3">
              Welcome to <strong>Mastering Excel: From Basics to Advanced Data Analysis</strong>. This live eBook is built as an interactive website so it’s <em>searchable</em>, <em>updatable</em>, and includes a <strong>feedback form</strong> for requesting new topics. Whether you’re entering your first row of data or building executive dashboards, this guide walks you through practical, reproducible steps.
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Clear, task‑driven explanations</li>
              <li>Copy‑paste‑ready formulas</li>
              <li>Best practices and pitfalls to avoid</li>
              <li>Mini projects that tie everything together</li>
            </ul>
          </>
        ),
      },
      {
        heading: "How to use this site",
        body: (
          <>
            <p className="mb-3">
              Use the <strong>sidebar</strong> to jump between chapters, the <strong>search</strong> box to find topics or formulas, and the <strong>Request Updates</strong> tab to submit questions or feature requests. Your feedback is stored locally and can be exported as CSV by an admin (you!).
            </p>
            <ol className="list-decimal ml-6 space-y-1">
              <li>Skim the basics to align on terminology and layout</li>
              <li>Work through formulas and functions with examples</li>
              <li>Practice with sorting, filtering, and formatting</li>
              <li>Level up with charts, PivotTables, and XLOOKUP</li>
            </ol>
          </>
        ),
      },
    ],
  },
  {
    id: "data-entry",
    title: "Data Entry & Management",
    icon: <Table2 className="w-5 h-5" />,
    sections: [
      {
        heading: "Entering and editing data",
        body: (
          <>
            <p className="mb-3">
              Click a cell and type. Press <kbd>Enter</kbd> to move down, <kbd>Tab</kbd> to move right. Double‑click the cell edge to <strong>AutoFit</strong> width. Use <strong>Ctrl+Z</strong> to undo, <strong>Ctrl+Y</strong> to redo.
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li><strong>AutoFill:</strong> Type <code>Jan</code>, drag the fill handle to extend months.</li>
              <li><strong>Flash Fill:</strong> Start typing a pattern (e.g., split <code>First Last</code>), then press <kbd>Ctrl+E</kbd>.</li>
              <li><strong>Paste Special:</strong> <kbd>Ctrl+Alt+V</kbd> to paste values, formats, or transpose.</li>
            </ul>
          </>
        ),
      },
      {
        heading: "Data validation (clean input)",
        body: (
          <>
            <p className="mb-3">
              Keep data consistent with <strong>Data → Data Validation</strong>.
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li><em>List:</em> Provide allowed values like <code>North,South,East,West</code>.</li>
              <li><em>Whole/Decimal:</em> Restrict number ranges (e.g., 0–100).</li>
              <li><em>Date/Time:</em> Constrain to valid periods.</li>
              <li><em>Custom:</em> Use formulas (e.g., <code>=LEN(A2)=5</code> to force 5 chars).</li>
            </ul>
            <p className="mt-3">
              Tip: Add an <strong>Input Message</strong> to instruct users and an <strong>Error Alert</strong> for violations.
            </p>
          </>
        ),
      },
      {
        heading: "Working with large datasets",
        body: (
          <>
            <ul className="list-disc ml-6 space-y-1">
              <li><strong>Freeze Panes:</strong> View → Freeze Top Row or First Column for headers.</li>
              <li><strong>Tables:</strong> Insert → Table to enable structured references, banded rows, filters, and total rows.</li>
              <li><strong>Named Ranges:</strong> Formulas → Name Manager to give friendly names to key ranges.</li>
            </ul>
          </>
        ),
      },
    ],
  },
  {
    id: "referencing",
    title: "Cell Referencing (Relative, Absolute, Mixed)",
    icon: <Hash className="w-5 h-5" />,
    sections: [
      {
        heading: "Reference types",
        body: (
          <>
            <p className="mb-3">Excel uses three reference styles:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li><strong>Relative</strong> (<code>A2</code>): shifts when copied.</li>
              <li><strong>Absolute</strong> (<code>$A$2</code>): fixed row and column.</li>
              <li><strong>Mixed</strong> (<code>$A2</code> or <code>A$2</code>): fix either column or row.</li>
            </ul>
            <p className="mt-3">Press <kbd>F4</kbd> after selecting a reference to toggle styles.</p>
          </>
        ),
      },
      {
        heading: "Quick practice",
        body: (
          <>
            <p className="mb-2">Suppose tax rate sits in <code>$E$1</code> and amounts in <code>B2:B100</code>.</p>
            <pre className="bg-muted p-3 rounded-md overflow-auto"><code>=B2*$E$1</code></pre>
            <p className="mt-2">Copying down keeps the tax rate fixed while amounts move relatively.</p>
          </>
        ),
      },
    ],
  },
  {
    id: "basic-functions",
    title: "Basic Formulas & Functions",
    icon: <Sigma className="w-5 h-5" />,
    sections: [
      {
        heading: "Essential math & counts",
        body: (
          <>
            <ul className="list-disc ml-6 space-y-1">
              <li><code>=SUM(B2:B100)</code> — total</li>
              <li><code>=AVERAGE(B2:B100)</code> — mean</li>
              <li><code>=COUNT(B2:B100)</code> — count numbers</li>
              <li><code>=COUNTA(B2:B100)</code> — count non‑blank</li>
              <li><code>=MIN(B2:B100)</code> / <code>=MAX(B2:B100)</code></li>
            </ul>
          </>
        ),
      },
      {
        heading: "Text helpers",
        body: (
          <>
            <ul className="list-disc ml-6 space-y-1">
              <li><code>=CONCAT(A2, " ", B2)</code> — join first & last names</li>
              <li><code>=LEFT(A2,3)</code>, <code>=RIGHT(A2,4)</code>, <code>=MID(A2, start, len)</code></li>
              <li><code>=LEN(A2)</code> — length</li>
              <li><code>=TRIM(A2)</code> — remove extra spaces</li>
              <li><code>=PROPER(A2)</code> — Title Case</li>
            </ul>
          </>
        ),
      },
      {
        heading: "Logic & error handling",
        body: (
          <>
            <ul className="list-disc ml-6 space-y-1">
              <li><code>=IF(C2>=70, "Pass", "Fail")</code></li>
              <li><code>=AND(A2>0, B2>0)</code>, <code>=OR(A2="Y", B2="Y")</code></li>
              <li><code>=IFERROR(XLOOKUP(E2, A2:A100, B2:B100), "Not Found")</code></li>
            </ul>
          </>
        ),
      },
    ],
  },
  {
    id: "advanced-functions",
    title: "Advanced Functions (XLOOKUP, INDEX/MATCH)",
    icon: <Layers className="w-5 h-5" />,
    sections: [
      {
        heading: "XLOOKUP (modern lookup)",
        body: (
          <>
            <p className="mb-2">Syntax:</p>
            <pre className="bg-muted p-3 rounded-md overflow-auto"><code>=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])</code></pre>
            <p className="mt-2">Example: Find a price for product in <code>E2</code> from table <code>A:B</code>.</p>
            <pre className="bg-muted p-3 rounded-md overflow-auto"><code>=XLOOKUP(E2, A2:A100, B2:B100, "No match")</code></pre>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li><em>match_mode:</em> 0 exact (default), -1 next smaller, 1 next larger, 2 wildcards</li>
              <li><em>search_mode:</em> 1 first‑to‑last, -1 last‑to‑first</li>
              <li>Works left‑to‑right or right‑to‑left; no need to sort.</li>
            </ul>
          </>
        ),
      },
      {
        heading: "INDEX + MATCH (classic power combo)",
        body: (
          <>
            <p className="mb-2">Return value with flexible row/column lookup.</p>
            <pre className="bg-muted p-3 rounded-md overflow-auto"><code>=INDEX(B2:B100, MATCH(E2, A2:A100, 0))</code></pre>
            <p className="mt-2">Pros: works in any direction; easy to swap return columns. Use when XLOOKUP isn’t available.</p>
          </>
        ),
      },
      {
        heading: "Date & time essentials",
        body: (
          <>
            <ul className="list-disc ml-6 space-y-1">
              <li><code>=TODAY()</code>, <code>=NOW()</code></li>
              <li><code>=EOMONTH(A2, 0)</code> — month end</li>
              <li><code>=NETWORKDAYS(A2, B2)</code> — workdays between</li>
              <li><code>=TEXT(A2, "yyyy-mm-dd")</code> — format as text</li>
            </ul>
          </>
        ),
      },
    ],
  },
  {
    id: "organization",
    title: "Organizing Data: Sorting & Filtering",
    icon: <ListFilter className="w-5 h-5" />,
    sections: [
      {
        heading: "Sorting",
        body: (
          <>
            <ol className="list-decimal ml-6 space-y-1">
              <li>Select a cell in your data → <strong>Data → Sort</strong>.</li>
              <li>Choose column, sort by values, A–Z or Z–A.</li>
              <li>Use <em>Add Level</em> for multi‑column sorts (e.g., Region then Sales).</li>
            </ol>
          </>
        ),
      },
      {
        heading: "Filtering",
        body: (
          <>
            <p className="mb-1">Turn your range into a <strong>Table</strong> or enable <strong>Filter</strong> to get dropdowns.</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Filter by values, text/number/date conditions.</li>
              <li>Use <strong>Slicers</strong> for a clickable visual filter (Tables and PivotTables).</li>
              <li><strong>Advanced Filter:</strong> Copy unique records with a criteria range.</li>
            </ul>
          </>
        ),
      },
    ],
  },
  {
    id: "formatting",
    title: "Data Formatting & Conditional Formatting",
    icon: <Table className="w-5 h-5" />,
    sections: [
      {
        heading: "Number & cell formatting",
        body: (
          <>
            <ul className="list-disc ml-6 space-y-1">
              <li>Use <strong>Number</strong> group to format <em>Currency</em>, <em>Percentage</em>, <em>Date</em>.</li>
              <li>Custom format example: <code>$#,##0;-$#,##0;0</code> for positives/negatives/zero.</li>
              <li>Use <strong>Wrap Text</strong>, <strong>Merge & Center</strong> sparingly to preserve structure.</li>
            </ul>
          </>
        ),
      },
      {
        heading: "Conditional formatting (insights at a glance)",
        body: (
          <>
            <ol className="list-decimal ml-6 space-y-1">
              <li>Select data → <strong>Home → Conditional Formatting</strong>.</li>
              <li>Choose <em>Color Scales</em>, <em>Data Bars</em>, or <em>Icon Sets</em> for quick visuals.</li>
              <li>For rules: e.g., highlight top 10%, values &gt; average, or <em>Use a formula</em>.</li>
            </ol>
            <p className="mt-2">Formula rule example (highlight sales over target in <code>B2:B100</code> using target in <code>$E$1</code>):</p>
            <pre className="bg-muted p-3 rounded-md overflow-auto"><code>=B2>$E$1</code></pre>
          </>
        ),
      },
    ],
  },
  {
    id: "charts",
    title: "Charts & Graphs",
    icon: <BarChart3 className="w-5 h-5" />,
    sections: [
      {
        heading: "Create your first chart",
        body: (
          <>
            <ol className="list-decimal ml-6 space-y-1">
              <li>Select a clean range with headers.</li>
              <li>Insert → choose chart type (Column, Line, Pie, Bar, Scatter).</li>
              <li>Use the <strong>Chart Elements</strong> (+) to add titles, labels, legend.</li>
            </ol>
          </>
        ),
      },
      {
        heading: "Best practices",
        body: (
          <>
            <ul className="list-disc ml-6 space-y-1">
              <li>Pick the chart that matches the question (line for trends, bar for comparisons, scatter for relationships).</li>
              <li>Sort categories logically and limit colors for clarity.</li>
              <li>Use <strong>Combo Charts</strong> for mixed scales (Columns + Line for targets).</li>
            </ul>
          </>
        ),
      },
    ],
  },
  {
    id: "pivots",
    title: "PivotTables & PivotCharts",
    icon: <Table className="w-5 h-5" />,
    sections: [
      {
        heading: "Build a PivotTable",
        body: (
          <>
            <ol className="list-decimal ml-6 space-y-1">
              <li>Select a cell in your table → Insert → PivotTable.</li>
              <li>Place fields into <em>Rows</em>, <em>Columns</em>, <em>Values</em>, <em>Filters</em>.</li>
              <li>Use <em>Value Field Settings</em> to switch between Sum, Count, Average, etc.</li>
            </ol>
          </>
        ),
      },
      {
        heading: "Grouping & interactive filters",
        body: (
          <>
            <ul className="list-disc ml-6 space-y-1">
              <li>Right‑click a date field → <strong>Group</strong> by Months/Quarters/Years.</li>
              <li>Add <strong>Slicers</strong> or <strong>Timelines</strong> for point‑and‑click filtering.</li>
              <li>Create a <strong>PivotChart</strong> from the PivotTable for visuals.</li>
            </ul>
          </>
        ),
      },
    ],
  },
  {
    id: "projects",
    title: "Practical Mini‑Projects",
    icon: <FileText className="w-5 h-5" />,
    sections: [
      {
        heading: "Sales report dashboard (Table + CF + Charts)",
        body: (
          <>
            <ol className="list-decimal ml-6 space-y-1">
              <li>Clean data into an Excel Table; validate Region/Product.</li>
              <li>Add conditional formatting for top performers and variance vs. target.</li>
              <li>Build a summary sheet with <code>SUMIFS</code> by Region and a combo chart for trend vs. target.</li>
            </ol>
            <pre className="bg-muted p-3 rounded-md overflow-auto"><code>=SUMIFS(Sales[Amount], Sales[Region], $A2, Sales[Month], $B$1)</code></pre>
          </>
        ),
      },
      {
        heading: "Expense tracker (Data Validation + Pivot)",
        body: (
          <>
            <ol className="list-decimal ml-6 space-y-1">
              <li>Use Validation lists for Category and Payment Method.</li>
              <li>Summarize monthly spend with a PivotTable grouped by Month and Category.</li>
              <li>Add a PivotChart and Slicers for quick exploration.</li>
            </ol>
          </>
        ),
      },
      {
        heading: "Employee performance (XLOOKUP + CF)",
        body: (
          <>
            <p className="mb-2">Match IDs to metrics and flag outliers.</p>
            <pre className="bg-muted p-3 rounded-md overflow-auto"><code>=XLOOKUP(A2, IDs[ID], Scores[Quarter1], "Missing")</code></pre>
            <p className="mt-2">Apply a 3‑color scale to highlight trends.</p>
          </>
        ),
      },
    ],
  },
  {
    id: "shortcuts",
    title: "Tips, Shortcuts & Best Practices",
    icon: <ChevronRight className="w-5 h-5" />,
    sections: [
      {
        heading: "Speed boosters",
        body: (
          <>
            <ul className="list-disc ml-6 space-y-1">
              <li><kbd>Ctrl+Arrow</kbd> to jump across data; <kbd>Ctrl+Shift+Arrow</kbd> to select.</li>
              <li><kbd>Alt</kbd> then key tips to navigate the Ribbon quickly.</li>
              <li>Use <strong>Tables</strong> for dynamic ranges and structured references.</li>
            </ul>
          </>
        ),
      },
      {
        heading: "Quality & governance",
        body: (
          <>
            <ul className="list-disc ml-6 space-y-1">
              <li>Separate raw data, calculations, and outputs into distinct sheets.</li>
              <li>Document assumptions; use comments and a <em>Read Me</em> sheet.</li>
              <li>Protect critical cells/sheets; track versions.</li>
            </ul>
          </>
        ),
      },
    ],
  },
];

// ==========================
// Utilities
// ==========================
const flattenContent = chapters.flatMap((c) =>
  c.sections.map((s) => ({
    id: `${c.id}#${s.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    chapterId: c.id,
    chapterTitle: c.title,
    heading: s.heading,
    text: (() => {
      // Extract simple text for search indexing
      const el = document?.createElement?.("div");
      if (!el) return "";
      // Render children to text by stripping tags
      el.innerHTML = ""; // placeholder; not used in SSR
      return `${c.title} ${s.heading}`;
    })(),
  }))
);

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);
  return [value, setValue];
}

// ==========================
// Components
// ==========================

function Header({ onToggleTheme, theme }) {
  return (
    <div className="flex items-center justify-between p-3 border-b bg-background sticky top-0 z-40">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-2xl bg-primary/10 flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-primary" />
        </div>
        <h1 className="text-xl font-semibold">Mastering Excel – Interactive eBook</h1>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle onToggle={onToggleTheme} theme={theme} />
        <a href="#feedback">
          <Button size="sm" className="rounded-2xl"><Send className="w-4 h-4 mr-2"/>Request Updates</Button>
        </a>
      </div>
    </div>
  );
}

function ThemeToggle({ onToggle, theme }) {
  return (
    <Button variant="outline" size="icon" onClick={onToggle} className="rounded-2xl">
      {theme === "dark" ? <Sun className="w-4 h-4"/> : <Moon className="w-4 h-4"/>}
    </Button>
  );
}

function Sidebar({ query, setQuery }) {
  return (
    <div className="w-full lg:w-72 border-r bg-background/50 p-3 lg:p-4 sticky top-[56px] h-[calc(100vh-56px)] overflow-auto">
      <div className="flex items-center gap-2 mb-3">
        <Search className="w-4 h-4"/>
        <Input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search topics & formulas" className="rounded-2xl" />
      </div>
      <nav className="space-y-2">
        {chapters.map((c)=> (
          <a key={c.id} href={`#${c.id}`} className="group block">
            <Card className="rounded-2xl transition-shadow group-hover:shadow">
              <CardHeader className="py-3 flex flex-row items-center gap-2">
                <span>{c.icon}</span>
                <CardTitle className="text-base">{c.title}</CardTitle>
              </CardHeader>
            </Card>
          </a>
        ))}
      </nav>
      <div className="mt-4">
        <a href="#admin" className="text-sm inline-flex items-center gap-1 opacity-70 hover:opacity-100"><ExternalLink className="w-3 h-3"/>Admin tools</a>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="flex-1 p-4 lg:p-8 space-y-8">
      {chapters.map((c)=> (
        <section id={c.id} key={c.id} className="scroll-mt-24">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">{c.icon}{c.title}</h2>
          <div className="grid gap-4">
            {c.sections.map((s, i)=> (
              <Card key={`${c.id}-${i}`} className="rounded-2xl">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{s.heading}</CardTitle>
                    <Permalink chapterId={c.id} heading={s.heading} />
                  </div>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  {s.body}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ))}
      <FeedbackSection />
      <AdminSection />
    </div>
  );
}

function Permalink({ chapterId, heading }) {
  const id = `${chapterId}#${heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const [copied, setCopied] = useState(false);
  return (
    <Button size="sm" variant="outline" className="rounded-2xl" onClick={()=>{
      const url = `${window.location.origin}${window.location.pathname}#${id}`;
      navigator.clipboard.writeText(url).then(()=>{ setCopied(true); setTimeout(()=>setCopied(false), 1500); });
    }}>
      {copied ? <Check className="w-4 h-4 mr-2"/> : <LinkIcon className="w-4 h-4 mr-2"/>}
      {copied ? "Copied" : "Link"}
    </Button>
  );
}

function FeedbackSection(){
  const [entries, setEntries] = useLocalStorage("excel-ebook-feedback", []);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <section id="feedback" className="scroll-mt-24">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2"><Send className="w-5 h-5"/> Request Updates or New Topics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3">
            <Input placeholder="Name (optional)" value={name} onChange={(e)=>setName(e.target.value)} className="rounded-2xl"/>
            <Input placeholder="Email (optional, for replies)" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="rounded-2xl"/>
          </div>
          <Input placeholder="Topic or feature (e.g., Power Query, macros, what‑if analysis)" value={topic} onChange={(e)=>setTopic(e.target.value)} className="rounded-2xl mt-3"/>
          <Textarea placeholder="Describe your request or question in detail" value={message} onChange={(e)=>setMessage(e.target.value)} className="rounded-2xl mt-3" rows={5}/>
          <div className="flex items-center gap-2 mt-3">
            <Button className="rounded-2xl" onClick={()=>{
              const item = { id: Date.now(), name, email, topic, message, ts: new Date().toISOString() };
              setEntries([item, ...entries]);
              setName(""); setEmail(""); setTopic(""); setMessage(""); setSent(true); setTimeout(()=>setSent(false), 1500);
            }}>{sent ? <Check className="w-4 h-4 mr-2"/> : <Send className="w-4 h-4 mr-2"/>}{sent? "Saved" : "Submit"}</Button>
            <span className="text-sm opacity-70">Your request is saved locally (private to this browser) and visible in Admin tools below.</span>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function AdminSection(){
  const [entries, setEntries] = useLocalStorage("excel-ebook-feedback", []);
  const [copied, setCopied] = useState(false);

  const csv = useMemo(()=>{
    const header = ["id","timestamp","name","email","topic","message"]; 
    const rows = entries.map(e=> [e.id, e.ts, safe(e.name), safe(e.email), safe(e.topic), safe(e.message)]);
    return [header.join(","), ...rows.map(r=> r.map(cell => `"${String(cell??"").replaceAll('"','""')}"`).join(","))].join("\n");
  }, [entries]);

  function safe(v){ return (v??"").toString().replaceAll("\n"," "); }

  return (
    <section id="admin" className="scroll-mt-24">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2"><Layers className="w-5 h-5"/> Admin Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-3 opacity-80">Export locally stored feedback to CSV or clear entries. For a production workflow, connect this form to a provider like Netlify Forms, Formspree, or a custom API endpoint.</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <Button variant="outline" className="rounded-2xl" onClick={()=>{
              const blob = new Blob([csv], {type: "text/csv"});
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url; a.download = "excel-ebook-feedback.csv"; a.click();
              URL.revokeObjectURL(url);
            }}><Download className="w-4 h-4 mr-2"/>Download CSV</Button>
            <Button variant="outline" className="rounded-2xl" onClick={()=>{
              navigator.clipboard.writeText(csv).then(()=>{ setCopied(true); setTimeout(()=>setCopied(false), 1200); });
            }}>{copied ? <Check className="w-4 h-4 mr-2"/> : <Copy className="w-4 h-4 mr-2"/>}{copied? "Copied" : "Copy CSV"}</Button>
            <Button variant="destructive" className="rounded-2xl" onClick={()=>{
              if(confirm("Clear all stored feedback? This cannot be undone.")) localStorage.removeItem("excel-ebook-feedback");
              window.location.reload();
            }}>Clear All</Button>
          </div>
          <div className="grid gap-3">
            {entries.length === 0 && (
              <p className="text-sm opacity-70">No feedback yet. Submissions made via the form above will appear here.</p>
            )}
            {entries.map(e => (
              <Card key={e.id} className="rounded-2xl">
                <CardHeader className="pb-1">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{e.topic || "(No topic)"}</CardTitle>
                    <span className="text-xs opacity-60">{new Date(e.ts).toLocaleString()}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm whitespace-pre-wrap">{e.message || "(No message)"}</p>
                  <div className="mt-2 text-xs opacity-70">{e.name || "Anonymous"}{e.email? ` • ${e.email}`: ""}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default function App(){
  const [theme, setTheme] = useState(() => document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  useEffect(()=>{
    const root = document.documentElement;
    if(theme === 'dark') root.classList.add('dark'); else root.classList.remove('dark');
  }, [theme]);
  const [query, setQuery] = useState("");

  // Simple client-side search over headings and chapter titles
  const results = useMemo(()=>{
    const q = query.trim().toLowerCase();
    if(!q) return [];
    const items = [];
    chapters.forEach(c => {
      c.sections.forEach(s => {
        const hay = `${c.title} ${s.heading}`.toLowerCase();
        if(hay.includes(q)) items.push({ chapterId: c.id, heading: s.heading, title: c.title });
      });
    });
    return items.slice(0, 8);
  }, [query]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onToggleTheme={()=>setTheme(t => t==='dark'?'light':'dark')} theme={theme} />
      <div className="flex max-w-7xl mx-auto">
        <div className="hidden lg:block lg:w-72"><Sidebar query={query} setQuery={setQuery} /></div>
        <div className="lg:hidden w-full border-b bg-background/50 p-3 sticky top-[56px] z-30">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4"/>
            <Input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search topics & formulas" className="rounded-2xl" />
          </div>
          {results.length>0 && (
            <div className="mt-2 p-2 border rounded-2xl bg-background/80">
              {results.map((r,i)=>(
                <a key={i} href={`#${r.chapterId}`} className="block text-sm py-1 hover:underline">{r.title} — {r.heading}</a>
              ))}
            </div>
          )}
        </div>
        <Content />
      </div>
      <Footer />
      {/* Floating quick search results on desktop */}
      {query && (
        <div className="hidden lg:block fixed right-4 bottom-4 w-80 p-3 border rounded-2xl bg-background/95 shadow">
          <div className="text-sm font-semibold mb-1">Quick Matches</div>
          {results.length === 0 ? (
            <div className="text-sm opacity-70">No matches yet… try another term.</div>
          ) : (
            <div className="space-y-1">
              {results.map((r,i)=>(
                <a key={i} href={`#${r.chapterId}`} className="block text-sm py-1 hover:underline">{r.title} — {r.heading}</a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Footer(){
  return (
    <footer className="max-w-7xl mx-auto p-6 opacity-80 text-sm">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          © {new Date().getFullYear()} • Mastering Excel. Built as a live eBook. 
          <span className="ml-2">Switch theme with the sun/moon button.</span>
        </div>
        <div className="flex items-center gap-3">
          <a className="hover:underline" href="#intro">Back to top</a>
          <a className="hover:underline" href="#feedback">Request updates</a>
          <a className="hover:underline" href="#admin">Admin tools</a>
        </div>
      </div>
    </footer>
  );
}