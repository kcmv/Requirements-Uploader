import {
  EntitySubscriberInterface,
  EventSubscriber,
  LoadEvent,
  RemoveEvent,
  UpdateEvent,
} from "typeorm";
import { UserDocument } from "../entities/user-document.entity";

@EventSubscriber()
export class UserDocumentSubscriber
  implements EntitySubscriberInterface<UserDocument>
{
  listenTo(): any {
    return UserDocument;
  }

  afterLoad(
    _entity: UserDocument,
    _event?: LoadEvent<UserDocument>
  ): void | Promise<any> {
    //    console.log(event.entity.document_link)
  }

  afterUpdate(_event: UpdateEvent<UserDocument>): void | Promise<any> {
    // console.log(event.databaseEntity.document_link)
  }

  beforeRemove(_event: RemoveEvent<UserDocument>): void | Promise<any> {}
}
