import { TreasuryPosition, generateRandomPosition } from '../models/TreasuryPosition';

export class PositionService {
  private positions: Map<string, TreasuryPosition> = new Map();

  constructor() {
    this.initializePositions();
  }

  private initializePositions(): void {
    for (let i = 1; i <= 100; i++) {
      const bondId = `UST${i.toString().padStart(3, '0')}`;
      const position = generateRandomPosition(bondId);
      this.positions.set(position.id, position);
    }
  }

  getAllPositions(): TreasuryPosition[] {
    return Array.from(this.positions.values());
  }

  updateRandomPositions(count: number): TreasuryPosition[] {
    const positionIds = Array.from(this.positions.keys());
    const updatedPositions: TreasuryPosition[] = [];

    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * positionIds.length);
      const positionId = positionIds[randomIndex];
      const position = this.positions.get(positionId)!;

      // Update position with new random values while keeping some fields constant
      const updatedPosition: TreasuryPosition = {
        ...position,
        price: Number((position.price + (Math.random() - 0.5)).toFixed(2)),
        yield: Number((position.yield + (Math.random() - 0.5) * 0.1).toFixed(3)),
        riskScore: Number((position.riskScore + (Math.random() - 0.5) * 2).toFixed(2)),
        lastUpdated: new Date().toISOString()
      };

      this.positions.set(positionId, updatedPosition);
      updatedPositions.push(updatedPosition);
    }

    return updatedPositions;
  }
}