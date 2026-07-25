from typing import List, Dict, Any

def calculate_overall_risk(agent_scores: List[int]) -> int:
    """Calculates overall risk score based on weighted agent risk scores."""
    if not agent_scores:
        return 0
    # Higher weights assigned to max critical score
    max_risk = max(agent_scores)
    avg_risk = sum(agent_scores) / len(agent_scores)
    overall = int((max_risk * 0.6) + (avg_risk * 0.4))
    return min(max(overall, 0), 100)

def determine_severity(risk_score: int) -> str:
    """Determines risk severity label from numeric risk score (0-100)."""
    if risk_score >= 80:
        return "Critical"
    elif risk_score >= 60:
        return "High"
    elif risk_score >= 35:
        return "Medium"
    else:
        return "Low"
