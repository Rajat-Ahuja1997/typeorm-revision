import { EntitySubscriberInterface } from 'typeorm';

declare module 'typeorm-revision' {
  export function createRevisionSubscriber<T>(entity: new () => T): EntitySubscriberInterface<T>;
}