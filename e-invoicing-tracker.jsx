import { useState, useMemo } from "react";

const LAST_UPDATED = "May 5, 2026";

const recentChanges = [
  // May 2026
  { date: "May 5", country: "Burkina Faso", type: "New", change: "Added to tracker. DGI launched the Certified Electronic Invoice (FEC — Facture Électronique Certifiée) system in January 2026. Mandatory compliance for all domestic taxable persons with annual turnover ≥ XOF 50M begins July 1, 2026 (following preparatory phase). Covers B2B, B2G, and B2C transactions. Real-time clearance model. Penalties XOF 500,000–2,000,000 for non-compliance.", source: "https://www.vatupdate.com/2026/02/01/burkina-faso-fec-e-invoicing-scope-timeline-exemptions-and-penalties-for-2026-rollout/" },
  { date: "May 5", country: "UAE", type: "Update", change: "Voluntary 4-corner Peppol e-invoicing model officially launched (Apr 21–May 1, 2026) via EmaraTax platform — businesses can now select an Accredited Service Provider and begin voluntary e-invoice exchange ahead of mandatory pilot. 5-corner model (Corner 5 tax reporting) going live ahead of mandatory pilot Jul 1, 2026. Mandatory phases unchanged: large businesses (≥AED 50M) from Jan 1, 2027.", source: "https://www.vatupdate.com/2026/05/04/uae-launches-optional-4-corner-peppol-e-invoicing-mandatory-5-corner-model-coming-in-2027/" },
  { date: "May 5", country: "Bosnia and Herzegovina", type: "Update", change: "Additional details confirmed: Fiscalization Law enacted Feb 12, 2026; full system implementation within 18 months. Detailed bylaws to be adopted within 180 days. Penalties confirmed: EUR 1,530–15,300 (higher fines and possible temporary business bans for repeat violations). Republika Srpska and Brčko District have separate fiscal systems — businesses operating nationwide must comply with multiple regulations.", source: "https://www.vatupdate.com/2026/05/03/bosnia-and-herzegovina-mandates-e-invoicing-and-real-time-reporting-under-new-fiscalization-law/" },
  { date: "May 4", country: "Democratic Republic of Congo", type: "New", change: "Added to tracker. DRC ended its e-invoicing grace period; full enforcement of mandatory standardized e-invoicing (facture normalisée) began May 2026. VAT deductions only allowed with compliant standardized invoices; non-compliant invoices no longer eligible for correction. First phase of mandatory VAT e-invoicing and fiscal devices launched Sep 15, 2024.", source: "https://www.vatupdate.com/2026/05/03/dr-congo-fully-enforces-e-invoicing-grace-period-ends-stricter-compliance-for-taxpayers-begins/" },
  { date: "May 4", country: "Dominican Republic", type: "Status", change: "Status upgraded: Partially Live → Live. Phase 3 deadline (May 15, 2026) for Small, Micro, Unclassified Taxpayers and state entities has now passed. e-CF (Comprobante Fiscal Electrónico) is now the only valid invoicing method for all DGII-registered businesses nationwide under Law No. 32-23.", source: "https://edicomgroup.com/blog/invoice-electronically-in-the-dominican-republic" },
  { date: "May 4", country: "Malaysia", type: "Update", change: "Phase 4 interim relaxation period (penalty-free) extended a further 12 months to Dec 31, 2027 (from Dec 31, 2026). Specific Guide v4.7 published Apr 20, 2026 replacing v4.6. Mandatory implementation date of Jan 1, 2026 unchanged; only penalty enforcement delayed. Full enforcement from Jan 1, 2028.", source: "https://www.vatupdate.com/2026/04/23/malaysia-updates-e-invoicing-framework-specific-guide-v4-7-issued-and-phase-4-relaxation-extended-to-31-december-2027/" },
  { date: "May 4", country: "Bolivia", type: "Update", change: "Groups 9–12 e-invoicing deadline extended to Oct 1, 2026 (from Apr 1, 2026). 27,973 taxpayers in Groups 9–12 may continue using existing invoicing methods until Sep 30, 2026 under RND No. 102600000007. From Oct 1, 2026, only assigned electronic modality accepted.", source: "https://www.vatupdate.com/2026/04/27/bolivia-extends-e-invoicing-deadline-for-taxpayers-in-groups-9-12-to-september-30-2026/" },
  { date: "May 4", country: "Brazil", type: "Update", change: "Simples Nacional taxpayers (microenterprises/small businesses) must use National NFS-e (electronic service invoice) exclusively via the National Issuer from Sep 1, 2026. Separately, e-invoice confirmation deadline halved from 180 to 90 days from June 2026; PAA (Procurador da Autorização de Acesso) framework introduced for delegated NF-e issuance.", source: "https://www.vatupdate.com/2026/05/01/brazil-requires-national-electronic-service-invoice-for-simples-nacional-taxpayers-starting-september-2026/" },
  { date: "May 4", country: "Morocco", type: "Update", change: "DGI completed the 2025/26 B2B e-invoicing pilot. Full rollout planned under the 2026 Finance Act; no mandatory implementation dates announced yet. DGI pre-launch update published May 2, 2026 confirming the platform is evaluating post-audit vs CTC model. UBL and CII formats planned.", source: "https://www.vatupdate.com/2026/05/02/dgi-electronic-invoicing-program-pre-launch-update-and-next-steps/" },
  { date: "May 4", country: "Germany", type: "Milestone", change: "ZUGFeRD 2.5 released May 20, 2026. Introduces native gross invoice support (required for book trade, publishing, petroleum) and aligns with latest EN 16931 code lists. FeRD published updated reference templates for construction, leasing, reverse charge and simplified invoices.", source: "https://www.vatupdate.com/2026/05/03/zugferd-2-5-launch-en-16931-alignment-and-gross-invoicing-for-germany-and-france/" },
  { date: "May 4", country: "Italy", type: "Milestone", change: "Technical specifications v1.9.1 (issued Mar 31, 2026) became mandatory May 15, 2026. Updated controls on invoice code 00327, revised WS/SFTP accreditation procedures, new AltriDatiGestionali codes for sports workers, updated recipient code handling.", source: "https://www.fiscal-requirements.com/news/5271" },
  { date: "May 1", country: "Malawi", type: "Milestone", change: "MRA Electronic Invoicing System (EIS) officially went live today as mandatory for all VAT-registered businesses. Pilot phase (Feb 1–Apr 30) ended; legacy EFD-generated invoices no longer accepted for VAT input credit claims. Civil society organizations backing rollout; some business resistance reported. Real-time invoice validation via MRA EIS portal now enforced.", source: "https://malawi24.com/2026/05/01/csos-back-eis-rollout-warn-of-business-resistance-vat-abuse/" },
  { date: "May 1", country: "Greece", type: "Update", change: "Transition period for large taxpayers (>€1M revenue) ends May 3, 2026. From May 3, penalties of 50% of VAT due on unissued invoices apply for non-VATable transactions €500–€1,000. Phase 1 fully enforceable; Phase 2 (SMEs and others) Oct 1, 2026 with transition through Dec 31, 2026.", source: "https://www.fiscal-requirements.com/news/5193" },
  { date: "May 1", country: "Dominican Republic", type: "Update", change: "Phase 3 (final phase) deadline confirmed for May 15, 2026: Small, Micro, and Unclassified Taxpayers and state entities must implement mandatory e-CF (Comprobante Fiscal Electrónico) by this date. Law No. 32-23 schedule fully in force; no further extensions announced. After May 15, e-CF becomes only valid invoicing method for all DGII-registered businesses.", source: "https://edicomgroup.com/blog/invoice-electronically-in-the-dominican-republic" },
  // April 2026
  { date: "Apr 30", country: "Malawi", type: "Status", change: "Status upgraded: Upcoming → Live. MRA Electronic Invoicing System (EIS) became mandatory for all VAT-registered businesses from May 1, 2026 (confirmed launch after pilot extended to Apr 30). Legacy EFD-generated invoices no longer accepted for VAT input credit claims.", source: "https://sharedserviceslink.com/news/malawi-confirms-mandatory-vat-e-invoicing-from-1st-may-2026" },
  { date: "Apr 30", country: "Colombia", type: "Update", change: "DIAN voluntary correction regime for e-invoicing non-compliance (capped penalties 10–1,500 UVT) officially closed Apr 30, 2026. Taxpayers who did not self-correct by end of day revert to standard DIAN penalty framework.", source: "https://www.vatupdate.com/2026/04/09/colombia-proposes-voluntary-correction-regime-for-invoicing-errors-with-capped-penalties-until-april-2026/" },
  { date: "Apr 29", country: "Hungary", type: "Update", change: "Government Decree 80/2026: mandatory fuel type product codes (#NB#, #PB#, #NG#, #PG#) required on receipts and invoices at fuel stations from Sep 1, 2026. Codes must appear as closing string in NAV RTIR cash register logs and invoicing system lineDescription fields. Non-compliance risks rejected data submissions and audit penalties.", source: "https://www.fiscal-requirements.com/news/5313" },
  { date: "Apr 25", country: "Luxembourg", type: "New", change: "Added to tracker. B2G e-invoicing via Peppol BIS 3.0 mandatory since March 2023 for all suppliers to government. No current B2B mandate; national legislation expected 2026 for domestic B2B mandate by mid-2028/early 2029. ViDA cross-border mandate applies from Jul 2030.", source: "https://www.vatupdate.com/2026/04/25/briefing-document-podcast-e-invoicing-and-e-reporting-in-luxembourg/" },
  { date: "Apr 24", country: "North Macedonia", type: "New", change: "Added to tracker. e-Faktura mandatory e-invoicing programme launched by PRO and Ministry of Finance. CTC clearance model: invoices transmitted in real-time for registration and validation. Pilot with selected businesses began Jan 1, 2026. Mandatory adoption starts Q3 2026 (Oct 1, 2026). PRO urging businesses to join testing phase; only official PRO channels for onboarding.", source: "https://rtcsuite.com/north-macedonias-e-faktura-the-road-to-a-real-time-mandatory-e-invoicing-regime-by-2026/" },
  { date: "Apr 24", country: "Romania", type: "Update", change: "CNP-identified individuals (PFAs/sole traders) e-Factura transmission deadline extended to June 1, 2026 — previous deadline was January 15, 2026 under GEO 89/2025. Broader PFA expansion (all individuals) still on track for June 1, 2026 per Apr 11 entry.", source: "https://www.vatupdate.com/2026/04/14/ro-e-factura-deadline-for-cnp-identified-individuals-extended-to-june-1-2026/" },
  { date: "Apr 23", country: "Kazakhstan", type: "New", change: "Added to tracker. Mandatory e-invoicing via IS ESF clearance platform effective Jan 1, 2026 for all VAT-registered entities (no turnover threshold). Grace period through Mar 31, 2026 for certain taxpayers. VAT credits only claimable when confirmed in IS ESF before filing VAT return. Penalties up to 30% of transaction value for non-compliance.", source: "https://www.vatupdate.com/2026/04/18/vat-credit-only-via-e-invoice-system-key-changes-for-taxpayers-from-2026/" },
  { date: "Apr 23", country: "UAE", type: "Update", change: "FTA reduced several administrative tax penalties and updated VAT, excise, and corporate tax compliance rules effective April 14, 2026 to ease business burdens while aligning with international best practices. ClearTax approved as Accredited Service Provider under FTA e-invoicing framework ahead of July 2026 pilot.", source: "https://www.vatupdate.com/2026/04/17/uae-fta-reduces-tax-penalties-and-updates-compliance-rules-effective-april-2026/" },
  { date: "Apr 22", country: "Brazil", type: "Update", change: "PIS/COFINS invoicing rules under Complementary Law 224/2025 effective Apr 1, 2026 — transactions previously taxed at zero rate now subject to reduced tax (10% of normal rate). Businesses must use CST code 06 in NF-e and reference Complementary Law 224/2025 in additional tax information. Tax credits retained.", source: "https://www.vatupdate.com/2026/04/17/brazil-introduces-new-pis-cofins-invoicing-rules-under-complementary-law-224-2025-starting-april-2026/" },
  { date: "Apr 22", country: "Brazil", type: "Update", change: "SINIEF Adjustments 10–13/2026 introduce e-invoicing flexibility: retailers may choose between NF-e and NFC-e, DANFE Type 2 (Simplified Non-fiscal Receipt) rollout Aug 3, 2026, new restrictions on NF-e references to NFC-e from Oct 5, 2026, enhanced offline contingency.", source: "https://www.vatupdate.com/2026/04/20/brazil-modernizes-e-invoicing-new-rules-simplify-retail-enable-digital-receipts-reduce-printing/" },
  { date: "Apr 22", country: "Argentina", type: "Update", change: "General Resolution RG 5824/2026 eliminates remaining e-invoicing exceptions; all taxpayers (including previously excluded categories) mandated to issue electronic invoices from July 1, 2026. Companies must adapt systems and controls to comply.", source: "https://llbsolutions.com/electronic-invoicing-in-argentina-2026-end-of-exceptions-under-rg-5824-2026/" },
  { date: "Apr 22", country: "Vietnam", type: "Update", change: "Ministry of Finance draft decree (Apr 20) simplifies e-invoicing for e-commerce and low-value transactions; platform operators may issue e-invoices on behalf of individual sellers. Decree 310/2025/ND-CP (effective Jan 16, 2026) restructures invoice-violation penalty framework by transaction nature and number of invoices.", source: "https://www.vatupdate.com/2026/04/20/vietnam-proposes-e-invoicing-reforms-for-e-commerce-small-businesses-and-high-risk-taxpayers/" },
  { date: "Apr 22", country: "Nigeria", type: "Update", change: "Medium taxpayers (₦1bn–₦5bn turnover) confirmed go-live July 1, 2026 via Merchant Buyer Solution (MBS) platform; compliance enforcement from January 2027. Phase 1 (large taxpayers) live since Nov 2025. Peppol BIS Billing 3.0 UBL (XML/JSON).", source: "https://www.vatupdate.com/2026/02/28/nigeria-sets-e-invoicing-rollout-dates-for-medium-and-emerging-taxpayers-through-2028/" },
  { date: "Apr 21", country: "Spain", type: "Update", change: "Mandatory B2B e-invoicing start date confirmed as October 1, 2027 for large businesses (≥€8M turnover); SMEs approximately 2028. effectiveDate updated from 'mid-2027' to 'Oct 2027'.", source: "https://www.vatupdate.com/2026/04/17/spain-sets-the-date-mandatory-b2b-e-invoicing-starts-on-1-october-2027/" },
  { date: "Apr 21", country: "Chile", type: "Update", change: "SII postponed new dispatch-guide and e-invoice compliance requirements for goods transport to November 1, 2026 (from May 1, 2026) via Exempt Resolution SII No. 52. Enhanced origin/destination and driver/vehicle documentation requirements delayed.", source: "https://www.vatupdate.com/2026/04/17/chile-delays-new-dispatch-guide-and-e-invoice-requirements-to-november-2026/" },
  { date: "Apr 21", country: "Israel", type: "Update", change: "Real-time invoicing allocation-number threshold further reduced: NIS 20,000 (2025) → NIS 10,000 (Jan 2026) → NIS 5,000 (Jun 2026), under Economic Efficiency Law 2023. Businesses must update invoicing systems.", source: "https://www.vatupdate.com/2026/04/12/israel-to-lower-invoice-allocation-number-thresholds-further-in-2026-for-real-time-tax-compliance/" },
  { date: "Apr 21", country: "Slovakia", type: "Update", change: "Voluntary e-invoicing use confirmed available from May 1, 2026 ahead of mandatory Jan 2027. All eKasa-registered sellers must offer cashless payment for transactions over €1 from May 1, 2026.", source: "https://www.vatupdate.com/2026/04/16/slovakia-to-launch-mandatory-e-invoicing-for-businesses-from-january-2027-key-steps-and-timeline/" },
  { date: "Apr 16", country: "Italy", type: "Update", change: "Revenue Agency e-invoicing specifications v1.9.1 (issued Mar 31, 2026) become mandatory May 15, 2026 — updated controls on invoices with code 00327, updated WS/SFTP accreditation procedures, new AltriDatiGestionali coding for sports workers, recipient code limit changes", source: "https://www.fiscal-requirements.com/news/5271" },
  { date: "Apr 16", country: "Colombia", type: "Update", change: "DIAN draft resolution establishes voluntary correction regime for e-invoicing non-compliance — taxpayers may self-correct formal breaches by Apr 30, 2026 with capped penalties (10–1,500 UVT / ~US$143–$21,440 range)", source: "https://www.vatupdate.com/2026/04/09/colombia-proposes-voluntary-correction-regime-for-invoicing-errors-with-capped-penalties-until-april-2026/" },
  { date: "Apr 15", country: "France", type: "Update", change: "DGFIP announced intent to become France's Peppol Authority; first Change Management Board meeting held Mar 26 with DGFIP, AIFE, OpenPeppol, FNFE. Pilot progress: 10,400+ issuers, 15,100+ receivers, 112 Approved Platforms engaged", source: "https://www.vatupdate.com/2026/04/14/e-invoicing-reform-key-takeaways-from-the-fnfe-mpe-plenary-of-3-april-2026/" },
  { date: "Apr 14", country: "Singapore", type: "Update", change: "Full mandatory timeline confirmed: all GST-registered businesses must use InvoiceNow by Apr 2031 — phased from Apr 2028 (≤S$200K) through Apr 2031 (>S$4M)", source: "https://www.imda.gov.sg/resources/press-releases-factsheets-and-speeches/factsheets/2026/committee-of-supply-2026" },
  { date: "Apr 14", country: "France", type: "Update", change: "Architecture confirmed: PPF limited to directory/data hub role; all invoice exchange via accredited Plateformes Agréées (PA, formerly PDP)", source: "https://blog.weproc.com/en/electronic-invoicing/electronic-invoicing-architecture-ppf-pa-od-chorus-pro/" },
  { date: "Apr 14", country: "Saudi Arabia", type: "Update", change: "Wave 24 active — ZATCA notifying taxpayers (>SAR 375K revenue) from Apr 1; integration deadline Jun 30, 2026", source: "https://zatca.gov.sa/en/Pages/news_1426.aspx" },
  { date: "Apr 14", country: "Oman", type: "Update", change: "Fawtara system details confirmed — Peppol Authority approved, Phase 1 (Aug 2026) targets ~153 largest taxpayers", source: "https://www.vatupdate.com/2025/12/26/omans-fawtara-phased-rollout-of-mandatory-b2b-e-invoicing-begins-august-2026/" },
  { date: "Apr 14", country: "Slovakia", type: "Update", change: "Parliament approved mandatory B2B law (Dec 2025); 5-corner Peppol model with certified Digital Postmen, mandatory Jan 2027", source: "https://sovos.com/regulatory-updates/vat/slovakia-parliament-approves-draft-law-for-mandatory-b2b-e-invoicing/" },
  { date: "Apr 14", country: "Malaysia", type: "Update", change: "Phase 5 cancelled — Cabinet raised minimum threshold to RM1M, exempting smaller businesses", source: "https://www.vatcalc.com/malaysia/malaysia-e-invoicing-2023/" },
  { date: "Apr 14", country: "Malawi", type: "New", change: "Added (82 countries). MRA EIS mandatory from May 1, 2026 for all VAT-registered businesses", source: "https://www.vatcalc.com/malawi/malawi-e-invoicing-2024/" },
  { date: "Apr 14", country: "Belize", type: "New", change: "Added (82 countries). GST e-invoicing mandate confirmed for 2027 under amended GST Act", source: "https://www.vatupdate.com/2026/04/11/belize-advances-mandatory-e-invoicing-under-its-gst-reform-agenda/" },
  { date: "Apr 13", country: "Ghana", type: "Status", change: "Status upgraded: Upcoming \u2192 Live. E-VAT now mandatory for all VAT-registered businesses (no revenue threshold)", source: "https://www.fonoa.com/resources/blog/ghana-e-vat-e-invoicing-2026" },
  { date: "Apr 13", country: "Namibia", type: "New", change: "Added (80 countries). Budget proposes VAT Act amendments for e-invoicing; launch delayed to 2028", source: "https://www.vatupdate.com/2026/04/09/namibias-2026-27-budget-vat-act-amendments-to-boost-key-sectors-and-modernise-compliance/" },
  { date: "Apr 13", country: "South Africa", type: "Update", change: "Tax Administration Laws Amendment Act 4 of 2026 promulgated — voluntary e-reporting + SARS e-invoicing authority", source: "https://regfollower.com/south-africa-enacts-2026-tax-reforms-with-corporate-tax-vat-fiscal-law-changes/" },
  { date: "Apr 13", country: "Greece", type: "Update", change: "Mandatory B2B e-invoicing: large taxpayers (>\u20AC1M) from Mar 2, 2026; all others by Oct 1, 2026", source: "https://www.vatcalc.com/greece/greece-mydata-e-book-and-e-invoices-update/" },
  { date: "Apr 13", country: "Malaysia", type: "Update", change: "Phase 4 grace period extended to Dec 31, 2026 for SMEs (RM1M\u2013RM5M turnover)", source: "https://jomeinvoice.my/phase-4-einvoice-deadline-extended-sme-guide-2026/" },
  { date: "Apr 12", country: "Bosnia & Herzegovina", type: "New", change: "Added. Federation passed Fiscalization Bill (Feb 2026); B2C by 2028, B2B/B2G by 2029", source: "https://www.vatupdate.com/2026/04/11/bosnia-and-herzegovina-mandates-e-invoicing-and-real-time-transaction-reporting-for-all-businesses/" },
  { date: "Apr 12", country: "Latvia", type: "Correction", change: "Status corrected: Live \u2192 Partially Live. B2B postponed from 2026 to Jan 2028; only B2G mandatory", source: "https://www.comarch.com/trade-and-services/data-management/legal-regulation-changes/latvia-postpones-b2b-e-invoicing-mandate-to-2028-amid-technical-delays/" },
  { date: "Apr 12", country: "Belgium", type: "Update", change: "Penalty details added: \u20AC1,500/\u20AC3,000/\u20AC5,000 graduated fines + 60\u2013100% of VAT per invoice", source: "https://www.vertexinc.com/resources/resource-library/belgiums-2026-e-invoicing-regulations-explained-scope-deadlines-and-penalties" },
  { date: "Apr 12", country: "Norway", type: "Update", change: "Mandatory B2B e-invoicing formally instructed for Jan 1, 2027 (accelerated from 2028)", source: "https://www.vatupdate.com/2026/03/17/norway-plans-mandatory-b2b-e-invoicing-from-2027-and-full-digital-bookkeeping-by-2030/" },
  { date: "Apr 12", country: "Gabon", type: "New", change: "Added. 2026 Finance Law mandates FNE for all taxpayers; soft landing through Jul 2026", source: "https://kpmg.com/us/en/taxnewsflash/news/2026/03/tnf-africa-gabon-finance-law-2026-includes-mandatory-e-invoicing-other-recent-tax-developments.html" },
  { date: "Apr 11", country: "Ireland", type: "New", change: "Added. Three-phase B2B mandate: large corporates Nov 2028, intra-EU Nov 2029, ViDA Jul 2030", source: "https://www.vatupdate.com/2026/03/13/ireland-sets-phased-rollout-for-mandatory-b2b-e-invoicing-and-real-time-vat-reporting/" },
  { date: "Apr 11", country: "Cameroon", type: "New", change: "Added. 2026 Finance Law mandates real-time e-invoicing via clearance model", source: "https://www.vatupdate.com/2026/02/26/cameroon-mandates-e-invoicing-in-2026-finance-law/" },
  { date: "Apr 11", country: "Pakistan", type: "New", change: "Added. FBR e-invoicing mandate expanding via STGO 01/2026 with real-time reporting", source: "https://www.vatupdate.com/2026/04/11/pakistan-clarifies-integration-and-amendment-rules-for-mandatory-e-invoicing/" },
  { date: "Apr 11", country: "Serbia", type: "Update", change: "Apr 2026 amendments: retail e-invoicing for corporate cardholders mandatory; new Rulebook effective", source: "https://www.comarch.com/trade-and-services/data-management/legal-regulation-changes/serbia-adopts-key-amendments-to-electronic-invoicing-and-vat-laws-in-2026/" },
  { date: "Apr 11", country: "Denmark", type: "Update", change: "Adopted Nemhandel BIS 4 as unified e-invoicing standard; OIOUBL 2.1 sunset Jul 2029", source: "https://www.vatupdate.com/2026/03/23/denmark-unveils-nemhandel-bis-4-e-invoicing-standard-cancels-oioubl-3-0-sets-2029-migration-timeline/" },
  { date: "Apr 11", country: "Romania", type: "Update", change: "Expanding mandatory e-invoicing to individuals (PFAs) from Jun 1, 2026; e-VAT enforcement tightening", source: "https://www.fiscal-requirements.com/news/5058" },
  { date: "Apr 11", country: "Philippines", type: "Update", change: "BIR extended full mandate deadline to Dec 31, 2026 (from Mar 2026)", source: "https://kpmg.com/us/en/taxnewsflash/news/2025/10/philippines-e-invoicing-compliance-deadline-extended.html" },
  { date: "Apr 11", country: "Hungary", type: "Update", change: "Public consultation on ViDA-aligned mandatory e-invoicing launched; EN 16931 confirmed", source: "https://www.vatupdate.com/2026/03/15/hungary-to-mandate-real-time-e-invoicing-and-vat-reporting-under-vida-reform-by-2026/" },
  { date: "Apr 11", country: "Poland", type: "Status", change: "Status: Partially Live \u2192 Live. KSeF Phase 2 live Apr 1 for all VAT-registered businesses", source: "https://sovos.com/regulatory-updates/global-vat/spain-adopts-mandatory-b2b-e-invoicing/" },
  { date: "Apr 11", country: "Spain", type: "Update", change: "Royal Decree 238/2026 published Mar 31 mandating B2B e-invoicing; large biz ~mid-2027, others ~2028", source: "https://kpmg.com/us/en/taxnewsflash/news/2026/03/spain-e-invoicing-mandate-b2b.html" },
  { date: "Apr 11", country: "Belgium", type: "Update", change: "Grace period ended Apr 2026 \u2014 penalties now active for B2B e-invoicing non-compliance", source: "https://www.vertexinc.com/resources/resource-library/belgiums-2026-e-invoicing-regulations-explained-scope-deadlines-and-penalties" },
  { date: "Apr 11", country: "Singapore", type: "Update", change: "Mandatory for new voluntary GST registrants from Apr 1, 2026", source: "https://www.iras.gov.sg/taxes/goods-services-tax-(gst)/gst-invoicenow-requirement" },
  { date: "Apr 11", country: "Bolivia", type: "Update", change: "Groups 10\u201312 must begin e-invoicing from Apr 1, 2026", source: "https://www.vatupdate.com/2026/03/28/bolivia-e-invoicing-groups-10-12-deadline/" },
  { date: "Apr 11", country: "Turkey", type: "Update", change: "Updated e-invoice package and VAT code controls effective Apr 1, 2026", source: "https://www.vatupdate.com/2026/03/25/turkey-e-invoice-vat-code-update-april-2026/" },
  { date: "Apr 11", country: "Germany", type: "Update", change: "Published GEBA framework; retiring older XRechnung profiles. ZUGFeRD v2.5 releasing May 20", source: "https://www.vatupdate.com/2026/03/20/germany-geba-framework-xrechnung-zugferd/" },
  { date: "Apr 11", country: "UAE", type: "Update", change: "Introduced 24-month grace period for intra-VAT group e-invoicing obligations", source: "https://www.vatupdate.com/2026/04/06/uae-vat-group-e-invoicing-grace-period/" },
  // March 2026 (from web research, pre-tracker)
  { date: "Mar 31", country: "Spain", type: "Milestone", change: "Council of Ministers approved Royal Decree 238/2026 mandating B2B structured e-invoicing", source: "https://tradeshift.com/resources/compliance-fr/spain-b2b-e-invoicing-mandate-2027/" },
  { date: "Mar 30", country: "Latvia", type: "Milestone", change: "Voluntary B2B e-invoicing opened ahead of mandatory 2028 phase; Peppol-aligned", source: "https://www.comarch.com/trade-and-services/data-management/legal-regulation-changes/latvia-postpones-b2b-e-invoicing-mandate-to-2028-amid-technical-delays/" },
  { date: "Mar 23", country: "Denmark", type: "Milestone", change: "Officially unveiled Nemhandel BIS 4 standard; cancelled OIOUBL 3.0", source: "https://www.vatupdate.com/2026/03/23/denmark-unveils-nemhandel-bis-4-e-invoicing-standard-cancels-oioubl-3-0-sets-2029-migration-timeline/" },
  { date: "Mar 17", country: "Norway", type: "Milestone", change: "Government formally instructed mandatory B2B e-invoicing from Jan 2027 (one year earlier)", source: "https://www.vatupdate.com/2026/03/17/norway-plans-mandatory-b2b-e-invoicing-from-2027-and-full-digital-bookkeeping-by-2030/" },
  { date: "Mar 15", country: "Hungary", type: "Milestone", change: "Launched public consultation on ViDA-aligned mandatory e-invoicing reform", source: "https://www.vatupdate.com/2026/03/15/hungary-to-mandate-real-time-e-invoicing-and-vat-reporting-under-vida-reform-by-2026/" },
  { date: "Mar 13", country: "Ireland", type: "Milestone", change: "Confirmed three-phase B2B e-invoicing mandate under VAT Modernisation programme", source: "https://www.vatupdate.com/2026/03/13/ireland-sets-phased-rollout-for-mandatory-b2b-e-invoicing-and-real-time-vat-reporting/" },
  { date: "Mar 2", country: "Greece", type: "Milestone", change: "Mandatory B2B e-invoicing went live for large taxpayers (>\u20AC1M revenue)", source: "https://www.vatcalc.com/greece/greece-mydata-e-book-and-e-invoices-update/" },
  { date: "Mar 2", country: "France", type: "Milestone", change: "Pilot programme for Sep 2026 mandatory B2B e-invoicing launched (runs through Aug 2026)", source: "https://www.vertexinc.com/en-gb/resources/resources-library/navigating-urgent-global-e-invoicing-mandates-march-2026-regulatory-alert" },
];

