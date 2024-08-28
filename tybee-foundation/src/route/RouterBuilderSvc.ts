import { Router } from 'express';

export interface RouterBuilderSvc {
  build(app: any): Router;
}