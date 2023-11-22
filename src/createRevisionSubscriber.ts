import { EventSubscriber, EntitySubscriberInterface, InsertEvent, UpdateEvent, Entity } from 'typeorm';
import { Revision } from './revision.entity';

interface TypeOrmEntity {
  id: number;
  save(): Promise<void>;
}

export function createRevisionSubscriber<T>(entity: new () => T): EntitySubscriberInterface<T> {
  @EventSubscriber()
  class RevisionSubscriber implements EntitySubscriberInterface<T> {
    listenTo() {
      return entity;
    }

    afterInsert(event: InsertEvent<T>) {
      this.createRevision(event);
    }

    afterUpdate(event: UpdateEvent<T>) {
      this.createRevision(event);
    }

    private createRevision(event: InsertEvent<T> | UpdateEvent<T>) {
      const revision = new Revision();
      revision.tableName = event.metadata.tableName;
      revision.rowId = (event.entity as TypeOrmEntity).id;
      revision.data = event.entity;
      return revision.save();
    }
  }

  return new RevisionSubscriber;
}
