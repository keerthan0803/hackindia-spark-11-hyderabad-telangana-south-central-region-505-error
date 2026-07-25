from langgraph.graph import StateGraph, END
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

# Set entry point
workflow.set_entry_point("financial")

# Edge connections
workflow.add_edge("financial", "legal")
workflow.add_edge("legal", "market")
workflow.add_edge("market", "security")
workflow.add_edge("security", "coordinator")
workflow.add_edge("coordinator", END)

app_graph = workflow.compile()
