// database/realm.js
import Realm from 'realm';
import { ImageMetadataSchema } from './realmSchemas';

export default new Realm({ schema: [ImageMetadataSchema] });
