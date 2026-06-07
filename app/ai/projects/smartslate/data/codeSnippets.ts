// Data: Key code snippets for Smarslate Learning Infrastructure

export interface CodeSnippet {
  id: string;
  title: string;
  filePath: string;
  language: string;
  description: string;
  code: string;
}

export const codeSnippets: CodeSnippet[] = [
  {
    id: "lead-capture",
    title: "Next.js 15 Lead Orchestration",
    filePath: "src/app/api/leads/solara/route.ts",
    language: "typescript",
    description: "High-fidelity lead capture system that unifies Supabase persistence with real-time Resend email triggers, capturing detailed contextual organizational data.",
    code: `export async function POST(request: NextRequest) {
  const body = await request.json();
  const supabase = getSupabaseService();
  
  const { data, error } = await supabase
    .from('solara_interest_modal')
    .insert({
      name: body.name,
      email: body.email,
      company: body.company || 'Individual',
      primary_use_case: body.primaryUseCase,
      solara_components: body.solaraComponents || [],
      ai_requirements: body.aiRequirements || [],
      ip_address: request.headers.get('x-forwarded-for')?.split(',')[0],
    })
    .select('id, created_at')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Real-time notification via Resend
  await sendEmail({ 
    to: process.env.LEADS_EMAIL_TO, 
    subject: \`Solara Interest: \${body.name}\`, 
    html: renderTemplate(body, data.id) 
  });

  return NextResponse.json({ success: true, leadId: data.id });
}`
  },
  {
    id: "roi-logic",
    title: "AI-Powered ROI Engine",
    filePath: "src/components/landing/ROICalculator.tsx",
    language: "typescript",
    description: "Personalized impact analysis logic calculating turnover savings, productivity boosts, and revenue lifts based on industry benchmarks from McKinsey & ATD.",
    code: `// Business Metric Calculations
const retentionSavings = Math.round(teamSize * 0.2 * 0.5 * 75000);
const productivityBoost = Math.floor(teamSize * 2000 * 0.25);
const aiRevenueLift = Math.round(teamSize * 10000);

// Student Metric Calculations
const salaryIncrease = Math.round(currentSalary * 0.22);
const fasterPromotion = Math.round(18 * 0.35);
const jobOpportunities = 5;

const closingArguments = {
  businessman: "The data is clear: investing in your team is the most direct path to sustainable growth.",
  student: "The right skills unlock accelerated career paths and professional influence."
};`
  },
  {
    id: "db-schema",
    title: "Automated Schema Provisioning",
    filePath: "src/lib/database-setup.ts",
    language: "typescript",
    description: "Self-healing database setup logic that provisions unified lead tables and performance-optimized indexes via Supabase RPC.",
    code: `const createTablesSQL = \`
  CREATE TABLE IF NOT EXISTS modal_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    modal_type TEXT NOT NULL,
    form_data JSONB NOT NULL DEFAULT '{}'::jsonb,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted')),
    priority TEXT DEFAULT 'normal',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  CREATE INDEX IF NOT EXISTS idx_modal_form_data ON modal_submissions USING gin(form_data);
\`;

export async function setupDatabase() {
  const { error } = await supabase.rpc('exec_sql', { sql: createTablesSQL });
  if (error) {
    // Fallback to table-by-table iterative provisioning
    await manualProvision(tables);
  }
}`
  },
  {
    id: "hitl-principle",
    title: "Human-in-the-Loop Validation",
    filePath: "vision.md",
    language: "markdown",
    description: "The core governance principle of Smarslate: AI-native throughput with uncompromising expert oversight to ensure high-fidelity learning outcomes.",
    code: `### The Smarslate Mandate: Quality via HITL

AI-native architecture is used for 10x throughput in discovery and generation, 
but every output must pass through human validation gates:

1. **Polaris Discovery:** AI interviews verified by Senior SMEs.
2. **Constellation Mapping:** AI-generated frameworks refined by IDs.
3. **Nova Development:** AI content curated by Content Leads.
4. **Ignite Certification:** Capability proven via rigorous project assessment.`
  }
];

export default codeSnippets;