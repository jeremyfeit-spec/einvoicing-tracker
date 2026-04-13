import { useState, useMemo } from "react";

const LAST_UPDATED = "April 13, 2026";

const countries = [
  // ── Europe ──
  { name: "Austria", region: "Europe", status: "Partially Live", effectiveDate: "Jan 2014", mandateType: "B2G", model: "Post-Audit", format: "Peppol BIS", platform: "USP", penalties: "Administrative fines for non-compliance with B2G requirements", summary: "B2G e-invoicing mandatory since 2014 via Peppol. No B2B mandate yet; monitoring EU ViDA developments." },
  { name: "Belgium", region: "Europe", status: "Live", effectiveDate: "Jan 2026", mandateType: "B2B + B2G", model: "Post-Audit", format: "Peppol UBL 2.1", platform: "Peppol Network", penalties: "Graduated fines: €1,500 (1st offence), €3,000 (2nd), €5,000 (3rd+) per quarter; plus 60–100% of VAT due per invoice for non-issuance", summary: "Mandatory B2B e-invoicing since Jan 1, 2026 via Peppol. Grace period ended Apr 2026 — graduated penalties now enforced. Over 1M Peppol recipients nationwide." },
  { name: "Bosnia and Herzegovina", region: "Europe", status: "Upcoming", effectiveDate: "2029", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "EN 16931 (planned)", platform: "Central Fiscalization Platform (CPF)", penalties: "Penalties for non-compliance with fiscalization requirements", summary: "Federation parliament passed comprehensive Fiscalization Bill (Feb 2026). Central Fiscalization Platform replaces device-based systems. B2C fiscal registers by 2028; mandatory B2B/B2G e-invoicing and e-reporting by 2029. Aligned with EU e-invoicing standards." },
  { name: "Bulgaria", region: "Europe", status: "Upcoming", effectiveDate: "2026", mandateType: "B2G", model: "Post-Audit", format: "EN 16931", platform: "NRA Portal", penalties: "TBD", summary: "Aligning with EU ViDA directive. B2G e-invoicing mandate expected 2026." },
  { name: "Croatia", region: "Europe", status: "Live", effectiveDate: "Jan 2026", mandateType: "B2B + B2G", model: "Clearance", format: "UBL 2.1 / CII", platform: "CIS (Fiskalizacija)", penalties: "Fines for non-issuance of fiscal invoices", summary: "Mandatory B2B e-invoicing launched Jan 1, 2026 through the CIS clearance system." },
  { name: "Czech Republic", region: "Europe", status: "Upcoming", effectiveDate: "Jan 2027", mandateType: "B2B", model: "Post-Audit", format: "ISDOC / EN 16931", platform: "MFCR Portal", penalties: "TBD", summary: "B2B e-invoicing mandate planned for Jan 2027. Legislation in progress, aligned with EU ViDA." },
  { name: "Denmark", region: "Europe", status: "Partially Live", effectiveDate: "2005", mandateType: "B2G", model: "Post-Audit", format: "OIOUBL / Nemhandel BIS 4", platform: "NemHandel", penalties: "Rejection of non-compliant B2G invoices", summary: "B2G mandatory since 2005 via OIOUBL/Peppol. Cancelled OIOUBL 3.0; officially adopted Nemhandel BIS 4 (Peppol BIS 4-based, EN 16931 compliant) as new unified standard. OIOUBL 2.1 remains until Jul 2029; migration to Nemhandel BIS 4 starts 2028." },
  { name: "Estonia", region: "Europe", status: "Upcoming", effectiveDate: "2027", mandateType: "B2G", model: "Post-Audit", format: "Peppol BIS / EN 16931", platform: "e-Arveldus", penalties: "TBD", summary: "Peppol-based B2G e-invoicing mandate planned for 2027, aligned with EU directive." },
  { name: "Finland", region: "Europe", status: "Partially Live", effectiveDate: "Apr 2020", mandateType: "B2G", model: "Post-Audit", format: "Peppol BIS / Finvoice", platform: "Peppol / Banking Networks", penalties: "Rejection of non-compliant B2G invoices", summary: "B2G mandatory since Apr 2020 via Peppol. Strong voluntary B2B adoption through Finvoice and banking networks." },
  { name: "France", region: "Europe", status: "Upcoming", effectiveDate: "Sep 2026", mandateType: "B2B + B2G", model: "Clearance", format: "Factur-X / UBL / CII", platform: "Chorus Pro / PPF", penalties: "€15 per non-compliant invoice (capped at €15,000/year)", summary: "Mandatory B2B e-invoicing from Sep 1, 2026 (large/mid-size companies issue + all receive). SMEs must issue by Sep 2027. Pilot running Feb–Aug 2026." },
  { name: "Germany", region: "Europe", status: "Partially Live", effectiveDate: "Jan 2025", mandateType: "B2B + B2G", model: "Post-Audit", format: "XRechnung / ZUGFeRD", platform: "Peppol / GEBA", penalties: "Rejection of non-compliant B2G invoices", summary: "B2B reception mandatory since Jan 2025; issuance mandatory from Jan 2027. Published GEBA framework Mar 2026. ZUGFeRD v2.5 releasing May 20, 2026." },
  { name: "Greece", region: "Europe", status: "Live", effectiveDate: "2020", mandateType: "B2B + B2G", model: "Clearance", format: "myDATA XML", platform: "myDATA / AADE", penalties: "50% of VAT amount for VATable transactions; €500–€1,000 for non-VAT transactions", summary: "Mandatory real-time reporting via myDATA since 2020. New mandatory B2B e-invoicing: large taxpayers (>€1M revenue) must issue e-invoices from Mar 2, 2026 (soft launch through May 3); all other taxpayers by Oct 1, 2026 (transition through year-end). Compliance via private EDIPs or free government tools (timologio, myDATAapp)." },
  { name: "Ireland", region: "Europe", status: "Upcoming", effectiveDate: "Nov 2028", mandateType: "B2B + B2G", model: "Post-Audit", format: "EN 16931 / Peppol BIS", platform: "Revenue Online / Peppol", penalties: "TBD — phased enforcement from 2028", summary: "Three-phase rollout confirmed: large corporates must issue B2B e-invoices via Peppol from Nov 2028; all VAT-registered businesses in intra-EU trade from Nov 2029; full ViDA cross-border compliance by Jul 2030. Part of Ireland's VAT Modernisation programme to close the €1.7B VAT gap." },
  { name: "Hungary", region: "Europe", status: "Partially Live", effectiveDate: "Jul 2018", mandateType: "B2B + B2G", model: "Real-time Reporting", format: "NAV XML 3.0 / EN 16931", platform: "NAV Online Invoicing", penalties: "Up to HUF 500,000 per invoice for non-reporting", summary: "Real-time invoice data reporting mandatory since 2018 via NAV. Sector mandates live (energy Jul 2025, water Jan 2026). Public consultation on ViDA-aligned full e-invoicing mandate launched; EN 16931 format confirmed." },
  { name: "Italy", region: "Europe", status: "Live", effectiveDate: "Jan 2019", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "FatturaPA XML", platform: "SDI (Sistema di Interscambio)", penalties: "70–400% of VAT amount for non-compliance", summary: "Comprehensive clearance model since 2019 for all invoice types. All invoices must pass through SDI for validation." },
  { name: "Latvia", region: "Europe", status: "Partially Live", effectiveDate: "Jan 2026", mandateType: "B2G (B2B from 2028)", model: "Post-Audit", format: "Peppol BIS 3.0 / EN 16931", platform: "SRS Portal", penalties: "Administrative fines for non-compliance", summary: "B2G e-invoicing mandatory from Jan 1, 2026. B2B mandate postponed to Jan 1, 2028 (originally 2026) per June 2025 parliamentary amendment. Voluntary B2B e-invoicing from Mar 30, 2026. Cabinet Regulations No. 749 adopted Dec 2025 set operational framework." },
  { name: "Lithuania", region: "Europe", status: "Upcoming", effectiveDate: "2025", mandateType: "B2G", model: "Post-Audit", format: "EN 16931", platform: "i.SAF", penalties: "TBD", summary: "B2G e-invoicing via i.SAF reporting system. Broader mandate under consideration." },
  { name: "Netherlands", region: "Europe", status: "Upcoming", effectiveDate: "2030", mandateType: "B2B + B2G", model: "Post-Audit", format: "SI-UBL / Peppol BIS", platform: "Peppol Network", penalties: "TBD", summary: "Confirmed mandatory B2B e-invoicing by 2030 and domestic e-reporting by 2032." },
  { name: "Norway", region: "Europe", status: "Partially Live", effectiveDate: "2012", mandateType: "B2G (B2B from 2027)", model: "Post-Audit", format: "EHF / Peppol BIS", platform: "Peppol Network", penalties: "Rejection of non-compliant B2G invoices; B2B penalties TBD", summary: "B2G mandatory since 2012 via EHF/Peppol. Government formally instructed mandatory B2B e-invoicing from Jan 1, 2027 (accelerated from 2028). EHF will be mandatory standard. Full digital bookkeeping by Jan 2030." },
  { name: "Poland", region: "Europe", status: "Live", effectiveDate: "Apr 2026", mandateType: "B2B + B2G", model: "Clearance", format: "FA(3) XML", platform: "KSeF", penalties: "No sanctions during 2026 transition; penalties from 2027", summary: "KSeF Phase 2 live Apr 1, 2026 for all VAT-registered businesses (SMEs, sole proprietors). Phase 1 (large taxpayers >PLN 200M) went live Feb 1. Micro-entrepreneurs must comply by Jan 2027." },
  { name: "Portugal", region: "Europe", status: "Partially Live", effectiveDate: "Jan 2024", mandateType: "B2G + B2B", model: "Post-Audit", format: "CIUS-PT / UBL", platform: "eSPap / FE-AP", penalties: "Fines for non-compliance with B2G requirements", summary: "B2G mandatory; phased B2B rollout in progress via CIUS-PT format." },
  { name: "Romania", region: "Europe", status: "Live", effectiveDate: "Jul 2024", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "CIUS-RO / UBL 2.1", platform: "RO e-Factura / e-Transport", penalties: "Fines 5,000–10,000 RON per invoice", summary: "Mandatory B2B clearance since Jul 2024 via RO e-Factura. e-Transport for goods movement tracking. Expanding to individuals (PFAs/CNP) from Jun 1, 2026. e-VAT enforcement tightening under GEO 13/2026." },
  { name: "Serbia", region: "Europe", status: "Partially Live", effectiveDate: "Jan 2023", mandateType: "B2G + B2B", model: "Clearance", format: "UBL 2.1", platform: "SEF", penalties: "Fines for non-issuance", summary: "B2G + B2B invoicing via SEF platform. April 2026 amendments: retail e-invoicing for corporate cardholders now mandatory, internal invoicing required in SEF. New Rulebook amendments effective Apr 2026 tax period. B2B delivery notes Oct 2027." },
  { name: "Slovakia", region: "Europe", status: "Upcoming", effectiveDate: "2027", mandateType: "B2B", model: "Clearance", format: "TBD", platform: "TBD", penalties: "TBD", summary: "B2B e-invoicing mandate planned for 2027. Clearance model under development." },
  { name: "Spain", region: "Europe", status: "Upcoming", effectiveDate: "mid-2027", mandateType: "B2B + B2G", model: "Clearance", format: "Facturae / Structured XML", platform: "FACe (B2G) / AEAT + Private Platforms (B2B)", penalties: "TBD — Royal Decree in effect", summary: "Royal Decree 238/2026 published Mar 31, mandating B2B e-invoicing. Large businesses (>€8M): ~12 months after ministerial order (~mid-2027). All others: ~24 months after. Hybrid architecture: free AEAT public platform + interoperable private platforms." },
  { name: "Sweden", region: "Europe", status: "Partially Live", effectiveDate: "Apr 2019", mandateType: "B2G", model: "Post-Audit", format: "Peppol BIS / SFTI", platform: "Peppol Network", penalties: "Rejection of non-compliant B2G invoices", summary: "B2G mandatory since Apr 2019 via Peppol BIS. Voluntary B2B adoption growing." },
  { name: "Switzerland", region: "Europe", status: "Voluntary", effectiveDate: null, mandateType: "B2G", model: "Post-Audit", format: "Peppol BIS / QR-bill", platform: "Peppol Network", penalties: "None (voluntary)", summary: "No mandate. Peppol adoption voluntary. QR-bill widely used for domestic invoicing." },
  { name: "Turkey", region: "Europe", status: "Live", effectiveDate: "2014", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "UBL-TR", platform: "GIB (e-Fatura / e-Arşiv)", penalties: "Tax penalties and fines for non-compliance", summary: "Comprehensive clearance model since 2014. e-Fatura for B2B, e-Arşiv for B2C. Updated e-invoice package and VAT code controls effective Apr 1, 2026." },
  { name: "UK", region: "Europe", status: "Partially Live", effectiveDate: "Apr 2026", mandateType: "B2G + MTD", model: "Post-Audit", format: "Peppol BIS", platform: "Peppol / HMRC MTD", penalties: "Penalties for MTD non-compliance", summary: "B2G via Peppol. MTD for Income Tax launched Apr 2026. No mandatory B2B e-invoicing yet." },
  { name: "Ukraine", region: "Europe", status: "Upcoming", effectiveDate: "2025", mandateType: "B2B + B2G", model: "Post-Audit", format: "XML", platform: "Tax Authority Portal", penalties: "TBD", summary: "E-invoicing registration system under development by tax authority." },

  // ── Middle East ──
  { name: "Bahrain", region: "Middle East", status: "Upcoming", effectiveDate: "2026", mandateType: "B2B + B2G", model: "Clearance", format: "TBD", platform: "NBR Portal", penalties: "TBD", summary: "Aligned with GCC e-invoicing framework. Mandate expected 2026." },
  { name: "Israel", region: "Middle East", status: "Partially Live", effectiveDate: "2024", mandateType: "B2B + B2G", model: "Post-Audit", format: "XML", platform: "ITA Portal", penalties: "Administrative fines", summary: "Phased e-invoicing rollout for domestic transactions. Invoice data reporting expanding." },
  { name: "Oman", region: "Middle East", status: "Upcoming", effectiveDate: "2026", mandateType: "B2B + B2G", model: "Clearance", format: "TBD", platform: "Tax Authority Portal", penalties: "TBD", summary: "Tax Authority developing e-invoicing platform. Aligned with GCC framework." },
  { name: "Saudi Arabia", region: "Middle East", status: "Live", effectiveDate: "Dec 2021", mandateType: "B2B + B2G", model: "Clearance", format: "UBL 2.1 / XML", platform: "ZATCA FATOORA", penalties: "SAR 10,000+ per violation", summary: "FATOORA Phase 1 (generation) since Dec 2021. Phase 2 (integration/clearance) rolling out in waves by revenue threshold." },
  { name: "UAE", region: "Middle East", status: "Upcoming", effectiveDate: "Jul 2026", mandateType: "B2B + B2G", model: "Clearance", format: "TBD", platform: "FTA Portal", penalties: "TBD", summary: "Voluntary pilot starting Jul 2026. Large businesses (>AED 50M) mandatory from Jan 2027. 24-month grace period for intra-VAT group transactions." },

  // ── Asia-Pacific ──
  { name: "Australia", region: "Asia-Pacific", status: "Partially Live", effectiveDate: "Jul 2023", mandateType: "B2G", model: "Post-Audit", format: "Peppol BIS", platform: "Peppol Network", penalties: "Rejection of non-compliant B2G invoices", summary: "B2G via Peppol expanding. Government adoption accelerating across federal and state agencies." },
  { name: "China", region: "Asia-Pacific", status: "Partially Live", effectiveDate: "2024", mandateType: "B2B + B2G", model: "Clearance", format: "OFD / XML", platform: "Golden Tax / Fapiao", penalties: "Tax penalties for non-compliance", summary: "Fully digital fapiao rollout underway. Transitioning from paper-based Golden Tax to all-electronic invoicing." },
  { name: "India", region: "Asia-Pacific", status: "Live", effectiveDate: "Oct 2020", mandateType: "B2B + B2G", model: "Clearance", format: "JSON / e-Invoice Schema", platform: "IRP (Invoice Registration Portal)", penalties: "₹10,000–₹25,000 per invoice for non-compliance", summary: "Mandatory for businesses with turnover >₹5 Cr. All B2B invoices must be registered through IRP for IRN generation." },
  { name: "Indonesia", region: "Asia-Pacific", status: "Live", effectiveDate: "Jul 2015", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "XML", platform: "e-Faktur (DJP)", penalties: "Tax penalties for non-issuance", summary: "Comprehensive e-Faktur system since 2015 for all invoice types." },
  { name: "Japan", region: "Asia-Pacific", status: "Partially Live", effectiveDate: "Oct 2023", mandateType: "B2B + B2G", model: "Post-Audit", format: "Peppol BIS JP", platform: "JP PINT / Peppol", penalties: "Loss of input tax credit for non-qualified invoices", summary: "Qualified Invoice System (QIS) since Oct 2023. Peppol adoption growing for digital invoice exchange." },
  { name: "Malaysia", region: "Asia-Pacific", status: "Live", effectiveDate: "Aug 2024", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "XML / JSON", platform: "MyInvois (LHDN)", penalties: "Fines and penalties per Malaysian tax law; RM10,000+ individual e-invoice threshold strictly enforced", summary: "Phased rollout by revenue threshold. Phase 4 (RM1M–RM5M turnover) mandatory from Jan 1, 2026, but PM announced grace period extended to Dec 31, 2026 — no penalties during transition if businesses are preparing. RM10,000 individual transaction e-invoice rule remains strictly enforced." },
  { name: "New Zealand", region: "Asia-Pacific", status: "Voluntary", effectiveDate: null, mandateType: "B2G", model: "Post-Audit", format: "Peppol BIS", platform: "Peppol Network", penalties: "None (voluntary)", summary: "Peppol adoption voluntary. Government encouraging but no mandate announced." },
  { name: "Pakistan", region: "Asia-Pacific", status: "Partially Live", effectiveDate: "2024", mandateType: "B2B + B2G", model: "Clearance", format: "XML / JSON", platform: "FBR e-Invoice (STGO)", penalties: "Fines per FBR regulations; non-compliant invoices rejected", summary: "FBR mandating e-invoicing integration for broad range of businesses via STGO 01/2026. Real-time reporting through licensed integrators. Invoice edits restricted to 72 hours; later amendments need Commissioner approval. Expanding to restaurants, hospitals, retailers, schools." },
  { name: "Philippines", region: "Asia-Pacific", status: "Partially Live", effectiveDate: "2024", mandateType: "B2B + B2G", model: "Clearance", format: "JSON / XML", platform: "EIS (BIR)", penalties: "Fines per BIR regulations", summary: "Electronic Invoicing System (EIS) phased rollout by BIR. Full mandate deadline extended to Dec 31, 2026 via RR 26-2025. EIS platform still under development." },
  { name: "Singapore", region: "Asia-Pacific", status: "Partially Live", effectiveDate: "Apr 2026", mandateType: "B2G + voluntary B2B", model: "Post-Audit", format: "Peppol BIS", platform: "InvoiceNow (Peppol)", penalties: "GST penalties for non-compliance", summary: "InvoiceNow via Peppol. Mandatory for new voluntary GST registrants from Apr 1, 2026. Broader adoption encouraged." },
  { name: "South Korea", region: "Asia-Pacific", status: "Live", effectiveDate: "2011", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "XML", platform: "NTS HomeTax (e-Tax Invoice)", penalties: "1% penalty on supply value for non-issuance", summary: "Mandatory e-Tax Invoice via NTS HomeTax for all businesses above threshold." },
  { name: "Sri Lanka", region: "Asia-Pacific", status: "Upcoming", effectiveDate: "2025", mandateType: "B2B + B2G", model: "Post-Audit", format: "TBD", platform: "IRD Portal", penalties: "TBD", summary: "IRD developing e-invoicing framework. Implementation timeline under review." },
  { name: "Taiwan", region: "Asia-Pacific", status: "Partially Live", effectiveDate: "2006", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "MIG XML", platform: "eGUI (Uniform Invoice)", penalties: "Tax penalties for non-compliance", summary: "eGUI (electronic Government Uniform Invoice) system since 2006. Covers B2B, B2G, and B2C." },
  { name: "Vietnam", region: "Asia-Pacific", status: "Live", effectiveDate: "2020", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "XML", platform: "Tax Authority e-Invoice", penalties: "Fines per Vietnamese tax law", summary: "Mandatory e-invoicing for all businesses. Tax authority validates and issues codes." },

  // ── Latin America ──
  { name: "Argentina", region: "Latin America", status: "Live", effectiveDate: "2019", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "XML", platform: "AFIP (Factura Electrónica)", penalties: "Tax penalties and fines", summary: "AFIP Factura Electrónica mandatory for all taxpayers." },
  { name: "Bolivia", region: "Latin America", status: "Partially Live", effectiveDate: "Apr 2026", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "XML", platform: "SFE (SIN)", penalties: "Tax penalties per SIN regulations", summary: "Phased rollout by taxpayer groups. Groups 10–12 began e-invoicing Apr 1, 2026." },
  { name: "Brazil", region: "Latin America", status: "Live", effectiveDate: "2008", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "XML", platform: "NF-e / NFS-e / CT-e (SEFAZ)", penalties: "Fines and operational restrictions", summary: "Pioneer in e-invoicing. NF-e for goods, NFS-e for services, CT-e for transport. All cleared through SEFAZ." },
  { name: "Chile", region: "Latin America", status: "Live", effectiveDate: "2014", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "XML (DTE)", platform: "SII", penalties: "Tax penalties for non-compliance", summary: "Mandatory DTE (Documento Tributario Electrónico) via SII for all taxpayers." },
  { name: "Colombia", region: "Latin America", status: "Live", effectiveDate: "2019", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "UBL 2.1 XML", platform: "DIAN", penalties: "Fines per DIAN regulations", summary: "Mandatory Factura Electrónica via DIAN for all taxpayers." },
  { name: "Costa Rica", region: "Latin America", status: "Live", effectiveDate: "2018", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "XML 4.3", platform: "Hacienda", penalties: "Tax penalties for non-compliance", summary: "Mandatory e-invoice via Hacienda for all taxpayers." },
  { name: "Dominican Republic", region: "Latin America", status: "Partially Live", effectiveDate: "2019", mandateType: "B2B + B2G", model: "Clearance", format: "XML", platform: "DGII (e-CF)", penalties: "Fines per DGII regulations", summary: "e-CF (Comprobante Fiscal Electrónico) system. Phased rollout expanding." },
  { name: "Ecuador", region: "Latin America", status: "Live", effectiveDate: "2012", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "XML", platform: "SRI", penalties: "Tax penalties and operational sanctions", summary: "Mandatory Comprobantes Electrónicos via SRI for all taxpayers." },
  { name: "El Salvador", region: "Latin America", status: "Partially Live", effectiveDate: "2023", mandateType: "B2B + B2G", model: "Clearance", format: "JSON", platform: "MH (DTE)", penalties: "Fines per MH regulations", summary: "DTE (Documento Tributario Electrónico) phased rollout since 2023." },
  { name: "Guatemala", region: "Latin America", status: "Partially Live", effectiveDate: "2022", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "XML", platform: "SAT (FEL)", penalties: "Tax penalties for non-compliance", summary: "FEL (Factura Electrónica en Línea) mandatory for designated taxpayers." },
  { name: "Honduras", region: "Latin America", status: "Upcoming", effectiveDate: "2025", mandateType: "B2B + B2G", model: "Clearance", format: "XML", platform: "DEI", penalties: "TBD", summary: "DEI developing e-invoicing platform. Rollout planned for 2025." },
  { name: "Mexico", region: "Latin America", status: "Live", effectiveDate: "2011", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "XML (CFDI 4.0)", platform: "SAT", penalties: "Fines per CFF; potential criminal charges for repeated non-compliance", summary: "CFDI 4.0 mandatory for all taxpayers. Carta Porte complement for transport." },
  { name: "Nicaragua", region: "Latin America", status: "Upcoming", effectiveDate: "2025", mandateType: "B2B + B2G", model: "Clearance", format: "XML", platform: "DGI", penalties: "TBD", summary: "DGI developing e-invoicing framework. Implementation timeline under review." },
  { name: "Panama", region: "Latin America", status: "Partially Live", effectiveDate: "2022", mandateType: "B2B + B2G", model: "Clearance", format: "XML", platform: "DGI (FE)", penalties: "Fines per DGI regulations", summary: "DGI Factura Electrónica system. Phased rollout for designated taxpayers." },
  { name: "Paraguay", region: "Latin America", status: "Live", effectiveDate: "2017", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "XML", platform: "SET (SIFEN)", penalties: "Tax penalties for non-compliance", summary: "SIFEN (Sistema Integrado de Facturación Electrónica Nacional) mandatory." },
  { name: "Peru", region: "Latin America", status: "Live", effectiveDate: "2012", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "UBL 2.1 XML", platform: "SUNAT (CPE)", penalties: "Fines and operational restrictions", summary: "Mandatory CPE (Comprobante de Pago Electrónico) via SUNAT for all taxpayers." },
  { name: "Uruguay", region: "Latin America", status: "Partially Live", effectiveDate: "2018", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "XML", platform: "DGI (CFE)", penalties: "Tax penalties per DGI regulations", summary: "CFE (Comprobante Fiscal Electrónico) system. Coverage expanding to more taxpayer groups." },
  { name: "Venezuela", region: "Latin America", status: "Partially Live", effectiveDate: "2018", mandateType: "B2B + B2G", model: "Clearance", format: "XML", platform: "SENIAT", penalties: "Tax penalties per SENIAT regulations", summary: "SENIAT fiscal invoicing system. Phased implementation ongoing." },

  // ── Africa ──
  { name: "Cameroon", region: "Africa", status: "Upcoming", effectiveDate: "2026", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "TBD", platform: "DGI e-Invoice Platform", penalties: "Non-compliant invoices denied for tax deductions and VAT credits; financial penalties apply", summary: "2026 Finance Law mandates real-time e-invoicing for all taxable persons covering taxable, VAT-exempt, and out-of-scope transactions. Central platform with accredited third-party providers. Technical details and rollout timeline pending." },
  { name: "Gabon", region: "Africa", status: "Live", effectiveDate: "Jan 2026", mandateType: "B2B + B2G", model: "Clearance", format: "FNE (Facture Normalisée Électronique)", platform: "DGI Platform", penalties: "Non-compliant invoices denied for income tax and VAT deductions", summary: "2026 Finance Law (Law No. 041/2025) mandates e-invoicing (FNE) for all taxpayers. Required for claiming income tax and VAT deductions since Jan 2026. 6-month soft landing phase; full compliance by Jul 2026." },
  { name: "Egypt", region: "Africa", status: "Partially Live", effectiveDate: "2020", mandateType: "B2B + B2G", model: "Clearance", format: "JSON / XML", platform: "ETA e-Invoice", penalties: "EGP 20,000–100,000 per violation", summary: "ETA mandatory e-invoicing expanding by taxpayer group. Phased rollout since 2020." },
  { name: "Ghana", region: "Africa", status: "Upcoming", effectiveDate: "2024", mandateType: "B2B + B2G", model: "Clearance", format: "XML", platform: "GRA (e-VAT)", penalties: "TBD", summary: "GRA e-VAT system implementation. Expanding coverage to more taxpayers." },
  { name: "Ivory Coast", region: "Africa", status: "Partially Live", effectiveDate: "2024", mandateType: "B2B + B2G", model: "Clearance", format: "XML", platform: "DGI (e-Facture)", penalties: "Tax penalties per DGI regulations", summary: "DGI e-Facture system. Mandatory for designated taxpayer groups." },
  { name: "Kenya", region: "Africa", status: "Partially Live", effectiveDate: "2024", mandateType: "B2B + B2G", model: "Clearance", format: "JSON / XML", platform: "KRA (eTIMS)", penalties: "Fines per KRA regulations", summary: "eTIMS (electronic Tax Invoice Management System) mandatory and expanding." },
  { name: "Mauritius", region: "Africa", status: "Upcoming", effectiveDate: "2025", mandateType: "B2B + B2G", model: "Clearance", format: "TBD", platform: "MRA Portal", penalties: "TBD", summary: "MRA developing e-invoicing platform. Implementation planned for 2025." },
  { name: "Morocco", region: "Africa", status: "Upcoming", effectiveDate: "2026", mandateType: "B2B + B2G", model: "Post-Audit", format: "TBD", platform: "DGI Portal", penalties: "TBD", summary: "DGI e-invoicing mandate under planning. Expected rollout 2026." },
  { name: "Nigeria", region: "Africa", status: "Live", effectiveDate: "2024", mandateType: "B2B + B2G", model: "Clearance", format: "XML / JSON", platform: "FIRS e-Invoice", penalties: "Tax penalties per FIRS regulations", summary: "FIRS mandatory e-invoicing for all businesses." },
  { name: "Rwanda", region: "Africa", status: "Partially Live", effectiveDate: "2024", mandateType: "B2B + B2G", model: "Clearance", format: "JSON", platform: "RRA (EBM)", penalties: "Fines per RRA regulations", summary: "Electronic Billing Machine (EBM) system expanding. Mandatory for designated businesses." },
  { name: "South Africa", region: "Africa", status: "Upcoming", effectiveDate: "2028", mandateType: "B2B + B2G", model: "Post-Audit", format: "TBD", platform: "SARS Portal", penalties: "TBD", summary: "SARS confirmed multi-year e-invoicing and digital reporting reform plan. Voluntary pilot/design phase 2026–2027; mandatory phased rollout from 2028 for large VAT taxpayers." },
  { name: "Tanzania", region: "Africa", status: "Partially Live", effectiveDate: "2023", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "JSON / XML", platform: "TRA (VFD)", penalties: "Fines per TRA regulations", summary: "Virtual Fiscal Device (VFD) system mandatory for registered businesses." },
  { name: "Uganda", region: "Africa", status: "Partially Live", effectiveDate: "2024", mandateType: "B2B + B2G", model: "Clearance", format: "JSON", platform: "URA (EFRIS)", penalties: "Fines per URA regulations", summary: "EFRIS (Electronic Fiscal Receipting and Invoicing Solution) expanding coverage." },
  { name: "Zambia", region: "Africa", status: "Upcoming", effectiveDate: "2025", mandateType: "B2B + B2G", model: "Clearance", format: "JSON", platform: "ZRA (Smart Invoice)", penalties: "TBD", summary: "ZRA Smart Invoice system. Implementation planned for 2025." },

  // ── North America ──
  { name: "Canada", region: "North America", status: "Voluntary", effectiveDate: null, mandateType: "B2G", model: "Post-Audit", format: "Peppol BIS", platform: "Peppol Network", penalties: "None (voluntary)", summary: "Peppol pilot underway. No mandate announced. CRA exploring e-invoicing framework." },
  { name: "US", region: "North America", status: "Voluntary", effectiveDate: null, mandateType: "B2G", model: "Post-Audit", format: "Peppol BIS", platform: "BPC / Peppol", penalties: "None (voluntary)", summary: "Business Payments Coalition (BPC) driving adoption. DBNAlliance promoting e-invoicing. No federal mandate." },
];

