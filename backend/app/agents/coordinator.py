from typing import Dict, Any, List
from app.core.logging import logger
from app.utils.risk_score import calculate_overall_risk, determine_severity

class CoordinatorAgent:
    def synthesize(self, agent_results: List[Dict[str, Any]]) -> Dict[str, Any]:
        logger.info("Executing Coordinator Agent synthesis...")
        scores = [res.get("riskScore", 0) for res in agent_results]
        overall_risk = calculate_overall_risk(scores)
        overall_severity = determine_severity(overall_risk)

        critical_findings = []
        all_recommendations = []

        for res in agent_results:
            findings = res.get("findings", "")
            rec = res.get("recommendations", [])
            if isinstance(rec, list):
                all_recommendations.extend(rec)
            elif isinstance(rec, str):
                all_recommendations.append(rec)

            if res.get("severity") in ["Critical", "High"]:
                critical_findings.append({
                    "agent": res.get("agentName"),
                    "severity": res.get("severity"),
                    "finding": str(findings)[:200]
                })

        summary = (
            f"Executive Audit Summary: Document analyzed by 4 autonomous sub-agents. "
            f"Global Risk Score is {overall_risk}/100 ({overall_severity} Risk). "
            f"Detected {len(critical_findings)} high-priority adversarial findings."
        )

        return {
            "executiveSummary": summary,
            "overallRisk": overall_risk,
            "overallSeverity": overall_severity,
            "overallDecision": "Needs Review" if overall_risk >= 50 else "Approved",
            "topFindings": critical_findings,
            "recommendations": list(set(all_recommendations))
        }
