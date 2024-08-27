import { Router } from 'express';

export interface RouterBuilderSvc {
  build(): Router;
}