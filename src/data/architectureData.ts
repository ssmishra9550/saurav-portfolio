/**
 * Architecture flow diagrams + terminal "code stream" snippets for each project card.
 * Keyed by Project.id from portfolioData.ts. Content is derived from each project's
 * existing tech stack and solution notes — edit freely.
 */

export type ArchNodeKind = "source" | "ui" | "api" | "logic" | "worker" | "data" | "report";

export interface ArchNode {
  label: string;
  detail: string;
  kind: ArchNodeKind;
}

export interface ProjectArchitecture {
  flow: ArchNode[];
  notes: string[];
  terminal: {
    file: string;
    lines: string[];
  };
}

export const architectureData: Record<string, ProjectArchitecture> = {
  "insure-track": {
    flow: [
      { label: "Next.js 16 Dashboard", detail: "React 19 · Recharts · React Hook Form", kind: "ui" },
      { label: "ASP.NET Core Web API", detail: ".NET 10 · JWT + BCrypt auth", kind: "api" },
      { label: "Application Layer", detail: "Excel import & validation · follow-up scheduler", kind: "logic" },
      { label: "SQL Server", detail: "EF Core · T-SQL stored procedures", kind: "data" },
      { label: "Docker Compose", detail: "Containerised stack · Serilog logging", kind: "worker" },
    ],
    notes: [
      "Clean Architecture: Domain → Application → Infrastructure → API with zero business-logic coupling",
      "Excel engine with column-to-field mapping, duplicate detection and data health checks",
      "Risk tiers (Critical / High / Medium / Low) computed for prioritised renewals",
    ],
    terminal: {
      file: "InsureTrack.Api/Policies/ExpiryService.cs",
      lines: [
        "// prioritise renewals by risk tier",
        "public async Task<IReadOnlyList<PolicyDto>> GetExpiringAsync(int days)",
        "{",
        "    var cutoff = DateTime.UtcNow.AddDays(days);",
        "    return await _db.Policies",
        "        .Where(p => p.ExpiryDate <= cutoff)",
        "        .OrderBy(p => p.RiskTier)",
        "        .Select(p => p.ToDto())",
        "        .ToListAsync();",
        "}",
        "await importer.ValidateAsync(sheet, map); // dedupe + health check",
      ],
    },
  },
  "tv-service-portal": {
    flow: [
      { label: "QR Scan + Web Chat", detail: "Next.js 16 · React 19 · Tailwind 4", kind: "ui" },
      { label: "WhatsApp Cloud API", detail: "Meta webhooks · bidirectional messaging", kind: "source" },
      { label: "ASP.NET Core 10 API", detail: "JWT bearer · rate limiting · RFC 7807", kind: "api" },
      { label: "Conversation State Machine", detail: "Modular monolith · PIN / location validation", kind: "logic" },
      { label: "SQL Server + Admin Console", detail: "EF Core 10 · technician dispatch · audit trail", kind: "data" },
    ],
    notes: [
      "One channel-agnostic request pipeline serves both web chat and WhatsApp",
      "Customer goes from QR scan to a verified service request in under 60 seconds",
      "xUnit integration tests + Vitest UI tests keep the flow CI/CD-ready",
    ],
    terminal: {
      file: "TvService.Chat/ConversationMachine.cs",
      lines: [
        "// pure state machine — runs in browser or behind webhooks",
        "public ChatState Next(ChatState s, Message m) => s switch",
        "{",
        "    ChatState.AwaitPin   => ValidatePin(m.Text),",
        "    ChatState.AwaitType  => SelectRequest(m.Text),",
        "    ChatState.Confirm    => CreateRequest(s.Draft),",
        "    _                    => ChatState.Welcome",
        "};",
        "await whatsApp.SendAsync(phone, \"Request #4821 created\");",
        "return Results.Problem(statusCode: 429); // rate limited",
      ],
    },
  },
  "dynamics-ax-etl": {
    flow: [
      { label: "Dynamics AX 2012 R3", detail: "Live ERP transactional database", kind: "source" },
      { label: ".NET Worker Services", detail: "C# · .NET 8 · incremental extraction", kind: "worker" },
      { label: "SSIS Packages", detail: "Staging · reconciliation · error recovery", kind: "logic" },
      { label: "SQL Server Reporting Mart", detail: "Partitioned staging · tuned T-SQL", kind: "data" },
      { label: "SSRS Dashboards", detail: "Executive & inventory reports · email distribution", kind: "report" },
    ],
    notes: [
      "Zero locking on live ERP tables during peak reporting hours",
      "Financial-grade reconciliation between ERP and data mart",
      "Automated alerts on pipeline failure replace 4+ hours of daily manual compilation",
    ],
    terminal: {
      file: "etl/usp_LoadSalesIncremental.sql",
      lines: [
        "-- incremental pull, no ERP locking",
        "DECLARE @since DATETIME2 = dbo.fn_LastWatermark('SALES');",
        "INSERT INTO stg.SalesLine WITH (TABLOCK)",
        "SELECT s.SalesId, s.ItemId, s.LineAmount, s.ModifiedDateTime",
        "FROM   AX.dbo.SALESLINE s WITH (NOLOCK)",
        "WHERE  s.ModifiedDateTime > @since;",
        "EXEC dbo.usp_Reconcile @Entity = 'SALES';",
        "EXEC dbo.usp_SetWatermark 'SALES', SYSUTCDATETIME();",
      ],
    },
  },
  "sansui-karbonn-crm": {
    flow: [
      { label: "ASP.NET MVC Portal", detail: "Head office · regional hubs · service centers", kind: "ui" },
      { label: "C# Business Layer", detail: "Warranty validation · automated ticket routing", kind: "logic" },
      { label: "ADO.NET / Entity Framework", detail: "Data access · concurrency controls", kind: "api" },
      { label: "SQL Server", detail: "High-capacity schemas · T-SQL procedures", kind: "data" },
      { label: "SSRS KPI Reports", detail: "Daily ops tracking for managers & leadership", kind: "report" },
    ],
    notes: [
      "Single source of truth for 1,000+ service centers across India",
      "Automated routing cut average ticket turnaround by 25%",
      "Held up through national festive-season surges with zero downtime",
    ],
    terminal: {
      file: "Crm.Web/Services/TicketRouter.cs",
      lines: [
        "// route complaint to nearest authorised center",
        "var warranty = await _warranty.ValidateAsync(serialNo, brand);",
        "if (!warranty.IsActive) return TicketResult.OutOfWarranty();",
        "var center = _centers.Nearest(customer.PinCode, brand);",
        "var ticket = Ticket.Create(customer, warranty, center);",
        "ticket.AssignTechnician(center.NextAvailable());",
        "await _repo.SaveAsync(ticket); // SQL Server",
      ],
    },
  },
  "renal-care-ehr": {
    flow: [
      { label: "Angular UI", detail: "TypeScript · RxJS · reactive charting forms", kind: "ui" },
      { label: ".NET Core API", detail: "RESTful clinical endpoints · async I/O", kind: "api" },
      { label: "Business Logic", detail: "Chair scheduling · vitals validation · dialyzer reuse", kind: "logic" },
      { label: "SQL Server", detail: "EF Core · optimised T-SQL (-35% latency)", kind: "data" },
      { label: "Crystal Reports", detail: "Clinical documentation & analytics", kind: "report" },
    ],
    notes: [
      "Real-time chair allocation and dialysis treatment tracking for US clinics",
      "Live vitals validation with warning alerts at the point of care",
      "Zero clinical data corruption across hundreds of thousands of records",
    ],
    terminal: {
      file: "renal-ehr/treatment-chart.component.ts",
      lines: [
        "// reactive vitals with live validation",
        "this.vitals$ = this.form.valueChanges.pipe(",
        "  debounceTime(250),",
        "  map(v => this.rules.evaluate(v)),",
        "  tap(alerts => this.alerts.set(alerts)),",
        ");",
        "this.api.saveTreatment(chairId, this.form.value)",
        "  .subscribe(() => this.toast.ok('Charted'));",
      ],
    },
  },
  "hl7-integration-engine": {
    flow: [
      { label: "Lab & Hospital Feeds", detail: "HL7 v2.x · ADT / ORU / MDM", kind: "source" },
      { label: ".NET Core Workers", detail: "Background queueing · transactional rollback", kind: "worker" },
      { label: "HL7 Parser / Business Logic", detail: "Segment validation · lab code mapping", kind: "logic" },
      { label: "SQL Server", detail: "Transactional persistence · zero message loss", kind: "data" },
      { label: "Dead-letter & Alerts", detail: "Malformed payloads quarantined + notified", kind: "report" },
    ],
    notes: [
      "99.8% parsing success across thousands of daily lab feeds",
      "Sub-minute ingestion replaces multi-hour manual re-entry",
      "Removes recurring third-party interface-engine licensing fees",
    ],
    terminal: {
      file: "Hl7Engine/OruMessageHandler.cs",
      lines: [
        "// MSH|^~\\&|LAB|HOSP|EHR|CLINIC|...|ORU^R01|",
        "var msg = Hl7Parser.Parse(raw);",
        "if (!msg.Validate(out var errors))",
        "    return await _deadLetter.PushAsync(raw, errors);",
        "foreach (var obx in msg.Segments(\"OBX\"))",
        "    results.Add(_codeMap.ToInternal(obx));",
        "await using var tx = await _db.BeginTransactionAsync();",
        "await _repo.SaveResultsAsync(results); await tx.CommitAsync();",
      ],
    },
  },
};
