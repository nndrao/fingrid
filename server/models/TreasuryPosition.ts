import { v4 as uuidv4 } from 'uuid';

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

export function generateRandomPosition(bondId: string): TreasuryPosition {
  const maturityYears = Math.floor(Math.random() * 29) + 1; // 1-30 year bonds
  const maturityDate = new Date();
  maturityDate.setFullYear(maturityDate.getFullYear() + maturityYears);

  return {
    id: uuidv4(),
    bondId,
    maturityDate: maturityDate.toISOString(),
    couponRate: Number((Math.random() * 5 + 1).toFixed(3)), // 1-6%
    quantity: Math.floor(Math.random() * 10000) * 1000, // 0-10M in thousands
    price: Number((Math.random() * 10 + 95).toFixed(2)), // 95-105
    yield: Number((Math.random() * 4 + 2).toFixed(3)), // 2-6%
    riskScore: Number((Math.random() * 100).toFixed(2)),
    modifiedDuration: Number((Math.random() * 9 + 1).toFixed(2)), // 1-10
    convexity: Number((Math.random() * 0.5).toFixed(3)),
    lastUpdated: new Date().toISOString()
  };
}