from langgraph.graph import StateGraph, START, END
from app.graph.state import AuditState
from app.graph.nodes import (
    run_financial_node,
    run_legal_node,
    run_market_node,
    run_security_node,
    run_coordinator_node,
)

workflow = StateGraph(AuditState)

# Add agent nodes
workflow.add_node("financial", run_financial_node)
workflow.add_node("legal", run_legal_node)
workflow.add_node("market", run_market_node)
workflow.add_node("security", run_security_node)
workflow.add_node("coordinator", run_coordinator_node)

# Parallel Fan-Out: Connect START directly to all 4 sub-agents
workflow.add_edge(START, "financial")
workflow.add_edge(START, "legal")
workflow.add_edge(START, "market")
workflow.add_edge(START, "security")

# Fan-In: All sub-agents converge on the Coordinator Agent
workflow.add_edge("financial", "coordinator")
workflow.add_edge("legal", "coordinator")
workflow.add_edge("market", "coordinator")
workflow.add_edge("security", "coordinator")

workflow.add_edge("coordinator", END)

app_graph = workflow.compile()