const regionOrder = ["Europe", "Middle East", "Asia-Pacific", "Latin America", "Africa", "North America"];

const statusConfig = {
  Live: { color: "#16a34a", bg: "#dcfce7", border: "#86efac", icon: "●" },
  "Partially Live": { color: "#ea580c", bg: "#fff7ed", border: "#fdba74", icon: "◐" },
  Upcoming: { color: "#2563eb", bg: "#eff6ff", border: "#93c5fd", icon: "○" },
  Voluntary: { color: "#6b7280", bg: "#f9fafb", border: "#d1d5db", icon: "◇" },
};

const regionColors = {
  Europe: "#6366f1",
  "Middle East": "#f59e0b",
  "Asia-Pacific": "#06b6d4",
  "Latin America": "#22c55e",
  Africa: "#ef4444",
  "North America": "#8b5cf6",
};

function CountryCard({ country }) {
  const [expanded, setExpanded] = useState(false);
  const sc = statusConfig[country.status] || statusConfig.Voluntary;
  const rc = regionColors[country.region] || "#6b7280";

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      style={{
        background: "#fff",
        borderRadius: 12,
        border: `1px solid ${sc.border}`,
        padding: "16px 20px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        boxShadow: expanded ? "0 4px 12px rgba(0,0,0,0.08)" : "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: "#1e293b" }}>{country.name}</span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                fontSize: 12,
                fontWeight: 600,
                color: sc.color,
                background: sc.bg,
                padding: "2px 10px",
                borderRadius: 20,
                border: `1px solid ${sc.border}`,
              }}
            >
              {sc.icon} {country.status}
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: rc,
                background: `${rc}10`,
                padding: "2px 8px",
                borderRadius: 20,
                border: `1px solid ${rc}30`,
              }}
            >
              {country.region}
            </span>
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 8, flexWrap: "wrap" }}>
            <InfoChip label="Effective" value={country.effectiveDate || "No date"} />
            <InfoChip label="Type" value={country.mandateType} />
            <InfoChip label="Model" value={country.model} />
          </div>
        </div>
        <span
          style={{
            fontSize: 18,
            color: "#94a3b8",
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
            flexShrink: 0,
            marginTop: 2,
          }}
        >
          ▾
        </span>
      </div>
      {expanded && (
        <div
          style={{
            marginTop: 14,
            paddingTop: 14,
            borderTop: "1px solid #f1f5f9",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 10,
          }}
        >
          <DetailRow label="Format" value={country.format} />
          <DetailRow label="Platform" value={country.platform} />
          <DetailRow label="Penalties" value={country.penalties} />
          <div style={{ gridColumn: "1 / -1" }}>
            <DetailRow label="Summary" value={country.summary} />
          </div>
        </div>
      )}
    </div>
  );
}

