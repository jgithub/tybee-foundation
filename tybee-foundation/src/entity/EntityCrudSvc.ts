import { Entity } from './Entity'

export interface EntityCrudSvc {
  getUserByIdAndPin(id: number, pin: string): Promise<Entity>
  tryGetUserByIdAndPin(id: number, pin: string): Promise<Entity | undefined>
}