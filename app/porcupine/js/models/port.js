import { Model, many, attr } from 'redux-orm';

import Link from './link'
import {
  ADD_NODE,
  ADD_PORT,
  ADD_PORT_TO_NODE,
  REMOVE_PORT,
} from '../actions/actionTypes';


class Port extends Model {
  static reducer(action, Port, session) {
    const { type, payload } = action;
    switch (type) {
      case ADD_NODE:
        const ports = payload.ports;
        ports.forEach(port => {
          Port.create({
    				id: port.id,
    				name: port.name,
    				isInput: port.input,
    				isOutput: port.output,
    				isVisible: port.visible,
    				isEditable: port.editable,
      		});
        });
        break;
      case ADD_PORT:
        Port.create(payload);
        break;
      case ADD_PORT_TO_NODE:
        if (!Port.filter({ id: payload.id }).exists()) {
            Port.create(payload);
        }
        break;
      case REMOVE_PORT:
        const port = Port.withId(payload);
        port.delete();
        break;
    }
    return undefined;
  }
}
Port.modelName = "Port";
Port.fields = {
  name: attr(),
  isInput: attr(),
  isOutput: attr(),
  isVisible: attr(),
  isEditable: attr(),
  inputLinks: many("Link", "inputLinks"),
  outputLinks: many("Link", "outputLinks"),
}

export default Port;
