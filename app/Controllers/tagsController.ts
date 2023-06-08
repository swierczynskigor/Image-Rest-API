import { photosArray, tagsArray } from "../Data";
import { Tag } from "../Models/Tag";

export const tagsController = {
  add: (name: string) => {
    name = [...name][0] === "#" ? name : "#" + name;
    if (!tagsArray.find((tag) => tag.name === name)) {
      const id =
        tagsArray.length > 0 ? tagsArray[tagsArray.length - 1].id + 1 : 0;
      const newTag = new Tag(id, name);
      tagsArray.push(newTag);
      return newTag;
    } else {
      return "that tag already exists";
    }
  },
  getRaw: () => {
    return tagsArray.map((tag) => tag.name);
  },
  getAll: () => {
    return tagsArray.map((tag) => {
      return { id: tag.id, name: tag.name, popularity: tag.popularity };
    });
  },
  getTagById: (id: number) => {
    const tag = tagsArray.find((tag) => tag.id === id);
    if (tag) return { id: tag.id, name: tag.name, popularity: tag.popularity };
    else return "404";
  },
  addTagToPhoto: (id: number, tagId: number) => {
    const tag = tagsArray.find((tag) => tag.id === tagId)?.name;
    const file = photosArray.find((file) => file.id === id);
    if (tag && file) {
      file.tags.push(tag);
      return file;
    } else return "404";
  },
  addMassTagsToPhoto: (id: number, tagsId: number[]) => {
    const tags = tagsArray
      .filter((tag) => tagsId.includes(tag.id))
      .map((tag) => tag.name);
    const file = photosArray.find((file) => file.id === id);
    if (tags && file) {
      file.tags = file.tags.concat([...tags]);
      return file;
    }
  },
};
