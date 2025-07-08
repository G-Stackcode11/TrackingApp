// database/realmSchemas.js
export const ImageMetadataSchema = {
    name: 'ImageMetadata',
    properties: {
      _id: 'string',
      imageUri: 'string',
      animalId: 'string',
      age: 'string',
      health: 'string',
      remarks: 'string',
      bodyConditionScore: 'string',
      createdAt: 'date',
    },
    primaryKey: '_id',
  };
  