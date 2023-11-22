import { EventSubscriber, EntitySubscriberInterface, InsertEvent, UpdateEvent } from 'typeorm';
import { Revision } from './revision.entity';

@EventSubscriber()
export class RevisionSubscriber<T> implements EntitySubscriberInterface<T> {
  listenTo() {
    return Revision;
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
    revision.rowId = event.entity.id;
    revision.data = event.entity;
    return revision.save();
  }


}