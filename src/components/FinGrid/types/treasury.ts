export interface TreasuryPosition {
  id: string;
  bondId: string;
  maturityDate: string;
  couponRate: number;
  quantity: number;
  price: number;
  yield: number;
  riskScore: number;
  modifiedDuration: number;
  convexity: number;
  lastUpdated: string;
}