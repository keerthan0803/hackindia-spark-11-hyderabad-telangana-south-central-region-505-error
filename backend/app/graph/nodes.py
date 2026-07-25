from app.graph.state import AuditState
from app.agents.financial_agent import FinancialAgent
from app.agents.legal_agent import LegalAgent
from app.agents.market_agent import MarketAgent
from app.agents.security_agent import SecurityAgent
from app.agents.coordinator import CoordinatorAgent

financial_agent = FinancialAgent()
legal_agent = LegalAgent()
market_agent = MarketAgent()
security_agent = SecurityAgent()
coordinator_agent = CoordinatorAgent()

def run_financial_node(state: AuditState) -> AuditState:
    res = financial_agent.analyze(state["document_text"])
    return {"financial_result": res}

def run_legal_node(state: AuditState) -> AuditState:
    res = legal_agent.analyze(state["document_text"])
    return {"legal_result": res}

def run_market_node(state: AuditState) -> AuditState:
    res = market_agent.analyze(state["document_text"])
    return {"market_result": res}

def run_security_node(state: AuditState) -> AuditState:
    res = security_agent.analyze(state["document_text"])
    return {"security_result": res}

def run_coordinator_node(state: AuditState) -> AuditState:
    results = [
        state.get("financial_result", {}),
        state.get("legal_result", {}),
        state.get("market_result", {}),
        state.get("security_result", {}),
    ]
    res = coordinator_agent.synthesize(results)
    return {"coordinator_result": res}
