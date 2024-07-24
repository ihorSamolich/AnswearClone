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

export interface ICreateCategory {
  name: string;
  targetGroupId?: string;
  parentId?: string;
}

interface IShortCategory {
  id: number;
  name: string;
  slug: string;
}

export interface ITargetGroup {
  id: number;
  name: string;
}
