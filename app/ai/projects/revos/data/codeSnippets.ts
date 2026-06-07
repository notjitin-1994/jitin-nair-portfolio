// Data: Key code snippets for RevvOS Garage Management System

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
    id: "auto-save",
    title: "Debounced Form Auto-Save",
    filePath: "lib/hooks/useFormAutoSave.ts",
    language: "typescript",
    description: "Silent background persistence for high-traffic garage environments. Prevents data loss during job card creation through debounced localStorage synchronization.",
    code: `export function useFormAutoSave({
  formData,
  storageKey,
  debounceMs = 2000
}: AutoSaveOptions) {
  const saveToStorage = (data: Record<string, any>) => {
    try {
      const dataToSave = { ...data, _lastSaved: new Date().toISOString() };
      localStorage.setItem(storageKey, JSON.stringify(dataToSave));
    } catch (error) {
      console.warn('Auto-save failed:', error);
    }
  };

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      saveToStorage(formData);
    }, debounceMs);
    return () => clearTimeout(timeoutRef.current);
  }, [formData]);
}`
  },
  {
    id: "job-card-lifecycle",
    title: "Enriched Job Card API",
    filePath: "app/api/job-cards/route.ts",
    language: "typescript",
    description: "Institutional-grade Job Card orchestration. Combines Zod validation with Supabase RLS to manage the complete vehicle service lifecycle.",
    code: `export async function POST(request: NextRequest) {
  const body = await request.json();
  const validationResult = createJobCardSchema.safeParse(body);
  
  if (!validationResult.success) {
    return NextResponse.json({ error: 'Validation failed' }, { status: 400 });
  }

  const jobCardNumber = await generateJobCardNumber(data.garageId);
  const { data: insertedJobCard, error } = await supabase
    .from('job_cards')
    .insert({
      job_card_number: jobCardNumber,
      status: 'pending',
      customer_id: data.customerId,
      vehicle_id: data.vehicleId,
      garage_id: data.garageId
    })
    .select('*')
    .single();

  return NextResponse.json({ data: insertedJobCard });
}`
  },
  {
    id: "mobile-compliance",
    title: "Hydraulic Design Tokens",
    filePath: "app/job-cards/[id]/components/design-tokens.ts",
    language: "typescript",
    description: "2026 'Industrial Smoothness' tokens. Implements high-contrast graphite palettes and 44x44px touch targets for grease-resistant operation.",
    code: `export const DESIGN_TOKENS = {
  colors: {
    graphite: {
      900: '#0F172A',
      700: '#334155',
    },
    teal: {
      500: '#2DD4BF', // Success
    },
    background: '#CFD0D4',
  },
  spacing: {
    base: 8,
    touchTarget: 44, // WCAG 2.1 Compliance
  },
  animations: {
    hydraulic: 'cubic-bezier(0.4, 0, 0.2, 1)',
    duration: '200ms',
  }
};`
  },
  {
    id: "security-testing",
    title: "Vitest Security Suite",
    filePath: "tests/security/rbac.test.ts",
    language: "typescript",
    description: "Automated security validation. 93 comprehensive test cases covering RBAC, garage-level isolation, and input sanitization.",
    code: `describe('Role-Based Access Control', () => {
  test('Technician cannot modify inventory prices', async () => {
    const { status } = await simulateRequest({
      role: 'technician',
      path: '/api/inventory/update-price',
      method: 'POST'
    });
    expect(status).toBe(403);
  });

  test('Garage isolation prevents cross-tenant access', async () => {
    const access = await checkIsolation(garageA_Id, garageB_Resource);
    expect(access).toBe(false);
  });
});`
  }
];

export default codeSnippets;