const typeConfig = {
  New: { color: "#16a34a", bg: "#dcfce7" },
  Update: { color: "#2563eb", bg: "#eff6ff" },
  Status: { color: "#ea580c", bg: "#fff7ed" },
  Correction: { color: "#dc2626", bg: "#fef2f2" },
  Milestone: { color: "#7c3aed", bg: "#f5f3ff" },
};

const countries = [
  // ── Europe ──
  { name: "Austria", region: "Europe", status: "Partially Live", effectiveDate: "Jan 2014", mandateType: "B2G", model: "Post-Audit", format: "Peppol BIS", platform: "USP", penalties: "Administrative fines for non-compliance with B2G requirements", summary: "B2G e-invoicing mandatory since 2014 via Peppol. No B2B mandate yet; monitoring EU ViDA developments." },
  { name: "Belgium", region: "Europe", status: "Live", effectiveDate: "Jan 2026", mandateType: "B2B + B2G", model: "Post-Audit", format: "Peppol UBL 2.1", platform: "Peppol Network", penalties: "Graduated fines: €1,500 (1st offence), €3,000 (2nd), €5,000 (3rd+) per quarter; plus 60–100% of VAT due per invoice for non-issuance", summary: "Mandatory B2B e-invoicing since Jan 1, 2026 via Peppol. Grace period ended Apr 2026 — graduated penalties now enforced. Over 1M Peppol recipients nationwide." },
  { name: "Bosnia and Herzegovina", region: "Europe", status: "Upcoming", effectiveDate: "2028–2029", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "EN 16931 / XML with electronic signature + QR code", platform: "Central Fiscalization Platform (CFP) / Electronic Fiscal Systems (EFS)", penalties: "EUR 1,530–15,300 per violation; higher fines and temporary business bans for repeat violations", summary: "Fiscalization Law enacted Feb 12, 2026. Full system implementation within 18 months; detailed bylaws within 180 days. B2C: Electronic Fiscal Systems (EFS) with approved fiscal devices. B2B/B2G: Central Platform for Fiscalisation (CPF) managed by tax authorities for real-time reporting, invoice issuance, and customer review/payment. E-invoices must meet EN 16931 with electronic signatures and QR codes. Note: Republika Srpska and Brčko District have separate fiscal systems — businesses operating nationwide must comply with multiple regulations." },
  { name: "Bulgaria", region: "Europe", status: "Upcoming", effectiveDate: "2026", mandateType: "B2G", model: "Post-Audit", format: "EN 16931", platform: "NRA Portal", penalties: "TBD", summary: "Aligning with EU ViDA directive. B2G e-invoicing mandate expected 2026." },
  { name: "Croatia", region: "Europe", status: "Live", effectiveDate: "Jan 2026", mandateType: "B2B + B2G", model: "Clearance", format: "UBL 2.1 / CII", platform: "CIS (Fiskalizacija)", penalties: "Fines for non-issuance of fiscal invoices", summary: "Mandatory B2B e-invoicing launched Jan 1, 2026 through the CIS clearance system." },
  { name: "Czech Republic", region: "Europe", status: "Upcoming", effectiveDate: "Jan 2027", mandateType: "B2B", model: "Post-Audit", format: "ISDOC / EN 16931", platform: "MFCR Portal", penalties: "TBD", summary: "B2B e-invoicing mandate planned for Jan 2027. Legislation in progress, aligned with EU ViDA." },
  { name: "Denmark", region: "Europe", status: "Partially Live", effectiveDate: "2005", mandateType: "B2G", model: "Post-Audit", format: "OIOUBL / Nemhandel BIS 4", platform: "NemHandel", penalties: "Rejection of non-compliant B2G invoices", summary: "B2G mandatory since 2005 via OIOUBL/Peppol. Cancelled OIOUBL 3.0; officially adopted Nemhandel BIS 4 (Peppol BIS 4-based, EN 16931 compliant) as new unified standard. OIOUBL 2.1 remains until Jul 2029; migration to Nemhandel BIS 4 starts 2028." },
  { name: "Estonia", region: "Europe", status: "Upcoming", effectiveDate: "2027", mandateType: "B2G", model: "Post-Audit", format: "Peppol BIS / EN 16931", platform: "e-Arveldus", penalties: "TBD", summary: "Peppol-based B2G e-invoicing mandate planned for 2027, aligned with EU directive." },
  { name: "Finland", region: "Europe", status: "Partially Live", effectiveDate: "Apr 2020", mandateType: "B2G", model: "Post-Audit", format: "Peppol BIS / Finvoice", platform: "Peppol / Banking Networks", penalties: "Rejection of non-compliant B2G invoices", summary: "B2G mandatory since Apr 2020 via Peppol. Strong voluntary B2B adoption through Finvoice and banking networks." },
  { name: "France", region: "Europe", status: "Upcoming", effectiveDate: "Sep 2026", mandateType: "B2B + B2G", model: "Clearance", format: "Factur-X / UBL / CII", platform: "PPF + Plateformes Agréées (PA)", penalties: "€15 per non-compliant invoice (capped at €15,000/year)", summary: "Mandatory B2B e-invoicing from Sep 1, 2026 (large/mid-size companies issue + all receive). SMEs must issue by Sep 2027. Pilot running Feb–Aug 2026 with 10,400+ issuers, 15,100+ receivers, and 112 Approved Platforms engaged. Architecture confirmed: PPF acts only as central directory and tax data hub; all invoice exchange handled via accredited Plateformes Agréées (PA, formerly PDP). DGFIP announced intent to become France's Peppol Authority (FNFE-MPE plenary, Apr 3 2026); first Change Management Board meeting held Mar 26." },
  { name: "Germany", region: "Europe", status: "Partially Live", effectiveDate: "Jan 2025", mandateType: "B2B + B2G", model: "Post-Audit", format: "XRechnung / ZUGFeRD 2.5", platform: "Peppol / GEBA", penalties: "Rejection of non-compliant B2G invoices", summary: "B2B reception mandatory since Jan 2025; issuance mandatory from Jan 2027 for businesses >€800K turnover. Published GEBA framework Mar 2026. ZUGFeRD 2.5 released May 20, 2026 — introduces native gross invoice support (book trade, publishing, petroleum) and alignment with latest EN 16931 code lists; FeRD published updated reference templates for construction, leasing, and reverse charge scenarios." },
  { name: "Greece", region: "Europe", status: "Live", effectiveDate: "2020", mandateType: "B2B + B2G", model: "Clearance", format: "myDATA XML", platform: "myDATA / AADE", penalties: "50% of VAT amount for VATable transactions; €500–€1,000 for non-VAT transactions; Phase 1 penalties active from May 3, 2026", summary: "Mandatory real-time reporting via myDATA since 2020. Mandatory B2B e-invoicing for large taxpayers (>€1M revenue) live since Mar 2, 2026; transition period ends May 3, 2026 — penalties now actively enforced for Phase 1. All other taxpayers must comply by Oct 1, 2026 (transition through Dec 31, 2026). Compliance via private EDIPs or free government tools (timologio, myDATAapp)." },
  { name: "Ireland", region: "Europe", status: "Upcoming", effectiveDate: "Nov 2028", mandateType: "B2B + B2G", model: "Post-Audit", format: "EN 16931 / Peppol BIS", platform: "Revenue Online / Peppol", penalties: "TBD — phased enforcement from 2028", summary: "Three-phase rollout confirmed: large corporates must issue B2B e-invoices via Peppol from Nov 2028; all VAT-registered businesses in intra-EU trade from Nov 2029; full ViDA cross-border compliance by Jul 2030. Part of Ireland's VAT Modernisation programme to close the €1.7B VAT gap." },
  { name: "Hungary", region: "Europe", status: "Partially Live", effectiveDate: "Jul 2018", mandateType: "B2B + B2G", model: "Real-time Reporting", format: "NAV XML 3.0 / EN 16931", platform: "NAV Online Invoicing", penalties: "Up to HUF 500,000 per invoice for non-reporting", summary: "Real-time invoice data reporting mandatory since 2018 via NAV. Sector mandates live (energy Jul 2025, water Jan 2026). Public consultation on ViDA-aligned full e-invoicing mandate launched; EN 16931 format confirmed. Government Decree 80/2026: fuel stations must append mandatory fuel type codes (#NB#, #PB#, #NG#, #PG#) to receipts and invoices from Sep 1, 2026 for RTIR compliance. Broader receipt data-reporting obligation from Sep 1, 2026." },
  { name: "Italy", region: "Europe", status: "Live", effectiveDate: "Jan 2019", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "FatturaPA XML v1.9.1", platform: "SDI (Sistema di Interscambio)", penalties: "70–400% of VAT amount for non-compliance", summary: "Comprehensive clearance model since 2019 for all invoice types. All invoices must pass through SDI for validation. New technical specifications v1.9.1 (issued Mar 31, 2026) mandatory from May 15, 2026 — includes updated controls on invoice code 00327, revised WS/SFTP accreditation procedures, new AltriDatiGestionali codes for sports workers, and updated recipient code handling." },
  { name: "Latvia", region: "Europe", status: "Partially Live", effectiveDate: "Jan 2026", mandateType: "B2G (B2B from 2028)", model: "Post-Audit", format: "Peppol BIS 3.0 / EN 16931", platform: "SRS Portal", penalties: "Administrative fines for non-compliance", summary: "B2G e-invoicing mandatory from Jan 1, 2026. B2B mandate postponed to Jan 1, 2028 (originally 2026) per June 2025 parliamentary amendment. Voluntary B2B e-invoicing from Mar 30, 2026. Cabinet Regulations No. 749 adopted Dec 2025 set operational framework." },
  { name: "Lithuania", region: "Europe", status: "Upcoming", effectiveDate: "2025", mandateType: "B2G", model: "Post-Audit", format: "EN 16931", platform: "i.SAF", penalties: "TBD", summary: "B2G e-invoicing via i.SAF reporting system. Broader mandate under consideration." },
  { name: "Luxembourg", region: "Europe", status: "Partially Live", effectiveDate: "Mar 2023", mandateType: "B2G (B2B from ~2028)", model: "Post-Audit", format: "Peppol BIS 3.0", platform: "Peppol Network", penalties: "Rejection of non-compliant B2G invoices", summary: "B2G e-invoicing via Peppol BIS 3.0 mandatory for all suppliers to government since March 2023. No B2B mandate yet; national legislation expected 2026 to establish domestic mandatory B2B e-invoicing by mid-2028/early 2029, aligned with EU ViDA cross-border reporting mandate (Jul 2030)." },
  { name: "Netherlands", region: "Europe", status: "Upcoming", effectiveDate: "2030", mandateType: "B2B + B2G", model: "Post-Audit", format: "SI-UBL / Peppol BIS", platform: "Peppol Network", penalties: "TBD", summary: "Confirmed mandatory B2B e-invoicing by 2030 and domestic e-reporting by 2032." },
  { name: "North Macedonia", region: "Europe", status: "Upcoming", effectiveDate: "Oct 2026", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "XML (structured e-invoice)", platform: "PRO e-Faktura Platform", penalties: "TBD", summary: "e-Faktura programme launched July 1, 2025 by Public Revenue Office (PRO) and Ministry of Finance. CTC clearance model: all non-cash invoices must be transmitted to the PRO platform in real-time for registration and validation before legal issuance. Features: digital signatures, QR-based posting, ERP integration via API. Pilot with selected businesses since Jan 1, 2026. Mandatory adoption starts Q3/Oct 2026. Businesses urged to join testing phase through official PRO channels only." },
  { name: "Norway", region: "Europe", status: "Partially Live", effectiveDate: "2012", mandateType: "B2G (B2B from 2027)", model: "Post-Audit", format: "EHF / Peppol BIS", platform: "Peppol Network", penalties: "Rejection of non-compliant B2G invoices; B2B penalties TBD", summary: "B2G mandatory since 2012 via EHF/Peppol. Government formally instructed mandatory B2B e-invoicing from Jan 1, 2027 (accelerated from 2028). EHF will be mandatory standard. Full digital bookkeeping by Jan 2030." },
  { name: "Poland", region: "Europe", status: "Live", effectiveDate: "Apr 2026", mandateType: "B2B + B2G", model: "Clearance", format: "FA(3) XML", platform: "KSeF", penalties: "No sanctions during 2026 transition; penalties from 2027", summary: "KSeF Phase 2 live Apr 1, 2026 for all VAT-registered businesses (SMEs, sole proprietors). Phase 1 (large taxpayers >PLN 200M) went live Feb 1. Micro-entrepreneurs must comply by Jan 2027." },
  { name: "Portugal", region: "Europe", status: "Partially Live", effectiveDate: "Jan 2024", mandateType: "B2G + B2B", model: "Post-Audit", format: "CIUS-PT / UBL", platform: "eSPap / FE-AP", penalties: "Fines for non-compliance with B2G requirements", summary: "B2G mandatory; phased B2B rollout in progress via CIUS-PT format." },
  { name: "Romania", region: "Europe", status: "Live", effectiveDate: "Jul 2024", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "CIUS-RO / UBL 2.1", platform: "RO e-Factura / e-Transport", penalties: "Fines 5,000–10,000 RON per invoice", summary: "Mandatory B2B clearance since Jul 2024 via RO e-Factura. e-Transport for goods movement tracking. Expanding to individuals (PFAs identified by CNP): mandatory e-Factura transmission deadline extended to June 1, 2026 (previously Jan 15, 2026 per GEO 89/2025). e-VAT enforcement tightening under GEO 13/2026." },
  { name: "Serbia", region: "Europe", status: "Partially Live", effectiveDate: "Jan 2023", mandateType: "B2G + B2B", model: "Clearance", format: "UBL 2.1", platform: "SEF", penalties: "Fines for non-issuance", summary: "B2G + B2B invoicing via SEF platform. April 2026 amendments: retail e-invoicing for corporate cardholders now mandatory, internal invoicing required in SEF. New Rulebook amendments effective Apr 2026 tax period. B2B delivery notes Oct 2027." },
  { name: "Slovakia", region: "Europe", status: "Upcoming", effectiveDate: "Jan 2027", mandateType: "B2B + B2G", model: "Clearance", format: "XML (UBL 2.1 / CII) EN 16931", platform: "IS EFA / Peppol", penalties: "Up to €100,000 for non-compliance", summary: "Parliament approved mandatory B2B e-invoicing law (Dec 2025). Voluntary use available from May 1, 2026. Mandatory domestic B2B/B2G from Jan 1, 2027 via 5-corner Peppol model with certified 'Digital Postmen' service providers. XML structured invoices required; simplified invoices <€100 exempt. Cross-border (intra-EU) reporting obligations by Jun 30, 2030. Also from May 1, 2026: all eKasa-registered sellers must offer cashless payment for transactions over €1 (fines €500–€15,000 for non-compliance)." },
  { name: "Spain", region: "Europe", status: "Upcoming", effectiveDate: "Oct 2027", mandateType: "B2B + B2G", model: "Clearance", format: "Facturae / Structured XML", platform: "FACe (B2G) / AEAT + Private Platforms (B2B)", penalties: "TBD — Royal Decree in effect", summary: "Royal Decree 238/2026 published Mar 31, mandating B2B e-invoicing. Mandatory start date confirmed: October 1, 2027 for large businesses (≥€8M turnover); SMEs approximately 2028. Draft Order on public platform rules due Oct 1, 2026 (public consultation ongoing). Hybrid architecture: free AEAT public platform + interoperable private platforms. SII real-time reporting continues in parallel for large VAT payers." },
  { name: "Sweden", region: "Europe", status: "Partially Live", effectiveDate: "Apr 2019", mandateType: "B2G", model: "Post-Audit", format: "Peppol BIS / SFTI", platform: "Peppol Network", penalties: "Rejection of non-compliant B2G invoices", summary: "B2G mandatory since Apr 2019 via Peppol BIS. Voluntary B2B adoption growing." },
  { name: "Switzerland", region: "Europe", status: "Voluntary", effectiveDate: null, mandateType: "B2G", model: "Post-Audit", format: "Peppol BIS / QR-bill", platform: "Peppol Network", penalties: "None (voluntary)", summary: "No mandate. Peppol adoption voluntary. QR-bill widely used for domestic invoicing." },
  { name: "Turkey", region: "Europe", status: "Live", effectiveDate: "2014", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "UBL-TR", platform: "GIB (e-Fatura / e-Arşiv)", penalties: "Tax penalties and fines for non-compliance", summary: "Comprehensive clearance model since 2014. e-Fatura for B2B, e-Arşiv for B2C. Updated e-invoice package and VAT code controls effective Apr 1, 2026." },
  { name: "UK", region: "Europe", status: "Partially Live", effectiveDate: "Apr 2026", mandateType: "B2G + MTD", model: "Post-Audit", format: "Peppol BIS", platform: "Peppol / HMRC MTD", penalties: "Penalties for MTD non-compliance", summary: "B2G via Peppol. MTD for Income Tax launched Apr 2026. No mandatory B2B e-invoicing yet." },
  { name: "Ukraine", region: "Europe", status: "Upcoming", effectiveDate: "2025", mandateType: "B2B + B2G", model: "Post-Audit", format: "XML", platform: "Tax Authority Portal", penalties: "TBD", summary: "E-invoicing registration system under development by tax authority." },

  // ── Middle East ──
  { name: "Bahrain", region: "Middle East", status: "Upcoming", effectiveDate: "2026", mandateType: "B2B + B2G", model: "Clearance", format: "TBD", platform: "NBR Portal", penalties: "TBD", summary: "Aligned with GCC e-invoicing framework. Mandate expected 2026." },
  { name: "Israel", region: "Middle East", status: "Partially Live", effectiveDate: "2024", mandateType: "B2B + B2G", model: "Post-Audit", format: "XML", platform: "ITA Portal", penalties: "Administrative fines", summary: "Phased e-invoicing rollout for domestic transactions. Real-time allocation number thresholds progressively lowered under Economic Efficiency Law 2023: NIS 20,000 (2025) → NIS 10,000 (Jan 2026) → NIS 5,000 (Jun 2026). Businesses must update invoicing systems to obtain allocation numbers for invoices above threshold." },
  { name: "Oman", region: "Middle East", status: "Upcoming", effectiveDate: "Aug 2026", mandateType: "B2B + B2G", model: "Clearance", format: "XML / JSON (Peppol)", platform: "OTA Fawtara", penalties: "TBD", summary: "Fawtara e-invoicing system approved as Peppol Authority. 5-corner model via accredited Access Points. Phase 1 (Aug 2026): ~153 largest taxpayers. Phase 2 (Feb 2027): all large VAT-registered. Phase 3 (mid-2027): all VAT-registered incl. SMEs. Phase 4 (2028): full B2G/G2B. Sandbox live since Feb 2026; ASP accreditation from May 2026. 53 mandatory fields, 10-year archiving." },
  { name: "Saudi Arabia", region: "Middle East", status: "Live", effectiveDate: "Dec 2021", mandateType: "B2B + B2G", model: "Clearance", format: "UBL 2.1 / XML", platform: "ZATCA FATOORA", penalties: "SAR 10,000+ per violation", summary: "FATOORA Phase 1 (generation) since Dec 2021. Phase 2 (integration/clearance) rolling out in waves. Wave 23 (>SAR 750K revenue): deadline Mar 31, 2026. Wave 24 (>SAR 375K revenue): ZATCA notifying taxpayers from Apr 1, deadline Jun 30, 2026." },
  { name: "UAE", region: "Middle East", status: "Partially Live", effectiveDate: "Jul 2026", mandateType: "B2B + B2G", model: "Clearance", format: "PINT-AE (UBL 2.1 XML)", platform: "FTA EmaraTax / Accredited Service Providers (Peppol)", penalties: "Up to AED 50,000; administrative penalties reduced by FTA effective Apr 14, 2026", summary: "Voluntary 4-corner Peppol e-invoicing model launched Apr 21–May 1, 2026 via EmaraTax — businesses can now select an Accredited Service Provider (ASP) and begin voluntary e-invoice exchange. 5-corner model (Corner 5 tax reporting to FTA) going live ahead of the mandatory pilot. Mandatory pilot: Jul 1, 2026. Large businesses (≥AED 50M) mandatory from Jan 1, 2027; <AED 50M from Jul 1, 2027; Government entities Oct 1, 2027. 24-month grace period for intra-VAT group transactions (exempt until Jan 2029). B2C and simplified invoices <AED 10K excluded. FTA reduced several administrative tax penalties effective Apr 14, 2026. 50+ mandatory data elements; 14-day transmission deadline; records must be stored in UAE." },

  // ── Asia-Pacific ──
  { name: "Kazakhstan", region: "Asia-Pacific", status: "Live", effectiveDate: "Jan 2026", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "XML", platform: "IS ESF (Electronic Invoice System)", penalties: "Up to 30% of transaction value for non-compliance; VAT credits denied if not confirmed in IS ESF before filing", summary: "Mandatory e-invoicing via IS ESF clearance platform since Jan 1, 2026 for all VAT-registered entities and non-VAT taxpayers in specific sectors (logistics, healthcare, legal, commission sales). No turnover threshold. Grace period through Mar 31, 2026 for certain taxpayers. VAT credits only claimable when VAT is confirmed in IS ESF before filing the VAT return. Biometric ID verification required for high-risk transactions. Foreign digital service providers exempt from VAT invoice issuance. Penalties up to 30% of transaction value." },
  { name: "Australia", region: "Asia-Pacific", status: "Partially Live", effectiveDate: "Jul 2023", mandateType: "B2G", model: "Post-Audit", format: "Peppol BIS", platform: "Peppol Network", penalties: "Rejection of non-compliant B2G invoices", summary: "B2G via Peppol expanding. Government adoption accelerating across federal and state agencies." },
  { name: "China", region: "Asia-Pacific", status: "Partially Live", effectiveDate: "2024", mandateType: "B2B + B2G", model: "Clearance", format: "OFD / XML", platform: "Golden Tax / Fapiao", penalties: "Tax penalties for non-compliance", summary: "Fully digital fapiao rollout underway. Transitioning from paper-based Golden Tax to all-electronic invoicing." },
  { name: "India", region: "Asia-Pacific", status: "Live", effectiveDate: "Oct 2020", mandateType: "B2B + B2G", model: "Clearance", format: "JSON / e-Invoice Schema", platform: "IRP (Invoice Registration Portal)", penalties: "₹10,000–₹25,000 per invoice for non-compliance", summary: "Mandatory for businesses with turnover >₹5 Cr. All B2B invoices must be registered through IRP for IRN generation." },
  { name: "Indonesia", region: "Asia-Pacific", status: "Live", effectiveDate: "Jul 2015", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "XML", platform: "e-Faktur (DJP)", penalties: "Tax penalties for non-issuance", summary: "Comprehensive e-Faktur system since 2015 for all invoice types." },
  { name: "Japan", region: "Asia-Pacific", status: "Partially Live", effectiveDate: "Oct 2023", mandateType: "B2B + B2G", model: "Post-Audit", format: "Peppol BIS JP", platform: "JP PINT / Peppol", penalties: "Loss of input tax credit for non-qualified invoices", summary: "Qualified Invoice System (QIS) since Oct 2023. Peppol adoption growing for digital invoice exchange." },
  { name: "Malaysia", region: "Asia-Pacific", status: "Live", effectiveDate: "Aug 2024", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "XML / JSON", platform: "MyInvois (LHDN)", penalties: "Fines and penalties per Malaysian tax law; RM10,000+ individual e-invoice threshold strictly enforced; full enforcement for Phase 4 from Jan 1, 2028", summary: "Phased rollout by revenue threshold. Phase 4 (RM1M–RM5M turnover) mandatory from Jan 1, 2026; interim penalty-free relaxation period extended to Dec 31, 2027 (Specific Guide v4.7, Apr 20, 2026) — full enforcement from Jan 1, 2028. Phase 5 (RM500K–RM1M) officially cancelled — Cabinet raised minimum threshold to RM1M (Dec 2025), exempting businesses below RM1M. RM10,000 individual transaction e-invoice rule remains strictly enforced." },
  { name: "New Zealand", region: "Asia-Pacific", status: "Voluntary", effectiveDate: null, mandateType: "B2G", model: "Post-Audit", format: "Peppol BIS", platform: "Peppol Network", penalties: "None (voluntary)", summary: "Peppol adoption voluntary. Government encouraging but no mandate announced." },
  { name: "Pakistan", region: "Asia-Pacific", status: "Partially Live", effectiveDate: "2024", mandateType: "B2B + B2G", model: "Clearance", format: "XML / JSON", platform: "FBR e-Invoice (STGO)", penalties: "Fines per FBR regulations; non-compliant invoices rejected", summary: "FBR mandating e-invoicing integration for broad range of businesses via STGO 01/2026. Real-time reporting through licensed integrators. Invoice edits restricted to 72 hours; later amendments need Commissioner approval. Expanding to restaurants, hospitals, retailers, schools." },
  { name: "Philippines", region: "Asia-Pacific", status: "Partially Live", effectiveDate: "2024", mandateType: "B2B + B2G", model: "Clearance", format: "JSON / XML", platform: "EIS (BIR)", penalties: "Fines per BIR regulations", summary: "Electronic Invoicing System (EIS) phased rollout by BIR. Full mandate deadline extended to Dec 31, 2026 via RR 26-2025. EIS platform still under development." },
  { name: "Singapore", region: "Asia-Pacific", status: "Partially Live", effectiveDate: "Apr 2026", mandateType: "B2B + B2G", model: "Post-Audit", format: "Peppol BIS", platform: "InvoiceNow (Peppol)", penalties: "GST penalties for non-compliance", summary: "InvoiceNow via Peppol. Mandatory for new voluntary GST registrants from Apr 1, 2026. Budget 2026 confirmed full mandatory rollout for all GST-registered businesses: Apr 2028 (new compulsory registrants + existing ≤S$200K), Apr 2029 (≤S$1M), Apr 2030 (≤S$4M), Apr 2031 (>S$4M). Government providing S$1K–S$5K transitional funding per business." },
  { name: "South Korea", region: "Asia-Pacific", status: "Live", effectiveDate: "2011", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "XML", platform: "NTS HomeTax (e-Tax Invoice)", penalties: "1% penalty on supply value for non-issuance", summary: "Mandatory e-Tax Invoice via NTS HomeTax for all businesses above threshold." },
  { name: "Sri Lanka", region: "Asia-Pacific", status: "Upcoming", effectiveDate: "2025", mandateType: "B2B + B2G", model: "Post-Audit", format: "TBD", platform: "IRD Portal", penalties: "TBD", summary: "IRD developing e-invoicing framework. Implementation timeline under review." },
  { name: "Taiwan", region: "Asia-Pacific", status: "Partially Live", effectiveDate: "2006", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "MIG XML", platform: "eGUI (Uniform Invoice)", penalties: "Tax penalties for non-compliance", summary: "eGUI (electronic Government Uniform Invoice) system since 2006. Covers B2B, B2G, and B2C." },
  { name: "Vietnam", region: "Asia-Pacific", status: "Live", effectiveDate: "2020", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "XML", platform: "Tax Authority e-Invoice", penalties: "Restructured penalty framework under Decree 310/2025/ND-CP (effective Jan 16, 2026): penalties calibrated to transaction nature and number of violating invoices; reports of fines up to VND 50–80M for persistent non-compliance", summary: "Mandatory e-invoicing for all businesses since 2020. Tax authority validates and issues codes. Decree 70/2025 expanded scope (foreign digital businesses voluntary; connected POS mandatory for retail). Ministry of Finance draft decree (Apr 20, 2026) simplifies e-invoicing for e-commerce and low-value transactions — platform operators may issue e-invoices on behalf of individual sellers; VAT/PIT withholding obligations shifting to platforms. VAT threshold doubled to VND 200M annual revenue (effective 2026)." },

  // ── Latin America ──
  { name: "Argentina", region: "Latin America", status: "Live", effectiveDate: "2019", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "XML", platform: "AFIP/ARCA (Factura Electrónica)", penalties: "Tax penalties and fines per ARCA/AFIP regulations", summary: "AFIP/ARCA Factura Electrónica mandatory for all taxpayers since 2019. General Resolution RG 5824/2026 eliminates remaining exceptions: all previously excluded taxpayer categories must issue electronic invoices from Jul 1, 2026. ARCA General Resolution 5616/2024 updates Web Service technical manuals (mandatory since Apr 15, 2025)." },
  { name: "Belize", region: "Latin America", status: "Upcoming", effectiveDate: "2027", mandateType: "B2B + B2G", model: "Clearance", format: "TBD", platform: "BTSD", penalties: "Penalties under amended GST Act", summary: "2026/27 Budget confirmed mandatory e-invoicing under GST regime. General Sales Tax (Amendment) Act 2024 provides legal basis. BTSD managing rollout with IDB/CIAT support. Technical specifications and phased timeline pending. E-receipts also mandated by 2027." },
  { name: "Bolivia", region: "Latin America", status: "Partially Live", effectiveDate: "Oct 2026", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "XML", platform: "SFE (SIN)", penalties: "Tax penalties per SIN regulations", summary: "Phased rollout by taxpayer groups. Groups 1–8 already live. Groups 9–12 (27,973 taxpayers) had their deadline extended from Apr 1, 2026 to Oct 1, 2026 under RND No. 102600000007 — these groups may continue using existing invoicing methods until Sep 30, 2026. From Oct 1, 2026, only the assigned electronic modality is accepted for all taxpayer groups." },
  { name: "Brazil", region: "Latin America", status: "Live", effectiveDate: "2008", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "XML", platform: "NF-e / NFS-e / NFC-e / CT-e (SEFAZ)", penalties: "Fines and operational restrictions; e-invoice confirmation deadline reduced to 90 days from June 2026", summary: "Pioneer in e-invoicing. NF-e for goods, NFS-e for services, CT-e for transport. All cleared through SEFAZ. PIS/COFINS invoicing rules updated under Complementary Law 224/2025 (effective Apr 1, 2026): previously zero-rated transactions now taxed at 10% of normal rate (CST code 06, tax credits retained). SINIEF Adjustments 10–13/2026: retailers choose between NF-e and NFC-e; DANFE Type 2 rollout Aug 3, 2026; NF-e references to NFC-e restricted from Oct 5, 2026. Simples Nacional taxpayers must issue electronic service invoices exclusively via the National NFS-e Issuer from Sep 1, 2026. E-invoice confirmation deadline halved to 90 days from June 2026. PAA framework introduced for delegated NF-e issuance." },
  { name: "Chile", region: "Latin America", status: "Live", effectiveDate: "2014", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "XML (DTE)", platform: "SII", penalties: "Tax penalties for non-compliance", summary: "Mandatory DTE (Documento Tributario Electrónico) via SII for all taxpayers. New enhanced dispatch-guide and e-invoice requirements for goods transport (enhanced origin/destination, driver/vehicle documentation) postponed to November 1, 2026 via Exempt Resolution SII No. 52 (from original May 1, 2026 deadline)." },
  { name: "Colombia", region: "Latin America", status: "Live", effectiveDate: "2019", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "UBL 2.1 XML", platform: "DIAN", penalties: "Fines per DIAN regulations (10–1,500 UVT range); voluntary correction regime expired Apr 30, 2026", summary: "Mandatory Factura Electrónica via DIAN for all taxpayers. DIAN voluntary correction regime for e-invoicing non-compliance (capped penalties 10–1,500 UVT / ~US$143–$21,440) closed Apr 30, 2026 — standard penalty framework now fully applies." },
  { name: "Costa Rica", region: "Latin America", status: "Live", effectiveDate: "2018", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "XML 4.3", platform: "Hacienda", penalties: "Tax penalties for non-compliance", summary: "Mandatory e-invoice via Hacienda for all taxpayers." },
  { name: "Dominican Republic", region: "Latin America", status: "Live", effectiveDate: "May 2026", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "XML (e-CF)", platform: "DGII (e-CF)", penalties: "Fines per DGII regulations; non-compliant invoices invalid for tax purposes", summary: "e-CF (Comprobante Fiscal Electrónico) now mandatory for all businesses under Law No. 32-23. Three-phase rollout completed: Phase 1 National Large Taxpayers (May 15, 2024); Phase 2 Local Large + Medium Taxpayers (Nov 15, 2025); Phase 3 Small, Micro, Unclassified Taxpayers and state entities (May 15, 2026). e-CF is now the only valid invoicing method nationwide for all DGII-registered businesses. DGII updated e-CF Technical Report v1.0 in 2026 with updated technical requirements." },
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
  { name: "Burkina Faso", region: "Africa", status: "Partially Live", effectiveDate: "Jul 2026", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "FEC (Facture Électronique Certifiée) — XML with QR code", platform: "DGI FEC Platform", penalties: "XOF 500,000–2,000,000 per violation for non-compliance", summary: "DGI launched the Certified Electronic Invoice (FEC) system in January 2026, replacing the legacy normalised invoice regime. Mandatory compliance starts July 1, 2026 for all domestic taxable persons with annual turnover ≥ XOF 50 million. Covers B2B, B2G, and B2C transactions. Real-time clearance model with QR-coded invoices. Certain foreign companies and specific sectors are exempt. Preparatory phase running Jan–Jun 2026." },
  { name: "Cameroon", region: "Africa", status: "Upcoming", effectiveDate: "2026", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "TBD", platform: "DGI e-Invoice Platform", penalties: "Non-compliant invoices denied for tax deductions and VAT credits; financial penalties apply", summary: "2026 Finance Law mandates real-time e-invoicing for all taxable persons covering taxable, VAT-exempt, and out-of-scope transactions. Central platform with accredited third-party providers. Technical details and rollout timeline pending." },
  { name: "Gabon", region: "Africa", status: "Live", effectiveDate: "Jan 2026", mandateType: "B2B + B2G", model: "Clearance", format: "FNE (Facture Normalisée Électronique)", platform: "DGI Platform", penalties: "Non-compliant invoices denied for income tax and VAT deductions", summary: "2026 Finance Law (Law No. 041/2025) mandates e-invoicing (FNE) for all taxpayers. Required for claiming income tax and VAT deductions since Jan 2026. 6-month soft landing phase; full compliance by Jul 2026." },
  { name: "Democratic Republic of Congo", region: "Africa", status: "Live", effectiveDate: "Sep 2024", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "Facture Normalisée Électronique (XML)", platform: "DGCI (Fiscal Devices)", penalties: "VAT deductions denied on non-compliant invoices; grace period ended May 2026 — non-compliant invoices no longer eligible for correction", summary: "Mandatory standardized e-invoicing (facture normalisée) launched Sep 15, 2024 for Phase 1 VAT-registered businesses via fiscal electronic devices. DRC ended the grace period in May 2026; full enforcement now in effect — VAT deductions only allowed with compliant standardized invoices, and non-compliant invoices are no longer eligible for retroactive correction." },
  { name: "Egypt", region: "Africa", status: "Partially Live", effectiveDate: "2020", mandateType: "B2B + B2G", model: "Clearance", format: "JSON / XML", platform: "ETA e-Invoice", penalties: "EGP 20,000–100,000 per violation", summary: "ETA mandatory e-invoicing expanding by taxpayer group. Phased rollout since 2020." },
  { name: "Ghana", region: "Africa", status: "Live", effectiveDate: "Jan 2026", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "XML / JSON", platform: "GRA (e-VAT / VSDC)", penalties: "Penalties for non-issuance; invoices without VSDC approval invalid for VAT purposes", summary: "Mandatory E-VAT for all VAT-registered businesses since Jan 2026 (no revenue threshold). Invoices must be transmitted to GRA's Virtual Sales Data Controller (VSDC) for approval before issuance. Offline invoices must sync within 24 hours. Covid-19 Levy abolished; GET Fund/NHIL levies now deductible as input tax. VAT Flat Rate Scheme abolished." },
  { name: "Ivory Coast", region: "Africa", status: "Partially Live", effectiveDate: "2024", mandateType: "B2B + B2G", model: "Clearance", format: "XML", platform: "DGI (e-Facture)", penalties: "Tax penalties per DGI regulations", summary: "DGI e-Facture system. Mandatory for designated taxpayer groups." },
  { name: "Kenya", region: "Africa", status: "Partially Live", effectiveDate: "2024", mandateType: "B2B + B2G", model: "Clearance", format: "JSON / XML", platform: "KRA (eTIMS)", penalties: "Fines per KRA regulations", summary: "eTIMS (electronic Tax Invoice Management System) mandatory and expanding." },
  { name: "Malawi", region: "Africa", status: "Live", effectiveDate: "May 2026", mandateType: "B2B + B2G + B2C", model: "Clearance", format: "XML / JSON", platform: "MRA EIS", penalties: "Non-EIS invoices invalid for VAT purposes; legacy EFD invoices no longer accepted for input VAT claims", summary: "MRA Electronic Invoicing System (EIS) mandatory for all VAT-registered businesses from May 1, 2026 (replaces legacy Electronic Fiscal Devices). Real-time invoice validation by MRA. VAT (EIS) Regulations 2026 published Jan 9. EFD-generated invoices no longer accepted for input VAT claims after transition." },
  { name: "Mauritius", region: "Africa", status: "Upcoming", effectiveDate: "2025", mandateType: "B2B + B2G", model: "Clearance", format: "TBD", platform: "MRA Portal", penalties: "TBD", summary: "MRA developing e-invoicing platform. Implementation planned for 2025." },
  { name: "Morocco", region: "Africa", status: "Upcoming", effectiveDate: "2026", mandateType: "B2B + B2G", model: "Clearance (TBC)", format: "UBL / CII (planned)", platform: "DGI Portal", penalties: "TBD", summary: "DGI completed the 2025/26 B2B e-invoicing pilot; full rollout planned under the 2026 Finance Act. Pre-launch update published May 2, 2026 confirms platform evaluation ongoing — DGI is assessing post-audit vs CTC (real-time clearance) model. UBL and CII formats planned. No mandatory implementation dates officially announced yet; phased rollout expected starting with large companies." },
  { name: "Namibia", region: "Africa", status: "Upcoming", effectiveDate: "2028", mandateType: "B2B + B2G", model: "Clearance", format: "TBD", platform: "NamRA ITAS", penalties: "TBD", summary: "2026/27 Budget proposes VAT Act amendments to implement e-invoicing via real-time clearance model integrated with NamRA's ITAS. Original 2026 launch delayed to 2028 or later due to required consultations. Draft legislation and technical specifications pending." },
  { name: "Nigeria", region: "Africa", status: "Partially Live", effectiveDate: "Nov 2025", mandateType: "B2B + B2G", model: "Clearance", format: "Peppol BIS Billing 3.0 UBL (XML / JSON)", platform: "FIRS Merchant Buyer Solution (MBS)", penalties: "Tax penalties per FIRS regulations; enforcement from Jan 2027 for medium taxpayers", summary: "FIRS phased e-invoicing rollout via Merchant Buyer Solution (MBS). Phase 1 (large taxpayers) live since Nov 2025. Medium taxpayers (₦1bn–₦5bn turnover) go-live Jul 1, 2026; compliance enforcement from Jan 2027. Emerging/smaller taxpayers phased through 2028. Uses Peppol BIS Billing 3.0 UBL; integration via APIs or Accredited Access Point Providers (APPs) authorised by NITDA." },
  { name: "Rwanda", region: "Africa", status: "Partially Live", effectiveDate: "2024", mandateType: "B2B + B2G", model: "Clearance", format: "JSON", platform: "RRA (EBM)", penalties: "Fines per RRA regulations", summary: "Electronic Billing Machine (EBM) system expanding. Mandatory for designated businesses." },
  { name: "South Africa", region: "Africa", status: "Upcoming", effectiveDate: "2028", mandateType: "B2B + B2G", model: "Post-Audit", format: "TBD", platform: "SARS Portal", penalties: "TBD", summary: "SARS confirmed multi-year e-invoicing and digital reporting reform plan. Tax Administration Laws Amendment Act 4 of 2026 promulgated Apr 1, 2026 — introduces voluntary e-reporting system for VAT vendors and grants SARS statutory authority to prescribe e-invoicing requirements. Voluntary pilot/design phase 2026–2027; mandatory phased rollout from 2028 for large VAT taxpayers." },
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

function RecentChangesTable() {
  const [expanded, setExpanded] = useState(true);
  const [filterType, setFilterType] = useState("All");

  const filtered = filterType === "All" ? recentChanges : recentChanges.filter(c => c.type === filterType);
  const types = ["All", ...Object.keys(typeConfig)];

  return (
    <div style={{ marginBottom: 24, background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "14px 20px", cursor: "pointer", background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 18 }}>📋</span>
          <span style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>Recent Changes (Last 30 Days)</span>
          <span style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.8)", background: "rgba(255,255,255,0.2)", padding: "2px 10px", borderRadius: 20 }}>
            {recentChanges.length} updates
          </span>
        </div>
        <span style={{ fontSize: 18, color: "#fff", transform: expanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}>▾</span>
      </div>
      {expanded && (
        <div style={{ padding: "12px 20px 20px" }}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
            {types.map(t => {
              const active = filterType === t;
              const tc = t !== "All" ? typeConfig[t] : null;
              return (
                <button key={t} onClick={() => setFilterType(t)} style={{
                  padding: "4px 12px", borderRadius: 16, border: `1px solid ${active ? (tc ? tc.color : "#6366f1") : "#e2e8f0"}`,
                  background: active ? (tc ? tc.bg : "#eef2ff") : "#fff", color: active ? (tc ? tc.color : "#6366f1") : "#64748b",
                  cursor: "pointer", fontSize: 12, fontWeight: active ? 600 : 400, transition: "all 0.15s ease",
                }}>{t}{t !== "All" ? ` (${recentChanges.filter(c => c.type === t).length})` : ""}</button>
              );
            })}
          </div>
          <div style={{ overflowX: "auto", overflowY: "auto", maxHeight: 280 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #e2e8f0" }}>
                  <th style={{ position: "sticky", top: 0, background: "#fff", textAlign: "left", padding: "8px 12px", color: "#64748b", fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>Date</th>
                  <th style={{ position: "sticky", top: 0, background: "#fff", textAlign: "left", padding: "8px 12px", color: "#64748b", fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>Country</th>
                  <th style={{ position: "sticky", top: 0, background: "#fff", textAlign: "left", padding: "8px 12px", color: "#64748b", fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>Type</th>
                  <th style={{ position: "sticky", top: 0, background: "#fff", textAlign: "left", padding: "8px 12px", color: "#64748b", fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>Change</th>
                  <th style={{ position: "sticky", top: 0, background: "#fff", textAlign: "center", padding: "8px 12px", color: "#64748b", fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>Source</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => {
                  const tc = typeConfig[c.type] || typeConfig.Update;
                  return (
                    <tr key={i} style={{ borderBottom: "1px solid #f1f5f9", background: i % 2 === 0 ? "#fff" : "#fafbfc" }}>
                      <td style={{ padding: "10px 12px", whiteSpace: "nowrap", fontWeight: 600, color: "#334155" }}>{c.date}</td>
                      <td style={{ padding: "10px 12px", fontWeight: 600, color: "#1e293b", whiteSpace: "nowrap" }}>{c.country}</td>
                      <td style={{ padding: "10px 12px" }}>
                        <span style={{ fontSize: 11, fontWeight: 600, color: tc.color, background: tc.bg, padding: "2px 8px", borderRadius: 12, whiteSpace: "nowrap" }}>{c.type}</span>
                      </td>
                      <td style={{ padding: "10px 12px", color: "#475569", lineHeight: 1.5 }}>{c.change}</td>
                      <td style={{ padding: "10px 12px", textAlign: "center" }}>
                        <a href={c.source} target="_blank" rel="noopener noreferrer" style={{ color: "#6366f1", textDecoration: "none", fontSize: 12, fontWeight: 600 }} title={c.source}>🔗 Article</a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: 10, fontSize: 11, color: "#94a3b8", textAlign: "right" }}>
            Showing {filtered.length} of {recentChanges.length} changes · Mar 2 – Apr 30, 2026
          </div>
        </div>
      )}
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

      {/* Recent Changes */}
      <RecentChangesTable />

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
