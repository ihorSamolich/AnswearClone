export interface ICategory {
  id: number;
  name: string;
  slug: string;
  targetGroupId: number;
  targetGroup: ITargetGroup;
  parentId: number | null;
  parent: IShortCategory | null;
  childrens: IShortCategory[];
}

interface IShortCategory {
  id: number;
  name: string;
  slug: string;
}

interface ITargetGroup {
  id: number;
  name: string;
}
