interface EntityModel {
  uri: string,
  info: any,
  definitions: Definitions[]
}

interface Definitions {
  name: string,
  elementRangeIndex: [],
  pii: [],
  rangeIndex: [],
  required: [],
  wordLexicon: [],
  properties: Property[]
}

interface Property {
  name: string,
  datatype: string,
  collation: string
}


export const entityFromJSON = (data: any) => {

  let entityArray: EntityModel[] = data.map((item: any) => {
    // TODO check uri and baseUri diff with server
    let entityModel: EntityModel = {
      uri: item['uri'],
      info: item['info'],
      definitions: []
    }

    let definitions = item['definitions'];

    for (let definition in definitions) {

      let entityDefinition: any = {
        name: '',
        elementRangeIndex: [],
        pii: [],
        rangeIndex: [],
        required: [],
        wordLexicon: [],
        properties: []
      };

      let entityProperties: Property[] = [];

      entityDefinition.name = definition;

      for (let entityKeys in item['definitions'][definition]) {
        if (entityKeys === 'properties') {
          for (let properties in item['definitions'][definition][entityKeys]) {
            let property: Property = {
              name: '',
              datatype: '',
              collation: ''
            }
            property.name = properties;
            property.collation = item['definitions'][definition][entityKeys][properties]['collation'];
            property.datatype = item['definitions'][definition][entityKeys][properties]['datatype'];
            entityProperties.push(property);
          }
        } else {
          entityDefinition[entityKeys] = item['definitions'][definition][entityKeys];
        }
        entityDefinition.properties = entityProperties;
      }
      entityModel.definitions.push(entityDefinition);
    }
    return entityModel;
  });
  return entityArray;
}

export const entityParser = (data: any) => {
  return data.map((entity: any, index: number) => {
    let rangeIndex: string[] = [];
    let nestedEntityDefinition;
    let parsedEntity = {};
    let entityDefinition = entity.definitions.find( (definition: Definitions) => definition.name === entity.info.title);
    for (var prop in entity.definitions) {
      nestedEntityDefinition = entity.definitions[prop];
      if (nestedEntityDefinition) {
        rangeIndex = rangeIndex.concat(nestedEntityDefinition['elementRangeIndex']).concat(nestedEntityDefinition['rangeIndex']);
      }
    }
    parsedEntity = {
      name: entityDefinition['name'],
      primaryKey: entityDefinition.hasOwnProperty('primaryKey') ? entityDefinition['primaryKey'] : '',
      rangeIndex: rangeIndex.length ? rangeIndex : []
    }
    return parsedEntity;
  });
}

export const facetParser = (facets: any) => {
  let facetArray: any[] = [];
  for (let facet in facets) {
    let parsedFacet = {
      facetName: facet,
      ...facets[facet]
    }
    facetArray.push(parsedFacet);
  }
  return facetArray;
}