function InfoChip({ label, value }) {
  return (
    <span style={{ fontSize: 13, color: "#64748b" }}>
      <span style={{ fontWeight: 600, color: "#94a3b8" }}>{label}:</span> {value}
    </span>
  );
}

function DetailRow({ label, value }) {
  return (
    <div style={{ fontSize: 13, color: "#475569", lineHeight: 1.5 }}>
      <span style={{ fontWeight: 600, color: "#1e293b", display: "block", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 2 }}>
        {label}
      </span>
      {value}
    </div>
  );
}

export default function EInvoicingTracker() {
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [expandAll, setExpandAll] = useState(false);

  const stats = useMemo(() => {
    const s = { Live: 0, "Partially Live": 0, Upcoming: 0, Voluntary: 0 };
    countries.forEach((c) => { s[c.status] = (s[c.status] || 0) + 1; });
    return s;
  }, []);

  const regionCounts = useMemo(() => {
    const rc = {};
    countries.forEach((c) => { rc[c.region] = (rc[c.region] || 0) + 1; });
    return rc;
  }, []);

  const filtered = useMemo(() => {
    let result = countries.filter((c) => {
      const matchesSearch =
        !search ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.summary.toLowerCase().includes(search.toLowerCase()) ||
        c.mandateType.toLowerCase().includes(search.toLowerCase()) ||
        c.format.toLowerCase().includes(search.toLowerCase()) ||
        c.platform.toLowerCase().includes(search.toLowerCase());
      const matchesRegion = regionFilter === "All" || c.region === regionFilter;
      const matchesStatus = statusFilter === "All" || c.status === statusFilter;
      return matchesSearch && matchesRegion && matchesStatus;
    });
    result.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "date") {
        const dA = a.effectiveDate || "9999";
        const dB = b.effectiveDate || "9999";
        return dA.localeCompare(dB);
      }
      if (sortBy === "status") {
        const order = { Live: 0, "Partially Live": 1, Upcoming: 2, Voluntary: 3 };
        return (order[a.status] ?? 4) - (order[b.status] ?? 4);
      }
      if (sortBy === "region") {
        return regionOrder.indexOf(a.region) - regionOrder.indexOf(b.region) || a.name.localeCompare(b.name);
      }
      return 0;
    });
    return result;
  }, [search, regionFilter, statusFilter, sortBy]);

  const pillStyle = (active) => ({
    padding: "6px 14px",
    borderRadius: 20,
    border: `1px solid ${active ? "#6366f1" : "#e2e8f0"}`,
    background: active ? "#6366f1" : "#fff",
    color: active ? "#fff" : "#475569",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: active ? 600 : 400,
    transition: "all 0.15s ease",
    whiteSpace: "nowrap",
  });

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', maxWidth: 960, margin: "0 auto", padding: "24px 16px", background: "#f8fafc", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#0f172a", margin: 0 }}>
          🌐 Global E-Invoicing Mandate Tracker
        </h1>
        <p style={{ color: "#64748b", fontSize: 14, margin: "6px 0 0" }}>
          Last updated: {LAST_UPDATED} · {countries.length} countries tracked
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10, marginBottom: 20 }}>
        {Object.entries(stats).map(([status, count]) => {
          const sc = statusConfig[status];
          return (
            <div
              key={status}
              onClick={() => setStatusFilter(statusFilter === status ? "All" : status)}
              style={{
                background: statusFilter === status ? sc.bg : "#fff",
                border: `1px solid ${statusFilter === status ? sc.border : "#e2e8f0"}`,
                borderRadius: 10,
                padding: "12px 16px",
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              <div style={{ fontSize: 28, fontWeight: 800, color: sc.color }}>{count}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: sc.color, marginTop: 2 }}>
                {sc.icon} {status}
              </div>
            </div>
          );
        })}
      </div>

      {/* Search */}
      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Search countries, formats, platforms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: 10,
            border: "1px solid #e2e8f0",
            fontSize: 14,
            outline: "none",
            boxSizing: "border-box",
            background: "#fff",
          }}
        />
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8", alignSelf: "center", marginRight: 4 }}>REGION:</span>
        <button onClick={() => setRegionFilter("All")} style={pillStyle(regionFilter === "All")}>All</button>
        {regionOrder.map((r) => (
          <button key={r} onClick={() => setRegionFilter(regionFilter === r ? "All" : r)} style={pillStyle(regionFilter === r)}>
            {r} ({regionCounts[r] || 0})
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20, alignItems: "center" }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8", marginRight: 4 }}>SORT:</span>
        {["name", "status", "date", "region"].map((s) => (
          <button key={s} onClick={() => setSortBy(s)} style={pillStyle(sortBy === s)}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: "#64748b", fontWeight: 500 }}>
          {filtered.length} {filtered.length === 1 ? "country" : "countries"}
        </span>
      </div>

      {/* Country cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map((c) => (
          <CountryCard key={c.name} country={c} />
        ))}
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: 40, color: "#94a3b8", fontSize: 15 }}>
            No countries match your search criteria.
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", marginTop: 32, padding: "16px 0", borderTop: "1px solid #e2e8f0", color: "#94a3b8", fontSize: 12 }}>
        Data sourced from VATupdate, KPMG, EY, Sovos, government tax authority portals.
        <br />Auto-updated daily via E-Invoicing Mandate Tracker scheduled task.
      </div>
    </div>
  );
}
