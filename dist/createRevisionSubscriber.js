"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRevisionSubscriber = void 0;
const typeorm_1 = require("typeorm");
const revision_entity_1 = require("./revision.entity");
function createRevisionSubscriber(entity) {
    let RevisionSubscriber = class RevisionSubscriber {
        listenTo() {
            return entity;
        }
        afterInsert(event) {
            this.createRevision(event);
        }
        afterUpdate(event) {
            this.createRevision(event);
        }
        createRevision(event) {
            const revision = new revision_entity_1.Revision();
            revision.tableName = event.metadata.tableName;
            revision.rowId = event.entity.id;
            revision.data = event.entity;
            return revision.save();
        }
    };
    RevisionSubscriber = __decorate([
        (0, typeorm_1.EventSubscriber)()
    ], RevisionSubscriber);
    return new RevisionSubscriber;
}
exports.createRevisionSubscriber = createRevisionSubscriber;
