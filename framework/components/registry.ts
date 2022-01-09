interface ComponentTree {}

export interface Component {
  name: string;
  namespace?: string;
  content: string;
  imports?: string[];
  template?: string;
}

class ComponentRegistry {
  private _registry: Component[] = [];

  add(component: Component) {
    if (
      this._registry.find(
        (existing) =>
          existing.name === component.name &&
          existing.namespace === component.namespace,
      )
    ) {
      throw new Error(
        `Component with the name: ${component.name} is already registered!`,
      );
    }
    this._registry.push(component);
  }

  get(name: string): Component {
    const component = this._registry.find((component) => {
      return component.name === name;
    });
    if (component) {
      return component;
    }
    throw Error(
      `Parcel component "${name}" is not registerd and can not be resolved!`,
    );
  }
}

export const registry = new ComponentRegistry();

export function register(component: Component): ComponentRegistry {
  registry.add(component);
  return registry;
}
