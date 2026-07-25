import asyncio
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.graph.workflow import app_graph

def test_live_workflow():
    print("Testing Live Multi-Agent LangGraph Workflow Execution...")
    sample_text = """
    CONFIDENTIAL CORPORATE REPORT Q3 2026
    EMEA Region projections indicate a 42% YoY revenue growth projection despite a $14.8M regional deficit.
    Section 4.2 contains ambiguous third-party indemnification terms.
    Appendix B input field contains un-sanitized user prompt instructions.
    """
    
    result = app_graph.invoke({"document_text": sample_text})
    print("\n--- WORKFLOW EXECUTION COMPLETE ---")
    print("Financial Agent:", result.get("financial_result", {}).get("riskScore"))
    print("Legal Agent:", result.get("legal_result", {}).get("riskScore"))
    print("Market Agent:", result.get("market_result", {}).get("riskScore"))
    print("Security Agent:", result.get("security_result", {}).get("riskScore"))
    print("Coordinator Summary:", result.get("coordinator_result", {}).get("executiveSummary"))
    print("Overall Risk Score:", result.get("coordinator_result", {}).get("overallRisk"))

if __name__ == "__main__":
    test_live_workflow()
