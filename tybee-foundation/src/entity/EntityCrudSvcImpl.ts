import { NotFoundException } from '../exception/NotFoundException';
import { PostgresConnectionProviderSvc } from '../postgres/PostgresConnectionProviderSvc'
import { Entity } from './Entity'
import { EntityCrudSvc } from './EntityCrudSvc'
import { getLogger, d4l } from '@jgithub/ts-gist-pile';
const LOG = getLogger(`EntityCrudSvcImpl`)

export class EntityCrudSvcImpl implements EntityCrudSvc{
  constructor(private readonly postgressConnectionProviderSvc: PostgresConnectionProviderSvc) { }

  
  public async getUserByIdAndPin(id: number, pin: string): Promise<Entity> {
    const client = this.postgressConnectionProviderSvc.getConnection();

    try {
      // Connect to the database
      await client.connect();

      const resultSet = await client.query(`SELECT id, type, pin FROM entity WHERE id = $1 AND pin = $2 and type = 'user'`, [id, pin]);
     
      if (resultSet.rows.length === 0) {
        throw new NotFoundException()
      }

      const entity: Entity = {
        id: resultSet.rows[0].id,
        type: resultSet.rows[0].type,
        pin: resultSet.rows[0].pin
      };

      return entity
    } catch (err) {
      LOG.error(`getUserByIdAndPin(): Problem executing SQL.  err = ${d4l(err)}`);
      throw new NotFoundException();
    }
    finally {
      // Close the connection
      client.end();
    };
  }
}