export type ProposalStatus = "PENDING" | "APPROVED" | "REJECTED";

export type Proposal = {
  id: number;
  type: string;
  productName: string;
  newValue: string;
  reason: string;
  status: ProposalStatus;
  createdAt: string;
};