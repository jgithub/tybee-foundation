import { Entity } from './Entity'

export interface EntityCrudSvcImpl {
  public async getUserByIdAndPin(id: number, pin: string): Promise<Entity> {
    return {
      id: 1,
      type: 'user',
      pin: '1234'
    }
  }
}