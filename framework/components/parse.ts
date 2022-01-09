import { registry } from "./registry.ts";
import { Component } from "./registry.ts";

const parcelTagRegex =
  /<([A-Z]+[A-z]+)[A-z="'\s]*>([^]*)<\/[A-Z]+[A-z]+>|<([A-Z]+[A-z]+)\/>/g;

interface ParcelTag {
  name: string;
  slot: string;
}

interface Extractor<T> {
  name: string;
  extract: (source: string) => ExtractorResult<T> | null;
}

interface ExtractorResult<T> {
  key: string;
  result: T;
}

class ImportsExtractor implements Extractor<string[] | null> {
  readonly regex = /<components>([^]*)<\/components>/;
  readonly name = "Imports";

  extract(source: string): ExtractorResult<string[]> | null {
    const imports = source.match(this.regex);
    if (imports && imports.length >= 2) {
      return {
        key: "imports",
        result: imports[1].replace(/\s/g, "").split(","),
      };
    }
    return null;
  }
}

class TemplateExtractor implements Extractor<string | null> {
  readonly regex = /<template>([^]*)<\/template>/;
  readonly name = "Template";
  extract(source: string): ExtractorResult<string> | null {
    const template = source.match(this.regex);
    if (template && template.length >= 2) {
      const parcelTags = findParcelTags(template[1]);
      if (parcelTags?.length) {
        return {
          key: "template",
          result: resolveParcelTags(template[1], parcelTags),
        };
      }
      return {
        key: "template",
        result: template[1].trim(),
      };
    }
    return null;
  }
}

const extractors = [new ImportsExtractor(), new TemplateExtractor()];

export function parse(name: string): Component {
  const component = registry.get(`${name}.parcel`);

  for (const extractor of extractors) {
    const results = extractor.extract(component.content);
    if (results) {
      // @ts-ignore: Dynamic object extension with key.
      component[results.key] = results.result;
    }
  }
  return component;
}

function findParcelTags(template: string): ParcelTag[] | null {
  const tags = template.matchAll(parcelTagRegex);
  const foundTags: ParcelTag[] = [];
  for (const tag of tags) {
    foundTags.push({
      name: tag[1] || tag[3],
      slot: tag[2],
    });
  }
  return foundTags;
}

function resolveParcelTags(template: string, tags: ParcelTag[]): string {
  if (tags) {
    for (const tag of tags) {
      template = template.replace(
        new RegExp(`<${tag.name}/>`),
        <string> parse(tag.name).template,
      );
    }
  }
  return template;
}
